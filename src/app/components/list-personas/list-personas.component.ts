import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';


const listPersonas: Persona[] = [
  { id: 1, nombre: 'Juan', apellido: 'Perez', correo: 'jp@gmail.com', tipoDocumento: 'CC', documento: 123456789, fechaNacimiento: new Date('1990-01-01') },


];


@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimiento'];
  dataSource = listPersonas;
  constructor() { }

  ngOnInit(): void {
  }

}
