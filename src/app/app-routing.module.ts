import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterReaderComponent } from './auth/registerReader/registerReader.component';
import { RequestsComponent } from './admin/requests/requests.component';

import { AuthorHomepageComponent } from './author/author-homepage/author-homepage.component';

import { HomeReaderComponent } from './homepage/home-reader/home-reader.component';
import { HomeAuthorComponent } from './homepage/home-author/home-author.component';

const routes: Routes = [
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{
		path: 'welcome',
		component: HomepageComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },
			{ path: 'register-reader', component: RegisterReaderComponent },
		],
	},
	{
		path: 'admin',
		component: HomeAdminComponent,
		children: [{ path: 'requests', component: RequestsComponent }],
	},
	{
		path: 'author-homepage',
		component: AuthorHomepageComponent,
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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
