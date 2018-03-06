import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppService } from './app.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [],
    providers: [
        AppService
    ]
})
export class SharedModule { }
