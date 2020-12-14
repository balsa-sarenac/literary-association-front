import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './auth/register/register.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { AuthorHomepageComponent } from './author/author-homepage/author-homepage.component';

const routes: Routes = [
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{
		path: 'welcome',
		component: HomepageComponent,
		children: [{ path: 'login', component: LoginComponent },
					{path: 'register', component: RegisterComponent}],
	},
	{
		path: 'admin',
		component: HomeAdminComponent,
		children: [{ path: 'requests', component: RequestsComponent }],
	},
	{
		path: 'author-homepage',
		component: AuthorHomepageComponent
		 
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
