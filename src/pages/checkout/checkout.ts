import { Component } from "@angular/core";
import { NavController, NavParams, ViewController, ToastController } from "ionic-angular";
import { UsersProvider, OrdersProvider, MenurestaurantProvider } from "../../providers/index.service";
import { OrderConfirmationPage } from "../index.pages";

@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  DataQR:any;
  checkInfo: any[] = [];
  subTotal: any;
  valueDiscount: any;
  discountTotal: any;
  currentDate: any;
  valueIvaTax: any;
  ivaTaxTotal: any;
  total: any;
  reduction: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ordersP: OrdersProvider,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private usersP: UsersProvider,
    private menuP: MenurestaurantProvider
  ) {
    this.subTotal = 0;
    this.valueDiscount = 0.1; // 10%
    this.valueIvaTax = 0; // 0%
    this.ivaTaxTotal = 0;
    this.discountTotal = 0;
    this.discountTotal = 0;
    this.reduction = false;
    this.currentDate = new Date();
    this.DataQR = this.menuP.dataQR;

    /*********************************************
     * CARGAR OBJETOS DEL PEDIDOS ALMACENADOS EN EL PROVIDER
     ********************************************/

    Object.keys(this.ordersP.cart).map(key => {
      if (this.ordersP.cart[key]) {
        this.subTotal +=
          this.ordersP.cart[key].price * this.ordersP.cart[key].quantity;
        this.checkInfo.push(this.ordersP.cart[key]);
      }
    });

    this.discountTotal = this.subTotal * this.valueDiscount;
    this.ivaTaxTotal = this.subTotal * this.valueIvaTax;
    this.total = this.subTotal - this.discountTotal + this.ivaTaxTotal;

    /*********************************************
     *                    FIN
     ********************************************/
  }

  /*********************************************
   * CANCELAR ORDEN Y VOLVER AL MENU
   ********************************************/
  cancelOrder() {
    this.ordersP.cart = {};
    this.viewCtrl.dismiss();
  }

  /*********************************************
   *                    FIN
   ********************************************/

  /************************************************************
   *                  ABRIR RECIBO DE PAGO
   ***********************************************************/

  ConfirmOrder() {
    console.log(this.ordersP.cart)
    this.ordersP
      .Confirm(this.usersP.token)
      .then(data => {
        this.viewCtrl.dismiss();
        this.presentToast("Se ha creado una orden");
        this.navCtrl.push(OrderConfirmationPage, { DataQr: this.DataQR });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /************************************************************
   *                          FIN
   ***********************************************************/


  presentToast(data:any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 1500,
      position: 'bottom'
    });
  
    toast.present();
  }

}
