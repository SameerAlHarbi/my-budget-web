import { Component, OnInit } from '@angular/core';
import { BankModel } from '../bank.model';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.css']
})
export class BanksListComponent implements OnInit {

  banksListItems: BankModel[] = [];
  isFetching = false;

  constructor(private banksService: BanksService) { }

  ngOnInit(): void {
    this.isFetching = true;
    console.log(this.isFetching);
    this.banksService.getBanks()
      .subscribe(banks => {
        this.isFetching = false;
        this.banksListItems = banks;
      });
  }

}
