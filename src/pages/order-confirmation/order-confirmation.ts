import { Component } from '@angular/core';
import { NavController, NavParams, Platform,  ActionSheetController, AlertController, ToastController   } from 'ionic-angular';
import { OptionRestaurantPage, PaymentOptionsPage } from '../../pages/index.pages';
import { MenurestaurantProvider, OrdersProvider } from "../../providers/index.service";
import { NullTemplateVisitor } from '@angular/compiler';


@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  DataQr: any;
  confirmOrder = < any > [];
  loading: number = 0;
  interval: any;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private Menu: MenurestaurantProvider,
    private Order: OrdersProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController)

  {
    this.DataQr = navParams.get("DataQr");
    this.confirmOrder = [];
    this.loading = 1;
  }

  ionViewDidEnter() {
    this.loading = 1;
    this.interval = setInterval(() => {
      this.getOrders();
    }, 5000)
  }

  getOrders() {
    let getOrders = [];
    this.Menu.ConfirmOrder(this.DataQr.sit_id)
    .then((data:any) => {
      getOrders = data;
      this.Menu.getDishesInfo(this.DataQr.sit_id)
      .then((dishes:any) => {
          this.confirmOrder = dishes.map(dish => {
           return getOrders.map(order => {
              if (dish['pk'] == order.fk_dish) {
                order.price = parseFloat(dish['price']) * order.quantity;
                order.dish_name = dish['name'];
              }
              return order;
            })
          });
          this.loading = 0;
        })
        .catch(err => {
          this.loading = 0;
          console.log(err)
        });
    }).catch(error => {
      this.loading = 0;
      console.log(error);
    });
  }

  ionViewWillLeave(){
    clearInterval(this.interval);
  }

  GoMenu() {
    this.nav.setRoot(OptionRestaurantPage,{DataQr:this.DataQr});
  }

  PayAllOrders(orders) {
    const orderIds = [];

    orders.forEach(element => {
      orderIds.push({pk: element.id})
    });
    
    console.log(orderIds)
    this.nav.push(PaymentOptionsPage, {orders : orderIds, sitId: this.DataQr.sit_id});
  }


  ConfirmOrder(order) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Que Desea Hacer?',
      buttons: [/* {
          text: 'Pedir Cuenta',
          icon: !this.platform.is('ios') ? 'checkmark-circle-outline' : null,
          handler: () => {
            this.nav.push(PaymentOptionsPage, {dishId : order.id, sitId: this.DataQr.sit_id});
          }
        }, */
        {
          text: 'Cancelar Pedido',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.CancelOrder(order.id)
          }
        },
        {
          text: 'Cerrar',
          role: 'Exit', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'arrow-round-back' : null,
          handler: () => {
            console.log('Exit clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  CancelOrder(order_id) {
    const confirm = this.alertCtrl.create({
      title: 'Cancelar Orden?',
      message: 'Por favor escriba un comentario diciendo porque cancelo la orden',
      inputs: [
        {
          name: 'extra_commentary',
          placeholder: 'Comentario'
        },
      ],
      buttons: [
        {
          text: 'Salir',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Cancelar Orden',
          handler: data => {
            this.Order.CancelOrder(order_id, data.extra_commentary)
              .then(data => {
                this.presentToast(data['detail']);
                this.presentToast("Orden Cancelada");
                /* this.GoMenu(); */
              })
              .catch(error => {
                this.presentToast(error.statusText);
              })
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(data:any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.present();
  }
}
