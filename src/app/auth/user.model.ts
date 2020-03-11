export class UserModel {

  constructor(public userName: string
      , public email: string
      , public isAdmin: boolean
      , private _token: string
      , private _tokenExpirationDate: Date) { }

     get token() {
       if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
       }
       return this._token;
     }
}

export interface AuthResponseData {
  user: UserModel;
  token: string;
}
