import { Component, OnInit, OnDestroy } from '@angular/core';
import { BankModel } from '../bank.model';
import { BanksService } from '../banks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.css']
})
export class BanksListComponent implements OnInit, OnDestroy {

  banksListItems: BankModel[] = [];
  isFetching = false;
  error = null;
  errorSub: Subscription;

  constructor(private banksService: BanksService) { }

  ngOnInit(): void {
  this.errorSub = this.banksService.error.subscribe(errorMessage => {
    this.error = errorMessage;
  });

    this.isFetching = true;

    this.banksService.getBanks()
      .subscribe(banks => {
        this.isFetching = false;
        this.banksListItems = banks;
      }, error => {
        this.isFetching = false;
        this.error = error.message;
      });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
