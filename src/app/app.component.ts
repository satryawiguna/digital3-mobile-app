import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { GenrePage } from '../pages/genre/genre';

import { TypeService } from '../providers/type.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{id: number, title: string, component: any, ios_icon: string, android_icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public typeService: TypeService, private iab: InAppBrowser, public storage: Storage) {
    this.initializeApp();

    this.storage.ready().then(() => {
      this.storage.get('firstTime').then(firstTime => {
        if (firstTime || firstTime == null) {
          this.nav.setRoot(IntroPage);
        } else {
          this.nav.setRoot(HomePage);
        }
      });
    });

    this.typeService.getAll().then(data => {
      // used for an example of ngFor and navigation
      this.pages = [{
          id: 0,
          title: 'All Movies & TV Series',
          component: HomePage,
          ios_icon: 'ios-home',
          android_icon: 'md-home'
      }];

      this.typeService.types = data.dto;

      for (var type of this.typeService.types) {
          let page: any = {
            id: type.id,
            title: type.name,
            component: GenrePage,
            ios_icon: 'ios-folder',
            android_icon: 'md-folder'
          };

          this.pages.push(page);
      }
    });
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
    this.nav.setRoot(page.component, {
      id: page.id,
      title: page.title
    });
  }

  openPriceList(url) {
    const browser = this.iab.create(url, '_system');
    browser.show();
  }
}
