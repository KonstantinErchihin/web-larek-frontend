import { IOrder } from "../types";
import { Model } from "./base/Model";
import { ICardItem } from "./Card";
import { FormErrors } from "./common/Form";

export interface IAppState {
	cards: ICardItem[];
	selectedCard: ICardItem;
}

export class AppState extends Model<IAppState> {
	protected basket: ICardItem[] = [];
	protected _cards: ICardItem[];
	protected _selectCard: ICardItem;
	order: IOrder = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
        items: [],
	};
	formErrors: FormErrors = {};

	addToBasket(card: ICardItem) {
		if (this.basket.some((item) => item.id === card.id)) {
			return;
		}
		this.basket.push(card);
	}

	removeFromBasket(card: ICardItem) {
		this.basket = this.basket.filter((item) => item.id !== card.id);
	}

	set setCatalog(items: ICardItem[]) {
		this._cards = items;
		this.events.emit('items:change', this._cards);
	}
	get getCatalog() {
		return this._cards;
	}

	setOrderField<K extends keyof IOrder>(field: K, value: IOrder[K]) {
		this.order[field] = value;
		this.validateOrderForm();
	}

	validateOrderForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	setContactField<K extends keyof IOrder>(field: K, value: IOrder[K]) {
        this.order[field] = value;
        this.validateContactsForm();
    }

	validateContactsForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	clearBasket() {
		this.basket = [];
	}

	getBasket(): ICardItem[] {
		return this.basket;
	}	
}