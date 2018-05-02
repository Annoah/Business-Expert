import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Product} from "../../shared/product";

/**
 * Generated class for the ProductInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {
  product:Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product=this.navParams.get('productinfo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }

  share(){
  }

}
