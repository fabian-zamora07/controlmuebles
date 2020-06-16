import { Component, OnInit } from '@angular/core';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-insumos',
  templateUrl: './registrar-insumos.component.html',
  styleUrls: ['./registrar-insumos.component.scss']
})
export class RegistrarInsumosComponent implements OnInit {
  formularioInsumos: FormGroup;
  formularioCodigo: FormGroup;
  urlImagen: any;
  ruta: any;
  archivo: any;
  usuario: User;
  item: any[] = new Array<any>();
  dato: any;
  constructor(private fm: FormBuilder, public router: Router, private storage: AngularFireStorage,
    public afAuth: AngularFireAuth, private db: AngularFirestore, private spinner: NgxSpinnerService) { 
    this.spinner.hide();
    this.afAuth.user.subscribe((usuario)=>{

      this.usuario = usuario;
  });
  }

  ngOnInit(): void {
    this.formularioInsumos =this.fm.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      tipo: ['',Validators.required],
      fechacompra: ['',Validators.required],
      precio: ['',Validators.required],


      
    })
    this.formularioCodigo =this.fm.group({
       codigoB:[''],
    })
    this.item.length = 0;
    this.db.collection("codigoBarras").get().subscribe((resultado)=>{
        resultado.docs.forEach((ite)=>{


          let mueble = ite.data();
          mueble.id = ite.id;
          mueble.ref = ite.ref;
          this.item.push(mueble)

        })
        
    });
  }
  agregar(){

        this.formularioInsumos.value.activo = true
        this.formularioInsumos.value.autorizado = false
        this.formularioInsumos.value.registrado = this.usuario.email
        this.formularioInsumos.value.fechacompra = new Date(this.formularioInsumos.value.fechacompra)
        this.formularioInsumos.value.revisado = false;
        this.formularioInsumos.value.revisadoPor = "";
        this.db.collection('insumos').add(this.formularioInsumos.value).then((termino)=>{
          this.spinner.hide();
          
          Swal.fire({
            title: "Registrado",
            text: "Se registro correctamente",
            icon: "success"
          }).then((result) => {
            window.location.reload();
          });
             })

  }



}
