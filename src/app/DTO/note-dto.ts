import { UserDTO } from "./userDTO";

export class NoteDTO {
    id : number;
    type : string;
    content : string; 
    user:UserDTO;
}
