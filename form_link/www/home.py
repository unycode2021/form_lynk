import json
import re

import frappe
import frappe.sessions
from frappe import _
from frappe.utils.telemetry import capture

no_cache = 1

SCRIPT_TAG_PATTERN = re.compile(r"\<script[^<]*\</script\>")
CLOSING_SCRIPT_TAG_PATTERN = re.compile(r"</script\>")


def get_context(context):
    csrf_token = frappe.sessions.get_csrf_token()
    # Manually commit the CSRF token here
    frappe.db.commit()  # nosemgrep

    if frappe.session.user == "Guest":
        boot = frappe.website.utils.get_boot_data()
    else:
        try:
            boot = frappe.sessions.get()
        except Exception as e:
            raise frappe.SessionBootFailed from e

    boot["push_relay_server_url"] = frappe.conf.get("push_relay_server_url")

    # add server_script_enabled in boot
    if "server_script_enabled" in frappe.conf:
        enabled = frappe.conf.server_script_enabled
    else:
        enabled = True
    boot["server_script_enabled"] = enabled

    boot_json = frappe.as_json(boot, indent=None, separators=(",", ":"))
    boot_json = SCRIPT_TAG_PATTERN.sub("", boot_json)

    boot_json = CLOSING_SCRIPT_TAG_PATTERN.sub("", boot_json)
    boot_json = json.dumps(boot_json)

    context.update(
        {
            "build_version": frappe.utils.get_build_version(),
            "boot": boot_json,
            "csrf_token": csrf_token,
        }
    )

    app_name = frappe.get_website_settings("app_name") or frappe.get_system_settings(
        "app_name"
    )

    if app_name and app_name != "Frappe":
        context["app_name"] = app_name + " | " + "Vaal"

    else:
        context["app_name"] = "Form Lynk"

    if frappe.session.user != "Guest":
        capture("active_site", "vaal")

        context[
            "preload_links"
        ] = """
			<link rel="preload" href="/api/method/frappe.auth.get_logged_user" as="fetch" crossorigin="use-credentials">
		
			"""
    else:
        context["preload_links"] = ""

    context["user"] = frappe.session.user
    context["user_type"] = get_user_type()
    return context


@frappe.whitelist(methods=["POST"], allow_guest=True)
def get_context_for_dev():
    if not frappe.conf.developer_mode:
        frappe.throw(_("This method is only meant for developer mode"))
    return json.loads(get_boot())


def get_boot():
    try:
        boot = frappe.sessions.get()
    except Exception as e:
        raise frappe.SessionBootFailed from e

    boot["push_relay_server_url"] = frappe.conf.get("push_relay_server_url")
    boot_json = frappe.as_json(boot, indent=None, separators=(",", ":"))
    boot_json = SCRIPT_TAG_PATTERN.sub("", boot_json)

    boot_json = CLOSING_SCRIPT_TAG_PATTERN.sub("", boot_json)
    boot_json = json.dumps(boot_json)

    return boot_json


def get_user_type():
    """Determine if user is agency staff or client"""
    roles = frappe.get_roles(frappe.session.user)
    if (
        frappe.session.user == "Administrator" or "FormLynk Agent" in roles
        or "FormLynk Staff" in roles
        or "System Manager" in roles
    ):
        return "agency"
    else:
        if "FormLynk Client" in roles:
            return "client"
    return "guest"