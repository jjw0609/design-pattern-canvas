import type Grimpan from "./AbstractGrimpan.js";
import type IEGrimpan from "./IEGrimpan.js";
import type ChromeGrimpan from "./ChromeGrimpan.js";
import {ChromeGrimpanMenu, IEGrimpanMenu} from "./GrimpanMenu.js";


interface Clonable {
    clone(): Clonable;
}

class HistoryStack extends Array implements Clonable {
    clone() {
        return this.slice() as HistoryStack;
    }
}

export abstract class GrimpanHistory {
    grimpan: Grimpan;
    stack: HistoryStack;

    getStack() {
        return this.stack.clone();
    }

    protected constructor(grimpan: Grimpan) {
        this.grimpan = grimpan;
        this.stack = new HistoryStack();
    }

    setStack(stack: HistoryStack) {
        this.stack = stack.clone();
    }

    abstract initialize(): void

    static getInstance(grimpan: Grimpan) {}
}

export class IEGrimpanHistory extends GrimpanHistory {
    private static instance: IEGrimpanHistory;

    override initialize(): void {

    }

    static override getInstance(grimpan: IEGrimpan): IEGrimpanMenu {
        if(!this.instance) {
            this.instance = new IEGrimpanMenu(grimpan);
        }

        return this.instance;
    }
}

export class ChromeGrimpanHistory extends GrimpanHistory {
    private static instance: ChromeGrimpanHistory;

    override initialize(): void {

    }

    static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanMenu {
        if(!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan);
        }

        return this.instance;
    }
}