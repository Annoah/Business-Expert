import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EditShopPage} from "../edit-shop/edit-shop";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  editShopPage:any = EditShopPage;
  username:any;
  Shop:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:""
    });
    this.username = loginrecord.username;
    let ShopInfo:any = this.storage.get(this.username,{});
    this.Shop = ShopInfo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
