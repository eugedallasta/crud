import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/interfaces/persona';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';


const listPersonas: Persona[] = [
  { id: 1, nombre: 'Juan', apellido: 'Perez', correo: 'jp@gmail.com', tipoDocumento: 'CC', documento: 123456789, fechaNacimiento: new Date('1990-01-01') },
  { id: 2, nombre: 'Maria', apellido: 'Gomez', correo: 'jp@gmail.com', tipoDocumento: 'CC', documento: 123456789, fechaNacimiento: new Date('1990-01-01') },
  { id: 3, nombre: 'Pedro', apellido: 'Perez', correo: 'jp@gmail.com', tipoDocumento: 'CC', documento: 123456789, fechaNacimiento: new Date('1990-01-01') },
  { id: 4, nombre: 'Juan', apellido: 'Perez', correo: 'jp@gmail.com', tipoDocumento: 'CC', documento: 123456789, fechaNacimiento: new Date('1990-01-01') },
  { id: 5, nombre: 'Maria', apellido: 'Gomez', correo: 'jp@gmail.com', tipoDocumento: 'CC', documento: 123456789, fechaNacimiento: new Date('1990-01-01') },
  { id: 6, nombre: 'Pedro', apellido: 'Perez', correo: 'jp@gmail.com', tipoDocumento: 'CC', documento: 123456789, fechaNacimiento: new Date('1990-01-01') },
];


@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimiento', 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) { this.dataSource = new MatTableDataSource(listPersonas); }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editarPersona(persona: Persona) {
    console.log(persona);
  }

  eliminarPersona(persona: Persona) {
    console.log(persona);
  }

  addEditPersona() {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '550px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
