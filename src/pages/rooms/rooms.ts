import { LogInPage } from './../log-in/log-in';
import { ProfilePage } from './../profile/profile';
import { ChatRoomsProvider } from './../../providers/chatrooms/chatrooms';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {
  chatRoomList: Array<any>;
  userProfile: any;
  constructor(public navCtrl: NavController, private pro: ProfileProvider, private authPROV: AuthProvider, public navParams: NavParams, private chatRoom: ChatRoomsProvider, private alertCTR: AlertController) {
    // this.ionViewCanEnter();
    // this.ionViewDidLoad();
  }
  ionViewCanEnter() {
    this.chatRoom.getChatRoomList().off;
    this.pro.getUserProfile().off;
  }
  ionViewDidLoad() {

    this.chatRoom.getChatRoomList().on('value', chatRoomsListSnapChat => {
      this.chatRoomList = [];
      chatRoomsListSnapChat.forEach(snap => {
        this.chatRoomList.push({
          id: snap.key,
          name: snap.val().chatRoomName
        });
        return false;
      })
    })
    this.pro.getUserProfile().on('value', userSnap => {
      this.userProfile = userSnap.val()
   console.log("email",this.userProfile)
    })
  }

  createChatRooom() {
    let alert: Alert = this.alertCTR.create({
      message: 'Please enter a chat room',
      inputs: [{
        name: 'name',
        placeholder: 'Enter chat room name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'ok',
        handler: data => {
          this.chatRoom.createRoom(data.name).then(newChatRoom => {
          });
        }
      }
      ]
    })
    alert.present();
  }
  profile() {
    this.navCtrl.push(ProfilePage);
  }
  logout() {
    this.authPROV.signOut().then(() => {
      this.navCtrl.push(LogInPage);
    });

  }
  joinRoom(key) {
    console.log(this.userProfile);
    if(!this.userProfile.hasOwnProperty('firstName') || !this.userProfile.hasOwnProperty('lastName')) {
      let alert:Alert =this.alertCTR.create({
        subTitle:'Update your profile before entering chat room',
        buttons:[{
            text:'Cancel',
            role:'cancel'
          },
          {
            text:'ok',
            handler:data=>{
              this.navCtrl.push(ProfilePage);
            }
          }]
        })
      alert.present();
      } else {
 
      this.navCtrl.push(HomePage, { 'key': key, 'userProfile': this.userProfile});
    }
  }
}
