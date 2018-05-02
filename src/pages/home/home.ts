import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {CategoryListPage} from "../category-list/category-list";
import {AddProductPage} from "../add-product/add-product";
import {ProductListPage} from "../product-list/product-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  today:number;
  week:number;
  month:number;
  deltatoday:number;
  deltaweek:number;
  deltamonth:number;
  arrowtoday:any;
  arrowweek:any;
  arrowmonth:any;

  constructor(public navCtrl: NavController, public navParams:NavParams, private storage:LocalStorageProvider, private alertCtrl:AlertController) {
    let record:any = this.storage.get('compare',{
      today:0,
      week:0,
      month:0,
    });
    this.today = Math.random() * 1000;
    this.week = Math.random() * 1000;
    this.month = Math.random() * 1000;
    if(this.today > record.today){
      this.arrowtoday = "arrow-round-up";
    }
    if(this.today == record.today){
      this.arrowtoday = "arrow-round-forward";
    }
    if(this.today < record.today){
      this.arrowtoday = "arrow-round-down";
    }
    if(this.week > record.week){
      this.arrowweek = "arrow-round-up";
    }
    if(this.week == record.week){
      this.arrowweek = "arrow-round-forward";
    }
    if(this.week < record.week){
      this.arrowweek = "arrow-round-down";
    }
    if(this.month > record.month){
      this.arrowmonth = "arrow-round-up";
    }
    if(this.month == record.month){
      this.arrowmonth = "arrow-round-forward";
    }
    if(this.month < record.month){
      this.arrowmonth = "arrow-round-down";
    }
    this.deltatoday = this.today - record.today;
    this.deltaweek = this.week - record.week;
    this.deltamonth = this.month - record.month;
    record.today = this.today;
    record.week = this.week;
    record.month = this.month;
    this.storage.set('compare',record);

  }
  // gotocategorylist(){
  //   this.navCtrl.push(CategoryListPage);
  // }
  gotoproductlist(){
    this.navCtrl.push(ProductListPage);
  }
  gotoaddproduct(){
    this.navCtrl.push(AddProductPage);
  }

}
