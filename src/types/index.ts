export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: TCategory;
    price: number;
    buttonDisable(state: boolean): void;
}

export interface IOrder{
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
}

export type TCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';


export interface IPaymentChange {
    method: string;
}