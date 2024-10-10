import { inject, Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  firestore: Firestore = inject(Firestore);


  async getAllUsers() {
    return (
      await getDocs(query(collection(this.firestore, 'users')))
    ).docs.map((users) => users.data());
    
  }


}
