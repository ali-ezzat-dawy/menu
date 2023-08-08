import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'ngx-swiper-wrapper'; 
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PipesModule } from '../theme/pipes/pipes.module';
import { DirectivesModule } from '../theme/directives/directives.module';
import { LogoComponent } from './logo/logo.component';
import { HeaderCarouselComponent } from './header-carousel/header-carousel.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItemsCarouselComponent } from './menu-items-carousel/menu-items-carousel.component';
import { QuantityCounterComponent } from './quantity-counter/quantity-counter.component';
import { MenuItemsToolbarComponent } from './menu-items-toolbar/menu-items-toolbar.component';
import { MenuItemHoverableComponent } from './menu-item-hoverable/menu-item-hoverable.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component'; 
import { SocialIconsComponent } from './social-icons/social-icons.component';
@NgModule({
  declarations: [
    LogoComponent,
    HeaderCarouselComponent,

    MenuItemComponent,
    MenuItemsCarouselComponent,
    QuantityCounterComponent,
    MenuItemsToolbarComponent,
    MenuItemHoverableComponent,
    TimelineComponent,
    TestimonialsComponent,
    ImageUploadComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    SocialIconsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule, 
    FlexLayoutModule,
    SwiperModule, 
    TranslateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    NgScrollbarModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule, 
    FlexLayoutModule,
    SwiperModule, 
    TranslateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule, 
    NgScrollbarModule,
    PipesModule,
    DirectivesModule,
    LogoComponent,
    HeaderCarouselComponent,

    MenuItemComponent,
    MenuItemsCarouselComponent,
    QuantityCounterComponent,
    MenuItemsToolbarComponent,
    MenuItemHoverableComponent,
    TimelineComponent,
    TestimonialsComponent,
    ImageUploadComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    SocialIconsComponent,
  ]
})
export class SharedModule { }
