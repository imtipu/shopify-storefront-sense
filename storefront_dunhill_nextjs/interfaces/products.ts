export interface Product {
	id: string;
	title: string;
	slug: string;
	description?: string;
	price: number;
	compare_at_price?: number;
	images?: string[];
	currency?: string | 'USD';
}