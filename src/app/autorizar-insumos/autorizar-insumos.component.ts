import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2';
import {FormGroup, FormBuilder} from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-autorizar-insumos',
  templateUrl: './autorizar-insumos.component.html',
  styleUrls: ['./autorizar-insumos.component.scss']
})
export class AutorizarInsumosComponent implements OnInit {
  item: any[] = new Array<any>();
  formularioInsumos: FormGroup;
  formularioInsumosD: FormGroup;
  elementType:  'img';
  href : string;
  id: any;
  usuario: User;
  completoA: any;
  num = 0;
completoR: any;
  constructor(private fm: FormBuilder,public router: Router, private storage: AngularFireStorage,public afAuth: AngularFireAuth, private db: AngularFirestore,private spinner: NgxSpinnerService, private activeRoute: ActivatedRoute) {
    //this.bd.collection("insumos").valueChanges().subscribe((resultado)=>{
      //  this.item = resultado;
        
    //});
    this.afAuth.user.subscribe((usuario)=>{

      this.usuario = usuario;
      console.log( this.usuario.email);
   

  })

   }

  ngOnInit(): void {
    this.formularioInsumos =this.fm.group({
      autorizado: [''],


      
    })
    this.item.length = 0;
    this.db.collection("insumos").get().subscribe((resultado)=>{
        resultado.docs.forEach((ite)=>{

          let mueble = ite.data();
          mueble.id = ite.id;
          mueble.fechacompra = new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10);
          mueble.ref = ite.ref;
          this.item.push(mueble)
          this.mensaje();
        })
        
    });
    this.formularioInsumosD =this.fm.group({
      nombre: [''],
      descripcion: [''],
      tipo: [''],
      fechacompra: [''],
      precio: [''],


      
    })
    
 

  }


  mensaje(){

    for (let index = 0; index < this.item.length; index++) {
      this.completoA = this.item[index].autorizado;
      this.completoR = this.item[index].revisado;
      if (this.completoA === false && this.completoR === true) {
        this.num = 1;
 
      }
    }

  }
  autorizar(id){
    console.log(id)
    this.formularioInsumos.value.autorizado = true;
    this.db.doc('insumos/'+id).update(this.formularioInsumos.value).then((resultado)=>{

      Swal.fire({
        title: "Autorizado",
        text: "Se a autorizado correctamente",
        icon: "success"
      }).then((result) => {
        window.location.reload();
      });
    }).catch(()=>{
     console.log('Error');
    });
  }

  bajar(id){
    this.db.doc<any>('insumos'+'/'+id).valueChanges().subscribe((muebles)=>{
      console.log(muebles);
      this.formularioInsumosD.setValue({
        nombre: muebles.nombre,
        descripcion: muebles.descripcion,
        precio: muebles.precio,

        tipo: muebles.tipo,
        fechacompra: new Date(muebles.fechacompra.seconds * 1000).toISOString().substr(0,10),

      })
      console.log(this.formularioInsumosD.value.fechacompra, muebles.tipo);
    })
    Swal.fire({
      title: "Declinar",
      text: "¿Declinar el insumo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.value) {

        this.spinner.show();
        this.formularioInsumosD.value.revisado = false;
        this.formularioInsumosD.value.autorizado = false;
        this.formularioInsumosD.value.revisadoPor = null;
        this.formularioInsumosD.value.fechacompra = new Date(this.formularioInsumosD.value.fechacompra);
        this.db.doc('insumos/'+id).update(this.formularioInsumosD.value).then((resultado)=>{
          this.spinner.hide();
          Swal.fire({
            title: "Declinado",
            text: "Se declinó correctamente",
            icon: "success"
          }).then((result) => {
            window.location.reload();
          });
    
        }).catch(()=>{
            console.log('Error')
          })
      }
    })


  }
}
