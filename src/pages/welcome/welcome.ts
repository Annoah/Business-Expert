import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HomePage} from "../home/home";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  gotoRegister(){
    this.navCtrl.push(RegisterPage);
  }
  gotoLogin(){
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:""
    });
    let now = Date.now();
    if (loginrecord.logined && (now - loginrecord.time <= 5 * 24 * 60 * 60 * 1000)){
      this.navCtrl.push(HomePage);
    }
    else{
      this.navCtrl.push(LoginPage);
    }
  }

}
