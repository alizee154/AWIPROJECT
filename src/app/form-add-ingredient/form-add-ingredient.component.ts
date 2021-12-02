import {Component, Input, OnInit} from '@angular/core';
import {FicheTechnique} from "../models/fiche-technique";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {Ingredient} from "../models/ingredient";
import {IngredientService} from "../services/ingredient.service";

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

  constructor(private formBuilder: FormBuilder,private ing:IngredientService,private router: Router) { }

  ngOnInit() {
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
    const allergene = form.value['allergene'];

    console.log(form.value);
    this.ing.addIng(id,name,unit,quantity,unitprice,allergene);
    this.router.navigate(['ingredient']);
  }
}
