import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BanksComponent } from './banks.component';
import { BanksListComponent } from './banks-list/banks-list.component';
import { BanksListItemComponent } from './banks-list/banks-list-item/banks-list-item.component';
import { BanksRoutingModule } from './banks-routing.module';

@NgModule({
  declarations:[
    BanksComponent,
    BanksListComponent,
    BanksListItemComponent
  ],
  imports: [RouterModule,CommonModule,BanksRoutingModule]
})
export class BanksModule { }
