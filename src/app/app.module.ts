import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RatingModule } from "ngx-rating";
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { ElasticModule } from 'ng-elastic';

import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { GenrePage } from '../pages/genre/genre';
import { ListPage } from '../pages/list/list';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { PopoverPage } from '../pages/pop-over/pop-over';
import { ModalPage } from '../pages/modal/modal';

import { MovieService } from '../providers/movie.service';
import { TypeService } from '../providers/type.service';
import { GenreService } from '../providers/genre.service';
import { UserService } from '../providers/user.service';
import { CheckoutService } from '../providers/checkout.service';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    HomePage,
    DetailPage,
    GenrePage,
    ListPage,
    CartPage,
    CheckoutPage,
    LoginPage,
    RegistrationPage,
    ForgotPasswordPage,
    PopoverPage,
    ModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    RatingModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    ElasticModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    HomePage,
    DetailPage,
    GenrePage,
    ListPage,
    CartPage,
    CheckoutPage,
    LoginPage,
    RegistrationPage,
    ForgotPasswordPage,
    PopoverPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    MovieService,
    TypeService,
    GenreService,
    UserService,
    CheckoutService
  ]
})
export class AppModule {}
