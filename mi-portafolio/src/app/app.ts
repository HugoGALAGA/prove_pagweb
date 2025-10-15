import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiTester } from './pages/api-tester/api-tester';


import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Inicio } from './pages/inicio/inicio';
import { SobreMi } from './pages/sobre-mi/sobre-mi';
import { Proyectos } from './pages/proyectos/proyectos';
import { Experiencia } from './pages/experiencia/experiencia';
import { Contacto } from './pages/contacto/contacto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Inicio, SobreMi, Proyectos, Experiencia, Contacto, ApiTester],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-portafolio');
}
