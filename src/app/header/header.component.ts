import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  activeUser: User;
  loginSvc: LoginService = inject(LoginService);



  ngOnInit(): void {
    this.loginSvc.EventLoginChanged.subscribe((user)=>{
      this.activeUser = user;
    })

    // Upon manual refresh of page, the activeUser is lost but can be retrieved from sessionStorage
    if (sessionStorage.getItem('username') != null) {
      this.activeUser = new User(sessionStorage.getItem('username'), null, sessionStorage.getItem('avatar'))
    }
   
  }

  logout() {
    this.loginSvc.logout();
  }
}
