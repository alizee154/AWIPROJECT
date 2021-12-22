import {Etape} from "./etape";

export class FicheTechnique{
    public id: string;
    public name: string;
    public author: string;
    public desc: string;
  public listDureesEtapes: [];
    public listTitresEtapes : [];



    constructor(
        id: string,
        name: string,
        author: string,
        desc: string,
        listTitresEtapes : [],
        listDureesEtapes: []

    ){
        this.id = id;
        this.name = name;
        this.author = author;
        this.desc = desc;
        this.listTitresEtapes = listTitresEtapes;
        this.listDureesEtapes = listDureesEtapes;

    }
}
