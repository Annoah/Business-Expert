import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {ModifyCategoryPage} from "../modify-category/modify-category";
import {Category} from "../../shared/category";
import {CategoryProvider} from "../../providers/category/category";
import {last} from "rxjs/operator/last";

/**
 * Generated class for the EditcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editcategory',
  templateUrl: 'editcategory.html',
})
export class EditcategoryPage {
  activeCategory:Category;
  activeSubCategories:Category[];
  selectCategory:Category;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController, private categoryService:CategoryProvider, private modalCtrl:ModalController) {
    this.activeCategory = this.navParams.get('category');
    this.activeSubCategories = this.activeCategory.children;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcategoryPage');
  }
  showConfirm(category) {
    this.selectCategory=category;
    let confirm = this.alertCtrl.create({
      title: '你确认要删除吗？',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            this.categoryService.delete(this.activeCategory.id,this.selectCategory.id);
            if (this.activeCategory.id==this.selectCategory.id){
              this.navCtrl.pop();
            }else {
              let lastid=this.activeCategory.children.indexOf(category);
              this.activeCategory.children.splice(lastid,1);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  presentModal(category) {
    this.selectCategory=category;
    let modal = this.modalCtrl.create(ModifyCategoryPage, {name:this.selectCategory.name});
    modal.onDidDismiss(data => {
      if(data){
        this.selectCategory.name=data['name'].toString();
        console.log(this.selectCategory);
        console.log(this.activeCategory.id);
        this.categoryService.save(this.activeCategory.id,this.selectCategory);
      }
    });
    modal.present();
  }

  save(){
    this.activeCategory.children=this.activeSubCategories;
    this.categoryService.save(this.activeCategory.id,this.activeCategory);
  }

}
