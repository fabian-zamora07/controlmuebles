import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { InicioComponent } from './inicio/inicio.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore } from 'angularfire2/firestore';
import { RegistrarMuebleComponent } from './registrar-mueble/registrar-mueble.component';
import { PanelInsumosComponent } from './panel-insumos/panel-insumos.component';
import { RegistrarInsumosComponent } from './registrar-insumos/registrar-insumos.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ModificarMuebleComponent } from './modificar-mueble/modificar-mueble.component';
import { ModificarInsumosComponent } from './modificar-insumos/modificar-insumos.component';
import { RevisarInsumosComponent } from './revisar-insumos/revisar-insumos.component';
import { AutorizarInsumosComponent } from './autorizar-insumos/autorizar-insumos.component';
import { AutorizarMueblesComponent } from './autorizar-muebles/autorizar-muebles.component';
import { RevisarMueblesComponent } from './revisar-muebles/revisar-muebles.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ExcelService } from './recursos/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelPrincipalComponent,
    InicioComponent,
    RegistrarMuebleComponent,
    PanelInsumosComponent,
    RegistrarInsumosComponent,
    ModificarMuebleComponent,
    ModificarInsumosComponent,
    RevisarInsumosComponent,
    AutorizarInsumosComponent,

    AutorizarMueblesComponent,
    RevisarMueblesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    FormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    BsDropdownModule.forRoot(),
     BrowserAnimationsModule,
     NgxBarcode6Module,
     AngularFireStorageModule,
     FilterPipeModule,


  ],
  providers: [
    AngularFireAuth, AngularFirestore, ExcelService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
