import {Component, Input, OnInit} from '@angular/core';
import {FicheTechniqueComponent} from "../fiche-technique/fiche-technique.component";
import {FicheTechnique} from "../models/fiche-technique";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {NgModel} from "@angular/forms";
import {Etape} from "../models/etape";

@Component({
  selector: 'app-form-add-recette',
  templateUrl: './form-add-recette.component.html',
  styleUrls: ['./form-add-recette.component.css']
})
export class FormAddRecetteComponent implements OnInit {
  @Input() ficheTechnique : FicheTechnique;
  @Input() etape : Etape;


  nameControl : FormControl;
  authorControl : FormControl;
  recetteForm : FormGroup;
  private form: any;

  constructor(private formBuilder: FormBuilder,private ft:FicheTechniqueService,private router: Router) { }

  ngOnInit() {
    this.initForm();
    /*this.recetteForm =  this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      desc: ['']
    });*/

  }
  initForm(){
    this.recetteForm = this.formBuilder.group({
      id:'',
      name:'',
      author:'',
      desc:'',
      tags:this.formBuilder.array([]), //ne contient que la duree de l'etape
      ings :this.formBuilder.array([])
    })
  }
  public get tags() : FormArray {
    return this.recetteForm.get('tags') as FormArray;

  }
  public get ings() : FormArray {
    return this.recetteForm.get('ings') as FormArray;

  }

  public addSteps(): void{
    this.tags.push(new FormControl());
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
      formValue['tags']

    );
    this.ft.addRecette(newRecette);
    this.router.navigate(['/fiche-technique']);
    console.log(newRecette);

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








}
