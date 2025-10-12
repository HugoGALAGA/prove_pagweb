import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto'; 
@Component({
  selector: 'app-proyectos',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyectos.html', 
  styleUrl: './proyectos.css' 
})

export class Proyectos implements OnInit { 

  proyectos: Proyecto[] = [];

  proyectoForm: FormGroup;

    proyectoAEditar: Proyecto | null = null; 

    constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService
  ) {
    this.proyectoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      imgUrl: [''],
      tecnologias: ['', Validators.required],
      linkRepo: [''],
      linkDemo: ['']
    });
  }

  ngOnInit(): void {
    this.proyectos = this.proyectoService.cargarProyectos();
  }

    abrirModalParaCrear() {
    // 1. Asegura que no estamos en modo edición
    this.proyectoAEditar = null;
    // 2. Limpia cualquier dato que pudiera haber en el formulario
    this.proyectoForm.reset();
  }

  iniciarEdicion(proyecto: Proyecto) {
      this.proyectoAEditar = proyecto;

      this.proyectoForm.patchValue({
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      imgUrl: proyecto.imgUrl,
      tecnologias: proyecto.tecnologias.join(', '),
      linkRepo: proyecto.linkRepo,
      linkDemo: proyecto.linkDemo
    });
  }

  eliminarProyecto(proyectoAEliminar: Proyecto) {
    this.proyectos = this.proyectos.filter(p => p !== proyectoAEliminar);
    
    this.proyectoService.guardarProyectos(this.proyectos);

    console.log('Proyecto eliminado:', proyectoAEliminar.titulo);
  }

  guardarProyecto() {
    if (this.proyectoForm.invalid) return;

    if (this.proyectoAEditar) {
      const index = this.proyectos.findIndex(p => p === this.proyectoAEditar);
      if (index !== -1) {
        const proyectoActualizado = {
          ...this.proyectoAEditar, 
          ...this.proyectoForm.value,
          tecnologias: this.proyectoForm.value.tecnologias.split(',').map((t:string) => t.trim())
        };
        this.proyectos[index] = proyectoActualizado;
      }
    } else {
      const nuevoProyecto: Proyecto = {
        titulo: this.proyectoForm.value.titulo,
        descripcion: this.proyectoForm.value.descripcion,
        imgUrl: this.proyectoForm.value.imgUrl || 'placeholder.jpg',
        tecnologias: this.proyectoForm.value.tecnologias.split(',').map((tech: string) => tech.trim()),
        linkRepo: this.proyectoForm.value.linkRepo,
        linkDemo: this.proyectoForm.value.linkDemo
      };
      this.proyectos.push(nuevoProyecto);
    }
      
    this.proyectoService.guardarProyectos(this.proyectos);
    this.cancelarEdicion(); 
  }
    
  cancelarEdicion() {
    this.proyectoAEditar = null;
    this.proyectoForm.reset();
    // Código para cerrar el modal
    const modalElement = document.getElementById('addProjectModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if(modal) modal.hide();
    }
  }

}