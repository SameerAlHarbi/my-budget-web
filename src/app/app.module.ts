import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RelationsComponent } from './relations/relations.component';
import { BanksComponent } from './banks/banks.component';
import { BanksListComponent } from './banks/banks-list/banks-list.component';
import { BanksListItemComponent } from './banks/banks-list/banks-list-item/banks-list-item.component';
import { AuthInterceptorService } from './banks/auth-interceptor.service';
import { LoggingInterceptorService } from './banks/logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BeneficiariesComponent,
    ErrorPageComponent,
    RelationsComponent,
    BanksComponent,
    BanksListComponent,
    BanksListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
