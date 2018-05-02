import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ModifyCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modify-category',
  templateUrl: 'modify-category.html',
})
export class ModifyCategoryPage {
  name: string; // 在模板中使用ngModel双向绑定

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, public modalCtrl:ModalController,private alertCtrl:AlertController) {
    // 通过navParams接收传过来的参数
    this.name=this.navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyCategoryPage');
  }

  modify() {
      if (this.name){
        this.viewCtrl.dismiss({name: this.name});
      }else {
        let alert=this.alertCtrl.create({
          title: '提示',
          message:'分类名称不能为空',
          buttons:['确定']

        });
        alert.present();
      }
  }

  dismiss() {
    this.navCtrl.pop();
  }

}
