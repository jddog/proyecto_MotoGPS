import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { GoogleMap, GoogleMaps, LatLng, CameraPosition, GoogleMapsEvent, MarkerOptions, Marker } from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any[]>;
  coordenadas: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth, private googleMaps: GoogleMaps) {
    
      this.user = afAuth.authState;
    
  }


  loadMap() {
    let element = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});

    //this.coordenadas = this.afDB.list('/Coordenadas');

    
    let latlng = new LatLng(40.7128, -74.0059);

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: CameraPosition<{}> = {
      target: latlng,
      zoom: 10,
      tilt: 30
      }
      map.moveCamera(position);

      let markeroptions: MarkerOptions = {
        position: latlng,
        title: 'Mi moto'
      };
  
      let marker = map.addMarker(markeroptions).then((marker: Marker) => {
        marker.showInfoWindow();
      })

    })
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

