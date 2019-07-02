import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserService } from '../services/user.service';
import {NgForm} from '@angular/forms';
import { ArticulosService } from '../services/articulos.service';
import { IUsuarioService } from '../services/iusuario.service';
import { URL_SERVICE } from '../config/config';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data2: any[] = Array(20);
  url = URL_SERVICE;
  constructor(
               public uS: UserService,
               public aS: ArticulosService,
               public iUS: IUsuarioService
             ) {
  }
  buscar(termino) {
    if (termino.length < 0) {
      this.aS.cargar();
      return;
    }
    console.log(termino);
    if (this.aS.resultadosBusq.length === 0) {
      this.aS.cargar().then( () => {
        this.aS.bus(termino);
      }).catch( err => {
        console.log(err);
      });
    } else {
      this.aS.bus(termino);
    }
  }

  refrescar(evento) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      evento.target.complete();
      this.aS.getArticulos();
    }, 2000);
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

  mostrarAlert(id) {
    console.log(id);
    this.iUS.presentAlertPrompt(id);
  }
}
