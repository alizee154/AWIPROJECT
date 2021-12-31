import {Component, Input, OnInit} from '@angular/core';
import {FicheTechnique} from "../models/fiche-technique";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {Ingredient} from "../models/ingredient";
import {IngredientService} from "../services/ingredient.service";
import {Categorie} from "../models/category";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-add-ingredient',
  templateUrl: './form-add-ingredient.component.html',
  styleUrls: ['./form-add-ingredient.component.css']
})
export class FormAddIngredientComponent implements OnInit {

  @Input() ingredient : Ingredient;
  nameControl : FormControl;
  authorControl : FormControl;
  ingredientForm : FormGroup;
  categories : any[];
  selectedCategory: string;
  categorySubscription : Subscription;


  constructor(private formBuilder: FormBuilder,private ing:IngredientService,private router: Router) { }

  ngOnInit() {
    this.ing.getAllCategories();
    this.categorySubscription = this.ing.categorySubject.subscribe(
      (categories : Categorie[]) => {this.categories = categories}
    );
    //this.initForm();
  }

  /*initForm() {
    this.recetteForm = this.formBuilder.group({
      id:['', Validators.required],
      name: ['', Validators.required],
      author: ['', Validators.required],
      desc:['', Validators.required],

    });

  }*/

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const unit = form.value['unit'];
    const id = form.value['id'];
    const quantity = form.value['quantity'];
    const unitprice = form.value['unitprice'];
    const category = this.selectedCategory;
    const allergene = form.value['allergene'];

    //const formValue = this.ingredientForm.value;
    const newIngredient = new Ingredient(
      id,
      name,
      unit,
      quantity,
      unitprice,
      category,
      allergene
      /*formValue['id'],
      formValue['name'],
      formValue['unit'],
      formValue['quantity'],
      formValue['unitprice'],
      formValue['allergene']
*/
    );
    console.log(newIngredient);
    this.ing.saveIngrédients(newIngredient);
    //.ing.addIng(id,name,unit,quantity,unitprice,allergene);
    this.router.navigate(['ingredient']);
  }
}
