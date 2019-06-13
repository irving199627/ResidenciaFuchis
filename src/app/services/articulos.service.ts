import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  articulos: Articulos;
  urlArticulos = 'https://boiling-reaches-83706.herokuapp.com/api/articles';

  constructor( private http: HttpClient) { this.getArticulos(); }

  getArticulos() {
    const articulos = this.http.get(this.urlArticulos, httpOptions);
    articulos.subscribe( (art: Articulos) => {
      this.articulos = art;
    });
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
