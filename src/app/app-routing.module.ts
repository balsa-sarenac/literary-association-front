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
import { PublishBookComponent } from './author/publish-book/publish-book.component';

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
		path: 'publish-book',
		component: PublishBookComponent,
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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
