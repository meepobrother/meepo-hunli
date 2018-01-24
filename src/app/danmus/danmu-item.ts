import {
    Component, OnInit, ElementRef,
    Renderer2, AfterViewInit, OnDestroy, Input
} from '@angular/core';
import { HostBinding } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'danmu-item',
    templateUrl: './danmu-item.html',
    styleUrls: ['./danmu-item.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DanmuItemComponent implements OnInit, AfterViewInit, OnDestroy {
    @HostBinding('class.danmu-item') _item: boolean = true;
    @HostBinding('style.top.px') _top: number = 0;
    // @HostBinding('style.left.px') _left: number = 0;
    @HostBinding('style.right.px') _right: number = 0;

    @HostBinding('style.min-width.em') _minWidth: number = 0;
    @HostBinding('style.max-width.em') _maxWidth: number = 0;

    @Input() avatar: string;

    @Input()
    set len(len: number) {
        this._minWidth = len + 4;
        this._maxWidth = this._minWidth;
    }
    width: number;
    height: number;

    timeLen: number;
    fps: number = 40;
    timer: any;

    @Input() isnew: boolean = false;

    constructor(
        public ele: ElementRef,
        public render: Renderer2
    ) { }

    ngOnInit() {
        this.timeLen = 1 / this.fps! * 1000;
        this.randomPosition();
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }

    randomPosition() {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this._top = Math.random() * (this.height - 200) + 50;
        if (this.isnew) {
            this._right = - Math.random() * this.width + 200;
        } else {
            this._right = - Math.random() * this.width - 200;
        }
    }

    ngAfterViewInit() {
        const width = this.ele.nativeElement.clientWidth;
        this.timer = setInterval(() => {
            this._right++;
            if (this._right > this.width) {
                this.randomPosition();
            }
        }, this.timeLen);
    }
}

