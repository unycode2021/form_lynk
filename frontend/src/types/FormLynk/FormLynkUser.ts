import { FormLynkApplication } from './FormLynkApplications'

export interface FormLynkUser {
       creation: string
       name: string
       modified: string
       owner: string
       modified_by: string
       docstatus: 0 | 1 | 2
       idx?: number
       /**	Type : Select	*/
       type: "Client" | "Agent"
       /**	User : Link - User	*/
   
       enabled?: 0 | 1
       /**	Full Name : Data	*/
       full_name: string
       /**	First Name : Data	*/
       first_name?: string
       /**	User Image : Attach Image	*/
       user_image?: string
       /**	 : Table - Raven Pinned Channels	*/
       applications?: FormLynkApplication[]
       /**	Availability Status : Select	*/
       availability_status?: "" | "Available" | "Away" | "Do not disturb" | "Invisible"
       /**	Custom Status : Data	*/
       custom_status?: string
}