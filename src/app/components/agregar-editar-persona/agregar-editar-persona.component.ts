import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent implements OnInit {
  tipoDocumento: string[] = [
    'DNI',
    'Pasaporte',
    'Libreta Cívica',
  ];
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  tituloOperacion: string = 'Agregar ';
  id: number;

  constructor
    (public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
      private fb: FormBuilder,
      private _personaService: PersonaService,
      private _snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any) {

    this.maxDate = new Date();
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      correo: ['', [Validators.required, Validators.email]],
      tipoDocumento: [null, Validators.required],
      documento: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaNacimiento: [null, Validators.required],
    });
    this.id = data.id;
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (this.data.id !== undefined) {
      this.tituloOperacion = 'Editar ';
      this.getPersona(this.id);
    }
  }
  getPersona(id: number) {
    this._personaService.getPersona(id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        tipoDocumento: data.tipoDocumento,
        documento: data.documento,
        fechaNacimiento: new Date(data.fechaNacimiento)
      });
    })
  }

  cancelar() {
    this.dialogRef.close(false);
  }
  addEditPersona() {
    const persona: Persona = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      correo: this.form.value.correo,
      tipoDocumento: this.form.value.tipoDocumento,
      documento: this.form.value.documento,
      fechaNacimiento: this.form.value.fechaNacimiento.toISOString().slice(0, 10),
    }
    this.loading = true;
    if (this.data.id === undefined) {
      //Es Agregar
      this._personaService.addPersona(persona).subscribe(() => {
        this.mensajeSnackBar('agregada');
      });
    } else {
      //Es Editar
      this._personaService.updatePersona(this.id, persona).subscribe(() => {
        this.mensajeSnackBar('editada');
      });
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

  mensajeSnackBar(operacion: string) {
    this._snackBar.open(`La persona fue ${operacion} correctamente`, '', {
      duration: 1000,
    });
  }





}
