import { Notification } from "./notification";
import { Role } from "./role";
import { IntervalleAge } from './intervalleAge';

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
	phone?:any;
	city?:any;
	country?:any;
	address?:any;
	code?:any;
    roles?:Role[];
    role?:Role;
    notifications?: Notification[];
    token?: any;
    gender?: any;
    codeExpiryDate?: any;
    isBanned?: any;
    bannedAt?: any;
    civilite?: any;
    derniereConnection?: any;
    addressIp?: any;
    isDisponible?: any;
    intervalle?: IntervalleAge;
    profession?: IntervalleAge;
}
