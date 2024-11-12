import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IActions } from "./Card";

export interface IBasketView {
	title: HTMLElement;
	list: HTMLElement[];
	total: HTMLElement;
	button: HTMLButtonElement;
}

interface IBasketItem {
	index: number;
	title: string;
	price: number;
}

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;
	
	constructor(container: HTMLElement, actions?:IActions) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');
		
		if (this._button) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}

	buttonDisable(state: boolean) {
		this.setDisabled(this._button, state);
	}
}

export class BasketItem extends Component<IBasketItem> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteButton: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);

		this._index = ensureElement<HTMLElement>(`.basket__item-index`, this.container);
		this._title = ensureElement<HTMLElement>('.card__title', this.container);
		this._price = ensureElement<HTMLElement>('.card__price', this.container);
		this._deleteButton = this.container.querySelector('.card__button');

		this._deleteButton.addEventListener('click', actions.onClick);
	}

	set index(index: number) {
		this._index.textContent = index.toString();
	}
	set title(title: string) {
		this._title.textContent = title;
	}
	set price(price: number) {
		this._price.textContent = price.toString();
	}
	
}