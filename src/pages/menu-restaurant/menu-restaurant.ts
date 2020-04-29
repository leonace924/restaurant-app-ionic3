import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CategoriesPage } from "../index.pages";

import { MenurestaurantProvider } from "../../providers/index.service";

@Component({
  selector: "page-menu-restaurant",
  templateUrl: "menu-restaurant.html"
})
export class MenuRestaurantPage {
  ListMenu: any;
  DataQr: any;
  loading: number = 0;
  error: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private Menu: MenurestaurantProvider
  ) {
    this.DataQr = navParams.get("DataQr");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuRestaurantPage");
  }

  ionViewDidEnter() {
    this.loading = 1;
    this.Menu.ListMenu(this.DataQr.sit_id)
      .then(data => {
        this.ListMenu = data;
        this.loading = 0;
      })
      .catch(error => {
        console.log("error");
        this.loading = 0;
        this.error = 1;
      });
  }

  OpenCategories(Menu) {
    this.navCtrl.push(CategoriesPage, { Menu: Menu });
  }
}
