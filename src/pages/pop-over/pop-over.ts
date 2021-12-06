import { Component, Input } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';

import { MovieService } from '../../providers/movie.service';

@Component({
  selector: 'pop-over',
  templateUrl: 'pop-over.html'
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController, public movieService: MovieService, public loadingCtrl: LoadingController) {}

  changeView(value) {
    this.movieService.isGridView = value;
    this.viewCtrl.dismiss();
  }
}
