import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { QrScannerPage, MenuPage } from '../../pages/index.pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public menu: MenuController,) {
    this.menu.swipeEnable(true);
  }

  OpenMenu(){
    this.navCtrl.push(MenuPage)
  }

  OpenPage(){
    this.navCtrl.push(QrScannerPage);
  }

}
