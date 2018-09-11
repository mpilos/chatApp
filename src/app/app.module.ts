import { ProfilePage } from './../pages/profile/profile';
import { ResetPage } from './../pages/reset/reset';


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { ChatRoomsProvider } from '../providers/chatrooms/chatrooms';
import { ProfileProvider } from '../providers/profile/profile';

import { LogInPage } from '../pages/log-in/log-in';
import { RoomsPage } from '../pages/rooms/rooms';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LogInPage,
    RoomsPage,
    ResetPage,
    ProfilePage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LogInPage,
    RoomsPage,
    ResetPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatRoomsProvider,
    ProfileProvider,
   
  

  ]
})
export class AppModule {}
