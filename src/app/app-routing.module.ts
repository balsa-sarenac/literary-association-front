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
import { MembershipRequestComponent } from './committee/membership-request/membership-request.component';
import { PublishingRequestsListComponent } from './author/publishing-requests-list/publishing-requests-list.component';
import { PublishBookComponent } from './author/publish-book/publish-book.component';
import { MembershipPaymentComponent } from './author/membership-payment/membership-payment.component';
import { ReviewExpectedComponent } from './author/review-expected/review-expected.component';
import { HomeChiefEditorComponent } from './homepage/home-chief-editor/home-chief-editor.component';
import { BetaReaderBooksComponent } from './reader/beta-reader-books/beta-reader-books.component';
import { UnpublishedBookComponent } from './reader/unpublished-book/unpublished-book.component';
import { UploadBookComponent } from './author/upload-book/upload-book.component';
import { BookListComponent } from './author/book-list/book-list.component';
import { FileComplaintComponent } from './author/file-complaint/file-complaint.component';
import { PublishingRequestsComponent } from './chief-editor/publishing-requests-list/publishing-requests-list.component';
import { PublishingRequestComponent } from './chief-editor/publishing-request/publishing-request.component';
import { LectorRequestsListComponent } from './lector/lector-request-list/lector-requests-list.component';
import { LectorRequestComponent } from './lector/lector-request/lector-request.component';
import { HomeLectorComponent } from './homepage/home-lector/home-lector.component';
import {ComplaintsComponent} from './chief-editor/complaints/complaints.component';
import {ComplaintInvestigationComponent} from './chief-editor/complaint-investigation/complaint-investigation.component';
import {HomeEditorComponent} from './homepage/home-editor/home-editor.component';

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
		path: 'membership-payment',
		component: MembershipPaymentComponent,
	},
	{
		path: 'reader',
		component: HomeReaderComponent,
		children: [
			{ path:'books', component:BookListComponent},
			{ path: 'beta-books', component: BetaReaderBooksComponent },
			{ path: 'beta-books/:id', component: UnpublishedBookComponent }
		],
	},
	{
		path: 'author',
		component: HomeAuthorComponent,
		children: [
			{
				path: 'books',
				component: BookListComponent
			},
			{
				path: 'publishing-requests',
				component: PublishingRequestsListComponent,
			},
			{
				path: 'publish-book',
				component: PublishBookComponent,
			},
			{
				path: 'requests/:id',
				component: UploadBookComponent
			},
			{
				path: 'file-a-complaint/:id',
				component: FileComplaintComponent
			},
		],
	},
	{
		path: 'review-expected',
		component: ReviewExpectedComponent,
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
		children: [
			{ path: 'membership-requests', component: MembershipRequestsComponent },
			{ path: 'membership-requests/:id', component: MembershipRequestComponent },
      {
        path: 'complaints',
        component: ComplaintsComponent
      },
      {
        path: 'complaints/:id',
        component: ComplaintInvestigationComponent
      },
		],
	},
	{
		path: 'chief-editor',
		component: HomeChiefEditorComponent,
		children: [
			{
				path: 'publishing-requests',
				component: PublishingRequestsComponent
			},
			{
				path: 'publishing-request/:id',
				component: PublishingRequestComponent
			},
			{
				path: 'complaints',
				component: ComplaintsComponent
			},
			{
				path: 'complaints/:id',
				component: ComplaintInvestigationComponent
			}
		],
	},
	{
		path: 'lector',
		component: HomeLectorComponent,
		children: [
			{
				path: 'lector-requests',
				component: LectorRequestsListComponent
			},
			{
				path: 'lector-request/:id',
				component: LectorRequestComponent
			}
		]
	},
  {
    path: 'editor',
    component: HomeEditorComponent,
    children: [
      {
        path: 'complaints',
        component: ComplaintsComponent
      },
      {
        path: 'complaints/:id',
        component: ComplaintInvestigationComponent
      },
    ]
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
