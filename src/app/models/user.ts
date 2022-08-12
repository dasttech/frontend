
export class User {
    constructor(
        public id:string,
        public wallet_addr:string,
        public fullname:string,
        public avatar:string,
        public email:string,
        public phone:string,
        public country:string,
        public street_address:string,
        public next_of_kin:string,
        public next_of_kin_phone:string,
        public next_of_kin_email:string, 
        public others:string,
        public account_token:string
    ){
    }

   
}
