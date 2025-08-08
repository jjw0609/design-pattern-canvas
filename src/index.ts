import ChromeGrimpan from './ChromeGrimpan.js';
import IEGrimpan from './IEGrimpan.js';
import AbstractGrimpanFactory from "./AbstractGrimpanFactory.js";
import Grimpan from "./AbstractGrimpan.js";


class ChromeGrimpanFactory extends AbstractGrimpanFactory {
    static override createGrimpan() {
        return ChromeGrimpan.getInstance();
    }
}

class IEGrimpanFactory extends AbstractGrimpanFactory {
    static override createGrimpan() {
        return IEGrimpan.getInstance();
    }
}


function grimpanFactory(type: string) {
    if(type === 'ie') {
        return IEGrimpan.getInstance();
    } else if(type === 'chrome') {
        return ChromeGrimpan.getInstance();
    } else {
        throw new Error('일치하는 type이 없습니다.');
    }
}

function main() {
    const grimpan = ChromeGrimpanFactory.createGrimpan();
    grimpan.initialize();
    grimpan.initializeMenu();
}

main();