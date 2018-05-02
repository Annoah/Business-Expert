import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  fp = {
    username:'',
    password:'',
    confirmPassword:'',
    code:''
  };
  sent:boolean = false;
  time:number = 60;
  button:string ='发送验证码';

  constructor(public navCtrl: NavController, public navParams: NavParams,private  authenticationCodeService:AuthenticationCodeProvider, private storage:LocalStorageProvider,private alertCtrl:AlertController) {
  }
  @ViewChild('registerSlides') registerSlides:any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
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
    console.log(this.authenticationCodeService.createCode(4));
    //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
    this.next();
  }
  validateCode() {
    if (this.authenticationCodeService.validate(this.fp.code)) {
      this.next();
    }
    else {
      console.log('短信验证码不正确或者已过期');
    }
  }
  send1(){
    console.log(this.authenticationCodeService.createCode(4));
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
    let newpassword:any=this.storage.get(this.fp.username,{
      phone:'',
      email:'',
      shopName:'',
      password:'',
    });
    newpassword.password = this.fp.password;
    this.storage.set(newpassword.email,newpassword);
    this.storage.set(newpassword.phone,newpassword);
    this.next();
  }
  id(){
    let usernameed: any = this.storage.get(this.fp.username,{
      phone:'',
      email:'',
      shopName:'',
      password:'0',
    }).password;
    if(usernameed == 0){
      let alert = this.alertCtrl.create({
        title: '提示',
        message:'用户名尚未注册',
        buttons:['确定']
      });
      alert.present();
    }else{
      this.send();
    }
  }


}
