import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './auth/register/register.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { HomeReaderComponent } from './homepage/home-reader/home-reader.component';
import { HomeAuthorComponent } from './homepage/home-author/home-author.component';
import { UploadDocumentsComponent } from './author/upload-documents/upload-documents.component';
import { VerifiedAccountComponent } from './verifiedAccount/verifiedAccount.component';
import { HomeCommitteeComponent } from './homepage/home-committee/home-committee.component';
import { MembershipRequestsComponent } from './committee/membership-requests/membership-requests.component';

const routes: Routes = [
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{
		path: 'welcome',
		component: HomepageComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },
		],
	},
	{
		path: 'admin',
		component: HomeAdminComponent,
		children: [{ path: 'requests', component: RequestsComponent }],
	},
	{
		path: 'upload-documents',
		component: UploadDocumentsComponent,
	},
	{
		path: 'reader',
		component: HomeReaderComponent,
		children: [],
	},
	{
		path: 'author',
		component: HomeAuthorComponent,
		children: [],
	},
	{
		path: 'verified',
		component: VerifiedAccountComponent,
		children: [],
	},
	{
		path: 'committee',
		component: HomeCommitteeComponent,
		children: [{ path: 'requests', component: MembershipRequestsComponent }],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
