import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ArticulosService } from './articulos.service';
import { CubiculosService } from './cubiculos.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IUsuarioService {

  constructor(
    public alertController: AlertController,
    public aS: ArticulosService,
    public cS: CubiculosService,
    private router: Router
  ) { }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Correcto',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlertPrompt(id) {
    const alert = await this.alertController.create({
      header: 'Reservar Articulo!',
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: ( n ) => {
            this.aS.reservarArticulo(id, Number(n.cantidad))
            .subscribe((resp: any) => {
                this.presentAlert(resp.message);
                this.aS.getArticulos();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptCubicules(iduser, idcubicules, idschedules) {
    const alert = await this.alertController.create({
      header: 'Reservar Cubiculo!',
      message: `Seguro que desea reservar el cubículo ${idcubicules}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          handler: ( ) => {
            this.cS.apartarCubiculo(iduser, idcubicules, idschedules)
            .subscribe(res => {
              // window.location.href = '/main/tabs/tab1'; // redireccionar a otra pagina
              // if (!res) {
              //   this.presentAlert('Ocurrió un error al reservar');
              // } else {
              //   // this.presentAlert('Reservación realizada correctamente');
              //   // this.router.navigate(['/main/tabs/tab1']);
              //   this.cS.getCubiculos();
              // }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}

