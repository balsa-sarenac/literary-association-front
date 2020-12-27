import { IFormField } from 'src/app/auth/shared/iformfield.register';
import { IUser } from 'src/app/DTO/iuser';

export interface IMembershipRequest {
	id: number;
	user: IUser;
	// files: IFile;
}
