export class FicheTechnique{
    public id: string;
    public name: string;
    public author: string;
    public desc: string;

    constructor(
        id: string,
        name: string,
        author: string,
        desc: string
    ){
        this.id = id;
        this.name = name;
        this.author = author;
        this.desc = desc;
    }
}