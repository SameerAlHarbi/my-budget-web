import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    console.log(form);
    if(!form.valid) {
      return;
    }
    const userName = form.value.userName;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode) {
      //...
    } else {
      this.authService.signup(userName,email,password).subscribe(
      resData => {
      this.isLoading = false;
      }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
      });
    }


    form.reset();
  }

}
