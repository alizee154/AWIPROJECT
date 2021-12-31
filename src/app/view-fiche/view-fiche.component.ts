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
  recettes : FicheTechnique[];
  selectedCouvert: string;
  selectedCouvertNumber = 1;



  recette :any;
  @ViewChild('content') content:ElementRef;
  researchForm : FormGroup;

  constructor(private ft: FicheTechniqueService,private router: Router, private route : ActivatedRoute, private ins: IngredientService) {
    const id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
   // this.router.navigate(['fiche-technique/'])

    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.ft.getFicheByID(id).then(() => {
      console.log("bhfigez");
      this.recetteSubscription = this.ft.recetteSubject.subscribe(
        (recettes : FicheTechnique[]) => {this.recettes = recettes;}
      )
      console.log(this.recettes);
      this.name = this.recettes[0].name;
      console.log(this.name);
      this.author = this.recettes[0].author;
      console.log(this.author);
      this.desc = this.recettes[0].desc;
      this.listTitresEtapes = this.recettes[0].listTitresEtapes;
      this.listDureesEtapes = this.recettes[0].listDureesEtapes;
      this.listIngEtapes = this.recettes[0].listIngEtapes;
      console.log(this.listIngEtapes);
      console.log(this.listTitresEtapes);
      console.log(this.listDureesEtapes);
      this.nbIngredientsByStep = this.recettes[0].nbIngredientsByStep;
      for (let index in this.nbIngredientsByStep){

        if(index != '0'){
          this.newNbIngredientsByStep.push(this.nbIngredientsByStep[index]);
        }

      }
      console.log(this.recettes[0].listQuantityIngredients);
      this.listQuantityIngredients = this.recettes[0].listQuantityIngredients;
      console.log(this.newNbIngredientsByStep);
      console.log(this.nbIngredientsByStep );
      this.initSteps()
    });
    this.recetteSubscription = this.ft.recetteSubject.subscribe(
      (recettes : FicheTechnique[]) => {this.recettes = recettes;})

    //this.router.navigate(['fiche-technique/'+ id])

    /*for (var char of this.listIngEtapes){
      console.log(this.ins.getIngredientByName(char));
      this.ins.getIngredientByName(char).then(r => {
        console.log(this.Ing);
      })
      console.log(this.ins.getIngredientNoBackByName(char));
      this.Ing[i] = this.ins.getIngredientNoBackByName(char);
      i++;
    }*/






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
        console.log(this.listQuantityIngredients);
        this.listQuantity.push(this.listQuantityIngredients[j]);
        console.log(this.listQuantity);
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

  public saveFiche(){
    const id = this.route.snapshot.params['id'];
    console.log(this.recettes[0]);
    console.log(this.recettes[0].listQuantityIngredients);
    console.log(this.selectedCouvertNumber);
    for (let i in this.listQuantityIngredients) {
      this.recettes[0].listQuantityIngredients[i] = this.recettes[0].listQuantityIngredients[i]*this.selectedCouvertNumber;

    }
    console.log(this.recettes[0].listQuantityIngredients);
    this.ft.updateFicheWithCouvert(id, this.recettes[0].listQuantityIngredients).then(r => {
      console.log("change on the db");
    })
  }

  public onSubmit(form: NgForm){
    this.selectedCouvertNumber = parseInt(this.selectedCouvert);



   /* console.log(this.selectedCouvert);
    let x = parseInt(this.selectedCouvert);
    console.log(x);
    console.log(this.listQuantity);
    console.log(this.listQuantityIngredients);
    const id = this.route.snapshot.params['id'];
    console.log(id);
    let list = [];
    let val;
    for (let i in this.listQuantityIngredients) {
      console.log(this.listQuantityIngredients[i]);
      val = this.listQuantityIngredients[i]
      list[i] = val * x;
      //this.recettes[0].listQuantityIngredients[i] = list[i];
      console.log(this.listQuantityIngredients[i]);
      console.log(this.recettes[0].listQuantityIngredients);
      this.listQuantity =[1];
    }
    console.log(this.recettes);
    /*this.ft.updateFicheWithCouvert(id, this.recettes[0].listQuantityIngredients).then(r => {
          console.log("clem")
      this.ngOnInit();
      });*/

  }


}
