import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {ActivatedRoute, Router} from "@angular/router";
import jsPDF from "jspdf";
import {FicheTechnique} from "../models/fiche-technique";
import {Etape} from "../models/etape";
import {IngredientService} from "../services/ingredient.service";
import {Ingredient} from "../models/ingredient";
import {Subscription} from "rxjs";
import {FormGroup, NgForm} from "@angular/forms";


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
  recetteSubscription : Subscription;
  recettes = [];


  recette :any;
  @ViewChild('content') content:ElementRef;
  researchForm : FormGroup;

  constructor(private ft: FicheTechniqueService,private router: Router, private route : ActivatedRoute, private ins: IngredientService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.ft.getFicheByID(id).then(() => {
      console.log("Ca marche")
    });
    this.recetteSubscription = this.ft.recetteSubject.subscribe(
      (recettes :FicheTechnique[]) => {this.recettes = recettes;}
    );
    this.ft.emitrecetteSubject();
    console.log(this.recettes);
    console.log(this.ft.getFicheByID(id));
    this.name = this.ft.getRecetteById(id).name;
    this.author = this.ft.getRecetteById(id).author;
    console.log(this.author);
    this.desc = this.ft.getRecetteById(id).desc;
    console.log(id);
    this.listTitresEtapes = this.ft.getRecetteById(id).listTitresEtapes;
    this.listDureesEtapes = this.ft.getRecetteById(id).listDureesEtapes;
    this.listIngEtapes = this.ft.getRecetteById(id).listIngEtapes;
    console.log(this.listIngEtapes);
    console.log(this.listTitresEtapes);
    console.log(this.listDureesEtapes);
    console.log(this.name);
    let i=0;

    /*for (var char of this.listIngEtapes){
      console.log(this.ins.getIngredientByName(char));
      this.ins.getIngredientByName(char).then(r => {
        console.log(this.Ing);
      })
      console.log(this.ins.getIngredientNoBackByName(char));
      this.Ing[i] = this.ins.getIngredientNoBackByName(char);
      i++;
    }*/
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


        this.listIng.push(this.listIngEtapes[j]);
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

  public deleteFiche(){
    const id = this.route.snapshot.params['id'];
    this.ft.deleteFicheTechnique(id);
    this.router.navigate(['/fiche-technique']).catch(err => console.error(err));

  }

  public onSubmit(form: NgForm){
    const id = form.value['q'];
    this.ft.getFicheByID(id).then(r => {
      console.log("success!")
      this.router.navigate(['/fiche-technique/'+id]).catch(err => console.error(err));
    }).catch(err => console.error(err));
    console.log(id);

  }


}
