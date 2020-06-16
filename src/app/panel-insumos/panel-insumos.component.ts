import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-panel-insumos',
  templateUrl: './panel-insumos.component.html',
  styleUrls: ['./panel-insumos.component.scss']
})
export class PanelInsumosComponent implements OnInit {
 item: any[] = new Array<any>();
 elementType:  'img';
 href : string;
 searchText: any = { nombre: "" };
 cambio: any;
 nombre: any = 'nombre';
 pageActual: number = 1;
 userFilter: any = { tipo: "" };
 papeleria: any ='Papelería/Oficina';
 cocina: any ='Cocina';
 higiene: any ='Higiene/Aseo/Limpieza';
 prevencion: any ='Prevención';
 formularioInsumos: FormGroup;
  constructor(private fm: FormBuilder,public router: Router, private storage: AngularFireStorage,
    public afAuth: AngularFireAuth, private db: AngularFirestore,private spinner: NgxSpinnerService, private activeRoute: ActivatedRoute) {
    //this.bd.collection("muebles").valueChanges().subscribe((resultado)=>{
      //  this.item = resultado;
        
    //});

   }

  ngOnInit(): void {
    this.item.length = 0;
    this.db.collection("insumos").get().subscribe((resultado)=>{
        resultado.docs.forEach((ite)=>{


          let mueble = ite.data();
          mueble.id = ite.id;
          mueble.fechacompra = new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10);
          mueble.ref = ite.ref;
          this.item.push(mueble);


        })
        
    });
    this.formularioInsumos =this.fm.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      tipo: ['',Validators.required],
      fechacompra: ['',Validators.required],
      precio: ['',Validators.required],
      fechaTerminado:['']


      
    })
    


  }
  cambiarnombre(cambios): void {
    var c = cambios;
    this.cambio = c;
    console.log(this.cambio);
}
  bajar(id){
    this.db.doc<any>('insumos'+'/'+id).valueChanges().subscribe((muebles)=>{
      console.log(muebles);
      this.formularioInsumos.setValue({
        nombre: muebles.nombre,
        descripcion: muebles.descripcion,
        precio: muebles.precio,

        tipo: muebles.tipo,
        fechacompra: new Date(muebles.fechacompra.seconds * 1000).toISOString().substr(0,10),
        fechaTerminado: new Date(muebles.fechacompra.seconds * 1000).toISOString().substr(0,10),

      })
      console.log(this.formularioInsumos.value.fechacompra, muebles.tipo);
    })
    Swal.fire({
      title: "Se acabo?",
      text: "¿El insumo se termino?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
  }).then((result) => {
      if (result.value) {

        this.spinner.show();
        this.formularioInsumos.value.activo = false;
        this.formularioInsumos.value.fechacompra = new Date(this.formularioInsumos.value.fechacompra);
        this.formularioInsumos.value.fechaTerminado = new Date();
        this.db.doc('insumos/'+id).update(this.formularioInsumos.value).then((resultado)=>{
          this.spinner.hide();
          Swal.fire({
            title: "Terminado",
            text: "Se modifico correctamente",
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