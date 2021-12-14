import {Etape} from "./etape";

export class FicheTechnique{
    public id: string;
    public name: string;
    public author: string;
    public desc: string;
    public listEtape : Etape[];


    constructor(
        id: string,
        name: string,
        author: string,
        desc: string,
        listEtape : Etape[]
    ){
        this.id = id;
        this.name = name;
        this.author = author;
        this.desc = desc;
        this.listEtape = listEtape;
    }
}
