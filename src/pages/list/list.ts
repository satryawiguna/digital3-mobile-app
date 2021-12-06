import { Component } from '@angular/core';
import { PopoverController, LoadingController, ModalController, NavController, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DetailPage } from '../detail/detail';
import { CartPage } from '../cart/cart';
import { PopoverPage } from '../pop-over/pop-over';
import { ModalPage } from '../modal/modal';

import { MovieService } from '../../providers/movie.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  current: any = {
    title: null
  };
  item: any;
  items: Array<any> = [];
  message: string;

  constructor(public popoverCtrl: PopoverController, public loadingCtrl: LoadingController, public movieService: MovieService, public modalCtrl: ModalController, public navCtrl: NavController, public storage: Storage, private toastCtrl: ToastController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.current.title = this.navParams.get('title');
    this.setFilteredItems();
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  openDetail(id) {
    this.navCtrl.push(DetailPage, {
      id: id
    });
  }

  setFilteredItems() {
    this.movieService.page = 1;
    this.movieService.custom.type = this.navParams.get('type');
    this.movieService.custom.genre = this.navParams.get('genre');

    let loader = this.loadingCtrl.create({
      content: 'Loading...',
    });

    loader.present().then(() => {
      this.movieService.getAll(this.movieService.page, this.movieService.search, this.movieService.custom).then(data => {
        this.movieService.movies = data.dto;
        loader.dismiss();
      });
    });
  }

  openPopOver(event) {
    let popover: any = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

  doRefresh(event) {
    this.movieService.page = 1;
    this.movieService.custom.type = this.navParams.get('type');
    this.movieService.custom.genre = this.navParams.get('genre');

    this.movieService.getAll(this.movieService.page, this.movieService.search, this.movieService.custom).then(data => {
      this.movieService.movies = data.dto;
      event.complete();

    });
  }

  doInfinite(event) {
    this.movieService.page = this.movieService.page + 1;

    this.movieService.getAll(this.movieService.page, this.movieService.search, this.movieService.custom).then(data => {
      for(let item of data.dto) {
        this.movieService.movies.push(item);
      }

      event.complete();
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  addToCart(movie) {
    this.item  = {
      id: movie.id,
      product_type_id: movie.product_type_id,
      title: movie.title,
      featured_image_url: movie.featured_image_url
    };

    this.storage.ready().then(() => {
      this.storage.get('items').then((val) => {
        if (val == null) {
          this.items.push(this.item);
          this.storage.set('items', this.items);
          this.message  = 'Movie id: ' + this.item.id + ' has been added to cart';
          this.presentToast(this.message);

        } else {
          let hasMatch: boolean = false;

          this.items = val;

          for (var index = 0; index < this.items.length; ++index) {
            if(this.items[index].id == this.item.id) {
              this.message  = 'Movie id: ' + this.item.id + ' already added on cart';
              this.presentToast(this.message);
              hasMatch = true;
              break;
            }
          }

          if (!hasMatch) {
            this.items.push(this.item);
            this.storage.set('items', this.items);
            this.message  = 'Movie id: ' + this.item.id + ' has beed added to cart';
            this.presentToast(this.message);
          }
        }
      });
    });
  }

  viewCart() {
    this.navCtrl.push(CartPage);
  }

}
