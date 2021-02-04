import { IFormField } from 'src/app/auth/shared/iformfield.register';
import { IFile } from 'src/app/DTO/ifile';
import { IUser } from 'src/app/DTO/iuser';
import {INote} from '../../reader/shared/inote';

export interface IMembershipRequest {
	id: number;
	user: IUser;
	files: IFile[];
	notes: INote[];
}
