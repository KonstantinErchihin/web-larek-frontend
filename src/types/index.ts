// получаем с сервера все карточки
export interface IListCards<T> {
    total: number;
    items: T[];
}

// данные карточки товара
export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// данные корзины с заказом
export interface IBasket {
    items: string[];
	total: number;
}

// данные пользователя для совершения покупки
export interface IOrder{
    payment: TPaymentMethod;
    email: string;
    phone: string;
    adress: string;
    total: number;
    items: string[];
}

// данные о методе оплаты
export type TPaymentMethod = 'card' | 'cash';

// данные формы заказа и контактов
export type TOrder = Omit<IOrder, 'items' | 'total'>;

// данные формы заказа
export type TOrderForm = Pick<IOrder, 'payment' | 'adress'>;

// данные формы контактов
export type TContactsForm = Pick<IOrder, 'email' | 'phone'>;

// данные отправки формы успешной покупки
export type TOrderResult  = Pick<IOrder, 'total'>;

export interface IOrderResult  {
	id: string;
	total: number;
}

export interface ICardsAPI {
    getList: () => Promise<ICard[]>;
    getItem: (id: string) => Promise<ICard>;
    orderItems: (order: IOrder) => Promise<IOrderResult>;
}