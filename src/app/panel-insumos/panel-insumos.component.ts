import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ExcelService } from '../recursos/excel.service';

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
 reporte: any[] = new Array<any>();
 reporteHI: any[] = new Array<any>();
 reportePRE: any[] = new Array<any>();
 reporteC: any[] = new Array<any>();
 reportePO: any[] = new Array<any>();
 reporteH: any[] = new Array<any>();
 reportePR: any[] = new Array<any>();
 reporteF: any[] = new Array<any>();
 sumasActivo: any[] = new Array<any>();
 sumasInactivo: any[] = new Array<any>();
 sumas: any[] = new Array<any>();
 titulo: any[] = new Array<any>();
 suma=0;
 sumaActivo=0;
 sumaInactivo=0;
  constructor(private fm: FormBuilder,public router: Router, private storage: AngularFireStorage,
    public afAuth: AngularFireAuth, private db: AngularFirestore,private spinner: NgxSpinnerService,private excelService: ExcelService, private activeRoute: ActivatedRoute) {
    //this.db.collection("muebles").valueChanges().subscribe((resultado)=>{
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


      
    });
    this.titulo = [{
      Tipo: "Cocina",
  }];
    this.reporteF.push(this.titulo[0])
    this.db.collection("insumos").get().subscribe((resultado)=>{
      resultado.docs.forEach((ite)=>{
        let mueble = ite.data();
        mueble.id = ite.id;
        mueble.ref = ite.ref;
        if (mueble.revisado == true && mueble.autorizado == true && mueble.activo == true) {
          if (mueble.tipo == "Cocina") {
            this.reporteC = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              FechaCompra: new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: "",
              PrecioA: mueble.precio,
            }];
            this.sumaActivo = this.sumaActivo+ mueble.precio;
            this.sumasActivo = [{
                sumaActivo: this.sumaActivo,
            }];
            console.log(this.sumasActivo,this.sumaActivo);
            this.reporteF.push(this.reporteC[0]);
          } else if (mueble.tipo == "Papelería/Oficina") {
            this.reportePO = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              FechaCompra: new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: "",
              PrecioA: mueble.precio,
            }];
            this.sumaActivo = this.sumaActivo+ mueble.precio;
            this.sumasActivo = [{
                sumaActivo: this.sumaActivo,
            }];
            this.reporte.push(this.reportePO[0]);
          }else if (mueble.tipo == "Higiene/Aseo/Limpieza") {
            this.reporteH = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              FechaCompra: new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: "",
              PrecioA: mueble.precio,
            }];
            this.sumaActivo = this.sumaActivo+ mueble.precio;
            this.sumasActivo = [{
                sumaActivo: this.sumaActivo,
            }];
            this.reporteHI.push(this.reporteH[0]);

          }else if (mueble.tipo == "Prevención") {
            this.reportePR = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              FechaCompra: new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: "",
              PrecioA: mueble.precio,
            }];
            this.sumaActivo = this.sumaActivo+ mueble.precio;
            this.sumasActivo = [{
                sumaActivo: this.sumaActivo,
            }];
            this.reportePRE.push(this.reportePR[0]);

          }

        }else if (mueble.revisado == true && mueble.autorizado == true && mueble.activo == false){
          if (mueble.tipo == "Cocina") {
            this.reporteC = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              FechaCompra: new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado:  new Date(mueble.fechaTerminado.seconds * 1000).toISOString().substr(0,10),
              PrecioI: mueble.precio,
            }];
            this.sumaInactivo = this.sumaInactivo+ mueble.precio;
            this.sumasInactivo = [{
                sumaInactivo: this.sumaInactivo,
            }];
            console.log(this.sumasInactivo,this.sumaInactivo, mueble.valor);
            this.reporteF.push(this.reporteC[0]);
          } else if (mueble.tipo == "Papelería/Oficina") {
            this.reportePO = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              FechaCompra: new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado:new Date(mueble.fechaTerminado.seconds * 1000).toISOString().substr(0,10),
              PrecioI: mueble.precio,
            }];
            this.sumaInactivo = this.sumaInactivo+ mueble.precio;
            this.sumasInactivo = [{
                sumaInactivo: this.sumaInactivo,
            }];
            this.reporte.push(this.reportePO[0]);
          }else if (mueble.tipo == "Higiene/Aseo/Limpieza") {
            this.reporteH = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              FechaCompra: new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: new Date(mueble.fechaTerminado.seconds * 1000).toISOString().substr(0,10),
              PrecioI: mueble.precio,
            }];
            this.sumaInactivo = this.sumaInactivo+ mueble.precio;
            this.sumasInactivo = [{
                sumaInactivo: this.sumaInactivo,
            }];
            this.reporteHI.push(this.reporteH[0]);

          }else if (mueble.tipo == "Prevención") {
            this.reportePR = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              FechaCompra: new Date(mueble.fechacompra.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: new Date(mueble.fechaTerminado.seconds * 1000).toISOString().substr(0,10),
              PrecioI: mueble.precio,
            }];
            this.sumaInactivo = this.sumaInactivo+ mueble.precio;
            this.sumasInactivo = [{
                sumaInactivo: this.sumaInactivo,
            }];
            console.log(this.reportePR[0])
            this.reportePRE.push(this.reportePR[0]);

          }
        }

      });

  });

  }
  cambiarnombre(cambios): void {
    var c = cambios;
    this.cambio = c;
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
  exportAsXLSX() {
    for (let index = 0; index < 3; index++) {
      if (index==0) {
        this.titulo = [{
          Tipo: "Papelería/Oficina",
        }];
        this.reporteF.push(this.titulo[0]);
        this.reporte.forEach(element => {
          this.reporteF.push(element);
        });
      }else if  (index==1) {
        this.titulo = [{
          Tipo: "Higiene/Aseo/Limpieza",
        }];
        this.reporteF.push(this.titulo[0]);
        this.reporteHI.forEach(element => {
          this.reporteF.push(element);
        });
      }else if  (index==2) {
        this.titulo = [{
          Tipo: "Prevención",
        }];
        this.reporteF.push(this.titulo[0]);
        this.reportePRE.forEach(element => {
          this.reporteF.push(element);
        });
      }
    }

    Swal.fire({
      title: "Descarga",
      text: "¿Descargar reporte de muebles?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
  }).then((result) => {
    if (result.value) {
     this.suma= this.sumasActivo[0].sumaActivo - this.sumasInactivo[0].sumaInactivo;
     this.sumas = [{
      sumaActivo: this.sumasActivo[0].sumaActivo,
      sumaInactivo: this.sumasInactivo[0].sumaInactivo,
      Variacion: this.sumasInactivo[0].sumaInactivo
     }];
      this.reporteF.push(this.sumas[0]);
      console.log(this.reporteF);
        var arreglo = this.reporteF;
            this.excelService.exportAsExcelFile(arreglo, 'Control');
                Swal.fire({
                  title: "Descarga",
                  text: "Se descargó correctamente",
                  icon: "success"
                }).then((result) => {
                  window.location.reload();
                });
      }else{
        window.location.reload();
      }
    });
   
  }
  opcionBotonExcel(): void {          
    Swal.fire({
        title: "Opciones",
        text: "¿Qué deseas realizar?",
        showCancelButton: true,
        confirmButtonText: "Archivo completo",
        cancelButtonText: "Archivo por rango",
        cancelButtonColor: "#038f3d"
    }).then((result) => {
        if (result.value) {
            this.exportAsXLSX();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.ingresarRangosExcel();
        }
    })
}

ingresarRangosExcel(): void {
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Siguiente',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        progressSteps: ['1']
    }).queue([
        {
          title: 'Rango inicial',
          text: 'Ingresa el id con el que deseas empezar'
        },
    ]).then((result) => {
      console.log(result["value"])
        try {                
          
            const rango_inicial = result[0].value;
            if (result) {
                const rangos = JSON.stringify(result[0].value)
                console.log(result[0].value)
                Swal.fire({
                    title: 'Finalizar',
                    html: `
                    Rango:
                    <pre><code>${rangos}</code></pre>
                    `,
                    confirmButtonColor: "#038f3d",
                    confirmButtonText: 'Descargar archivo excel',

                }).then((result) => {
                    if (result.value) {
                        //Aqui ya se tiene que generar el excel

                    }
                })
            }
        } catch (error) {
            //Dejo pasar el error sin afectar a algo
        } 
    })
}

}