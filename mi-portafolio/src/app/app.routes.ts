import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { SobreMi } from './pages/sobre-mi/sobre-mi';
import { Proyectos } from './pages/proyectos/proyectos';
import { Experiencia } from './pages/experiencia/experiencia';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
    { path: 'inicio', component: Inicio },
    { path: 'sobre-mi', component: SobreMi },
    { path: 'proyectos', component: Proyectos },
    { path: 'experiencia', component: Experiencia },
    { path: 'contacto', component: Contacto },
    { path: '**', redirectTo: '' } 
];