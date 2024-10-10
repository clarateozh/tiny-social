import { EventEmitter, inject, Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userSvc: UserService = inject(UserService);
  isLoggedIn: boolean = false;
  currentUser: User;
  route: Router = inject(Router);

  EventLoginChanged: EventEmitter<User> = new EventEmitter<User>();
  

  getCurrentUser(){
    if (this.currentUser == null && sessionStorage.getItem('username') != null) {
      console.log('retrieve from sessionStorage');
      this.currentUser = new User(sessionStorage.getItem('username'), null, sessionStorage.getItem('avatar'));
    }
    return this.currentUser;
  }

  async login(username: string, password: string){
    let allUsers = [];
    allUsers = await this.userSvc.getAllUsers();
    
    this.currentUser = allUsers
      .find((user)=> user.username === username 
      && user.password === password );
    if(this.currentUser == null || this.currentUser == undefined){
      return false;
    } 
    else {
      this.EventLoginChanged.emit(this.currentUser);
      this.route.navigate(['/Home']);
      this.isLoggedIn = true;
      sessionStorage.setItem('username', this.currentUser.username);
      sessionStorage.setItem('avatar', this.currentUser.avatar);
      return true;
    } 
    
  }

  logout(){
    this.currentUser = null;
    this.EventLoginChanged.emit(null);
    this.isLoggedIn = false;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('avatar');
    this.route.navigate(['/Login']);
  }

  isAuthenticated(){
    if (sessionStorage.getItem('username') != null){
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }
  
}
