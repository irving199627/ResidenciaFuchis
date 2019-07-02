import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { URL_SERVICE } from '../config/config';


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
export class UserService {
  usuarios;
  usuario;
  usuarioLogeado;
  idUsuario;
  loading;
  data = false;
  constructor( private http: HttpClient,
               private loadingController: LoadingController,
               public alertController: AlertController,
               private storage: Storage ) {
                }


  async presentAlert() {
    const alert = await this.alertController.create({
    header: 'ERROR de autenticación',
    message: 'Usuario o Contraseña incorrecto',
    buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Espere...',
      id: 'loading1',
      spinner: 'bubbles'
    });
    await this.loading.present();
  }

  login( form ) {
    const url = URL_SERVICE + '/api/login';
    this.presentLoading();
    return new Promise(resolve => {
      const user = this.http.post(url, form.value, httpOptions);
      user.subscribe((data: Usuario) => {
      if (data) {
        this.usuarios = data;
        this.guardarStorage(this.usuarios);
        this.loading.dismiss();
        resolve(true);
      } else {
        resolve(false);
      }
    }, err => {
      if (err) {
        this.presentAlert();
        this.loading.dismiss();
      }
    });
  });
}
  async guardarStorage(user) {
      await this.storage.set('usuario', JSON.stringify(user));
  }

   cargarStorage() {
    return new Promise( (resolve, reject) => {
        this.storage.get('usuario').then(async val => {
          if (val) {
            this.usuarioLogeado = JSON.parse(val);
            await resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async inicializarUsuario() {
    this.cargarStorage();
  }

  borrarStorage() {
      this.storage.remove('usuario');
  }

}
interface Usuario {
  apellidos: string;
  carrera: string;
  created_at: string;
  email: string;
  foto: string;
  id: number;
  matricula: string;
  nombres: string;
  password: string;
  // remember_token: null
  rol: string;
  sexo: string;
  telefono: string;
  tipo_de_usuario: string;
  updated_at: string;
}
