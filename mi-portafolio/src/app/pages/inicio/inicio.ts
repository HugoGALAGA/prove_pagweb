import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

  // --- 2. CREA EL MÉTODO DE DESCARGA ---
  descargarCV() {
    // a. Crea una nueva instancia de jsPDF
    const doc = new jsPDF();

    // b. Selecciona los elementos HTML que quieres incluir en el PDF
    //    Usaremos querySelector para obtener el contenido de cada sección.
    //    ¡IMPORTANTE! Los selectores deben apuntar a los IDs o clases de tus secciones.
    const inicioContent = document.querySelector('#inicio .hero-content')?.innerHTML || '';
    const sobreMiContent = document.querySelector('#sobre-mi .container')?.innerHTML || '';
    const proyectosContent = document.querySelector('#proyectos .container')?.innerHTML || '';
    const experienciaContent = document.querySelector('#experiencia .container')?.innerHTML || '';
    
    // c. Añade el contenido al documento PDF
    //    El método .html() es experimental pero funciona para contenido simple.
    //    Necesitarás ajustar las coordenadas (x, y) y los anchos (width)
    //    para que el contenido se vea bien. Esto requiere prueba y error.
    
    // Por simplicidad, empecemos solo con el contenido de la sección "Inicio"
    doc.text("Mi Portafolio - Hugo Galina", 10, 10);
    doc.text("Sección: Sobre mí", 10, 20);
    // ... aquí necesitaríamos una lógica más compleja para renderizar el HTML

    // *** MÉTODO SIMPLIFICADO: Generemos un PDF simple con texto por ahora ***
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
    
    // d. Guarda el archivo
    docSimple.save('cv-hugo-galina.pdf');
  }
}