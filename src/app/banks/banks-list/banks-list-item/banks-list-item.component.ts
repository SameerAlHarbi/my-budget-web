import { Component, OnInit, Input } from '@angular/core';
import { BankModel } from '../../bank.model';

@Component({
  selector: 'app-banks-list-item',
  templateUrl: './banks-list-item.component.html',
  styleUrls: ['./banks-list-item.component.css']
})
export class BanksListItemComponent implements OnInit {
  @Input() bankItem: BankModel;

  constructor() { }

  ngOnInit(): void {
  }

}
