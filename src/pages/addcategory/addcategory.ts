import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Category} from "../../shared/category";
import {CategoryProvider} from "../../providers/category/category";
import {CategoryListPage} from "../category-list/category-list";

/**
 * Generated class for the AddcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addcategory',
  templateUrl: 'addcategory.html',
})
export class AddcategoryPage {
  // categories:any;
  // activeSubCategory:any;
  Childernlist:Category[]=[];
  Categorylist:Category;
  constructor(public navCtrl: NavController, public navParams: NavParams, private categoryService:CategoryProvider) {
    this.Categorylist={
      id:1,
      name:'',
      children:[]
    };
    this.Categorylist.id+=this.navParams.get('last');
    let childreninfo:Category={
      id:1,
      name:'',
      children:[]
    };
    childreninfo.id=1;
    this.Childernlist.push(childreninfo);
    this.Categorylist.children.push(childreninfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcategoryPage');
  }
  ionViewDidLeave(){
    this.Childernlist=this.removeEmptyChildern(this.Childernlist);
    this.Categorylist.children=this.removeEmptyChildern(this.Categorylist.children);
  }
  save(){
    this.Childernlist=this.removeEmptyChildern(this.Childernlist);
    this.Categorylist.children=this.removeEmptyChildern(this.Categorylist.children);
    this.categoryService.save(this.Categorylist.id,this.Categorylist);
    this.navCtrl.setRoot(CategoryListPage);
  }
  addSubCategory(){
    let childreninfo:Category={
      id:1,
      name:'',
      children:[]
    };
    childreninfo.id=1;
    childreninfo.id+=this.Categorylist.children[this.Categorylist.children.length - 1].id;
    this.Childernlist.push(childreninfo);
    this.Categorylist.children.push(childreninfo);
  }

  private removeEmptyChildern(categories:Category[]){
    if(categories){
      for (let i:number=0;i<categories.length;){
        if(!categories[i].name){
          categories.splice(i,1);
        }else {
          i++;
        }
      }
    }
    return categories;
  }

}
