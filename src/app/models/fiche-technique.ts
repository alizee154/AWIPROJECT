import {Etape} from "./etape";

export class FicheTechnique{
    public id: string;
    public name: string;
    public author: string;
    public desc: string;
    public listEtape : Etape[];
    public url: any;


    constructor(
        id: string,
        name: string,
        author: string,
        desc: string,
        listEtape : Etape[],
        url:any
    ){
        this.id = id;
        this.name = name;
        this.author = author;
        this.desc = desc;
        this.listEtape = listEtape;
        this.url = url;
    }
}
