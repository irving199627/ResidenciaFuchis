import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


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
  idUsuario;
  loading;
  data = false;
  url = 'http://boiling-reaches-83706.herokuapp.com/api/login';
  constructor( private http: HttpClient,
               private loadingController: LoadingController,
               private router: Router,
               public alertController: AlertController,
               private platform: Platform,
               private storage: Storage ) {
                 this.cargarStorage();
                //  this.inicializarUsuario();
                //  console.log(this.idUsuario);
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
    this.presentLoading();
    const user = this.http.post(this.url, form.value, httpOptions);
    user.subscribe((data: Usuario) => {
      if (data) {
        this.usuarios = data;
        this.guardarStorage();
        this.cargarStorage();
        this.inicializarUsuario();
        console.log(this.idUsuario, 'id del usuario');
        this.router.navigate(['/tabs/tab1']);
        this.loading.dismiss();
      }
    }, err => {
      if (err) {
        this.presentAlert();
        this.loading.dismiss();
      }
    });

  }
  guardarStorage() {
    if (this.platform.is('cordova')) {
      // Celular
      this.storage.set('usuario', this.usuarios.id);
    } else {
      // Escritorio
      localStorage.setItem('usuario', this.usuarios.id);
    }
  }
  cargarStorage() {
    return new Promise( (resolve, reject) => {
      if (this.platform.is('cordova')) {
        // Celular
        this.storage.get('usuario').then(val => {
          if (val) {
            this.idUsuario = val;
            console.log(val);
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        // Escritorio
        if (localStorage.getItem('usuario')) {
          this.idUsuario = localStorage.getItem('usuario');
          console.log(localStorage.getItem('usuario'));
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }

  inicializarUsuario() {
        this.http.get(`https://boiling-reaches-83706.herokuapp.com/api/users/${this.idUsuario}`,
        httpOptions).subscribe(data => {
          this.usuario = data;
          this.data = true;
        });
  }

  borrarStorage() {
    if (this.platform.is('cordova')) {
      // Celular
      this.storage.remove('usuario');
    } else {
      // Escritorio
      localStorage.removeItem('usuario');
    }
  }
  // ivan.lopez3k@gmail.com
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
