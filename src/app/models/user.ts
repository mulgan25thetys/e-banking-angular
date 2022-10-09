import { Notification } from "./notification";
import { Role } from "./role";

export class User {
    id?:any;
    username?:any;
    firstname?:any;
    lastname?:any;
    email?:any;
    password?:any;
    confirmpassword?:any;
    profile?:any;
    profileUrl?:any;
	dateCreation?:any;
	dateModification?:any;
	status?:any;
	contact?:any;
	region?:any;
	code?:any;
    roles?:Role[];
    role?:Role;
    notifications?: Notification[];
    token?: any;
    codeExpiryDate?: any;
    isBanned?: any;
    bannedAt?: any;
}
