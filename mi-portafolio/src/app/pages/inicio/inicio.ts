import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

  descargarCV() {
    const doc = new jsPDF();

    const inicioContent = document.querySelector('#inicio .hero-content')?.innerHTML || '';
    const sobreMiContent = document.querySelector('#sobre-mi .container')?.innerHTML || '';
    const proyectosContent = document.querySelector('#proyectos .container')?.innerHTML || '';
    const experienciaContent = document.querySelector('#experiencia .container')?.innerHTML || '';
    
    
    doc.text("Mi Portafolio - Hugo Galina", 10, 10);
    doc.text("Sección: Sobre mí", 10, 20);

    const docSimple = new jsPDF();
    docSimple.setFontSize(22);
    docSimple.text("Hugo Galina", 20, 20);
    docSimple.setFontSize(16);
    docSimple.text("Desarrollador Full Stack", 20, 30);
    
    docSimple.setFontSize(12);
    docSimple.text("EXPERIENCIA", 20, 50);
    docSimple.text("Senior Full Stack Developer en Tech Corp (2022-Presente)", 20, 60);
    
    docSimple.text("PROYECTOS", 20, 80);
    docSimple.text("- E-Commerce Platform (React, Node.js)", 20, 90);
    
    docSimple.save('cv-hugo-galina.pdf');
  }
}