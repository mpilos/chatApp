import { RoomsPage } from './../pages/rooms/rooms';
import { LogInPage } from './../pages/log-in/log-in';

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC-L2PVDecoS6MGitfQfyuZ9d9bG0J984c",
  authDomain: "my-next-firebase-project.firebaseapp.com",
  databaseURL: "https://my-next-firebase-project.firebaseio.com",
  projectId: "my-next-firebase-project",
  storageBucket: "my-next-firebase-project.appspot.com",
  messagingSenderId: "598911584226"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any=LogInPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    const unsubcribe=firebase.auth().onAuthStateChanged(user=>{
if(!user){
  this.rootPage=LogInPage
}else{
  this.rootPage=RoomsPage
  unsubcribe();
}
  });
}
}
