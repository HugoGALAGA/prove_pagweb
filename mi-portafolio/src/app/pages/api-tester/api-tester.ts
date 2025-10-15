import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-tester',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './api-tester.html',
  styleUrls: ['./api-tester.css']
})
export class ApiTester {

  educationData: any[] = [];
  certificatesData: any[] = [];

  educationForm: FormGroup;
  certificateForm: FormGroup;

  constructor(
    private educationService: EducationService,
    private fb: FormBuilder
  ) {
    this.educationForm = this.fb.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      startYear: [''],
      endYear: [''],
      details: ['']
    });

    this.certificateForm = this.fb.group({
      name: ['', Validators.required],
      issuer: ['', Validators.required],
      date: [''],
      credentialUrl: ['']
    });
  }


  cargarDatos() {
    this.educationService.getEducation().subscribe(data => {
      console.log('Educación recibida:', data);
      this.educationData = data;
    });

    this.educationService.getCertificates().subscribe(data => {
      console.log('Certificados recibidos:', data);
      this.certificatesData = data;
    });
  }

  onSubmitEducation() {
    if (this.educationForm.invalid) {
      return; 
    }

    this.educationService.createEducation(this.educationForm.value).subscribe(() => {
      console.log('¡Educación creada con éxito!');
      this.educationForm.reset();
      this.cargarDatos(); 
    });
  }


  onDeleteEducation(id: number) {
    this.educationService.deleteEducation(id).subscribe(() => {
      console.log('Educación eliminada');
      this.cargarDatos(); 
    });
  }

  onSubmitCertificate() {
    if (this.certificateForm.invalid) return;
    this.educationService.createCertificate(this.certificateForm.value).subscribe(() => {
      console.log('Certificado creado');
      this.certificateForm.reset();
      this.cargarDatos();
    });
  }

  onDeleteCertificate(id: number) {
    this.educationService.deleteCertificate(id).subscribe(() => {
      console.log('Certificado eliminado');
      this.cargarDatos();
    });
  }


}
