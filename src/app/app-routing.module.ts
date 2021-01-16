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
import { ChiefEditorPubReqListComponent } from './chief-editor/chief-editor-pub-req-list/chief-editor-pub-req-list.component';
import { PubReqDetailComponent } from './chief-editor/pub-req-detail/pub-req-detail.component';
import { RefuseReasonComponent } from './chief-editor/refuse-reason/refuse-reason.component';
import { BetaReaderBooksComponent } from './reader/beta-reader-books/beta-reader-books.component';
import { UnpublishedBookComponent } from './reader/unpublished-book/unpublished-book.component';
import { CheckIfOriginalListComponent } from './chief-editor/check-if-original-list/check-if-original-list.component';
import { PubReqPotentialSourcesComponent } from './chief-editor/pub-req-potential-sources/pub-req-potential-sources.component';

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
      { path: 'beta-books', component: BetaReaderBooksComponent },
      { path: 'beta-books/:id', component: UnpublishedBookComponent }
    ],
	},
	{
		path: 'author',
		component: HomeAuthorComponent,
		children: [
			{
				path: 'publishing-requests',
				component: PublishingRequestsListComponent,
			},
			{
				path: 'publish-book',
				component: PublishBookComponent,
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
			{ path: 'requests', component: MembershipRequestsComponent },
			{ path: 'requests/:id', component: MembershipRequestComponent },
		],
	},
	{
		path:'editor',
		component:HomeChiefEditorComponent,
		children: [
			{
				path: 'chief-editor-requests',
				component: ChiefEditorPubReqListComponent,
			},
			{
				path: 'requests/:id',
			 	component: PubReqDetailComponent
			},
			{
				path: 'chief-editor-plagiarism-requests',
				component: CheckIfOriginalListComponent
			},
			{
				path: 'original-request/:id',
				component: PubReqPotentialSourcesComponent
			}
		],
	},
	{
		path:'refusal/:id',
		component:RefuseReasonComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
