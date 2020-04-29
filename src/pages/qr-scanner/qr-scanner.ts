import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { OptionRestaurantPage } from "../index.pages";
import { OrdersProvider, UsersProvider } from "../../providers/index.service";
import { AlertController } from 'ionic-angular';
@Component({
  selector: "page-qr-scanner",
  templateUrl: "qr-scanner.html"
})
export class QrScannerPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private ordersP: OrdersProvider,
    private usersP: UsersProvider,
    private alertCtrl: AlertController
  ) {}

  ionViewDidEnter() {
    this.usersP.getUserDetails()
    .then(response => {
      console.log(response);
    })
    .catch(err => console.error(err))
  }

  presentAlert(data) {
    let alert = this.alertCtrl.create({
      title: data,
      subTitle: 'qr-text',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  scan() {
    //this.http.save_history(this.dataCodeQr);
    /*let test ='{"zmyq":"Ymdoae Mxhmdql","qymux":"ymdoaepmhupmxhmdql@symux.oay","btazq":"1782162380","z_fuowqf":"8","pmfq":"06\/09\/76","mbb":"OUR Adxmzpa","otgdot":"OUR Adxmzpa","qhqzf":"ftue ue m fqef","up_dqrqdqzoq":"ot_7RQo4lXcXwoz2vf8Ovxz5ITw","efmfge":"egooqqpqp","xmef1":"1818","ndmzp":"Huem","razpae":"odqpuf","yqzemvq pqx Euefqym":"Bmkyqzf oaybxqfq.","yagzf":"78000","pqeodubfuaz":"Oaybdm pq 8 qzfdmpme bmdm qx qhqzfa: ftue ue m fqef","gdx":"tffbe:\/\/bmk.efdubq.oay\/dqoqubfe\/moof_7R6rUdXcXwoz2vf8\/ot_7RQo4lXcXwoz2vf8Ovxz5ITw\/dobf_Rw3WSxidUhwPHtojlAgvyXzxqajGRSp","up_mffqzpqp":"7234274246","zmyqFuow":"Ymdoae Mxhmdql","qymuxFuow":"ymdoaepmhupmxhmdql@symux.oay","btazqFuow":"1782162380"}';
    this.dataCodeQr = this.desencrypte(test);
    //console.log(this.dataCodeQr);
    this.dataCodeQr.status = (this.dataCodeQr.status == "succeeded") ? "Exitoso" : "Ocurrió un error en la operación";
    this.http.save_attended(this.dataCodeQr.id_attended, this.dataCodeQr.id_reference).then((data)=>{
      this.http.attended_to_event(this.dataCodeQr.id_reference).then((data)=>{
        this.users_event = data;
      });
    });*/

    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        if (barcodeData.text != null) {
          //console.log(JSON.stringify(barcodeData.text))
          let DataQr = { sit_id: parseInt(JSON.parse(barcodeData.text).sit_id) };
          this.ordersP.sit = DataQr.sit_id;
          if(this.ordersP.sit){
            this.navCtrl.push(OptionRestaurantPage, { DataQr });
          }
        }
      })
      .catch(err => {
        let DataQr = { sit_id: 4 };
        this.ordersP.sit = DataQr.sit_id;
        this.navCtrl.push(OptionRestaurantPage, { DataQr: DataQr });
        //this.navCtrl.setRoot(QrScannerPage);
      });
  }
}
