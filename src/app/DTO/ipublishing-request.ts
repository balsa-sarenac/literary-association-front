import { BookDTO } from "src/app/DTO/book-dto";
import { NoteDTO } from "src/app/DTO/note-dto";

export interface IPublishingRequest{
    id : number;
    approved : boolean;
    book : BookDTO;
    notes : NoteDTO[];
    status: String;
}