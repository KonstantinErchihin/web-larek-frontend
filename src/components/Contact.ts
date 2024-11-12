import { IOrder } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class ContactForm extends Form<IOrder> {
    protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._email = ensureElement<HTMLInputElement>('.form__input[name=email]', this.container);
		this._phone = ensureElement<HTMLInputElement>('.form__input[name=phone]', this.container);
        
		this.updateButtonState();
	}

    updateButtonState() {
		const isEmailFilled = this._email.value.trim() !== '';
		const isPhoneFilled = this._phone.value.trim() !== '';
		this.buttonDisable(!(isEmailFilled && isPhoneFilled));
	}

	handleSubmit(e: Event) {
		if (this instanceof ContactForm) {
			e.preventDefault();
			this.events.emit('contact:submit');
			return true;
		} else {
			super.handleSubmit(e);
		}
	}
}