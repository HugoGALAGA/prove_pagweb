import { Component } from '@angular/core';
import { Proyecto } from '../../models/proyecto'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-proyectos',
  imports: [CommonModule],
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
      imgUrl: 'proyecto1.png' // <-- Nombre del archivo en la carpeta /public
    },
    {
      titulo: 'Task Management App',
      descripcion: 'Aplicación de gestión de tareas con colaboración en tiempo real.',
      tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      linkDemo: '#',
      linkRepo: '#',
      imgUrl: 'data.png'
    },
    // ...Puedes añadir más proyectos aquí
  ];

}