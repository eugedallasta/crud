import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Persona } from 'src/app/interfaces/persona';

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


  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      correo: ['', [Validators.required, Validators.email]],
      tipoDocumento: [null, Validators.required],
      documento: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }
  addEditPersona() {
    const persona: Persona = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      correo: this.form.value.correo,
      tipoDocumento: this.form.value.tipoDocumento,
      documento: this.form.value.documento,
      fechaNacimiento: this.form.value.fechaNacimiento
    }
    console.log(persona);
  }





}
