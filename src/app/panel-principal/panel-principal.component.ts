import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExcelService } from '../recursos/excel.service';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-panel-principal',
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.scss'],
  
  
})

export class PanelPrincipalComponent implements OnInit {
 item: any[] = new Array<any>();
 reporte: any[] = new Array<any>();
 reporteM: any[] = new Array<any>();
 reporteE: any[] = new Array<any>();
 reporteF: any[] = new Array<any>();
 sumasActivo: any[] = new Array<any>();
 sumasInactivo: any[] = new Array<any>();
 sumas: any[] = new Array<any>();
 titulo: any[] = new Array<any>();
 suma=0;
 sumaActivo=0;
 sumaInactivo=0;
 formularioMuebles: FormGroup;
numero = 1;
elementType:  'img';
 href : any;
 searchText: any = { codigoB: "" }
 cambio: any;
 codigoB: any = 'codigoB';
 pageActual: number = 1;
 urlImagen: any;
  constructor(private bd: AngularFirestore,private excelService: ExcelService,private fm: FormBuilder ) {
    //this.bd.collection("muebles").valueChanges().subscribe((resultado)=>{
      //  this.item = resultado;
        
    //});

   }

  ngOnInit(): void {
    this.item.length = 0;
    this.bd.collection("muebles").get().subscribe((resultado)=>{
        resultado.docs.forEach((ite)=>{


          let mueble = ite.data();
          mueble.id = ite.id;
          mueble.ref = ite.ref;
          
          this.item.push(mueble);
        })
        
        
    });

    this.formularioMuebles = this.fm.group({
      nombre: [''],
      descripcion: [''],
      lugar: [''],
      color: [''],
      tipo: [''],
      fechaAdquisicion: [''],
      claveAlfanumerica: [''],
      valor: [''],
      imagen: [''],
      fechaTerminado: [''],

    }); 
    this.titulo = [{
      Tipo: "Mobiliario",
  }];
  this.reporteF.push(this.titulo[0])
    this.bd.collection("muebles").get().subscribe((resultado)=>{
      resultado.docs.forEach((ite)=>{
        let mueble = ite.data();
        mueble.id = ite.id;
        mueble.ref = ite.ref;
        if (mueble.revisado == true && mueble.autorizado == true && mueble.activo == true) {
          if (mueble.tipo == "Mobiliario") {
            this.reporteM = [{
              Código: mueble.codigoB,
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              Lugar: mueble.lugar,
              Color: mueble.color,
              FechaAdquisicion: new Date(mueble.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: "",
              ClaveAlfanumerica: mueble.claveAlfanumerica,
              Responsable: mueble.responsable,
              ValorA: mueble.valor,
            }];
            this.sumaActivo = this.sumaActivo+ mueble.valor;
            this.sumasActivo = [{
                sumaActivo: this.sumaActivo,
            }];
            console.log(this.sumasActivo,this.sumaActivo, mueble.valor);
            this.reporteF.push(this.reporteM[0])
          } else if (mueble.tipo == "Equipo") {
            this.reporteE = [{
              Código: mueble.codigoB,
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              Lugar: mueble.lugar,
              Color: mueble.color,
              FechaAdquisicion: new Date(mueble.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: "",
              ClaveAlfanumerica: mueble.claveAlfanumerica,
              Responsable: mueble.responsable,
              ValorA: mueble.valor,
            }];
            this.sumaActivo = this.sumaActivo+ mueble.valor;
            this.sumasActivo = [{
                sumaActivo: this.sumaActivo,
            }];
            this.reporte.push(this.reporteE[0])
          }

        }else if (mueble.revisado == true && mueble.autorizado == true && mueble.activo == false){
          if (mueble.tipo == "Mobiliario") {
            this.reporteM = [{
              Código: mueble.codigoB,
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              Lugar: mueble.lugar,
              Color: mueble.color,
              FechaAdquisicion: new Date(mueble.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: new Date(mueble.fechaTerminado.seconds * 1000).toISOString().substr(0,10),
              ClaveAlfanumerica: mueble.claveAlfanumerica,
              Responsable: mueble.responsable,
              ValorI: mueble.valor,
            }];
            this.sumaInactivo = this.sumaInactivo + mueble.valor;
            this.sumasInactivo = [{
                sumaInactivo: this.sumaInactivo,
            }];
            console.log(this.sumasInactivo,this.sumaInactivo, mueble.valor);
            this.reporteF.push(this.reporteM[0])
          } else if (mueble.tipo == "Equipo") {
            this.reporteE = [{
              Código: mueble.codigoB,
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              Lugar: mueble.lugar,
              Color: mueble.color,
              FechaAdquisicion: new Date(mueble.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
              FechaTerminado: new Date(mueble.fechaTerminado.seconds * 1000).toISOString().substr(0,10),
              ClaveAlfanumerica: mueble.claveAlfanumerica,
              Responsable: mueble.responsable,
              ValorI: mueble.valor,

            }];
            this.sumaInactivo = this.sumaInactivo + mueble.valor;
            this.sumasInactivo = [{
                sumaInactivo: this.sumaInactivo,
            }];
            this.reporte.push(this.reporteE[0])
          }
        }

      })

  });



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

exportAsXLSX() {
  this.titulo = [{
    Tipo: "Equipo",
  }];
  this.reporteF.push(this.titulo[0]);
  this.reporte.forEach(element => {
    this.reporteF.push(element);
  });
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
downloadPdf(id) {
  var element = document.getElementById(id)

  html2canvas(element).then((canvas)=>{
    console.log(canvas);

    var imgData = canvas.toDataURL('image/png');
    var doc = new jsPDF();
    var imgHeight = canvas.height * 42 / canvas.width;
    doc.addImage(imgData,0,0,42,imgHeight)
    doc.save("codigoBarras"+id+".pdf")
  })
}
  bajar(id){
    console.log(id);
    this.bd.doc<any>('muebles'+'/'+id).valueChanges().subscribe((muebles)=>{
      console.log(muebles);
      this.formularioMuebles.setValue({
        nombre: muebles.nombre,
        descripcion: muebles.descripcion,
        lugar: muebles.lugar,
        color: muebles.color,
        tipo: muebles.tipo,
        fechaAdquisicion: new Date(muebles.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
        claveAlfanumerica: muebles.claveAlfanumerica,
        valor: muebles.valor,
        imagen: '',
        fechaTerminado: new Date(muebles.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
      })
      this.urlImagen = muebles.imagen;
    })
    Swal.fire({
      title: "Dar de baja",
      text: "¿Dar de baja el mueble?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.value) {
        this.formularioMuebles.value.imagen = this.urlImagen;
        this.formularioMuebles.value.activo = false;
        this.formularioMuebles.value.fechaAdquisicion = new Date(this.formularioMuebles.value.fechaAdquisicion);
        this.formularioMuebles.value.fechaTerminado = new Date();
        this.bd.doc('muebles/'+id).update(this.formularioMuebles.value).then((resultado)=>{
          Swal.fire({
            title: "Dar de baja",
            text: "Se dió de baja correctamente",
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
