
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private readonly localStorageKey = 'proyectos'; 
  constructor() { }

  cargarProyectos(): Proyecto[] {
    const proyectosJson = localStorage.getItem(this.localStorageKey);
    
    if (!proyectosJson) {
      return [
        {
          titulo: 'E-Commerce Platform',
          descripcion: 'Plataforma completa de comercio electrónico con carrito, pagos y administración.',
          tecnologias: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          linkDemo: '#',
          linkRepo: '#',
          imgUrl: 'proyecto1.jpg'
        },
        {
          titulo: 'Task Management App',
          descripcion: 'Aplicación de gestión de tareas con colaboración en tiempo real.',
          tecnologias: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
          linkDemo: '#',
          linkRepo: '#',
          imgUrl: 'proyecto2.jpg'
        }
      ];
    }

    return JSON.parse(proyectosJson);
  }

  guardarProyectos(proyectos: Proyecto[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(proyectos));
  }
}