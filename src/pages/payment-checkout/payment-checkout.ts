import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { QrScannerPage } from '../index.pages';

/**
 * Generated class for the PaymentCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment-checkout',
  templateUrl: 'payment-checkout.html',
})
export class PaymentCheckoutPage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
 
    
  }


  GoMenu() {
    this.navCtrl.setRoot(QrScannerPage);
  }

}
