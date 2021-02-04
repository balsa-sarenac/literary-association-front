import {IBook} from '../reader/shared/ibook';
import {INote} from '../reader/shared/inote';

export interface IComplaint {
  id: number;
  complainantBook: IBook;
  plagiarism: IBook;
  notes: INote[];
}
