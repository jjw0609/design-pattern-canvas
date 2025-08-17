import ChromeGrimpan from './ChromeGrimpan.js';
import IEGrimpan from './IEGrimpan.js';
import {AbstractGrimpanFactory, ChromeGrimpanFactory} from "./GrimpanFactory";


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
    const factory = ChromeGrimpanFactory;
    const grimpan = factory.createGrimpan();
    const grimpanMenu = factory.createGrimpanMenu(grimpan, document.querySelector('#menu')!);
    const grimpanHistory = factory.createGrimpanHistory(grimpan);
    grimpan.initialize();
    grimpanMenu.initialize();
    grimpanHistory.initialize([
        'back', 'forawrd', 'color', 'pipette', 'pen', 'circle', 'rectangle', 'eraser', 'save'
    ]);
}

main();