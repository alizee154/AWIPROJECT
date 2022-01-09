import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../models/ingredient";
import {FicheTechnique} from "../models/fiche-technique";
import {Subscription} from "rxjs";
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Vente} from "../models/vente";
import {IngredientService} from "../services/ingredient.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @ViewChild('content') content:ElementRef;
  recettes : FicheTechnique[];
  recetteSubscription : Subscription;
  ingSubscription : Subscription;
  stockForm : FormGroup;
  IngToDecrease : Ingredient[] = [];
  IngnameToDecrease : String[] = [];
  quantityToDecrease : number[] = [];
  constructor(private ft:FicheTechniqueService, private formBuilder : FormBuilder,private router: Router,private ins:IngredientService) { }

  ngOnInit(): void {
    this.ft.getAllFichesTechniques();
    this.recetteSubscription = this.ft.recetteSubject.subscribe((recettes:FicheTechnique[]) => {this.recettes = recettes;});
    this.ft.emitrecetteSubject();
    this.initForm();
    this.IngnameToDecrease = this.ft.ingNameToDecrease;//pas mettre ca ici car il passe avant le changement


  }
  initForm(){
    this.stockForm = this.formBuilder.group({
      nameRecette:'',
      nbplats:'',

    })

  }
  recetteToShow : FicheTechnique = {
    id : '',
    name:'',
    author:'',
    desc:'',
    listTitresEtapes:[],
    listDescEtapes:[],
    listDureesEtapes:[],
    listIngEtapes : [],
    listNameIng: [],
    nbIngredientsByStep : [],
    listQuantityIngredients : [],
    category : ''


  };
  show(){
    const formValue = this.stockForm.value;
    const recetteToShowConstante = formValue['nameRecette'];
    this.recetteToShow = this.ft.getRecetteByname(recetteToShowConstante);
  }
  onSubmitForm(){

    const formValue = this.stockForm.value;
    const recetteToShowConstante = formValue['nameRecette'];
    this.recetteToShow = this.ft.getRecetteByname(recetteToShowConstante);
    console.log("coucu");
    console.log(this.recetteToShow);
    console.log("heee");
    const newVente = new Vente(
      formValue['nameRecette'],
      formValue['nbplats'],


    );
    this.ft.addVente(newVente);
    this.ft.recupIngTodecrease();
    this.IngnameToDecrease = this.ft.ingNameToDecrease;
    this.quantityToDecrease = this.ft.quantityToDecrease;
    console.log(this.ft.quantityToDecrease);
    console.log(this.IngnameToDecrease);

    for(let x in this.IngnameToDecrease){
      for(let y in this.IngnameToDecrease){
        if(x != y){
          if(this.IngnameToDecrease[x] == this.IngnameToDecrease[y]){
            this.IngnameToDecrease.splice(parseInt(y));

            this.quantityToDecrease[x] = this.quantityToDecrease[x] + this.quantityToDecrease[y];
            this.quantityToDecrease.splice(parseInt(y));

          }
        }
      }
    }

    console.log(this.quantityToDecrease);
    console.log(this.IngnameToDecrease);

    let i = 0;
    this.ingSubscription = this.ins.ingSubject.subscribe(
      (IngToDecrease :Ingredient[]) => {this.IngToDecrease = IngToDecrease;}
    );
    console.log(this.IngToDecrease);
    for(let index = 0; index< this.IngnameToDecrease.length; index++){
    //for (let index in this.IngnameToDecrease){
      console.log(index);
      console.log(this.IngnameToDecrease[index])

      //this.IngToDecrease[i] = this.ins.getIngredientByName(String(this.IngnameToDecrease[index]));
      //i++;
      console.log(String(this.IngnameToDecrease[index]));
      this.ins.getIngByNameStocks(String(this.IngnameToDecrease[index])).then(r =>
      { console.log(index);
        console.log("gfge");
        this.ingSubscription = this.ins.ingSubject.subscribe(
          (IngToDecrease :Ingredient[]) => {this.IngToDecrease = IngToDecrease;}
        );
        console.log(this.IngToDecrease);
        this.ins.addIngToDecrease(this.IngToDecrease,this.quantityToDecrease[index]);
        console.log(this.IngToDecrease);

        this.ins.updateIngStocks(this.IngToDecrease[0].id, this.IngToDecrease[i].stocks).then(r =>
        {
          console.log("hferrrrrrrrrrrf");
        });


        this.router.navigate(['/stock']);

      });
      this.ingSubscription = this.ins.ingSubject.subscribe(
        (IngToDecrease :Ingredient[]) => {this.IngToDecrease = IngToDecrease;}
      );
      console.log(this.IngToDecrease);

      //console.log(this.IngToDecrease[i]);


    }
    /*this.ins.addIngToDecrease(this.IngToDecrease,this.quantityToDecrease);
    console.log(this.IngToDecrease);//remettre le vecteur ingredients a 0 (peut etre pas dans ce component)

    //this.ft.addTab(this.nbIngByStep);
    console.log(newVente);
    this.router.navigate(['/stock']);*/

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

      PDF.save('MyEtiquette.pdf');

    });
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
