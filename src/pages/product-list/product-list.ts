import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProductProvider} from "../../providers/product/product";
import {Product} from "../../shared/product";
import {CategoryListPage} from "../category-list/category-list";
import {CategoryProvider} from "../../providers/category/category";
import {AddProductPage} from "../add-product/add-product";
import {ProductInfoPage} from "../product-info/product-info";

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  // pageIndex = 1;
  // products = [];
  loader:any;
  private pageIndex = 1;
  products = [];
  name:any;
  categoryListPage = CategoryListPage;
  addProductPage = AddProductPage;
  subscription:any;
  sum1:any=0;
  sum2:any=0;
  choice:Product=new Product();
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl:LoadingController, private productService:ProductProvider,private categoryService:CategoryProvider) {
    this.subscription=this.categoryService.getCategorySubject().subscribe((data)=>{
      this.productService.getByCategoryId(data['id']).then((value)=>{
        this.products=value;
      },(err)=>{

      });
    },(error)=>{

    },()=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }
  ionViewWillUnload(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "正在加载数据，请稍候...",
    });
    this.loader.present();
  }

  load() {
    this.pageIndex = 1;
    this.presentLoading();
    this.productService.get(this.pageIndex).then((data) => {
      console.log(this.products);
      this.loader.dissmiss();
      this.products = data;
    }, (error) => {
    });
  }

  onInput(event: any) {
    if(!event.target.value){
      return;
    }
    console.log(event);
    var value = event.target.value;
    console.log(value.trim())
    if(typeof (value.trim())=="number"){
      this.productService.getByBarcode(value).then((data)=>{
        this.products=data;
        console.log("searchbarBarCode");
      },(error)=>{

      });
    }else {
      this.productService.getByName(value).then((data)=>{
        this.products=data;
        console.log("searchbarName");
      },(error)=>{

      });
    }
  }

  doRefresh(event){
    this.pageIndex = 1;
    this.productService.get(this.pageIndex).then((data) => {
      this.products = data;
      event.complete();
      console.log('refresh')
    }, (error) => {
    });
  }

  doInfinite(event){
    this.pageIndex++;
    // if(this.pageIndex > 4){
    //   event.complete();
    //   return;
    // }
    this.productService.get(this.pageIndex).then((data) => {
      this.products = this.products.concat(data);
      event.complete();
      console.log('infinite')
    }, (error) => {
    });
  }

  caculate(product){
    this.choice = product;
    if(this.choice){
      // for(let i = 0;i<this.products.length;i++){
      //   this.sum1+=this.products[i].stock;
      //   this.sum2+=this.products[i].bid * this.products[i].stock;
      // }
      this.sum1 = this.choice.stock;
      this.sum2 = this.choice.stock*this.choice.bid;
    }
  }

  gotoproductinfo(product){
    this.navCtrl.push(ProductInfoPage,{'productinfo':product});
  }

}
