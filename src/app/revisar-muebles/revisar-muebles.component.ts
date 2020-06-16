import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2';
import {FormGroup, FormBuilder} from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
@Component({
  selector: 'app-revisar-muebles',
  templateUrl: './revisar-muebles.component.html',
  styleUrls: ['./revisar-muebles.component.scss']
})
export class RevisarMueblesComponent implements OnInit {
  item: any[] = new Array<any>();
  formularioMuebles: FormGroup;
  elementType:  'img';
  href : string;
  id: any;
  usuario: User;
  completo: any;
  num = 0;
  constructor(private fm: FormBuilder,public router: Router, private storage: AngularFireStorage,public afAuth: AngularFireAuth, private db: AngularFirestore,private spinner: NgxSpinnerService, private activeRoute: ActivatedRoute) {
    //this.bd.collection("muebles").valueChanges().subscribe((resultado)=>{
      //  this.item = resultado;
        
    //});
    this.afAuth.user.subscribe((usuario)=>{

      this.usuario = usuario;
      console.log( this.usuario.email)
   

  })

   }

  ngOnInit(): void {
    this.formularioMuebles =this.fm.group({
      revisado: [''],
      revisadoPor: [''],


      
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


  }
  mensaje(){

    for (let index = 0; index < this.item.length; index++) {
      this.completo = this.item[index].revisado;

      if (this.completo === false) {
        this.num = 1;
         
       }
    }

  }
  revisar(id){
    console.log(id)
    this.formularioMuebles.value.revisado = true;
    this.formularioMuebles.value.revisadoPor = this.usuario.email;
    this.db.doc('muebles/'+id).update(this.formularioMuebles.value).then((resultado)=>{
      Swal.fire({
        title: "Revisado",
        text: "Se a revisado correctamente",
        icon: "success"
      }).then((result) => {
        window.location.reload();
      });

    }).catch(()=>{
     console.log('Error')
    })
  }
  mostrarFoto(foto: String, parte: String): void{
    Swal.fire({
        title: `${parte}`,
        imageUrl: `${foto}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}

}
