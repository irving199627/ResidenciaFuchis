import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CubiculosService {
  cubiculos = [];
  cubiculo = [];
  constructor(
    public http: HttpClient
  ) { this.getCubiculos(); }

  getCubiculos() {
    const url = URL_SERVICE + '/api/booking_cubiculesAPI/create';
    this.http.get(url)
    .subscribe((resp: any) => {
      console.log(resp);
      this.cubiculos = resp;
    //   for (let index = 0; index <= 10; index++) {
    //     if (resp[index] !== undefined ) {

    //       this.cubiculos.push({
    //         index,
    //         [index] : resp[index]
    //       });
    //     }
    //   }
    });
  }

  obtenerCubiculo( numero: number ) {
    const numeroCub = Number(numero);
    this.cubiculos.forEach(elemento => {
      if (elemento[numeroCub] !== undefined) {
        this.cubiculo = elemento[numeroCub];
        console.log(this.cubiculo);
      }
    });
  }

  apartarCubiculo(iduser, idcubicules, idschedules) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Accept', 'application/json');
    const url = URL_SERVICE + '/api/booking_cubiculesAPI';
    return this.http.post(url, {
    id_user: iduser,
    id_cubicules: idcubicules,
    id_schedules: idschedules
  }, {headers})
  .pipe(map ((resp, error ) => {
    if (error) {
      console.log(error);
    }
    console.log(resp);
  }));
  }
}
