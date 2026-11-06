import frappe
from frappe import _


def set_user_active():
    # Set the user's session ID in the cache
    frappe.cache().set_value(
        f"user_session_{frappe.session.user}", frappe.session.user, expires_in_sec=900
    )


def set_user_inactive():
    # Remove the user's session ID from the cache
    frappe.cache().delete_key(f"user_session_{frappe.session.user}")


@frappe.whitelist()
def get_active_users():
    # Get all the cache keys that match the pattern 'user_session_*'
    user_session_keys = frappe.cache().get_keys("user_session_*")
    # Decode the keys and split them to get the key name
    decoded_keys = [key.decode("utf-8").split("|")[1] for key in user_session_keys]
    # Get the user IDs from the cache
    user_ids = [frappe.cache().get_value(key) for key in decoded_keys]

    return user_ids


@frappe.whitelist()
def refresh_user_active_state(deactivate=False):
    if isinstance(deactivate, str):
        deactivate = True if deactivate.lower() == "true" else False
    if deactivate:
        set_user_inactive()
    else:
        set_user_active()

    # // nosemgrep This has to be published to all the users
    frappe.publish_realtime(
        "form_link:user_active_state_updated",
        {"user": frappe.session.user, "active": not deactivate},
    )  # nosemgrep

    return "ok"


@frappe.whitelist()
def create_client(email, full_name=None, phone=None, gender=None, send_welcome_email=False):
    """
    Create a new client user or update an existing one with the given information.
    
    Args:
        email: Email address (required)
        full_name: Client's full name
        phone: Client's phone number
        gender: Client's gender
        send_welcome_email: Whether to send welcome email (default: False)
    """
    if not email:
        frappe.throw(_("Email is required."))
    
    # Parse full name into first and last name
    first_name = ""
    last_name = ""
    if full_name:
        name_parts = full_name.strip().split(" ", 1)
        first_name = name_parts[0]
        if len(name_parts) > 1:
            last_name = name_parts[1]
    
    if frappe.db.exists("User", email):
        # Update existing user
        user = frappe.get_doc("User", email)
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if phone:
            user.phone = phone
        if gender:
            user.gender = gender
            
        # Ignore permissions to allow agency users to update client data
        user.save(ignore_permissions=True)
        
        # Add FormLynk Client role if not already assigned
        if "FormLynk Client" not in user.get_roles():
            user.add_roles("FormLynk Client")
            
        return {"message": _("Client information updated successfully."), "status": "success"}
    else:
        
        # Create new user
        password = frappe.generate_hash(length=8)
            
        # If full_name not provided, use email as first name
        if not first_name:
            first_name = email.split('@')[0]
            
        user = frappe.get_doc({
            "doctype": "User",
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "gender": gender,
            "enabled": 1,
            "new_password": password,
            "send_welcome_email": send_welcome_email
        })
        
        # Insert without sending welcome email by default
        user.flags.ignore_permissions = True
        user.insert(ignore_permissions=True)
        
        # Add FormLynk Client role
        user.add_roles("FormLynk Client")
        
        return {"message": _("Client created successfully."), "status": "success"}

@frappe.whitelist()
def add_fl_user(user, role="FormLynk Client"):
    """
    Add a user to the form link system by assigning a FormLynk role.
    
    Args:
        user: User email or ID
        role: Either "FormLynk Agent" or "FormLynk Client" (default)
    """
    if not frappe.db.exists("User", user):
        return {"message": _("User does not exist."), "status": "error"}
        
    if role not in ["FormLynk Agent", "FormLynk Client"]:
        return {"message": _("Invalid role. Must be 'FormLynk Agent' or 'FormLynk Client'."), "status": "error"}
    
    user_doc = frappe.get_doc("User", user)
    user_doc.add_roles(role)
    return {"message": _(f"User added to Form Link system as {role} successfully."), "status": "success"}


@frappe.whitelist()
def remove_fl_user(user, role=None):
    """
    Remove a user from the form link system by removing FormLynk roles.
    
    Args:
        user: User email or ID
        role: Either "FormLynk Agent" or "FormLynk Client" or None to remove both
    """
    if not frappe.db.exists("User", user):
        return {"message": _("User does not exist."), "status": "error"}
    
    user_doc = frappe.get_doc("User", user)
    
    if role:
        if role not in ["FormLynk Agent", "FormLynk Client"]:
            return {"message": _("Invalid role. Must be 'FormLynk Agent' or 'FormLynk Client'."), "status": "error"}
        if role in user_doc.get_roles():
            user_doc.remove_roles(role)
            return {"message": _(f"User's {role} role removed successfully."), "status": "success"}
        else:
            return {"message": _(f"User doesn't have the {role} role."), "status": "error"}
    else:
        # Remove both roles if present
        roles_removed = []
        for r in ["FormLynk Agent", "FormLynk Client"]:
            if r in user_doc.get_roles():
                user_doc.remove_roles(r)
                roles_removed.append(r)
                
        if roles_removed:
            return {"message": _("User removed from Form Link system successfully."), "status": "success"}
        else:
            return {"message": _("User has no FormLynk roles to remove."), "status": "error"}
