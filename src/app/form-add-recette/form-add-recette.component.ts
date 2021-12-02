import {Component, Input, OnInit} from '@angular/core';
import {FicheTechniqueComponent} from "../fiche-technique/fiche-technique.component";
import {FicheTechnique} from "../models/fiche-technique";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {FicheTechniqueService} from "../services/fiche-technique.service";
import {Router} from "@angular/router";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-form-add-recette',
  templateUrl: './form-add-recette.component.html',
  styleUrls: ['./form-add-recette.component.css']
})
export class FormAddRecetteComponent implements OnInit {
  @Input() ficheTechnique : FicheTechnique;
  nameControl : FormControl;
  authorControl : FormControl;
  recetteForm : FormGroup;

  constructor(private formBuilder: FormBuilder,private ft:FicheTechniqueService,private router: Router) { }

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
    const author = form.value['author'];
    const id = form.value['id'];
    const desc = form.value['desc'];

    console.log(form.value);
    this.ft.addRecette(id,desc,name,author);
    this.router.navigate(['/fiche-technique']);
  }



}
