import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {Category} from "../../shared/category";
import {AddcategoryPage} from "../addcategory/addcategory";
import {AddsubcategoryPage} from "../addsubcategory/addsubcategory";
import {EditcategoryPage} from "../editcategory/editcategory";
import {last} from "rxjs/operator/last";

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
  categories:Category[];
  activeCategory:Category;
  //activeSubCategories:Category[];
  activeSubCategory:Category;
  sort:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private categoryService:CategoryProvider,public actionSheetCtrl:ActionSheetController) {
    categoryService.get().then((data)=>{
      this.categories = data;
      if (this.categories.length){
        this.activeCategory = this.categories[0];
      }
      if(this.activeCategory.children.length){
        this.sort ="共"+this.activeCategory.children.length+"种商品分类";
      }
      else {
        this.sort = "目前没有小分类";
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
    console.log(this.navCtrl.getPrevious().name);
  }
  selectCategory(category){
    this.activeCategory = category;
    if(this.activeCategory.children.length){
      this.sort ="共"+this.activeCategory.children.length+"种商品分类";
    }
    else {
      this.sort = "目前没有小分类";
    }
  }

  selectSubCategory(category){
    this.activeSubCategory = category;
    this.categoryService.updateActiveCategory(category);
    this.navCtrl.pop();
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      //title: '操作',
      buttons: [
        {
          text: '新增分类',
          handler: () => {
            let lastid = this.categories[this.categories.length - 1].id;
            this.navCtrl.push(AddcategoryPage,{'last':lastid});
          }
        },{
          text: '新增小分类',
          handler: () => {
            this.navCtrl.push(AddsubcategoryPage,{'category':this.activeCategory});
          }
        },{
          text: '编辑分类',
          handler: () => {
            this.navCtrl.push(EditcategoryPage,{'category':this.activeCategory});
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  gotoAddCategory(){
    let lastid = this.categories[this.categories.length - 1].id;
    this.navCtrl.push(AddcategoryPage,{'last':lastid});
  }

  gotoAddSubCategory(){
    this.navCtrl.push(AddsubcategoryPage,{'category':this.activeCategory});
  }

}
