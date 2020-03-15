import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';

import { AuthComponent } from './auth.component';

const routes: Routes = [
  {path:'auth', component: AuthComponent},
]

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [CommonModule
    , FormsModule
    , RouterModule.forChild(routes)],
  exports: [],
  providers: []
})
export class AuthModule {

}
