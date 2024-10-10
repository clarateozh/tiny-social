import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from '../create-post/create-post.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginService } from '../Services/login.service';

// DEFINE GUARDS
const CanActivate = () => {
  const loginSvc: LoginService = inject(LoginService);
  const route: Router = inject(Router);

  if(loginSvc.isAuthenticated()){
    return true;
  }
  else {
    route.navigate(['/Login']);
    return false;
  }
}

const NotLoggedIn = () => {
  const loginSvc: LoginService = inject(LoginService);
  const route: Router = inject(Router);

  if(loginSvc.isAuthenticated()){
    route.navigate(['/Home']);
    return false;
  }
  else {
    return true;
  }
}

// DEFINE ROUTES
const routes: Routes = [
  {path: '', component: CreatePostComponent, canActivate:[CanActivate]},
  {path: 'Home', component: CreatePostComponent, canActivate:[CanActivate]},
  {path: 'Login', component: LoginFormComponent, canActivate: [NotLoggedIn]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})


export class RoutingModule { 
}
