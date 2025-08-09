import type Grimpan from "./AbstractGrimpan.js";
import type IEGrimpan from "./IEGrimpan.js";
import type ChromeGrimpan from "./ChromeGrimpan.js";


export abstract class GrimpanHistory {
    grimpan: Grimpan;

    protected constructor(grimpan: Grimpan) {
        this.grimpan = grimpan;
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