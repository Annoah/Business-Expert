import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {LocalStorageProvider} from "../local-storage/local-storage";
import {Product} from "../../shared/product";
import {PRODUCTS} from "../../shared/mock.products";

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const PAGE_SIZE = 10;
@Injectable()
export class ProductProvider {
  pageNumber:number;

  constructor(/*public http: Http*/private storage:LocalStorageProvider) {
    console.log('Hello ProductProvider Provider');
    this.pageNumber=this.getPageNumber();
  }

  get(index: number): Promise<any> {
    return new Promise((resolve,reject) =>{
      if(!index){
        reject('页码不能为空');
      }else if(index < 0){
        reject('error');
      }
      setTimeout(()=>{
        let products = this.storage.get('Product',PRODUCTS);
        //if长度为0
        let result = products.slice(PAGE_SIZE * (index - 1),PAGE_SIZE * index);
        resolve(result);
        },1000)
    } )
  }

  getByName(name: string): Promise<any> {
    return new Promise((resolve,reject) =>{
      if(!name){
        resolve(this.get(1));
      }
      setTimeout(()=>{
        let products=this.storage.get('Product',PRODUCTS);
        let result:Product[]=[];
        for(let i=0;i<products.length;i++){
          if (products[i].name.indexOf(name)>=0)result.push(products[i]);
        }
        resolve(result);
      },1000);
    } )
  }

  getByCategoryId(categoryId: number): Promise<any> {
    return new Promise((resolve,reject) =>{
      if(!categoryId){
        resolve(this.get(1));
      }
      setTimeout(()=>{
        let products=this.storage.get('Product',PRODUCTS);
        let result:Product[]=[];
        for(let i=0;i<products.length;i++){
          if (products[i].categoryId==categoryId)result.push(products[i]);
        }
        console.log('getByCategoryId'+result);
        resolve(result);
      },1000);
    } )
  }

  getByBarcode(name:number):Promise<any>{
    return new Promise((resolve, reject) => {

      if(!name){
        resolve(this.get(1));
      }
      setTimeout(()=>{
        let products=this.storage.get('Product',PRODUCTS);
        let result:Product[]=[];
        for(let i=0;i<products.length;i++){
          if (products[i].barcode.indexOf(name)>=0)result.push(products[i]);
        }
        resolve(result);
      },1000);
    });
  }

  getPageNumber(){
    let products=this.storage.get('Product',PRODUCTS);
    let rs=products.length/PAGE_SIZE;
    if(products.length-rs*PAGE_SIZE>0) return rs+1;
    else return rs;
  }

}
export class Error{
  message:string;
  detail:string;
}
export class Result{
  success:boolean;
  error:Error;
  data:any;
}
