import { Component } from '@angular/core';
import { Platform, MenuController, LoadingController, ToastController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//pages
import { HomePage, LoginPage, RegisterPage, QrScannerPage, ProfilePage } from '../pages/index.pages';

//Providers
import {UsersProvider} from "../providers/users/users"

//Plugins
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginPage;
  qrScannerPage = QrScannerPage;
  profilePage = ProfilePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              public usersProvider: UsersProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public app: App,
              private deeplinks: Deeplinks) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }

  OpenPage(page:any){
    this.app.getRootNav().push(page);
    this.menuCtrl.close();
  }

  logout(){
    let loader = this.loadingCtrl.create({
      content: "Ending session...",
    });
    
    loader.present();

    this.usersProvider.logout().then(()=>{
      loader.dismiss();
      this.app.getRootNav().setRoot(LoginPage);
    }).catch(error=>{
      loader.dismiss();
      this.presentToast("An error occurred while logging out");
    });
  }

  presentToast(text) {
    this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

}

