import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ModifyPasswordPage} from "../modify-password/modify-password";
import {AboutUsPage} from "../about-us/about-us";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {ShopPage} from "../shop/shop";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  //loginPage:any;
  modifypassword:any;
  shop:any;
  aboutus:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider) {
    //this.loginPage = LoginPage;
    this.modifypassword = ModifyPasswordPage;
    this.shop = ShopPage;
    this.aboutus = AboutUsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  logout(){
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:""
    })
    loginrecord.logined = false;
    this.storage.set('logintime',loginrecord);
    this.navCtrl.setRoot(LoginPage);
  }
  call(phoneNumber) {
    window.location.href = 'tel:' + phoneNumber;
  }

}
