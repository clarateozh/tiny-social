import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../Services/posts.service';
import { Post } from '../Models/post.model';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrl: './display-posts.component.css'
})
export class DisplayPostsComponent implements OnInit{

  postsSvc: PostsService = inject(PostsService);
  allposts: Post[] = [];

  ngOnInit(): void {
    this.updatePosts();
    this.postsSvc.EventPostsChanged.subscribe(()=>{
      this.updatePosts();
    })
  }

  async updatePosts() {
    // Want to have the latest post appearing on top
    this.allposts = await this.postsSvc.getAllPosts();
  }
}
