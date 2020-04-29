import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//pages
import { MyApp } from './app.component';
import { HomePage, LoginPage, RegisterPage, QrScannerPage, GeneralMenuPage, OptionRestaurantPage, MenuPage, ProfilePage, CreateOrdersPage, CategoriesPage, CheckoutPage,  MenuRestaurantPage,  OrderConfirmationPage, PaymentOptionsPage, PaymentCheckoutPage } from '../pages/index.pages';

//pugins
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { UsersProvider } from '../providers/users/users';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MenurestaurantProvider } from '../providers/menurestaurant/menurestaurant';
import { OrdersProvider } from '../providers/orders/orders';
import { GooglePlus } from '@ionic-native/google-plus';/* 
import { Facebook } from '@ionic-native/facebook'; */
import { LanguageProvider } from '../providers/language/language';
import { Deeplinks } from '@ionic-native/deeplinks';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ImagePicker } from '@ionic-native/image-picker';

//pipes
import { TranslationPipe } from '../pipes/index.pipes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    QrScannerPage,
    GeneralMenuPage,
    OptionRestaurantPage,
    MenuPage,
    ProfilePage,
    CreateOrdersPage,
    CategoriesPage,
    CheckoutPage,
    MenuRestaurantPage,
    OrderConfirmationPage,
    PaymentOptionsPage,
    PaymentCheckoutPage,
    TranslationPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    QrScannerPage,
    GeneralMenuPage,
    OptionRestaurantPage,
    MenuPage,
    ProfilePage,
    CreateOrdersPage,
    CategoriesPage,
    CheckoutPage,
    MenuRestaurantPage,
    PaymentOptionsPage,
    PaymentCheckoutPage,
    OrderConfirmationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    BarcodeScanner,
    MenurestaurantProvider,
    OrdersProvider,
    GooglePlus,/* 
    Facebook, */
    LanguageProvider,
    TranslationPipe,
    Deeplinks,
    InAppBrowser,
    ImagePicker
  ]
})
export class AppModule {}
