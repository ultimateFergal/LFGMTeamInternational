import { NgModule } from '@angular/core';
import { MatButtonModule,
         MatIconModule,
         MatFormFieldModule,
         MatInputModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatButtonToggleModule,
         MatToolbarModule,
         MatCardModule,
         MatSelectModule,
         MatDialogModule,
         MatTableModule,
         MatSortModule,
         MatPaginatorModule,
         MatSlideToggleModule,
         MatGridListModule
        } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatToolbarModule,
        MatCardModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule
    ]
})

export class MaterialModule {

}
