import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {CategoryListPage} from "../category-list/category-list";
import {Product} from "../../shared/product";
import {CategoryProvider} from "../../providers/category/category";
import {ProductProvider} from "../../providers/product/product";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {PRODUCTS} from "../../shared/mock.products";

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  categoryListPage:any=CategoryListPage;
  product:Product;
  subscription:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService:CategoryProvider, private alertCtrl:AlertController, private proService:ProductProvider, private storage:LocalStorageProvider,
  private barcodeScanner:BarcodeScanner,private camera:Camera, private imagePicker:ImagePicker,private actionSheetCtrl:ActionSheetController,private toastCtrl:ToastController) {
    this.product=new Product();
    this.product.categoryId=categoryService.activeCategory.id;
    this.product.categoryName=categoryService.activeCategory.name;
    this.product.images = [];
    this.subscription=this.categoryService.getCategorySubject().subscribe((data)=>{
      console.log(data);
      this.product.categoryId=data['id'];
      this.product.categoryName=data['name'];
    },(error)=>{

    },()=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  ionViewWillUnload(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '新增供货商',
      inputs: [
        {
          name: 'shop',
          placeholder: '供应商名称'
        },
        {
          name: 'phone',
          placeholder: '供应商电话'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if(data){
              this.product.shop = data.shop;
              this.product.phone = data.phone;
              let toast=this.toastCtrl.create({
                message:'供应商信息已保存',
                duration:3000
              });
              toast.present();
            }
            console.log(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  ok(){
    if (this.product.name==''||this.product.price==0){
      let toast=this.toastCtrl.create({
        message:'必填项不能为空',
        duration:3000
      });
      toast.present();
    }else if(this.product.shop==''||this.product.phone==0){
      let toast=this.toastCtrl.create({
        message:'供货商信息不能为空',
        duration:3000
      });
      toast.present();
    }else {
      let toast=this.toastCtrl.create({
        message:'新增商品成功',
        duration:3000
      });
      toast.present();
      this.save();
      this.navCtrl.pop();
    }
  }
  save(){
    let product:Product[]=this.storage.get('Product',PRODUCTS);
    if(product==null){
      product=[];
      this.product.id=1;
    }else {
      this.product.id=product[product.length-1].id + 1;
    }
    product.push(this.product);
    this.storage.set('Product',product);
  }

  continue(){
    this.save();
    let clear = new Product();
    clear.id = 1;
    this.product = clear;
    this.product.name="";
    this.product.categoryId=5;
    this.product.categoryName="默认类别";
    this.product.stock=0;
    this.product.barcode="";
    this.product.price=0;
    this.product.bid=0;
    this.product.spec="";
    this.product.remark="";
    this.product.shop="";
    this.product.phone=0;
    this.product.images=[];
  }

  scanBarcode(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.product.barcode = barcodeData.text;
    }, (err) => {
      // An error occurred
    });
  }

  camera1() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:100,
      targetHeight:100,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  pickImage() {
    if(this.product.images.length < 3){
      let count:number=0;
      if(this.product.images.length>0){
        count=3-this.product.images.length;
      }else {
        count=3;
      }
      let options = {
        maximumImagesCount: count,  // 计算出最多能选几张
        outputType: 0,
        targetWidth: 100,
        targetHeight: 100,
        quality: 100
      };
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          let base64Image='data:image/jpeg;base64,'+ results[i];
          // console.log('Image URI: ' + results[i]);
          this.product.images.push(base64Image);
        }
      }, (err) => { });
    }else {
      let toast=this.toastCtrl.create({
        message:'每件商品最多选择三张图片',
        duration:3000
      });
      toast.present();
    }// 判断是否设置了三张图片

  }

  choose(){
    let prompt = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.camera1();
          }
        },
        {
          text: '从相册中选择',
          handler: () => {
            this.pickImage();

            }
          }
      ]
    });
    prompt.present();
  }

}
