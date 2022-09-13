import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
    private fb: FormBuilder, private _personaService: PersonaService, private _snackBar: MatSnackBar) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      correo: ['', [Validators.required, Validators.email]],
      tipoDocumento: [null, Validators.required],
      documento: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaNacimiento: [null, Validators.required],
    });
  }

  ngOnInit(): void {
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
    this._personaService.addPersona(persona).subscribe(() => {
      this.loading = false;
      this.mensajeSnackBar();
      this.dialogRef.close(true);

    });

  }

  mensajeSnackBar() {
    this._snackBar.open('La persona fue agregada correctamente', '', {
      duration: 1000,
    });
  }





}
