import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

export interface DialogInput {
    realname: string;
    mobile: string;
}
@Component({
    selector: 'dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {
    @Input() model: DialogInput = {
        realname: '',
        mobile: ''
    };
    @Output() onCancel: EventEmitter<any> = new EventEmitter();
    @Output() modelChange: EventEmitter<DialogInput> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    inputRealname(e) {
        this.model.realname = e.target.value;
        this.modelChange.emit(this.model);
    }

    inputMobile(e) {
        this.model.mobile = e.target.value;
        this.modelChange.emit(this.model);
    }

    cancel() {
        this.onCancel.emit();
    }
}

