import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { RegisterComponent } from './auth/register/register.component';
import { RequestsComponent } from './admin/requests/requests.component';

import { HomeReaderComponent } from './homepage/home-reader/home-reader.component';
import { HomeAuthorComponent } from './homepage/home-author/home-author.component';
import { UploadDocumentsComponent } from './author/upload-documents/upload-documents.component';
import { FormComponent } from './form/form.component';
import { VerifiedAccountComponent } from './verifiedAccount/verifiedAccount.component';
import { HomeCommitteeComponent } from './homepage/home-committee/home-committee.component';
import { MembershipRequestsComponent } from './committee/membership-requests/membership-requests.component';
import { MembershipRequestComponent } from './committee/membership-request/membership-request.component'
import { PublishingRequestsListComponent } from './author/publishing-requests-list/publishing-requests-list.component'
import { PublishBookComponent} from './author/publish-book/publish-book.component';
import { MembershipPaymentComponent } from './author/membership-payment/membership-payment.component'
import { ReviewExpectedComponent } from './author/review-expected/review-expected.component';
import { HomeChiefEditorComponent } from './homepage/home-chief-editor/home-chief-editor.component';
import { ChiefEditorPubReqListComponent } from './chief-editor/chief-editor-pub-req-list/chief-editor-pub-req-list.component';
import { PubReqDetailComponent } from './chief-editor/pub-req-detail/pub-req-detail.component';
import { RefuseReasonComponent } from './chief-editor/refuse-reason/refuse-reason.component'
import { BetaReaderBooksComponent } from './reader/beta-reader-books/beta-reader-books.component';
import { UnpublishedBookComponent } from './reader/unpublished-book/unpublished-book.component';
import { ReadBooksListComponent } from './chief-editor/read-books-list/read-books-list.component';
import { ReadBookComponent} from './chief-editor/read-book/read-book.component';
import { CheckIfOriginalListComponent } from './chief-editor/check-if-original-list/check-if-original-list.component';
import { PubReqPotentialSourcesComponent } from './chief-editor/pub-req-potential-sources/pub-req-potential-sources.component'
import { UploadBookComponent } from './author/upload-book/upload-book.component';
import { SendToBetaComponent } from './chief-editor/send-to-beta/send-to-beta.component';
import { ChooseBetaReadersComponent } from './chief-editor/choose-beta-readers/choose-beta-readers.component';
import { BookListComponent } from './author/book-list/book-list.component';
import { FileComplaintComponent } from './author/file-complaint/file-complaint.component';
import { PublishingRequestComponent } from './chief-editor/publishing-request/publishing-request.component';
import { PublishingRequestsComponent } from './chief-editor/publishing-requests-list/publishing-requests-list.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";    
import 'hammerjs';   
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';    
import 'hammerjs';    

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomepageComponent,
		HomeAdminComponent,
		RequestsComponent,
		RegisterComponent,
		HomeReaderComponent,
		HomeAuthorComponent,
		FormComponent,
		UploadDocumentsComponent,
		VerifiedAccountComponent,
		HomeCommitteeComponent,
		MembershipRequestsComponent,
		MembershipRequestComponent,
		PublishingRequestsListComponent,
		PublishBookComponent,
		MembershipPaymentComponent,
		ReviewExpectedComponent,
		HomeChiefEditorComponent,
		ChiefEditorPubReqListComponent,
		PubReqDetailComponent,
		RefuseReasonComponent,
		BetaReaderBooksComponent,
		UnpublishedBookComponent,
		ReadBooksListComponent,
		ReadBookComponent,
		CheckIfOriginalListComponent,
		PubReqPotentialSourcesComponent,
		UploadBookComponent,
		SendToBetaComponent,
		ChooseBetaReadersComponent,
		BookListComponent,
		FileComplaintComponent,
		PublishingRequestsComponent,
		PublishingRequestComponent,
	],
	imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,MatFormFieldModule, MatInputModule, MatAutocompleteModule, ],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
	bootstrap: [AppComponent],
})
export class AppModule {}
