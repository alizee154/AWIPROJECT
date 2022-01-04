import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {ActivatedRoute, Router} from "@angular/router";
import jsPDF from "jspdf";
import {FicheTechnique} from "../models/fiche-technique";
import {Etape} from "../models/etape";
import {IngredientService} from "../services/ingredient.service";
import {Ingredient} from "../models/ingredient";
import {Subscription} from "rxjs";
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-view-fiche',
  templateUrl: './view-fiche.component.html',
  styleUrls: ['./view-fiche.component.css']
})
export class ViewFicheComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  @Input() ficheTechnique : FicheTechnique;
  nbIngredientsByStep  : number[]= [] ;
  newNbIngredientsByStep  : number[]= [] ;
  nbSubscription : Subscription;
  name : string = 'recette';
  author : string = 'author';
  desc : string = 'desc';
  listTitresEtapes = [];
  listDescEtapes = [];

  listDureesEtapes = [];
  listIngEtapes = [];
  Ing : Ingredient[] = [];
  Steps : Etape [] = [];
  etape : Etape = {titreEtape : '',descEtape : '',listeIng : [],duree : '',listeQuantity : []};
  listQuantityIngredients = [];
  coutMatiere = 0;
  coutPersonnel = 0;
  coutFluide = 0;
  prixVente = 0;
  listNombre = [];
  nbCouverts = 1;
  //couvertForm :  FormGroup;





  recette :any;
  @ViewChild('content') content:ElementRef;

  constructor(private ft: FicheTechniqueService,private router: Router, private route : ActivatedRoute, private ins: IngredientService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.name = this.ft.getRecetteById(id).name;
    this.author = this.ft.getRecetteById(id).author;
    this.desc = this.ft.getRecetteById(id).desc;
    this.listTitresEtapes = this.ft.getRecetteById(id).listTitresEtapes;
    this.listDescEtapes = this.ft.getRecetteById(id).listDescEtapes;
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
    this.initSteps();
    for (let i = 0; i < 25; i++) {
      this.listNombre.push(i);
    }
    /*this.couvertForm = this.formBuilder.group({
      nbCouverts:0,


    })*/




  }
 /* public addCouvert(){
    const formValue = this.couvertForm.value;
    this.nbCouverts = formValue['nbCouverts'] ;

  }*/
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
        this.listQuantity.push(this.listQuantityIngredients[j]*this.nbCouverts);//on multiplie par le nombre de couverts selectionnés
        j ++;
        this.newNbIngredientsByStep[index]--;

      }

      const newStep = new Etape(
        this.listTitresEtapes[index],
        this.listDescEtapes[index],
        this.listIng,
        this.listDureesEtapes[index],
        this.listQuantity


      )
      this.Steps.push(newStep);

    }
    console.log(this.Steps);

  }

  public calculCoutMatiere(){
    //somme de tous les ingredients + 5% du cout matiere
    for (let index in this.Ing){

      this.coutMatiere += this.Ing[index].unitprice * this.listQuantityIngredients[index] / 1000;


    }
    this.coutMatiere+= 0.05* this.coutMatiere;
    return this.coutMatiere ;


}
public calculCoutPersonnel(){
    //on fixe le cout horaire moyen à 16,74
  for (let index in this.listDureesEtapes){

    this.coutPersonnel += this.listDureesEtapes[index] / 60;



  }
  return this.coutPersonnel * 16,74;


}
  public calculCoutFluide(){
    //on fixe le cout horaire forfaitaire à 2 (revoir avec un vrai taux)

    for (let index in this.listDureesEtapes){

      this.coutFluide += this.listDureesEtapes[index] / 60;



    }
    return this.coutFluide * 2;



  }
  //voir pour tous les couts pour nbcouverts

  public calculPrixVente(){
    //voir pour si on calcule coutcharges
    this.prixVente = (this.coutFluide + this.coutMatiere + this.coutPersonnel)*1.5;
  }
  public openPDF():void {
    let DATA = document.getElementById('htmldata');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('angular-demo.pdf');

    });
  }


  public SavePDF():void{
    let content=this.content.nativeElement;
    // @ts-ignore
    let doc = new jsPDF('p', 'mm', 'a4');

    /*doc.text(content, 20, 20);
    doc.addPage();
    doc.text('Do you like that?', 20, 20);*/

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
