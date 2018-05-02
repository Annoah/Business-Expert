import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Category} from "../../shared/category";
import {CategoryProvider} from "../../providers/category/category";
import {CategoryListPage} from "../category-list/category-list";

/**
 * Generated class for the AddsubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addsubcategory',
  templateUrl: 'addsubcategory.html',
})
export class AddsubcategoryPage {
  Childernlist:Category[]=[];
  Categorylist:Category;
  constructor(public navCtrl: NavController, public navParams: NavParams, private categoryService:CategoryProvider) {
    this.Categorylist=this.navParams.get('category');
    let childreninfo:Category={
      id:1,
      name:'',
      children:[]
    };
    childreninfo.id=1;
    let clidern:Category[]=this.Categorylist.children;
    if(!clidern){
      childreninfo.id+=clidern[clidern.length - 1].id;
    }else {
      childreninfo.id+=this.Categorylist.id*10;
    }
    this.Childernlist.push(childreninfo);
    this.Categorylist.children.push(childreninfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsubcategoryPage');
  }
  ionViewDidLeave(){
    this.Childernlist=this.removeEmptyChildern(this.Childernlist);
    this.Categorylist.children=this.removeEmptyChildern(this.Categorylist.children);
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
  save(){
    this.Childernlist=this.removeEmptyChildern(this.Childernlist);
    this.Categorylist.children=this.removeEmptyChildern(this.Categorylist.children);
    this.categoryService.save(this.Categorylist.id,this.Categorylist);
    this.navCtrl.setRoot(CategoryListPage);
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
