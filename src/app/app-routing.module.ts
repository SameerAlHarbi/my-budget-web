import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RelationsComponent } from './relations/relations.component';


const routes: Routes = [
  {path:'', component: HomeComponent, pathMatch: 'full'},
  {path:'beneficiaries', component: BeneficiariesComponent},
  {path:'relations', component: RelationsComponent},
  {path:'about', component: HomeComponent},
  {path: 'not-found', component: ErrorPageComponent
    , data: { errorType: 'not found', errorCode: 404, errorMessage: 'Page not found!'}},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
