import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {Config, IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WelcomePage} from "../pages/welcome/welcome";
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import {RegisterPage} from "../pages/register/register";
import { AuthenticationCodeProvider } from '../providers/authentication-code/authentication-code';
import {LoginPage} from "../pages/login/login";
import {FormsModule} from "@angular/forms";
import {CopyrightComponent} from "../components/copyright/copyright";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import {SettingPage} from "../pages/setting/setting";
import {ModifyPasswordPage} from "../pages/modify-password/modify-password";
import {EditShopPage} from "../pages/edit-shop/edit-shop";
import {AboutUsPage} from "../pages/about-us/about-us";
import {ShopPage} from "../pages/shop/shop";
import {CategoryListPage} from "../pages/category-list/category-list";
import { CategoryProvider } from '../providers/category/category';
import {AddcategoryPage} from "../pages/addcategory/addcategory";
import {AddsubcategoryPage} from "../pages/addsubcategory/addsubcategory";
import {EditcategoryPage} from "../pages/editcategory/editcategory";
import {ModifyCategoryPage} from "../pages/modify-category/modify-category";
import { ProductProvider } from '../providers/product/product';
import {AddProductPage} from "../pages/add-product/add-product";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {ProductListPage} from "../pages/product-list/product-list";
import {ProductInfoPage} from "../pages/product-info/product-info";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    CopyrightComponent,
    ForgotPasswordPage,
    SettingPage,
    ModifyPasswordPage,
    EditShopPage,
    AboutUsPage,
    ShopPage,
    CategoryListPage,
    AddcategoryPage,
    AddsubcategoryPage,
    EditcategoryPage,
    ModifyCategoryPage,
    AddProductPage,
    ProductListPage,
    ProductInfoPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回', // 配置返回按钮的文字
      backButtonIcon: 'arrow-dropleft-circle' // 配置返回按钮的图标
    }),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    CopyrightComponent,
    ForgotPasswordPage,
    SettingPage,
    ModifyPasswordPage,
    EditShopPage,
    AboutUsPage,
    ShopPage,
    CategoryListPage,
    AddcategoryPage,
    AddsubcategoryPage,
    EditcategoryPage,
    ModifyCategoryPage,
    AddProductPage,
    ProductListPage,
    ProductInfoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider,
    AuthenticationCodeProvider,
    CategoryProvider,
    ProductProvider,
    BarcodeScanner,
    Camera,
    ImagePicker,
  ]
})
export class AppModule {}
