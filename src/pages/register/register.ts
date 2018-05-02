import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {LoginPage} from "../login/login";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  register = {
    phone:'',
    email:'',
    shopName:'',
    password:'',
    confirmPassword:'',
    code:''
  };
  sent:boolean = false;
  time:number = 60;
  button:string ='发送验证码';


  constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationCodeService:AuthenticationCodeProvider, private storage:LocalStorageProvider, private alertCtrl:AlertController) {
  }
@ViewChild('registerSlides') registerSlides:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.registerSlides.lockSwipes(true);
  }
  next(){
    this.registerSlides.lockSwipes(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipes(true);
  }
  previous() {
    this.registerSlides.lockSwipes(false);
    this.registerSlides.slidePrev();
    this.registerSlides.lockSwipes(true);
  }
  send(){
    let alert = this.alertCtrl.create({
      title: '提示',
      message:'验证码：'+this.authenticationCodeService.createCode(4),
      buttons:['确定']
    });
    alert.present();
    // console.log(this.authenticationCodeService.createCode(4));
    //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
    this.next();
  }
  validateCode() {
    if (this.authenticationCodeService.validate(this.register.code)) {
      this.next();
    }
    else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message:'短信验证码不正确或者已过期',
        buttons:['确定']
      });
      alert.present();
      // console.log('短信验证码不正确或者已过期');
    }
  }
  send1(){
    let alert = this.alertCtrl.create({
      title: '提示',
      message:'验证码：'+this.authenticationCodeService.createCode(4),
      buttons:['确定']
    });
    alert.present();
    // console.log(this.authenticationCodeService.createCode(4));
    //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
    this.sent = true;
    this.count();
  }
  count(){
    setTimeout(() => {
      //console.log(this.timerRemainSeconds);
      if(this.time){
        this.time--;
        this.button = this.time + 's';
        this.count();
      }
      else {
        this.time = 60;
        this.sent = false;
        this.button = '重新发送';
      }
    }, 1000);
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

  store(){
    let infomation = {
      phone:this.register.phone,
      email:this.register.email,
      shopName:this.register.shopName,
      password:this.register.password,
      shopNickname:"",
      shopOwnername:"",
      shopPhone:'',
      shopType:"",
    }
    this.storage.set(this.register.phone,infomation);
    this.storage.set(this.register.email,infomation);
    this.next();
  }

}
