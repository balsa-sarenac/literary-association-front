import { BookDTO } from "src/app/DTO/book-dto";
import { NoteDTO } from "src/app/DTO/note-dto";
import { IFile } from "./ifile";

export interface IPublishingRequest{
    id : number;
    approved : boolean;
    book : BookDTO;
    status: string;
    notes : NoteDTO[];
    potentialPlagiarismList: IFile[];
}
