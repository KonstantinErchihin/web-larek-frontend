
import { TCategory } from "../types/index";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export interface ICardItem {
	id: string;
	description?: string;
	image: string;
	title: string;
	category: TCategory;
	price: number;
	buttonDisable(state: boolean): void;
}

export interface IActions {
	onClick: (event: MouseEvent) => void;
}

// класс для работы с карточкой товара
export class Card extends Component<ICardItem> {
    // определяем элементы карточки 
    protected _id: string;
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;  

    constructor(container: HTMLElement, actions?: IActions) {
        super(container);

        // инициализуем элементы карточки
        this._image = ensureElement<HTMLImageElement>(`.card__image`,container);
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);      
        
        if (actions && actions.onClick) {
			this.clickHandler(actions.onClick);
		}
    };

    clickHandler(handler: (event: MouseEvent) => void) {
		this.container.addEventListener('click', handler);
	}
    
    // установка значения свойства image объекта
    set image(value: string) {
        this.setImage(this._image, value, this.title);
    };
    
    // установка заголовка карточки
    set title(value: string) {
        this.setText(this._title, value);
    };

    // установка категории товара
    set category(value: TCategory) {
		this._category.classList.remove(
            'card__category_soft',
            'card__category_other',
            'card__category_additional',
            'card__category_button',
            'card__category_hard'
        );
    
        this.setText(this._category, value);

        if (value === 'софт-скил') {
            this._category.classList.add('card__category_soft');
        } else if (value === 'другое') {
            this._category.classList.add('card__category_other');
        } else if (value === 'дополнительное') {
            this._category.classList.add('card__category_additional');
        } else if (value === 'кнопка') {
            this._category.classList.add('card__category_button');
        } else if (value === 'хард-скил') {
            this._category.classList.add('card__category_hard');
        }
	};

    // установка цены товара
    set price(value: number) {
        this.setText(this._price, `${value} cинапсов`);
		if (value === null) {
			this.setText(this._price, `Бесценно`);
		}
    }
}

export class CardPreview extends Card {
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
    
	constructor( container: HTMLElement, actions?: IActions) {
		super(container, actions);
		this._description = ensureElement<HTMLElement>(`.card__text`,container);
		this._button = ensureElement<HTMLButtonElement>(`.card__button`,container);

		if (this._button) {
			this.clickHandler(actions.onClick);
		}
	}

	set description(value: string) {
		this._description.textContent = value;
	}

	set button (value: string)  {
		this._button.textContent  = value;
	}

	buttonDisable(state: boolean) {
		this.setDisabled(this._button, state);
	}

	clickHandler(handler: (event: MouseEvent) => void) {
		if (this._button) {
			this._button.addEventListener('click', handler);
		}
	}
}