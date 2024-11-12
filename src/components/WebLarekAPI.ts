import { ICard, IOrder } from "../types";
import { Api, ApiListResponse } from "./base/api";

interface ILarekAPI {
	cdn: string;
	getItem: (id: string) => Promise<ICard>;
	getList: () => Promise<ICard[]>;
	orderItems: (order: IOrder) => Promise<ApiListResponse<string>>;
}

export class LarekAPI extends Api implements ILarekAPI  {
    cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getList(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) =>
			data.items.map((item) => ({
				...item,
				image: `${this.cdn}/${item.image}`,
			}))
		);
    }

    getItem(id: string): Promise<ICard> {
        return this.get(`/product/${id}`).then(
            (data: ICard) => ({
			    ...data,
			    image: `${this.cdn}/${data.image}`,
		    })
        );
    }

    orderItems(order: IOrder): Promise<ApiListResponse<string>> {
        return this.post('/order', order).then(
            (data: ApiListResponse<string>) => data);
    }

}