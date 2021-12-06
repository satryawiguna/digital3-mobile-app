import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;

  slide: any = {
    previous: false,
    next: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {}

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }

  letsGo() {
    this.storage.set('firstTime', false);
    this.navCtrl.setRoot(HomePage);
  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext(500);

    if (this.slides.isEnd()) {
      this.slide = {
        previous: true,
        next: false
      }
    } else {
      this.slide = {
        previous: true,
        next: true
      }
    }

    this.slides.lockSwipes(true);
  }

  previousSlide() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(500);

    if (this.slides.isBeginning()) {
      this.slide = {
        previous: false,
        next: true
      }
    } else {
      this.slide = {
        previous: true,
        next: true
      }
    }
    
    this.slides.lockSwipes(true);
  }

  swipeRightEvent(e) {
    console.log(e);
  }

  swipeLeftEvent(e) {
    console.log(e);
  }
}
