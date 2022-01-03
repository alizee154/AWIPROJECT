import {Etape} from "./etape";
import {Ingredient} from "./ingredient";

export class FicheTechnique{
    public id: string;
    public name: string;
    public author: string;
    public desc: string;
    public listDureesEtapes: [];
    public listTitresEtapes : [];
    public listDescEtapes : [];
    public listIngEtapes : Ingredient[];
    public nbIngredientsByStep : number [];
    public listQuantityIngredients : number [];
    public category: string;


  constructor(
    id: string,
    name: string,
    author: string,
    desc: string,
    listTitresEtapes: [],
    listDescEtapes : [],
    listDureesEtapes: [],
    listIngEtapes: Ingredient[],
    nbIngredientsByStep: number[],
    listQuantityIngredients : number [],
    category: string
  ){
        this.id = id;
        this.name = name;
        this.author = author;
        this.desc = desc;
        this.listTitresEtapes = listTitresEtapes;
        this.listDescEtapes  = listDescEtapes;
        this.listDureesEtapes = listDureesEtapes;
        this.listIngEtapes = listIngEtapes;
        this.nbIngredientsByStep = nbIngredientsByStep;
        this.listQuantityIngredients = listQuantityIngredients;
        this.category = category;

    }
}
