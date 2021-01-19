import { IFile } from "./ifile";
import { UserDTO } from "./userDTO";

export class BookDTO {
    id : number;
    
    title : string;

    synopsis: string;

    bookFile: IFile;
    
    authors: Array<UserDTO>;
}
