import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,  LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//Providers
import {UsersProvider} from "../../providers/users/users"

//Plugins
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  userImage:any = null;

  private DataProfile: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              public usersProvider: UsersProvider,
              private imagePicker: ImagePicker,
              private alertCtrl: AlertController) {

          this.DataProfile = this.formBuilder.group({
            email: [usersProvider.userDetails.fk_user.email, Validators.required],
            firstName: [usersProvider.userDetails.fk_user.first_name, Validators.required],
            lastName: [usersProvider.userDetails.fk_user.last_name, Validators.required],
            userName: [usersProvider.userDetails.fk_user.username, Validators.required],
            number: [usersProvider.userDetails.telefono, Validators.required],
            
        });
      }

    openGallery() {
      const options = {
        maximumImagesCount: 1, 
        width: 150, 
        height: 150, 
        quality: 70, 
        outputType: 1
      }
      this.imagePicker.getPictures(options) //base64 output
        .then((results) => {
          const imageTemp = results[0];
          this.userImage = 'data:image/jpeg;base64,'+results[0];
          let loader = this.loadingCtrl.create({
            content: "Updating user ...",
          });
          loader.present();
          this.usersProvider.ProfileImage(imageTemp)
          .then(response => {
            loader.dismiss();
            this.presentAlert('success');
          }).catch(err => {
            loader.dismiss()
            this.presentAlert('error');
          })
        /* 
        return 'data:image/jpeg;base64,'+results[0];  */
    }).catch(err => console.error(err));
    
    }

    /*******************************************
     FUNCION PARA LLAMAR SERVICIO Actulizar Datos
    ********************************************/
   Profile() {

      let loader = this.loadingCtrl.create({
        content: "Updating user ...",
      });
      
      loader.present();

      this.usersProvider.Profile(this.DataProfile.value).then(()=>{
        loader.dismiss();
        this.presentAlert('Usuario Actualizado');
        //this.nav.setRoot(LoginPage);
      }).catch(error=>{
        loader.dismiss();
        this.presentToast("failed to update user");
      });
      
}
 

      ionViewDidLoad() {
        console.log('ioDidLoad ProfilePage');
      }

      goBack() {
        this.navCtrl.pop()
      }

      presentToast(text) {
        let toast = this.toastCtrl.create({
          message: text,
          duration: 3000,
          position: 'bottom'
        }).present();
      }

      presentAlert(text) {
        let alert = this.alertCtrl.create({
          title: text,
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }
