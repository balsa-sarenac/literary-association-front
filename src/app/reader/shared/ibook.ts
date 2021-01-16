import {IFile} from '../../DTO/ifile';
import {IUser} from '../../DTO/iuser';

export interface IBook {
  title: string;
  synopsis: string;
  authors: IUser[];
  bookFile: IFile;
}
