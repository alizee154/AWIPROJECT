import {Etape} from "./etape";
import {Ingredient} from "./ingredient";

export class FicheTechnique{
    public id: string;
    public name: string;
    public author: string;
    public desc: string;

    public listTitresEtapes : [];
    public listDescEtapes : [];
    public listDureesEtapes: [];
    public listIngEtapes : [];
    public nbIngredientsByStep : number [];
    public listQuantityIngredients : number [];




    constructor(
        id: string,
        name: string,
        author: string,

        desc: string,
        listTitresEtapes : [],
        listDescEtapes : [],
        listDureesEtapes: [],
        listIngEtapes : [],
        nbIngredientsByStep : number [],
        listQuantityIngredients : number []

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

    }
}
