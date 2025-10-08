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

export class Proyectos { 

  proyectos: Proyecto[] = [
    {
      titulo: 'E-Commerce Platform',
      descripcion: 'Plataforma completa de comercio electrónico con carrito, pagos y administración.',
      tecnologias: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      linkDemo: '#',
      linkRepo: '#',
      imgUrl: 'imgs/git.png' 
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
    if (this.proyectoForm.invalid) {
      return; 
    }

    const nuevoProyecto: Proyecto = {
      titulo: this.proyectoForm.value.titulo,
      descripcion: this.proyectoForm.value.descripcion,
      imgUrl: this.proyectoForm.value.imgUrl || 'placeholder.jpg',
      tecnologias: this.proyectoForm.value.tecnologias.split(',').map((tech: string) => tech.trim()),
      linkRepo: this.proyectoForm.value.linkRepo,
      linkDemo: this.proyectoForm.value.linkDemo
    };

    this.proyectos.push(nuevoProyecto);

    this.proyectoForm.reset();

    const modalElement = document.getElementById('addProjectModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if(modal) modal.hide();
    }
  }

  eliminarProyecto(proyectoAEliminar: Proyecto) {
  this.proyectos = this.proyectos.filter(p => p !== proyectoAEliminar);
    
  console.log('Proyecto eliminado:', proyectoAEliminar.titulo);
  }


}