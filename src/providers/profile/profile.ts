import 'firebase/database';
import firebase,{User} from 'firebase/app';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  userProfile:firebase.database.Reference;
  currentUser:User;

  constructor() {

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
        this.userProfile=firebase.database().ref(`/userProfile/${user.uid}`)
      }
    })
  }
  getUserProfile():firebase.database.Reference{
    return this.userProfile;
  }
  updateName(firstName:string,lastName:string):Promise<any>{
     return this.userProfile.update({firstName,lastName})
  }
  updateDOB(birthdate:string):Promise<any>{
    return this.userProfile.update({birthdate})
  }
  updatePassword(newPasword:string,oldPassword):Promise<any>{

    const credentials:firebase.auth.AuthCredential=firebase.auth.EmailAuthProvider.credential(this.currentUser.email,oldPassword);
    return this.currentUser.reauthenticateWithCredential(credentials).then(user=>{
      this.currentUser.updatePassword(newPasword).then(user=>{
        console.log('password has been changed')
      }).catch(error=>{
        console.log(error)
      })
    })
  }
}