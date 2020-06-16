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
  selector: 'app-modificar-insumos',
  templateUrl: './modificar-insumos.component.html',
  styleUrls: ['./modificar-insumos.component.scss']
})
export class ModificarInsumosComponent implements OnInit {
  formularioInsumos: FormGroup;

  urlImagen: any;
  ruta: any;
  archivo: any;
  usuario: User;
  item: any[] = new Array<any>();
  dato: any;
  id : string;
  nuevaImg = 0;
  constructor(private fm: FormBuilder,public router: Router, private storage: AngularFireStorage,
    public afAuth: AngularFireAuth, private db: AngularFirestore,private spinner: NgxSpinnerService, private activeRoute: ActivatedRoute) { 
    this.spinner.hide();
    this.afAuth.user.subscribe((usuario)=>{

      this.usuario = usuario;
  })
  }

  ngOnInit(): void {
    this.formularioInsumos =this.fm.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      tipo: ['',Validators.required],
      fechacompra: ['',Validators.required],
      precio: ['',Validators.required],


      
    })
    this.id = this.activeRoute.snapshot.params.insumoID;
    this.db.doc<any>('insumos'+'/'+this.id).valueChanges().subscribe((muebles)=>{
      console.log(muebles);
      this.formularioInsumos.setValue({
        nombre: muebles.nombre,
        descripcion: muebles.descripcion,
        precio: muebles.precio,

        tipo: muebles.tipo,
        fechacompra: new Date(muebles.fechacompra.seconds * 1000).toISOString().substr(0,10),

      })

    })
    this.item.length = 0;
    this.db.collection("codigoBarras").get().subscribe((resultado)=>{
        resultado.docs.forEach((ite)=>{


          let mueble = ite.data();
          mueble.id = ite.id;
          mueble.ref = ite.ref;
          this.item.push(mueble)
          console.log();

        })
        
    });
  
  
  }

  editar(){

      this.spinner.show();
      this.formularioInsumos.value.revisado = false;
      this.formularioInsumos.value.autorizado = false;
      this.formularioInsumos.value.revisadoPor = null;
      this.formularioInsumos.value.fechacompra = new Date(this.formularioInsumos.value.fechacompra);
      this.db.doc('insumos/'+this.id).update(this.formularioInsumos.value).then((resultado)=>{
        this.spinner.hide();
        Swal.fire({
          title: "Modificado",
          text: "Se modifico correctamente",
          icon: "success"
        }).then((result) => {
          this.router.navigateByUrl('/revisar-insumos');
        });

      }).catch(()=>{
       console.log('Error')
      })

    }

  }
