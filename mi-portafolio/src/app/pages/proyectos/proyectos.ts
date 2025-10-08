import { Component } from '@angular/core';
import { Proyecto } from '../../models/proyecto'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-proyectos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})

export class Proyectos { // O ProyectosComponent, según tu archivo

  // Lista de proyectos
  proyectos: Proyecto[] = [
    {
      titulo: 'E-Commerce Platform',
      descripcion: 'Plataforma completa de comercio electrónico con carrito, pagos y administración.',
      tecnologias: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      linkDemo: '#',
      linkRepo: '#',
      imgUrl: 'imgs/git.png' // <-- Nombre del archivo en la carpeta /public
    },
    {
      titulo: 'Task Management App',
      descripcion: 'Aplicación de gestión de tareas con colaboración en tiempo real.',
      tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      linkDemo: '#',
      linkRepo: '#',
      imgUrl: 'imgs/data.png'
    },

  ];

  proyectoForm: FormGroup;

  constructor(private fb: FormBuilder) {
      this.proyectoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      imgUrl: [''],
      tecnologias: ['', Validators.required],
      linkRepo: [''],
      linkDemo: ['']
    });
  }

  agregarProyecto() {
    // 1. Verifica si el formulario es válido
    if (this.proyectoForm.invalid) {
      return; // Si no es válido, no hace nada
    }

    // 2. Crea el nuevo objeto Proyecto a partir de los datos del formulario
    const nuevoProyecto: Proyecto = {
      titulo: this.proyectoForm.value.titulo,
      descripcion: this.proyectoForm.value.descripcion,
      imgUrl: this.proyectoForm.value.imgUrl || 'placeholder.jpg', // Usa una imagen por defecto si no se provee
      // Convierte el string de tecnologías en un array
      tecnologias: this.proyectoForm.value.tecnologias.split(',').map((tech: string) => tech.trim()),
      linkRepo: this.proyectoForm.value.linkRepo,
      linkDemo: this.proyectoForm.value.linkDemo
    };

    // 3. Añade el nuevo proyecto a la lista
    this.proyectos.push(nuevoProyecto);

    // 4. Limpia el formulario para el próximo uso
    this.proyectoForm.reset();

    // 5. Cierra el modal (esto es un pequeño truco con Bootstrap)
    const modalElement = document.getElementById('addProjectModal');
    if (modalElement) {
      // Necesitamos importar Modal de bootstrap para que esto funcione
      // Lo haremos en el siguiente paso si es necesario
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if(modal) modal.hide();
    }
  }


}