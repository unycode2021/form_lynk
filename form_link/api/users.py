import frappe

@frappe.whitelist()
def get_list():
    """
    Get all users in the Form Link system with their details.
    
    Returns:
        List of dictionaries containing user information.
    """
    users = frappe.get_all("User", 
                          fields=["name", "full_name", "first_name", "mobile_no", 
                                 "user_image", "enabled"])
    fl_users = []

    for user in users:
        roles = frappe.get_roles(user.name)
        
        if "FormLynk Agent" in roles or "FormLynk Client" in roles:
            user_type = "Agent" if "FormLynk Agent" in roles else "Client"
            
            # Get availability status if available
            availability_status = ""
            custom_status = ""
            
            fl_user = {
                "name": user.name,
                "full_name": user.full_name,
                "first_name": user.first_name,
                "user_image": user.user_image,
                "enabled": user.enabled,
                "type": user_type,
                "availability_status": availability_status,
                "custom_status": custom_status
            }
            
            fl_users.append(fl_user)

    return fl_users
