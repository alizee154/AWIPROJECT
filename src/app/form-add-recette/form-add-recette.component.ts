import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FicheTechniqueComponent} from "../fiche-technique/fiche-technique.component";
import {FicheTechnique} from "../models/fiche-technique";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {NgModel} from "@angular/forms";
import {Etape} from "../models/etape";

import {Subscription} from "rxjs";
import {Ingredient} from "../models/ingredient";
import {IngredientService} from "../services/ingredient.service";


@Component({
  selector: 'app-form-add-recette',
  templateUrl: './form-add-recette.component.html',
  styleUrls: ['./form-add-recette.component.css']
})
export class FormAddRecetteComponent implements OnInit, OnDestroy {
  @Input() ficheTechnique : FicheTechnique;
  @Input() etape : Etape;
  @Output() url : any;

  ingredients : Ingredient[];
  ingSubscription : Subscription;

  recetteSubscription : Subscription;
  nameControl : FormControl;
  authorControl : FormControl;
  recetteForm : FormGroup;
  private form: any;

  constructor(private formBuilder: FormBuilder,private ft:FicheTechniqueService,private router: Router, private ins : IngredientService) { }

  ngOnInit() {

    this.initForm();
    this.initIng();



    /*this.recetteForm =  this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      desc: ['']
    });*/

  }
  initIng(){

    this.ingSubscription = this.ins.ingSubject.subscribe((ingredients :Ingredient[]) => {this.ingredients = ingredients;});
    this.ins.emitingSubject();// il faut ecrire l'id dans le form pour que ca marche apres avoir cliqué sur ajouter un ingredient

  }
  initForm(){
    this.recetteForm = this.formBuilder.group({
      id:'',
      name:'',
      author:'',
      desc:'',
      titles:this.formBuilder.array([]),
      times:this.formBuilder.array([]),

      ings :this.formBuilder.array([])

    })

  }
  public get times() : FormArray {
    return this.recetteForm.get('times') as FormArray;

  }
  /*public get tags() : FormArray {
    return this.recetteForm.get('tags') as FormArray;

  }
  */

  public get titles() : FormArray {
    return this.recetteForm.get('titles') as FormArray;

  }
  public get ings() : FormArray {
    return this.recetteForm.get('ings') as FormArray;

  }

  public addSteps(): void{
    this.titles.push(new FormControl());
    this.times.push(new FormControl());
  }

  public addIngs():void{
    this.ings.push(new FormControl());

  }
  onSubmitForm(){
    const formValue = this.recetteForm.value;
    const newRecette = new FicheTechnique(
      formValue['id'],
      formValue['name'],
      formValue['author'],
      formValue['desc'],
      formValue['titles'],
      formValue['times'],
      formValue['ings']




    );
    this.ft.addRecette(newRecette);
    console.log(newRecette);
    this.router.navigate(['/fiche-technique'])

  }


  ngOnDestroy(){
    //this.recetteSubscription.unsubscribe();
    this.ingSubscription.unsubscribe();
  }




  /*onSubmit(form: NgForm) {
    const name = form.value['name'];
    const author = form.value['author'];
    const id = form.value['id'];
    const desc = form.value['desc'];
    const titreEtape = form.value['titreEtape'];
    const duree = form.value['duree'];
    const descEtape = form.value['descetape'];
    const listeIng = form.value['listeIng'];

    console.log(form.value);
    const listEtape = [];
    this.ft.addEtape(titreEtape,descEtape,listeIng,duree);

    //const listEtape = form.value['etape.titreEtape'];

    console.log(form.value);
    this.ft.addRecette(id,desc,name,author, listEtape);
    this.router.navigate(['/fiche-technique']);
  }*/
  onSubmit(){
    console.log(this.recetteForm.value);
  }

  //url: any;
  msg = "";


  selectFile(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'Vous devez sélectionner une image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Seul les images sont supportées";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
    console.log(this.url + "h");

  }








}
