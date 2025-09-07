import { BackCommand, ForwardCommand } from "./commands/index.js";
import { AbstractGrimpanFactory, ChromeGrimpanFactory, IEGrimpanFactory } from "./GrimpanFactory.js";
import { ChromeGrimpanHistory, GrimpanHistory } from "./GrimpanHistory.js";
import { BtnType, ChromeGrimpanMenu, GrimpanMenu } from "./GrimpanMenu.js";

export interface GrimpanOption {
    menu: BtnType[];
}
export type GrimpanMode = 'pen' | 'eraser' | 'pipette' | 'circle' | 'rectangle';
export abstract class Grimpan {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    history!: GrimpanHistory;
    menu!: GrimpanMenu;
    mode!: GrimpanMode;

    protected constructor(canvas: HTMLElement | null, factory: typeof AbstractGrimpanFactory) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error('canvas 엘리먼트를 입력하세요');
        }
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;
    }

    setMode(mode: GrimpanMode) {
        console.log('mode change', mode);
        this.mode = mode;
    }

    abstract initialize(option: GrimpanOption): void
    abstract onMousedown(e: MouseEvent): void
    abstract onMousemove(e: MouseEvent): void
    abstract onMouseup(e: MouseEvent): void

    static getInstance() {}
}

export class ChromeGrimpan extends Grimpan {
    private static instance: ChromeGrimpan;
    override menu: ChromeGrimpanMenu;
    override history: ChromeGrimpanHistory;

    private constructor(canvas: HTMLElement | null, factory: typeof ChromeGrimpanFactory) {
        super(canvas, factory);
        this.menu = factory.createGrimpanMenu(this, document.querySelector('#menu')!);
        this.history = factory.createGrimpanHistory(this);
    }

    initialize(option: GrimpanOption) {
        this.menu.initialize(option.menu);
        this.history.initialize();
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            console.log(e);
            if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
                this.menu.executeCommand(new ForwardCommand(this.history));
                return;
            }
            if (e.code === 'KeyZ' && e.ctrlKey) {
                this.menu.executeCommand(new BackCommand(this.history));
                return;
            }
        });
        this.canvas.addEventListener('mousedown', this.onMousedown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMousemove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseup.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseup.bind(this));
    }

    override onMousedown(e: MouseEvent): void {
        this.mode.mousedown(e);
    }
    override onMousemove(e: MouseEvent): void {
        this.mode.mousemove(e);
    }
    override onMouseup(e: MouseEvent): void {
        this.mode.mouseup(e);
    }

    static override getInstance() {
        if (!this.instance) {
            this.instance = new ChromeGrimpan(document.querySelector('canvas'), ChromeGrimpanFactory)
        }
        return this.instance;
    }
}

export class IEGrimpan extends Grimpan {
    private static instance: IEGrimpan;

    initialize() {}

    override onMousedown(e: MouseEvent): void {

    }
    override onMousemove(e: MouseEvent): void {

    }
    override onMouseup(e: MouseEvent): void {

    }

    static override getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector('canvas'), IEGrimpanFactory);
        }
        return this.instance;
    }
}