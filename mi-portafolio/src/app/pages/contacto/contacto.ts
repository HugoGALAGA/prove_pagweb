import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  enviarMensaje() {
    if (this.contactForm.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const nuevoMensaje: Mensaje = {
      ...this.contactForm.value,
      fecha: new Date()
    };

    const mensajesGuardados = localStorage.getItem('mensajes');
    let mensajes: Mensaje[] = mensajesGuardados ? JSON.parse(mensajesGuardados) : [];

    mensajes.push(nuevoMensaje);

    localStorage.setItem('mensajes', JSON.stringify(mensajes));

    alert('¡Mensaje enviado y guardado con éxito!');
    console.log('Mensajes guardados:', mensajes);

    this.contactForm.reset();
  }
}