export type T_Rating = {
     rate: number;
     count: number;
};

export type T_Product = {
     _id: String;
     title: String;
     price: number;
     description: string;
     category: string;
     image: string;
     quantity: number;
     ratings: T_Rating;
     __V: number;
}