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
  selector: 'app-autorizar-muebles',
  templateUrl: './autorizar-muebles.component.html',
  styleUrls: ['./autorizar-muebles.component.scss']
})
export class AutorizarMueblesComponent implements OnInit {
  item: any[] = new Array<any>();
  formularioMuebles: FormGroup;
  elementType:  'img';
  href : string;
  id: any;
  usuario: User;
  completoA: any;
  num = 0;
completoR: any;
formularioMueblesD: FormGroup;
urlImagen: any;
  constructor(private fm: FormBuilder,public router: Router, private storage: AngularFireStorage,public afAuth: AngularFireAuth, private db: AngularFirestore,private spinner: NgxSpinnerService, private activeRoute: ActivatedRoute) {
    //this.bd.collection("muebles").valueChanges().subscribe((resultado)=>{
      //  this.item = resultado;
        
    //});
    this.afAuth.user.subscribe((usuario)=>{

      this.usuario = usuario;
      console.log( this.usuario.email);
   

  })

   }

  ngOnInit(): void {
    this.formularioMuebles =this.fm.group({
      autorizado: [''],


      
    })
    this.item.length = 0;
    this.db.collection("muebles").get().subscribe((resultado)=>{
        resultado.docs.forEach((ite)=>{

          let mueble = ite.data();
          mueble.id = ite.id;
          mueble.ref = ite.ref;
          this.item.push(mueble)
          this.mensaje();
        })
        
    });
    this.formularioMueblesD =this.fm.group({
      nombre: [''],
      descripcion: [''],
      lugar: [''],
      color: [''],
      tipo: [''],
      fechaAdquisicion: [''],
      claveAlfanumerica: [''],
      valor: [''],
      imagen: [''],

      
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
    this.formularioMuebles.value.autorizado = true;
    this.db.doc('muebles/'+id).update(this.formularioMuebles.value).then((resultado)=>{
     
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
  mostrarFoto(foto: String, parte: String): void{
    Swal.fire({
        title: `${parte}`,
        imageUrl: `${foto}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    });
}

bajar(id){
  this.db.doc<any>('muebles'+'/'+this.id).valueChanges().subscribe((muebles)=>{
    console.log(muebles);
    this.formularioMueblesD.setValue({
      nombre: muebles.nombre,
      descripcion: muebles.descripcion,
      lugar: muebles.lugar,
      color: muebles.color,
      tipo: muebles.tipo,
      fechaAdquisicion: new Date(muebles.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
      claveAlfanumerica: muebles.claveAlfanumerica,
      valor: muebles.valor,
      imagen: '',
    })
    this.urlImagen = muebles.imagen;
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
      this.formularioMuebles.value.imagen = this.urlImagen;
      this.formularioMuebles.value.revisado = false;
      this.formularioMuebles.value.autorizado = false;
      this.formularioMuebles.value.revisadoPor = "";
      this.formularioMuebles.value.fechaAdquisicion = new Date(this.formularioMuebles.value.fechaAdquisicion);
      this.db.doc('muebles/'+this.id).update(this.formularioMuebles.value).then((resultado)=>{
        
        this.spinner.hide();
                Swal.fire({
          title: "Modificado",
          text: "Se modifico correctamente",
          icon: "success"
        });
        this.router.navigateByUrl('/revisar-mueble');
      }).catch(()=>{
       console.log('Error')
      })
    }
  })


}

}
