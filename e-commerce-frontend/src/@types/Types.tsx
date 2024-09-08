export type T_Rating = {
     rate: number;
     count: number;
};

export type T_Product = {
     _id: string;
     name: String;
     price: number;
     description: string;
     category: string;
     image: string;
     quantity: number;
     ratings: T_Rating;
     __V: number;
}

export type T_SignInBody = {
     email: string;
     password: string;
}

export type T_UserProfile = {
     username: string;
     createAt: string;  
     email: string;
     password: string;
     phone: string;
     profilePhoto: string;
     __v: number;
     _id: string;
 };

 export type T_SignUpBody = {
     username: string;
     firstname?: string;
     lastname?: string;
     email: string;
     password: string;
     confirmPassword: string;
 }