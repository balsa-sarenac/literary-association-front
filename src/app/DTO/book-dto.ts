import { IFile } from "./ifile";

export class BookDTO {
    id : number;
    
    title : string;

    synopsis: string;

    bookFile: IFile;
}
