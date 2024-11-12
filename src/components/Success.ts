import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";


export interface ISuccess {
	title: HTMLElement;
	total: HTMLElement;
	buttonClose: HTMLButtonElement;
}

export class Success extends Component<ISuccess> {
    protected title: HTMLElement;
    protected _description: HTMLElement;
    protected buttonClose: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.title  = ensureElement<HTMLElement>('.order-success__title',  this.container);
        this._description = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.buttonClose = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this.buttonClose.addEventListener('click', this.handleSuccessSubmit.bind(this));
    }

    // меняет содержимое элемента с суммой покупки
    set description(value: string)  {
		this._description.textContent = value;
	}

	handleSuccessSubmit() {
		this.events.emit('success:close');
	}

}