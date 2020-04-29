import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { OrdersProvider, MenurestaurantProvider } from '../../providers/index.service';
import { PaymentCheckoutPage } from '../index.pages';

@Component({
  selector: 'page-payment-options',
  templateUrl: 'payment-options.html',
})
export class PaymentOptionsPage {

  orders:any;
  sitId:any;
  loader:any = null;


  constructor(public navCtrl: NavController, public navParams: NavParams, private ordersProv: OrdersProvider, private toastCtrl: ToastController,public viewCtrl: ViewController, private Menu: MenurestaurantProvider, public loadingCtrl: LoadingController,) {
    this.orders = this.navParams.get('orders');
    this.sitId = this.navParams.get('sitId');
  }

  goToCheckout() {

      let loader = this.loadingCtrl.create({
        content: "requesting the waiter",
      });
  
      loader.present();
  
      this.Menu.CallWaiter(this.sitId).then(()=>{
        loader.dismiss();
        this.navCtrl.push(PaymentCheckoutPage);
      }).catch(error=>{
        loader.dismiss();
        this.presentToast("Este Restaurante no posee Mozos");    
      });
    
  }
  

  MercadoPago() {
    this.loader = true;
    this.ordersProv.MercadoPagoPayment(this.orders)
      .then(data => {
        this.loader = false;
        this.navCtrl.push(PaymentCheckoutPage);
      })
      .catch(error => {
        this.loader = false;
        this.presentToast(error.detail);
      })
  }

  presentToast(text) {
    this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      position: 'bottom',
    }).present();
  }

}
