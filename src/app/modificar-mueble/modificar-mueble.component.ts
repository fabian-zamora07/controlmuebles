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
  selector: 'app-modificar-mueble',
  templateUrl: './modificar-mueble.component.html',
  styleUrls: ['./modificar-mueble.component.scss']
})
export class ModificarMuebleComponent implements OnInit {
  formularioMuebles: FormGroup;
  formularioCodigo: FormGroup;
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
      imagen: [''],

      
    })
    this.id = this.activeRoute.snapshot.params.muebleID;
    this.db.doc<any>('muebles'+'/'+this.id).valueChanges().subscribe((muebles)=>{
      console.log(muebles);
      this.formularioMuebles.setValue({
        nombre: muebles.nombre,
        descripcion: muebles.descripcion,
        lugar: muebles.lugar,
        color: muebles.color,
        tipo: muebles.tipo,
        fechaAdquisicion: new Date(muebles.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
        claveAlfanumerica: muebles.claveAlfanumerica,
        responsable: muebles.responsable,
        valor: muebles.valor,
        imagen: '',
      })
      this.urlImagen = muebles.imagen;
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
          console.log();

        })
        
    });
  
  }

  editar(){
    if (this.nuevaImg == 1) {
      const referencia = this.storage.ref(this.ruta)
      const tarea = referencia.put(this.archivo)
      this.spinner.show();
      tarea.then((objeto)=>{
        referencia.getDownloadURL().subscribe((url)=>{
  
          this.urlImagen = url;
          console.log(this.urlImagen)
          this.formularioMuebles.value.imagen = this.urlImagen;
          this.formularioMuebles.value.revisado = false;
          this.formularioMuebles.value.autorizado = false;
          this.formularioMuebles.value.revisadoPor = "";
            this.formularioMuebles.value.fechaAdquisicion = new Date(this.formularioMuebles.value.fechaAdquisicion);
            this.db.doc('muebles/'+this.id).update(this.formularioMuebles.value).then((resultado)=>{
              
              this.spinner.hide();
                      Swal.fire({
          title: "Modificado",
          text: "Se modificó correctamente",
          icon: "success"
        }).then((result) => {
          this.router.navigateByUrl('/revisar-mueble');
        });

            }).catch(()=>{
             console.log('Error')
            })
            
          });
        });
    }else{
      this.spinner.show();
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

  }


 

  subirImagen(event){
    let nombre = new Date().getTime().toString()
    this.archivo = event.target.files[0]
    let extension = this.archivo.name.toString().substring(this.archivo.name.toString().lastIndexOf('.'))
    this.ruta = 'muebles/'+nombre+extension;
    this.nuevaImg = 1;
    
  }
}