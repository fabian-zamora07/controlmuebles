import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { PanelInsumosComponent } from './panel-insumos/panel-insumos.component';
import { RegistrarMuebleComponent } from './registrar-mueble/registrar-mueble.component';
import { RegistrarInsumosComponent } from './registrar-insumos/registrar-insumos.component';
import { AutorizarInsumosComponent } from './autorizar-insumos/autorizar-insumos.component';
import { AutorizarMueblesComponent } from './autorizar-muebles/autorizar-muebles.component';
import { RevisarInsumosComponent } from './revisar-insumos/revisar-insumos.component';
import { RevisarMueblesComponent } from './revisar-muebles/revisar-muebles.component';
import { ModificarInsumosComponent } from './modificar-insumos/modificar-insumos.component';
import { ModificarMuebleComponent } from './modificar-mueble/modificar-mueble.component';
const routes: Routes = [
  {
    path: 'panel-muebles', component: PanelPrincipalComponent

  },
  {
    path: 'panel-insumos', component: PanelInsumosComponent

  },
  {

    path: 'registrar-mueble', component: RegistrarMuebleComponent
  },
  {
    path: 'registrar-insumos', component: RegistrarInsumosComponent
  },
  {

    path: 'autorizar-mueble', component: AutorizarMueblesComponent
  },
  {
    path: 'autorizar-insumos', component: AutorizarInsumosComponent
  },
  {

    path: 'revisar-muebles', component: RevisarMueblesComponent
  },
  {
    path: 'revisar-insumos', component: RevisarInsumosComponent
  },
  {

    path: 'modificar-mueble/:muebleID/:atras', component: ModificarMuebleComponent
  },
  {
    path: 'modificar-insumos/:insumoID/:atras', component: ModificarInsumosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
