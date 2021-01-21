import {IBook} from './ibook';
import {IFile} from '../../DTO/ifile';
import {INote} from './inote';

export interface IPublishingRequest {
  id: number;
  book: IBook;
  notes: INote;
  potentialPlagiarismList: IFile;
}
