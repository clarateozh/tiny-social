import { EventEmitter, inject, Injectable } from '@angular/core';
import { Post } from '../Models/post.model';
import { addDoc, collection, Firestore, getDocs, orderBy, query, Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  firestore: Firestore = inject(Firestore);
  
  async getAllPosts(){
    return <Post[]>(
      await getDocs(query(collection(this.firestore, 'posts'), orderBy('timestamp', 'desc')))
    ).docs.map((posts) => posts.data());
  }

  EventPostsChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  

  async createPost(username: string, avatar: string, textcontent: string){
      const docRef = await addDoc(collection(this.firestore, 'posts'), {
        username: username,
        avatar: avatar,
        timestamp: Date(),
        textcontent: textcontent
      });
      this.EventPostsChanged.emit(true);     // Emitting Event on Posts Update

  }

   

}
