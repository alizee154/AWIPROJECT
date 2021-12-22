import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {ActivatedRoute, Router} from "@angular/router";
import jsPDF from "jspdf";
import {FicheTechnique} from "../models/fiche-technique";
import {Etape} from "../models/etape";


@Component({
  selector: 'app-view-fiche',
  templateUrl: './view-fiche.component.html',
  styleUrls: ['./view-fiche.component.css']
})
export class ViewFicheComponent implements OnInit {
  @Input() ficheTechnique : FicheTechnique;

  name : string = 'recette';
  author : string = 'author';
  desc : string = 'desc';
  listTitresEtapes = [];
  listDureesEtapes = [];

  recette :any;
  @ViewChild('content') content:ElementRef;

  constructor(private ft: FicheTechniqueService,private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    //this.recette = this.ft.recette;
    const id = this.route.snapshot.params['id'];
    this.name = this.ft.getRecetteById(id).name;
    this.author = this.ft.getRecetteById(id).author;
    this.desc = this.ft.getRecetteById(id).desc;
    this.listTitresEtapes = this.ft.getRecetteById(id).listTitresEtapes;
    this.listDureesEtapes = this.ft.getRecetteById(id).listDureesEtapes;
  }
  public SavePDF():void{
    let content=this.content.nativeElement;
    // @ts-ignore
    let doc = new jsPDF();
    let _elementHandlers =
      {
        '#editor':function(element,renderer){
          return true;
        }
      };
    doc.html(content.innerHTML,{
      callback: function nn  (doc) {
        doc.save();
      }



    });


    //doc.save('test.pdf');

  }
}
