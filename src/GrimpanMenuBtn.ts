import type {GrimpanMenu} from "./GrimpanMenu.js";

export class GrimpanMenuBtn {
    privat menu: GrimpanMenu;
    private name: string;
    private type: string;
    private onClick?: () => void;
    private onChange?: () => void;
    private active?: boolean;
    private value?: string | number;

    private constructor(menu: GrimpanMenu, name: string, type: string, onClick?: () => void, onChange?: () => void, active?: boolean, value?: string | number) {
        this.menu = menu;
        this.name = name;
        this.type = type;
        this.onClick = onClick;
        this.onChange = onChange;
        this.active = active;
        this.value = value;
    }

    draw() {
        if(this.type === 'button') {
            const btn = document.createElement('button');
            btn.textContent = this.name;
            if(this.onClick) {
                btn.addEventListener('click', this.onClick.bind(this));
            }
            this.menu.dom.append(btn);
        } else if(this.type === 'input') {
            const btn = document.createElement('input');
            btn.title = this.name;
            if(this.onClick) {
                btn.addEventListener('change', this.onChange.bind(this));
            }
            this.menu.dom.append(btn);
        }
    }

    static Builder = class GrimpanMenuBtnBuilder {
        btn: GrimpanMenuBtn;

        constructor(menu: GrimpanMenu, name: string, type: string) {
            this.btn = new GrimpanMenuBtn(menu, name, type);
        }

        setName(name: string) {
            this.btn.name = name;
            return this;
        }
        setType(type: string) {
            this.btn.type = type;
            return this
        }

        setOnClick(onClick: () => void) {
            this.btn.onClick = onClick;
            return this;
        }
        setOnChange(onChange: () => void) {
            this.btn.onChange = onChange;
            return this;
        }
        setActive(active: boolean) {
            this.btn.active = active;
            return this;
        }
        setValue(value: string | number) {
            this.btn.value = value;
            return this;
        }
        build() {
            return this.btn;
        }
    }
}

const backBtn = new GrimpanMenuBtn.Builder('뒤로', 'back')
    .setOnClick(() => {})
    .setActive(false)
    .build();