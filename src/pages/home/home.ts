import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {

      this.user = afAuth.authState;
    
  }

  pintar(){
      this.items = this.afDB.list('/productos');
      console.log(this.items);
  }


   login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(x=>{

        this.pintar();

    });
  }

   logout() {
    this.afAuth.auth.signOut();
  }

}
