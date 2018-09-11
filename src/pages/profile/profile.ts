import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
 selector: 'page-profile',
 templateUrl: 'profile.html',
})
export class ProfilePage {
  
  userProfile:any;
  birthDate:string;
  name:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private profileProvider:ProfileProvider,private alertCTR: AlertController) {
  }
  ionViewCanEnter(){
    this.profileProvider.getUserProfile().off;
  }
  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on('value',userprofileSnapShot=>{
      this.userProfile=userprofileSnapShot.val();
      this.birthDate=userprofileSnapShot.val().birthDate;
    })
  }
  updateDOB(birthDate){
     this.profileProvider.updateDOB(birthDate);
  }

  updateName(name){
    const alertName:Alert =this.alertCTR.create({
      inputs:[{
        name:'firstName',
        placeholder:'Enter  your first name'
      },{
        name:'lastName',
        placeholder:'Enter  your last name'
      }],
      buttons:[{
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'ok',
          handler:data=>{
            this.profileProvider.updateName(data.firstName,data.lastName);
          }
        }]
      })
    alertName.present();
  }
  updatePassword(){
    const alertPassword:Alert =this.alertCTR.create({
      message:'Change your password',
      inputs:[{
        name:'oldPassword',
        placeholder:'Enter  your old password'
      },{
        name:'newPassword',
        placeholder:'Enter  your new password'
      }],
      buttons:[{
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'ok',
          handler:data=>{
            this.profileProvider.updatePassword(data.newPassword,data.oldPassword).catch(error=>{
              console.log('Passord Error',error.message)
              const alertError:Alert =this.alertCTR.create({
                message:error.message
              })
              alertError.present();
            });
          }
        }]
      })
    alertPassword.present();
  } 
}

