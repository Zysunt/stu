import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {CityDataProvider} from '../providers/city-data/city-data';

// import {AboutPage} from '../about/about'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ForgetPage} from '../pages/forget/forget';
import { LoginPage} from '../pages/login/login';
import { RegisterPage} from '../pages/register/register';
import { SelectSendPage } from '../pages/select-send/select-send';
import { SendPage} from '../pages/send/send';
import { SignPage} from '../pages/sign/sign';
import { LiabilitiesPage} from '../pages/liabilities/liabilities';
import { LendPage } from '../pages/lend/lend';
import { SendSuccessPage } from '../pages/send-success/send-success';
import { LendedPage} from '../pages/lended/lended';
import { DaihuanPage} from '../pages/daihuan/daihuan';
import {DaishouPage} from '../pages/daishou/daishou';
import {JiekuanEdPage} from '../pages/jiekuan-ed/jiekuan-ed';
import { NewsPage} from '../pages/news/news';
import { HexiaoPage} from '../pages/hexiao/hexiao';
import {ZhanqiPage} from '../pages/zhanqi/zhanqi';
// import {AddCreditPage} from '../pages/add-credit/add-credit';
// import {ConfirmPage} from '../pages/confirm/confirm';
import {DealPage} from '../pages/deal/deal';
import {DealCompletePage} from '../pages/deal-complete/deal-complete';
import {JietiaoDetailPage} from '../pages/jietiao-detail/jietiao-detail';
import {ZhengxinPage} from '../pages/zhengxin/zhengxin';
import {UsersPage} from '../pages/users/users';
import {TransaccountDetailPage} from '../pages/transaccount-detail/transaccount-detail';
import {TransaccountPage} from '../pages/transaccount/transaccount';
import {SigningPage} from '../pages/signing/signing';
import {ShimingPage} from '../pages/shiming/shiming';
import {ProblemsPage} from '../pages/problems/problems';
import {MyCreditPage} from '../pages/my-credit/my-credit';
import {MinePage} from '../pages/mine/mine';
import {LenderPage} from '../pages/lender/lender';
import {RemainingPage} from '../pages/remaining/remaining';
import {TixianPage} from '../pages/tixian/tixian';
// import {ChongzhiPage} from '../pages/chongzhi/chongzhi';
import {DealpsdPage} from '../pages/dealpsd/dealpsd';
import {SettingPage} from '../pages/setting/setting';
import {MyCouponPage} from '../pages/my-coupon/my-coupon';
import {ScanNextPage} from '../pages/scan-next/scan-next';
import {QrdcanPage} from '../pages/qrdcan/qrdcan';
import {ShowPage} from '../pages/show/show';
import {LendInfoPage} from '../pages/lend-info/lend-info';
import {FukuanPage} from '../pages/fukuan/fukuan';





import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from '@ionic-native/camera';
import {ScreenOrientation} from '@ionic-native/screen-orientation'
import {IonicStorageModule} from '@ionic/storage';
import {HttpModule,Http,Jsonp,JsonpModule} from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MultiPickerModule} from 'ion-multi-picker';
import {ComponentsModule} from '../components/components.module';
import {QRScanner,QRScannerStatus} from '@ionic-native/qr-scanner';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Broadcaster} from '@ionic-native/broadcaster';
// import {Subscription} from 'rxjs/Subscription'

// import {OverlayPortal} from '../../node_modules/ionic-angular/umd/components/app/overlay-portal';
// import {IonicApp} from '../../node_modules/ionic-angular/umd/components/app/app-root'
// import {ClickBlock} from '../../node_modules/ionic-angular/umd/components/app/click-block'


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ForgetPage,
    LoginPage,
    RegisterPage,
    SelectSendPage,
    SendPage,
    SignPage,
    LiabilitiesPage,
    LendPage,
    SendSuccessPage,
    LendedPage,
    DaihuanPage,
    DaishouPage,
    JiekuanEdPage,
    NewsPage,
    HexiaoPage,
    ZhanqiPage,
    // AddCreditPage,
    // ConfirmPage,
    DealPage,
    DealCompletePage,
    JietiaoDetailPage,
    ZhengxinPage,
    UsersPage,
    TransaccountDetailPage,
    TransaccountPage,
    SigningPage,
    ShimingPage,
    ProblemsPage,
    MyCreditPage,
    MinePage,
    LenderPage,
    RemainingPage,
    TixianPage,
    // ChongzhiPage,
    DealpsdPage,
    SettingPage,
    MyCouponPage,
    ScanNextPage,
    QrdcanPage,
    ShowPage,
    LendInfoPage,
    FukuanPage
  ],
  imports: [
    IonicStorageModule.forRoot(),
    CommonModule,
    MultiPickerModule,
    FormsModule,
  
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
  tabsHideOnSubPages:true,
  backButtonIcon:'ios-arrow-back-outline'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ForgetPage,
    LoginPage,
    RegisterPage,
    SelectSendPage,
    SendPage,
    SignPage,
    LiabilitiesPage,
    LendPage,
    SendSuccessPage,
    LendedPage,
    DaihuanPage,
    DaishouPage,
    JiekuanEdPage,
    NewsPage,
    HexiaoPage,
    ZhanqiPage,
    // AddCreditPage,
    // ConfirmPage,
    DealPage,
    DealCompletePage,
    JietiaoDetailPage,
    ZhengxinPage,
    UsersPage,
    TransaccountDetailPage,
    TransaccountPage,
    SigningPage,
    ShimingPage,
    MyCreditPage,
    ProblemsPage,
    MinePage,
    LenderPage,
    RemainingPage,
    TixianPage,
    // ChongzhiPage,
    DealpsdPage,
    SettingPage,
    MyCouponPage,
    ScanNextPage,
    QrdcanPage,
    ShowPage,
    LendInfoPage,
    FukuanPage
  ],
  providers: [
    StatusBar,
    Camera,
    // OverlayPortal,
    // ClickBlock,

    Broadcaster,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CityDataProvider,
    QRScanner,
    InAppBrowser

  ]
})
export class AppModule {}





