import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  resultadosBusq: any[] = [];
  item;
  vacio = true;
  articulosFiltrados = [];
  termino;
  articulos: any;

  constructor( private http: HttpClient, public uS: UserService ) {
                        this.getArticulos();
                      }

  getArticulos() {
    const urlArticulos = `${ URL_SERVICE }/api/articles`;
    const articulos = this.http.get(urlArticulos, httpOptions);
    articulos.subscribe( (art: Articulos) => {
      this.articulos = art;
      console.log(art);
    });
  }

  bus( cod: string ) {
    this.termino = cod;
    this.articulosFiltrados = [];
    this.resultadosBusq.forEach( an => {
        if ( an.nombre.indexOf( this.termino ) >= 0 ) {
          this.articulosFiltrados.push(an);
          this.articulos = this.articulosFiltrados;
          console.log(this.articulosFiltrados);
        }
        if ( this.articulosFiltrados.length === 0 ) {
          this.vacio = true;
        } else {
          this.vacio = false;
        }
      });
  }

  cargar() {
    const urlArticulos = `${ URL_SERVICE }/api/articles`;
    const promesa = new Promise( (resolve, reject ) => {
      this.item = this.http.get(urlArticulos, httpOptions);
      this.item.subscribe( (art) => {
        this.resultadosBusq = art;
        // this.articulos = art;
        resolve();
      });
    });
    return promesa;
  }

  reservarArticulo(id, cantidad) {
    const url = URL_SERVICE + '/api/booking_articles';
    return this.http.post(url, {article_id: id, user_id: this.uS.usuarioLogeado.id, cantidad})
    .pipe(map ((resp, error ) => {
        if (error) {
          return;
        }
        return resp;
    }));
}
}
interface Articulos {
  'id': number;
  'nombre': string;
  'modelo': string;
  'foto': string;
  'cantidad': number;
  'descripcion': string;
  'anaquel': string;
  'created_at': string;
  'updated_at': string;
}
