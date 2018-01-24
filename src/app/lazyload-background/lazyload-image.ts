import {
    Directive, Input, AfterViewInit,
    ElementRef, Renderer2, OnInit,
    InjectionToken, Injector, OnDestroy
} from '@angular/core';
import { BASE_SRC } from './lazyload-background';
import { isDevMode } from '@angular/core';
@Directive({ selector: '[lazyload]' })
export class LazyloadDirective implements OnInit, OnDestroy, AfterViewInit {
    private _imageSrc: string;
    private _imageLazySrc: string;
    private _imageIndex: number;
    private _isLoaded: boolean = false;
    private _subser: any;
    @Input()
    set lazyload(img: string) {
        this._imageSrc = img;
        this._imageLazySrc = `${this.src}assets/images/default.png`;
    }
    defaultImage: any;
    src: string;
    constructor(
        private render: Renderer2,
        private ele: ElementRef,
        private injector: Injector
    ) {
        if (isDevMode()) {
            this.src = './';
        } else {
            this.src = this.injector.get(BASE_SRC, './') as string;
        }
    }

    ngOnDestroy() {
        this._subser && this._subser.unsubscribe();
    }

    ngOnInit() {
        this.render.setAttribute(this.ele.nativeElement, 'src', this._imageLazySrc);
    }

    createLazy() {
        const img = new Image();
        img.src = this._imageSrc;
        img.onload = () => {
            this.render.setAttribute(this.ele.nativeElement, 'src', this._imageSrc);
            this._isLoaded = true;
        };
    }

    ngAfterViewInit() {
        this.createLazy();
    }
}
