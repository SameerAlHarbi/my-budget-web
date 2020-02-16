import { Injectable } from '@angular/core';
import { BankModel } from './bank.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  banksList: BankModel[] = [
    new BankModel('NCB', 'Test3'),
    new BankModel('Baj', 'Test4'),
  ]

  constructor(private http: HttpClient) { }

  getBanks() {
    this.http.get('http://localhost:3000/banks').subscribe((res) => {
      console.log(res);
        return res;
    });
  }
}
