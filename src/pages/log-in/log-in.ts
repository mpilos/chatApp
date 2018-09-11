import { ResetPage } from './../reset/reset';
import { RoomsPage } from './../rooms/rooms';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert,AlertController,Loading,LoadingController,IonicPage, NavController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';


/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  private load:Loading;
  email:string;
  password:string;
  
    constructor(public navCtrl: NavController, private loadingCTR: LoadingController,
    private alertCTR: AlertController, private authPROV: AuthProvider) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }
  
  goToSignUp():void{
    this.navCtrl.push('SignUpPage');
  }
  
  signIN(){
    if(!this.email && !this.password){
      console.log('error');
    }else{
      this.authPROV.signIn(this.email,this.password)
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
    passwordreset(){
      this.navCtrl.push(ResetPage);
    }
}