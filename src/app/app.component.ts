import { Component, ViewChild } from '@angular/core';
import {Nav,Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {WelcomePage} from "../pages/welcome/welcome";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {SettingPage} from "../pages/setting/setting";
import {CategoryListPage} from "../pages/category-list/category-list";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any =WelcomePage;//CategoryListPage;//WelcomePage;//HomePage;//LoginPage;//RegisterPage;

  pages: Array<{title: string, component: any, icon: string}>;

  username:any;
  shopName:any;
  phone;any;
  password:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private storage:LocalStorageProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '开店论坛', component: HomePage, icon: 'chatboxes' },
      { title: '手机橱窗', component: ListPage, icon: 'create' },
      { title: '邀请有礼', component: ListPage, icon: 'git-merge' },
      { title: '资金账户', component: ListPage, icon: 'cash' },
    ];
    let appConfig:any = this.storage.get('App',{
      isRun:false,
      version:'1.0.0'
    });
    if(appConfig.isRun==false){
      this.rootPage = WelcomePage;
      appConfig.isRun = true;
      this.storage.set('App',appConfig);
    }
    else{
      this.whichrootpage();
    }

    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:''
    });
    this.username = loginrecord.username;
    let information:any = this.storage.get(this.username,{
      phone:'',
      email:'',
      shopName:'',
      password:'haha'
    });
    this.phone = information.phone;
    this.shopName = information.shopName;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  gotosetting(){
    this.nav.push(SettingPage);
  }

  whichrootpage(){
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:""
    });
    let now = Date.now();
    if (loginrecord.logined && (now - loginrecord.time <= 5 * 24 * 60 * 60 * 1000)){
      this.rootPage = HomePage;
    }
    else{
      this.rootPage = LoginPage;
    }
  }

}
