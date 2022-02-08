
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

export class WorkLoad {
    customerId?: string;
    storeId?: string;
    date?: Date;
}


export class Sales {
    Id?: string;
    Store?: string;
    Date?: string;
    Time?: string;
    SKU?: string;
    Description?: string;
    Quantity?: string;
    Price?: string;
    Total?: string;
    HUA?: string;
    Area?: string;
    Family?: string;
    Lineal?: string;
    Metro?: string;
    Department?: string;
    Departmentname?:string;
    CustomerId?: string;
    StoreId?: string;
    StockDate?: string;
}

export class Master {
    id?: string;
    sku?: string;
    code?: string;
    salePrice?:string;
    description?: string;
    department?: string;
    blank?: string;
    ohQuantity?: string;
    unity?: string;
    customerId?: string;
    storeId?: string;
    stockDate?: string;
}

export class Range {
    id?: string;
    name?: string;
    group?: string;
    tagFrom?: string;
    tagTo?: string;
    customerId?: string;
    storeId?: string;
    stockDate?: string;
}

export class Department {
    id?: string;
    division?: string;
    divisionname?: string;
    department?: string;
    departmentname?: string;
    customerId?: string;
    storeId?: string;
    stockDate?: string;
}

export class Category {
    id?: string;
    division?: string;
    divisionname?: string;
    category?: string;
    categoryname?: string;
    customerId?: string;
    storeId?: string;
    stockDate?: string;
}

export class Reserved {
    id?: string;
    store?: string;
    code?: string;
    quantity?: string;
    filler?: string;
    customerId?: string;
    storeId?: string;
    stockDate?: string;
}

export class ParametersByDepartment {
    id?: string;
    department?: string;
    quantity?: string;
    pesos?: string;
    percentageInPieces?: string;
    customerId?: string;
    storeId?: string;
    stockDate?: string;
}