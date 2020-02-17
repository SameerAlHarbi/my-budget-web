import { Injectable } from '@angular/core';
import { BankModel } from './bank.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor(private http: HttpClient) { }

  getBanks() {
    return this.http
      .get<BankModel[]>('http://localhost:3000/banks')
      .pipe(map(responseData => {
        //Do some operations
        return responseData;
      }));
  }

}
