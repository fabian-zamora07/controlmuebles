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
  selector: 'app-registrar-mueble',
  templateUrl: './registrar-mueble.component.html',
  styleUrls: ['./registrar-mueble.component.scss']
})
export class RegistrarMuebleComponent implements OnInit {
  formularioMuebles: FormGroup;
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
    this.formularioMuebles =this.fm.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      lugar: ['',Validators.required],
      color: ['',Validators.required],
      tipo: ['',Validators.required],
      fechaAdquisicion: ['',Validators.required],
      claveAlfanumerica: [''],
      responsable: [''],
      valor: ['',Validators.required],
      imagen: ['',Validators.required],

      
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
    const referencia = this.storage.ref(this.ruta)
    const tarea = referencia.put(this.archivo)
    this.spinner.show();
    tarea.then((objeto)=>{

      referencia.getDownloadURL().subscribe((url)=>{
        this.urlImagen = url;
        this.formularioMuebles.value.imagen = this.urlImagen
        this.formularioMuebles.value.activo = true
        this.formularioMuebles.value.autorizado = false
        this.formularioMuebles.value.registrado = this.usuario.email
        this.formularioMuebles.value.fechaAdquisicion = new Date(this.formularioMuebles.value.fechaAdquisicion)
        this.dato = this.item[0].codigoB+1
        this.formularioMuebles.value.codigoB = this.dato
        this.formularioCodigo.value.codigoB = this.dato

        this.formularioMuebles.value.revisado = false;
        this.formularioMuebles.value.revisadoPor = "";
        this.db.collection('muebles').add(this.formularioMuebles.value).then((termino)=>{
          this.db.doc('codigoBarras/'+'AuhuuinPfYZpKu67FDA2').update(this.formularioCodigo.value).then((resultado)=>{

          });
          this.spinner.hide();
          Swal.fire({
            title: "Registrado",
            text: "Se registro correctamente",
            icon: "success"
          }).then((result) => {
            window.location.reload();
          });

             })
      })
    })
  }

  subirImagen(event){
    let nombre = new Date().getTime().toString()
    this.archivo = event.target.files[0]
    let extension = this.archivo.name.toString().substring(this.archivo.name.toString().lastIndexOf('.'))
    this.ruta = 'muebles/'+nombre+extension;
  }

}
