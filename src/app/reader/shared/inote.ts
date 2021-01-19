import {IUser} from '../../DTO/iuser';

export interface INote {
  user: IUser;
  content: string;
  noteType: string;
}
