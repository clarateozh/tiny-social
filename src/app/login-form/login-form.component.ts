import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{

  loginSvc: LoginService = inject(LoginService);
  loginForm: FormGroup;
  attemptSuccess: boolean = true;

  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // Setting defaults here just for easy testing. TO BE REMOVED BEFORE DEPLOYMENT
      username: new FormControl('jonathan', Validators.required),
      password: new FormControl('12345', Validators.required)
    });
  
  }

  async LoginClicked() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.attemptSuccess = await this.loginSvc.login(username, password);
  }
}
