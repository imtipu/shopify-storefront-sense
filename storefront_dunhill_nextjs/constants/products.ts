import type {
    Product
} from "@/interfaces/products";

export const products: Product[] = [
	{
		id: "1",
		title: "Dunhill Gifting",
		slug: "dunhill-gifting-1",
		price: 100,
		images: ["/images/product-1.jpg"],
	},
	{
		id: "2",
		title: "Dunhill Gifting",
		slug: "dunhill-gifting-2",
		price: 200,
		images: ["/images/product-2.jpg"],
	},
	{
		id: "3",
		title: "Dunhill Gifting",
		slug: "dunhill-gifting-3",
		price: 300,
		images: ["/images/product-3.jpg"],
	},
];

export const ClothingProducts: Product[] = [
	{
		id: "DU25RK2494P123",
		title: "Cotton Silk Cable Crew Neck Jumper",
		slug: "cotton-silk-cable-crew-neck-jumper",
		images: [
			"/images/product-1.jpg",
			"/images/product-2.jpg",
			"/images/product-3.jpg",
		],
		compare_at_price: 1350,
		price: 900,
		currency: "USD",
		description:
			"This off-white cable-knit jumper is spun from an Italian cotton-silk blend and finished with ribbed trims. ",
	},
	{
		id: "DU24FM931AZ272",
		title: "Lightweight Cotton Joggers",
		slug: "lightweight-cotton-joggers",
		images: [
			"/images/product-1.jpg",
			"/images/product-2.jpg",
			"/images/product-3.jpg",
		],
		compare_at_price: 475,
		price: 215,
		currency: "USD",
		description:
			"This lightweight cotton jogger is finished with a ribbed waistband and cuffs. ",
	},
	{
		id: "DU25FB41JXL036",
		title: "Wool Silk Herringbone Bourdon Jacket",
		slug: "wool-silk-herringbone-bourdon-jacket",
		images: [
			"/images/product-1.jpg",
			"/images/product-2.jpg",
			"/images/product-3.jpg",
		],
		compare_at_price: 2950,
		price: 1975,
		currency: "USD",
		description:
			"This wool silk herringbone jacket is finished with a ribbed waistband and cuffs. ",
	},
	{
		id: "DU24RF167X6100",
		title: "Cotton Spread Collar Evening Shirt",
		slug: "cotton-spread-collar-evening-shirt",
		images: [
			"/images/product-1.jpg",
			"/images/product-2.jpg",
			"/images/product-3.jpg",
		],
		compare_at_price: 625,
		price: 415,
		currency: "USD",
		description:
			"This cotton spread collar evening shirt is finished with a ribbed waistband and cuffs. ",
	},
	{
		id: "DU25RK2254K100",
		title: "Cotton Cashmere Cardigan",
		slug: "cotton-cashmere-cardigan",
		images: [
			"/images/product-1.jpg",
			"/images/product-2.jpg",
			"/images/product-3.jpg",
		],
		compare_at_price: 1175,
		price: 590,
		currency: "USD",
		description:
			"This cotton cashmere cardigan is finished with a ribbed waistband and cuffs. ",
	},
];
