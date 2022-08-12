export class Recoveryrequests {
        requester_name?:string;
        requester_country?:string;
        requester_phone?:string;
        requester_email?:string;
        relationship?:string;
        reason?:string;
        account_token?:string;
        account_address?:string;
        num_of_contacts?:number;
        request_date:number = new Date().getTime();
}
