import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private readonly localStorageKey = 'proyectos';
  private readonly githubUsername = 'HugoGALAGA';
  private readonly apiUrl = `https://api.github.com/users/${this.githubUsername}/repos?sort=updated`;

  constructor(private http: HttpClient) { }

  // 1. Carga los proyectos desde localStorage
  cargarProyectos(): Proyecto[] {
    const proyectosJson = localStorage.getItem(this.localStorageKey);
    // Si no hay nada, devuelve una lista vacía. El componente decidirá si mostrar ejemplos.
    return proyectosJson ? JSON.parse(proyectosJson) : [];
  }

  // 2. Guarda la lista completa en localStorage
  guardarProyectos(proyectos: Proyecto[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(proyectos));
  }

  // 3. Obtiene los repositorios de GitHub y los convierte a nuestro formato
  obtenerProyectosDeGitHub(): Observable<Proyecto[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(repos => repos.map(repo => this.adaptarRepoAProyecto(repo)))
    );
  }

  // Función "traductora"
  private adaptarRepoAProyecto(repo: any): Proyecto {
    return {
      titulo: repo.name,
      descripcion: repo.description || 'Repositorio de GitHub.',
      tecnologias: repo.topics || [],
      linkRepo: repo.html_url,
      linkDemo: repo.homepage || '',
      imgUrl: `https://raw.githubusercontent.com/${this.githubUsername}/${repo.name}/main/screenshot.png` // Ruta a imagen de preview
    };
  }
}