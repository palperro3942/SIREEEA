export class Lista{
    title: string;
    P_name: string;
    description: string;
    
    constructor(title: string, P_name: string, status: boolean, link: string, description: string){
        this.title = title;
        this.P_name = P_name;
        this.description = description;
    }

}