import { Component, inject } from '@angular/core';
import { PostsService } from '../Services/posts.service';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit{
  postsSvc: PostsService = inject(PostsService);
  loginSvc: LoginService = inject(LoginService);

  route: Router = inject(Router);
  newPost: FormGroup;

  ngOnInit(): void {
    this.newPost = new FormGroup({
      textcontent: new FormControl(null, [Validators.required, Validators.maxLength(800)])
    });

  }
 
  CreatePostClicked(){
    const currentUser = this.loginSvc.getCurrentUser();
    if (currentUser) {
      this.postsSvc.createPost(currentUser.username, currentUser.avatar, this.newPost.get('textcontent').value);
      this.newPost.get('textcontent').markAsUntouched();
      this.newPost.get('textcontent').markAsPristine();
      this.newPost.reset();
    }
  }


}
