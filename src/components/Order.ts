import { IOrder } from "../types";
import { ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { Form } from "./common/Form";


export class OrderForm extends Form<IOrder> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;
	protected _inputAdress: HTMLInputElement;

	constructor(container: HTMLFormElement, events: EventEmitter) {
		super(container, events);

		this._paymentCard = ensureElement<HTMLButtonElement>('button[data-method=online]',this.container);
		this._paymentCash = ensureElement<HTMLButtonElement>('button[data-method=cash]',this.container);
		this._inputAdress = ensureElement<HTMLInputElement>('.form__input', this.container);
		this.setAddEventListeners();
	}

	setAddEventListeners() {
		this._paymentCard.addEventListener('click',this.handleMethodCard.bind(this));
		this._paymentCash.addEventListener('click',this.handleMethodCash.bind(this));
		
		this.updateButtonState();
	}

	handleMethodCard() {
		this.handlePayment('online', this._paymentCard, 'paymentCard:changed', this._paymentCash);
	}

	handleMethodCash() {
		this.handlePayment('cash', this._paymentCash, 'paymentCash:changed', this._paymentCard);
	}

	handlePayment(method: string, currentButton: HTMLButtonElement, eventName: string, otherButton: HTMLButtonElement) {
		const currentMethod = currentButton.getAttribute('data-method') || '';
		if (currentMethod === method) {
			currentButton.classList.add('button_alt-active');
			this.events.emit(eventName, { method });
			otherButton.classList.remove('button_alt-active');
		}
	}

	updateButtonState() {
		const isAdressInput = this._inputAdress.value.trim() !== '';
		const isPaymentCard = this._paymentCard.value.trim() !== '';
		const isPaymentCash = this._paymentCash.value.trim() !== '';
		this.buttonDisable(!(isAdressInput && (isPaymentCard || isPaymentCash)));
	}

	clearForm() {
		super.clearForm();
		this._paymentCard.classList.remove('button_alt-active');
		this._paymentCash.classList.remove('button_alt-active');
		
	}
}