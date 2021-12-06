import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ListPage } from '../list/list';

import { GenreService } from '../../providers/genre.service';

@Component({
  selector: 'page-genre',
  templateUrl: 'genre.html'
})
export class GenrePage {
  current: any = {
    id: null,
    title: null
  };
  type_id: number;

  pages: Array<{id: number, title: string, isFirst: boolean}>;
  parents: Array<{id: number, title: string}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public genreService: GenreService) {}

  ionViewDidLoad() {
    this.current = {
      id: 0,
      title: this.navParams.get('title')
    };

    this.type_id = this.navParams.get('id');

    this.genreService.getAll(0).then(data => {
      this.genreService.genres = data.dto;

      this.pages = [{
        id: null,
        title: 'All Genres',
        isFirst: true
      }];

      for (var genre of this.genreService.genres) {
        let page: any = {
          id: genre.id,
          title: genre.name,
          isFirst: false
        };

        this.pages.push(page);
      }
    });
  }

  openDetail(id, title, isFirst, current)
  {
    if (isFirst) {
      this.navCtrl.push(ListPage, {
        type: this.type_id,
        genre: id,
        title: title
      });
    } else {
      this.genreService.getAll(id).then(data => {
        this.genreService.genres = data.dto;

        if (this.genreService.genres.length < 1) {
          this.navCtrl.push(ListPage, {
            type: this.type_id,
            genre: id,
            title: title
          });
        } else {
          this.parents.push(current);
          this.current = {
            id: id,
            title: title
          };

          this.pages = [{
            id: id,
            title: 'All Genres of ' + title,
            isFirst: true
          }];

          for (var genre of this.genreService.genres) {
            let page: any = {
              id: genre.id,
              title: genre.name,
              isFirst: false
            };

            this.pages.push(page);
          }
        }

        console.log(this.parents);
      });
    }
  }

  upToParent(parents)
  {
    this.genreService.getAll(this.parents[this.parents.length - 1].id).then(data => {
      this.genreService.genres = data.dto;

      this.current = {
        id: this.parents[this.parents.length - 1].id,
        title: this.parents[this.parents.length - 1].title
      };

      this.pages = [{
        id: this.parents[this.parents.length - 1].id,
        title: 'All Genres of ' + this.parents[this.parents.length - 1].title,
        isFirst: true
      }];

      for (var genre of this.genreService.genres) {
        let page: any = {
          id: genre.id,
          title: genre.name,
          isFirst: false
        };

        this.pages.push(page);
      }

      this.parents.splice(-1, 1);
      console.log(this.parents);
    });
  }

}
