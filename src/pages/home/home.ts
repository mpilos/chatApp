import { RoomsPage } from './../rooms/rooms';
import  firebase  from 'firebase/app';


import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams, Item} from 'ionic-angular';

@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
 userProfile:any;
 firstName:any;
 chatRef:firebase.database.ThenableReference
@ViewChild(Content) Content:Content;
data={
 type:'',
 message:''
}
roomKey:string;
offStatus:boolean=false;
firebaseRef :firebase.database.Reference
chats=[];

 constructor(public navCtrl: NavController,
   private navParams:NavParams ,private proProvider:ProfileProvider,
   private authProvider:AuthProvider) {
this.roomKey=this.navParams.get('key') as string;
this.userProfile=this.navParams.get('userProfile')
this.data.type='message';
this.chatRef=firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push()
console.log(this.userProfile);
let joinData ={
 type:'join',
 user:this.userProfile.firstName,
 message:this.userProfile.firstName + 'HAS JOIN THIS ROOM',
 sendDate:Date()
}
this.chatRef.set(joinData);
this.data.message ='';

firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).on('value',resp=>{
 this.chats = [];
 this.chats=snapShotToArray(resp);
 setTimeout(()=>{
   if (this.offStatus===false){
     this.Content.scrollToBottom(300);
   }
 },1000)

 })

}

sendMessage(){
  firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push()
  .set({
    type:this.data.type,
    user:this.userProfile.firstName,
    message:this.data.message,
    sendData: Date()
  });
}

exitChat(){
  let exitData= firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push()
  exitData.set({
   type:'exit',
   user:this.userProfile.firstName,
   message:this.userProfile.firstName + 'HAS exited THIS ROOM',
   sendData: Date()
  })
  this.offStatus=true
  this.navCtrl.push(RoomsPage)
}
logout(){
 this.authProvider.signOut().then(()=>{
   this.navCtrl.setRoot('LoginPage');
 })
}
goToRooms()
{
 this.navCtrl.push(RoomsPage)
}
goToProfile()
{
 this.navCtrl.push('ProfilePage')
}

ionViewDidLoad(){
 this.proProvider.getUserProfile().on('value',userProfileSnapShot =>{
   this.userProfile=userProfileSnapShot.val();
     this.userProfile.firstName=userProfileSnapShot.val().firstName;
     this.userProfile.email=userProfileSnapShot.val().email;
 })

}



}
export const snapShotToArray = snapShot => {

 let returnArr = [];
 snapShot.forEach(childSnapshot => {
   let item = childSnapshot.val();
   returnArr.push(item);
 });
 console.log("array",returnArr);
return returnArr;
}

