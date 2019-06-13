import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserService } from '../services/user.service';
import {NgForm} from '@angular/forms';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data2: any[] = Array(20);

  constructor(
               public uS: UserService,
               public aS: ArticulosService
             ) {
  }
  buscar(termino) {
    console.log(termino);
  }


  loadData(event) {
    console.log('Cargando siguientes....');

    setTimeout(() => {

      if ( this.data2.length > 50 ) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      const nuevoArr = Array(20);
      this.data2.push( ...nuevoArr );
      event.target.complete();

    }, 1000 );
  }

  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.toggle('first');
  // }

}
