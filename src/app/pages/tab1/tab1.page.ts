import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCrtl: AlertController) {

  }

  async agregarLista() {

    const alert = await this.alertCrtl.create({
      header: 'Nueva lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => console.log('Cancelar')
      },
      {
        text: 'Crear',
        handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }

            // Crear la lista
            const listaId = this.deseosService.crearLista(data.titulo);

            // Navego a add item
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
        }
      }]
    });

    alert.present();
  }

  listaSeleciconada(lista: Lista) {

    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);

  }

}
