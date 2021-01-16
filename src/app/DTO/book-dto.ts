import { UserDTO } from "./userDTO";

export class BookDTO {
    id : number;
    
    title : string;

    synopsis: string;

    authors: Array<UserDTO>;
}
