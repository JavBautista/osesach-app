import { Component, Input,  OnInit } from '@angular/core';
import { Directory } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss'],
})
export class UnidadComponent implements OnInit {

  @Input() directory:Directory
  constructor() { }

  ngOnInit() {
    console.log('Componente:')
    console.log(this.directory)
  }

}
