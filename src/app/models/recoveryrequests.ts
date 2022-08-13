export class Recoveryrequests {
        

        constructor(
        public requester_name?:string,
        public requester_country?:string,
        public requester_phone?:string,
        public requester_email?:string,
        public relationship?:string,
        public reason?:string,
        public account_token?:string,
        public account_address?:string,
        public num_of_contacts?:number,
        public request_date:number = new Date().getTime()
        ){

        }
}
