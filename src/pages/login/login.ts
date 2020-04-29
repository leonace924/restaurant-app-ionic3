import { Component, ChangeDetectorRef } from "@angular/core";
import {
  NavController,
  AlertController,
  ToastController,
  MenuController,
  LoadingController
} from "ionic-angular";
import { HomePage, RegisterPage, QrScannerPage } from "../index.pages";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

//Providers
import { UsersProvider, LanguageProvider } from "../../providers/index.service";

//Pluing
import { GooglePlus } from "@ionic-native/google-plus";/* 
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook"; */

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  private DataLogin: FormGroup;
  language: any;
  selectOption: any;
  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public usersProvider: UsersProvider,
    private googlePlus: GooglePlus,/* 
    private fb: Facebook, */
    public languageP: LanguageProvider,
    private cd: ChangeDetectorRef
  ) {
    this.menu.swipeEnable(false);

    this.DataLogin = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.language = this.languageP.language;
    this.selectOption = this.language;
  }

  ionViewDidEnter() {
    this.checkUser();
  }


  checkUser() {
    let loader = this.loadingCtrl.create({
      content: "Checking user..."
    });

    loader.present();

    this.usersProvider.checkForUser()
      .then(data => {
        loader.dismiss();
        if(data[0] !== null) {
          this.nav.setRoot(QrScannerPage);
        }else {
          return false;
        }
      })
      .catch(err => {
        loader.dismiss();
        this.presentToast(err.detail);
      });
  }

  /***********************************
   * FUNCION PARA CAMBIAR EL IDIOMA
   ************************************/

  changeLanguage(event) {
    this.languageP.switchLanguage(event).then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

  /*************************************
   *    FUNCION PARA REGISTRAR
   ************************************/
  register() {
    // this should be changed
    this.nav.setRoot(HomePage);
    //this.nav.setRoot(RegisterPage);
  }

  /*************************************
   *    FUNCION PARA LLAMAR SERVICIO LOGUIN
   ************************************/
  login() {
    let loader = this.loadingCtrl.create({
      content: "Checking user..."
    });

    loader.present();

    this.usersProvider
      .login(this.DataLogin.value)
      .then(() => {
        loader.dismiss();
        this.nav.setRoot(QrScannerPage);
      })
      .catch(error => {
        loader.dismiss();
        this.presentToast("Invalid username or password");
      });
  }

  /*************************************
   *    FUNCION PARA RECUPERAR PASS
   ************************************/
  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: "Forgot Password?",
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: "email",
          placeholder: "Email",
          type: "email"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Send",
          handler: data => {
            this.usersProvider
              .RecoverPass(data.email)
              .then(() => {
                this.presentToast(
                  "your password was sent successfully ah your email"
                );
              })
              .catch(err => {
                this.presentToast("Please Verify Your Email");
              });
          }
        }
      ]
    });
    forgot.present();
  }

  presentToast(text) {
    let toast = this.toastCtrl
      .create({
        message: text,
        duration: 3000,
        position: "bottom"
      })
      .present();
  }

  /*************************************
   *    FUNCION PARA GOOGLE PLUS
   ************************************/
  LoginGoogle() {
    /**.login({
              'webClientId':'XXXXXX.apps.googleusercontent.com',
              'offline': true
              }) */
    this.googlePlus
      .login({})
      .then(res => {
        console.log("11111");
        console.log(JSON.stringify(res));
        console.log("222222");
      })
      .catch(err => {
        console.error("33333");
        console.error(err);
        console.error("44444");
      });
  }

  /*************************************
   *    FUNCION PARA FACEBOOK
   ************************************/

  /* LoginFacebook() {
    this.fb
      .login(["public_profile", "user_friends", "email"])
      .then((res: FacebookLoginResponse) =>
        console.log("Logged into Facebook!", res)
      )
      .catch(e => console.log("Error logging into Facebook", e));
  } */
}
