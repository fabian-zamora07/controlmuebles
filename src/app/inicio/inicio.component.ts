import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { User } from 'firebase/app';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {
  firebase:any;
  usuario: User;
  jefe:boolean= false;
  collapsed = true;
  constructor(public router: Router, public afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((usuario)=>{

      this.usuario = usuario;
      if (usuario.email === 'controlmi20201@gmail.com' || usuario.email === 'controlmi20202@gmail.com') {
        this.jefe = true;
      }
   

  })

   }

  ngOnInit(): void {
    
  }

     toggleCollapsed(): void {
       this.collapsed = !this.collapsed;
     }
  muebles(){
    this.router.navigateByUrl('/panel-muebles');
    
  }
  registrarM(){
    this.router.navigateByUrl('/registrar-mueble');
    
  }
  revisarM(){
    this.router.navigateByUrl('/revisar-muebles');
    
  }
  autorizarM(){
    this.router.navigateByUrl('/autorizar-mueble');
    
  }
  insumos(){
    this.router.navigateByUrl('/panel-insumos');
    
  }
  registrarI(){
    this.router.navigateByUrl('/registrar-insumos');
    
  }
  revisarI(){
    this.router.navigateByUrl('/revisar-insumos');
    
  }
  autorizarI(){
    this.router.navigateByUrl('/autorizar-insumos');
    
  }
  logout() {
    this.router.navigateByUrl('/');
    this.afAuth.auth.signOut();
  }

}
