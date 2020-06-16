import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare let JsBarcode: any;
@Component({
  selector: 'app-panel-principal',
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.scss'],
  
  
})

export class PanelPrincipalComponent implements OnInit {
 item: any[] = new Array<any>();
numero = 1;
elementType:  'img';
 href : any;
 searchText: any = { codigoB: "" }
 cambio: any;
 codigoB: any = 'codigoB';
 pageActual: number = 1;
  constructor(private bd: AngularFirestore, ) {
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
          this.item.push(mueble)

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

 
downloadPdf(id) {
  var element = document.getElementById(id)

  html2canvas(element).then((canvas)=>{
    console.log(canvas);

    var imgData = canvas.toDataURL('image/png');
    var doc = new jsPDF();
    var imgHeight = canvas.height * 42 / canvas.width;
    doc.addImage(imgData,0,0,42,imgHeight)
    doc.save("image.pdf")
  })
}
}
