import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the ModifyPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modify-password',
  templateUrl: 'modify-password.html',
})
export class ModifyPasswordPage {
  username:any;
  oldpassword:any;
  newpassword:any;
  newconfirmPassword:any

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPasswordPage');
  }
  mped(){
    if (this.newpassword != this.newconfirmPassword){
      let toast = this.toastCtrl.create({
        message:'两次输入的密码不一致',
        duration:3000
      });
      toast.present();
    }
    else{
      let loginrecord:any = this.storage.get('logintime',{
        time:'',
        logined:'',
        username:"",
      });
      this.username = loginrecord.username;
      let information:any = this.storage.get(this.username,{
        phone:'',
        email:'',
        shopName:'',
        password:''
      });
      if (this.oldpassword != information.password){
        let toast = this.toastCtrl.create({
          message:'旧密码输入不正确',
          duration:3000
        });
        toast.present();
      }
      else{
        information.password = this.newpassword;
        this.storage.set(information.phone,information);
        this.storage.set(information.email,information);
        let toast = this.toastCtrl.create({
          message:'修改成功',
          duration:3000
        });
        toast.present();
      }
        }
    }

}
