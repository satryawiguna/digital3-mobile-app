import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';

import { MovieService } from '../../providers/movie.service';

@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  constructor(public viewCtrl: ViewController, public loadingCtrl: LoadingController, public movieService: MovieService) {}

  ionViewDidLoad() {}

  setFilteredItems() {
    this.movieService.page = 1;

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

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  shortAscendingByID() {
    this.movieService.custom.order.column = 0;
    this.movieService.custom.order.dir = 'asc';

    this.setFilteredItems();

    this.viewCtrl.dismiss();
  }

  shortDescendingByID() {
    this.movieService.custom.order.column = 0;
    this.movieService.custom.order.dir = 'desc';

    this.setFilteredItems();

    this.viewCtrl.dismiss();
  }

  shortAscendingByTitle() {
    this.movieService.custom.order.column = 1;
    this.movieService.custom.order.dir = 'asc';

    this.setFilteredItems();

    this.viewCtrl.dismiss();
  }

  shortDescendingByTitle() {
    this.movieService.custom.order.column = 1;
    this.movieService.custom.order.dir = 'desc';

    this.setFilteredItems();

    this.viewCtrl.dismiss();
  }

  shortAscendingByYear() {
    this.movieService.custom.order.column = 2;
    this.movieService.custom.order.dir = 'asc';

    this.setFilteredItems();

    this.viewCtrl.dismiss();
  }

  shortDescendingByYear() {
    this.movieService.custom.order.column = 2;
    this.movieService.custom.order.dir = 'desc';

    this.setFilteredItems();

    this.viewCtrl.dismiss();
  }

  shortAscendingByRating() {
    this.movieService.custom.order.column = 3;
    this.movieService.custom.order.dir = 'asc';

    this.setFilteredItems();

    this.viewCtrl.dismiss();
  }

  shortDescendingByRating() {
    this.movieService.custom.order.column = 3;
    this.movieService.custom.order.dir = 'desc';

    this.setFilteredItems();

    this.viewCtrl.dismiss();
  }

}
