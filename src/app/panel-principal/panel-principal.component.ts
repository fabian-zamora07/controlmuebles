import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExcelService } from '../recursos/excel.service';
declare let JsBarcode: any;
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
 sumas: any[] = new Array<any>();
 titulo: any[] = new Array<any>();
 suma=0;

numero = 1;
elementType:  'img';
 href : any;
 searchText: any = { codigoB: "" }
 cambio: any;
 codigoB: any = 'codigoB';
 pageActual: number = 1;
  constructor(private bd: AngularFirestore,private excelService: ExcelService ) {
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
    this.titulo = [{
      Tipo: "Mobiliario",
  }];
  this.reporteF.push(this.titulo[0])
    this.bd.collection("muebles").get().subscribe((resultado)=>{
      resultado.docs.forEach((ite)=>{
        let mueble = ite.data();
        mueble.id = ite.id;
        mueble.ref = ite.ref;
        if (mueble.revisado == true && mueble.autorizado == true) {
          if (mueble.tipo == "Mobiliario") {
            this.reporteM = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              Lugar: mueble.lugar,
              Color: mueble.color,
              FechaAdquisicion: new Date(mueble.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
              Código: mueble.codigoB,
              ClaveAlfanumerica: mueble.claveAlfanumerica,
              Responsable: mueble.responsable,
              Valor: mueble.valor,
            }];
            this.suma = this.suma+ mueble.valor;
            this.sumas = [{
                suma: this.suma,
            }];
            console.log(this.sumas,this.suma, mueble.valor);
            this.reporteF.push(this.reporteM[0])
          }else{
            this.reporteE = [{
              Nombre: mueble.nombre,
              Descripción: mueble.descripcion,
              Lugar: mueble.lugar,
              Color: mueble.color,
              FechaAdquisicion: new Date(mueble.fechaAdquisicion.seconds * 1000).toISOString().substr(0,10),
              Código: mueble.codigoB,
              ClaveAlfanumerica: mueble.claveAlfanumerica,
              Responsable: mueble.responsable,
              Valor: mueble.valor,
            }];
            this.suma = this.suma+ mueble.valor;
            this.sumas = [{
                suma: this.suma,
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
  this.reporteF.push(this.titulo[0])
  console.log(this.reporte);
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
  this.reporteF.push(this.sumas[0]);
  console.log(this.reporteF);
  var arreglo = this.reporteF;
      this.excelService.exportAsExcelFile(arreglo, 'Control');
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
}
