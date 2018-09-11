import { RoomsPage } from './../rooms/rooms';
import { Component } from '@angular/core';
import {Alert,AlertController,Loading,LoadingController,
 IonicPage, NavController, } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()
@Component({
 selector: 'page-sign-up',
 templateUrl: 'sign-up.html',
})
export class SignUpPage {
  private load:Loading;
  email:string;
  password:string;

  constructor(public navCtrl: NavController, private loadingCTR: LoadingController,
    private alertCTR: AlertController, private authPROV: AuthProvider) {
  }
  
  signUp(){
    if(!this.email && !this.password){
      console.log('error');
    }else{
      this.authPROV.signUp(this.email,this.password)
      .then(authPROV =>{
        this.load.dismiss().then(()=>{
          this.navCtrl.setRoot(RoomsPage);
        })
      },error=>{
        this.load.dismiss().then(()=>{
          const alert :Alert = this.alertCTR.create({
            message:error.message,
            buttons:[{text:'ok',role:'cancel'}]
          })
          alert.present();
        })
      })
      this.load = this.loadingCTR.create();
      this.load.present();
    }
    
  }
}
