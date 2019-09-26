import { Component } from '@angular/core';

import { FotosService } from './../services/fotos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public foto_serv: FotosService) {}

  ngOnInit(){
    this.foto_serv.carregarFotos();
  }
}
