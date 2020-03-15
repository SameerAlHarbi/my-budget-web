import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './banks.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {path: 'banks', component: BanksComponent,canActivate: [AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule {
}
