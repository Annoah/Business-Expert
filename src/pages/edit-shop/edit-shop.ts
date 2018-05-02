import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the EditShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-shop',
  templateUrl: 'edit-shop.html',
})
export class EditShopPage {
  title:string;
  property:string;
  value:string;//用于ngModel
  shop:any;//用于保存从本地存储中获得店铺数据
  username:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private localStoreService:LocalStorageProvider, private toastCtrl:ToastController) {
    this.title = this.navParams.get('title');
    this.property = this.navParams.get('property');
    let loginrecord:any = this.localStoreService.get('logintime',{
      time:'',
      logined:'',
      username:""
    });
    this.username = loginrecord.username;
    this.shop =this.localStoreService.get(this.username,{});
    this.value = this.shop[this.property];
    //其他代码省略

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShopPage');
  }
  save(){
    this.shop[this.property] = this.value;
    this.localStoreService.set(this.shop.phone,this.shop);
    this.localStoreService.set(this.shop.email,this.shop);
    let toast = this.toastCtrl.create({
      message:'修改店铺信息成功',
      duration:3000
    });
    toast.present();
    //其他代码省略
  }

}
