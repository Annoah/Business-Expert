import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string = '';//视图模型的属性账号，双向绑定
  password:string = '';//视图模型的属性密码，双向绑定

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl:ToastController, private alertCtrl:AlertController, private storage:LocalStorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //点击登录按钮时调用
  login(){
    let passworded: any = this.storage.get(this.username,{
      phone:'',
      email:'',
      shopName:'',
      password:'',
    }).password;
    if(this.username==''){
      let toast = this.toastCtrl.create({
        message:'用户名不能为空',
        duration:3000
      });
      toast.present();
    }
    if(this.password != passworded){
      let alert = this.alertCtrl.create({
        title: '提示',
        message:'用户名或者密码不正确',
        buttons:['确定']
      });
      alert.present();
    }
    if(this.password = passworded){
      let now = Date.now();
      let loginrecord:any = this.storage.get('logintime',{
        time:'',
        logined:'',
        username:""
      });
      loginrecord.logined=true;
      loginrecord.time = now;
      loginrecord.username = this.username;
      this.storage.set('logintime',loginrecord);
      this.navCtrl.setRoot(HomePage);
    }
    }

  //点击忘记密码时调用
  gotoForgotPassword(){
    //进入找回密码页面
    this.navCtrl.push(ForgotPasswordPage);
  }

  gotoRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
