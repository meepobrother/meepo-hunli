import {
    Directive, Input, AfterViewInit,
    ElementRef, Renderer2, OnInit,
    InjectionToken, Injector, OnDestroy
} from '@angular/core';
export const BASE_SRC = new InjectionToken('BASE_SRC');
@Directive({ selector: '[lazyBackground]' })
export class LazyBackgroundDirective implements OnInit, OnDestroy {
    private _imageSrc: string;
    private _imageLazySrc: string;
    private _imageIndex: number;
    private _isLoaded: boolean = false;
    private _subser: any;
    @Input()
    set lazyBackground(index: number) {
        this._imageIndex = index;
        this._imageSrc = `${this.src}assets/images/${index}.png`;
        this._imageLazySrc = `${this.src}assets/images/${index}.lazy.png`;
    }
    @Input()
    set nowIndex(index: any) {
        if (index) {
            this._subser = index.subscribe(res => {
                if (res === this._imageIndex) {
                    !this._isLoaded && this.createLazy(this._imageSrc);
                }
            });
        }
    }
    defaultImage: any;
    src: string;
    constructor(
        private render: Renderer2,
        private ele: ElementRef,
        private injector: Injector
    ) {
        this.src = this.injector.get(BASE_SRC, './') as string;
    }

    ngOnDestroy() {
        this._subser && this._subser.unsubscribe();
    }

    ngOnInit() {
        this.render.setStyle(this.ele.nativeElement, 'background-image', `url(${this._imageLazySrc})`);
    }

    createLazy(image: string) {
        setTimeout(() => {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                this.render.setStyle(this.ele.nativeElement, 'background-image', `url(${image})`);
                this._isLoaded = true;
            };
        }, 1000);
    }
}
