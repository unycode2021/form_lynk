app_name = "form_link"
app_title = "Form Link"
app_publisher = "Unycode Limited"
app_description = "Visa Application Assistance App"
app_email = "automate@unycode.net"
app_license = "mit"
app_logo = "/assets/form_link/images/logo.png"
app_logo_url = "/assets/form_link/images/logo.png"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/form_link/css/form_link.css"
# app_include_js = "/assets/form_link/js/form_link.js"

# include js, css files in header of web template
# web_include_css = "/assets/form_link/css/form_link.css"
# web_include_js = "/assets/form_link/js/form_link.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "form_link/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

website_route_rules = [
    {"from_route": "/<path:app_path>", "to_route": "home"},
]

# include js in page
# page_js = {"page" : "public/js/file.js"}
add_to_apps_screen = [
    {
        "name": "form_lynk",
        "logo": "/assets/form_link/images/logo.png",
        "title": "Form Lynk",
        "route": "/home",
       #  "has_permission": "form_link.permissions.check_app_permission",
    }
]
# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "form_link/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "form_link.utils.jinja_methods",
# 	"filters": "form_link.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "form_link.install.before_install"
# after_install = "form_link.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "form_link.uninstall.before_uninstall"
# after_uninstall = "form_link.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "form_link.utils.before_app_install"
# after_app_install = "form_link.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "form_link.utils.before_app_uninstall"
# after_app_uninstall = "form_link.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "form_link.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
    "User": {
        "after_insert": "form_link.api.auth.add_fl_user",
        "on_update": "form_link.api.auth.add_fl_user",
        "on_trash": "form_link.api.auth.remove_fl_user",
    },
}
# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"form_link.tasks.all"
# 	],
# 	"daily": [
# 		"form_link.tasks.daily"
# 	],
# 	"hourly": [
# 		"form_link.tasks.hourly"
# 	],
# 	"weekly": [
# 		"form_link.tasks.weekly"
# 	],
# 	"monthly": [
# 		"form_link.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "form_link.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "form_link.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "form_link.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["form_link.utils.before_request"]
# after_request = ["form_link.utils.after_request"]

# Job Events
# ----------
# before_job = ["form_link.utils.before_job"]
# after_job = ["form_link.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"form_link.auth.validate"
# ]
export_python_type_annotations = True

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }
