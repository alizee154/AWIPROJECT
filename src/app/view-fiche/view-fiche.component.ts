import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {ActivatedRoute, Router} from "@angular/router";
import jsPDF from "jspdf";
import {FicheTechnique} from "../models/fiche-technique";
import {Etape} from "../models/etape";
import {IngredientService} from "../services/ingredient.service";
import {Ingredient} from "../models/ingredient";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-view-fiche',
  templateUrl: './view-fiche.component.html',
  styleUrls: ['./view-fiche.component.css']
})
export class ViewFicheComponent implements OnInit {
  @Input() ficheTechnique : FicheTechnique;
  nbIngredientsByStep  : number[]= [] ;
  newNbIngredientsByStep  : number[]= [] ;
  nbSubscription : Subscription;
  name : string = 'recette';
  author : string = 'author';
  desc : string = 'desc';
  listTitresEtapes = [];
  listDureesEtapes = [];
  listIngEtapes = [];
  Ing : Ingredient[] = [];
  Steps : Etape [] = [];
  etape : Etape = {titreEtape : '',listeIng : [],duree : '',listeQuantity : []};
  listQuantityIngredients = [];


  recette :any;
  @ViewChild('content') content:ElementRef;

  constructor(private ft: FicheTechniqueService,private router: Router, private route : ActivatedRoute, private ins: IngredientService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.name = this.ft.getRecetteById(id).name;
    this.author = this.ft.getRecetteById(id).author;
    this.desc = this.ft.getRecetteById(id).desc;
    this.listTitresEtapes = this.ft.getRecetteById(id).listTitresEtapes;
    this.listDureesEtapes = this.ft.getRecetteById(id).listDureesEtapes;
    this.listIngEtapes = this.ft.getRecetteById(id).listIngEtapes;
    let i=0;

    for (var char of this.listIngEtapes){
      this.Ing[i] = this.ins.getIngredientByName(char);
      i++;

    }
    this.nbIngredientsByStep = this.ft.getRecetteById(id).nbIngredientsByStep;
    for (let index in this.nbIngredientsByStep){

      if(index != '0'){
        this.newNbIngredientsByStep.push(this.nbIngredientsByStep[index]);
      }

    }
    this.listQuantityIngredients = this.ft.getRecetteById(id).listQuantityIngredients;
    console.log(this.newNbIngredientsByStep);
    console.log(this.nbIngredientsByStep );
    this.initSteps()



  }
  listIng : Ingredient [] = [];
  listQuantity : number[]=[];
  initSteps(){
    console.log(this.newNbIngredientsByStep);
    let j = 0;
    for(var index in this.listTitresEtapes){
      this.listIng = [];
      this.listQuantity = [];




      while(this.newNbIngredientsByStep[index]>0){


        this.listIng.push(this.Ing[j]);
        this.listQuantity.push(this.listQuantityIngredients[j]);
        j ++;
        this.newNbIngredientsByStep[index]--;

      }

      const newStep = new Etape(
        this.listTitresEtapes[index],
        this.listIng,
        this.listDureesEtapes[index],
        this.listQuantity


      )
      this.Steps.push(newStep);

    }
    console.log(this.Steps);

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
