import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProver:AuthProvider, private alertCTR: AlertController) {
  }
  resetPassword(){
     if(!this.email){
        console.log('enter email');
     } 
     this.authProver.passwordreset(this.email).then(user=>{
     const alert:Alert=this.alertCTR.create({
      message:'check your email for the reset password link',
      buttons:[{
        text:'Ok',
        role:'cancel',
        handler:()=>{
          this.navCtrl.pop();
        }
      }]
    })
    alert.present();
     },error=>{
      const errorAlert:Alert=this.alertCTR.create({
        message:error.message,
        buttons:[{
          text:'Ok',
          role:'cancel'
        }]
      })
      errorAlert.present();
     })
     
    }
  }