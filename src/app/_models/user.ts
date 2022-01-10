export class User {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    customerId?: string;
    storeId?: string;
    role?: string;
    customer?: Customer;
    store?: Store;
}

export class Customer {
    id?: string;
    name?: string;
    user?: User[];
    stores?: Store[];
}

export class Store {
    id?: number;
    customerId?: string;
    userId?: string;
    name?: string;
    phoneNumber?: string;
    customer?: Customer;
    user?: User;
}