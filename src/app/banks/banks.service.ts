import { Injectable } from '@angular/core';
import { BankModel } from './bank.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';

import { map , catchError, tap} from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  getBanks() {

    let searchParams = new HttpParams();
    searchParams = searchParams.append('lang', 'ar');
    searchParams = searchParams.append('custome', 'key');

    return this.http
      .get<BankModel[]>('http://localhost:3000/banks',
      {
        headers: new HttpHeaders({'Custome2-Header': 'Hello'}),
        // params: new HttpParams().set('lang', 'ar')
        params: searchParams,
        // observe: 'body' ---default
        // observe: 'response'
      })
      .pipe(map(responseData => {
        //Do some operations
        // return responseData.body; in case of observe wase response
        return responseData;

      }),
      //in case you have generic error handling task
      catchError(errorRes => {
        //Send to analytic server
        console.log(errorRes);
        return throwError(errorRes)
      }));
  }

  addNewBank(newBank: BankModel) {
    this.http
      .post<BankModel>('http://localhost:3000/banks', newBank)
      .subscribe(response => {
        console.log(response);
      }, error => {
        this.error.next(error.message);
      })
  }

  deleteBank(bankId: string) {
    return this.http.delete('http://localhost:3000/banks/' + bankId, {
      observe: 'events',
      responseType: 'json'
    }).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Sent){
        //....
      }
      if(event.type === HttpEventType.Response ){
        console.log(event.body);
      }
    }));
  }

}
