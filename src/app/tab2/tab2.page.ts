import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MenuController } from '@ionic/angular';
import { CubiculosService } from '../services/cubiculos.service';
import { IUsuarioService } from '../services/iusuario.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  numeroCubiculo: number;
  check = [];
  idHorario = [];
  usuario;
  data = false;

  constructor(
               public uS: UserService,
               private menu: MenuController,
               public cS: CubiculosService,
               public iUS: IUsuarioService
             ) {
              this.numeroCubiculo =  3;
    // this.uS.inicializarUsuario();
  }
  openFirst() {
    this.menu.enable(true, 'second');
    this.menu.toggle('second');
  }

  seleccionarCubiculo( cubiculo: number) {
    this.numeroCubiculo = cubiculo;
    this.cS.obtenerCubiculo(cubiculo);
  }


  apartarCubiculo() {
    console.log(this.check, 'hora');
  }

  onSubmit(forma ) {
    for (let index = 0; index <= Object.keys(forma.value).length; index++) {
      if (forma.value[index]) {
        this.idHorario.push(index);
      }
    }
    console.log('idHorario', this.idHorario,
                'numeroCubiculo:', this.numeroCubiculo,
                'idUsuario', this.uS.usuarioLogeado.id);
    this.iUS.presentAlertPromptCubicules(this.uS.usuarioLogeado.id, this.numeroCubiculo, this.idHorario);
  }
}
