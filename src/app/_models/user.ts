﻿import { DeclarationListEmitMode } from "@angular/compiler";

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
    Departmentname?: string;
    CustomerId?: string;
    StoreId?: string;
    StockDate?: string;
}

export class Master {
    id?: string;
    sku?: string;
    barcode?: string;
    retailPrice?: string;
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

export class stockAdjustment{
       find(arg0: (value: any, index: any) => any): any {
         throw new Error('Method not implemented.');
       }
       Id?: string;
       Rec?: string;
       Term?: string;
       Dload?: string;
       Tag?: string;
       Shelf?: string;
       Barcode?: string;
       SKU?: string;
       NOF?: string;
       Department?: string;
       Quantity?: string;
       Isdeleted?: boolean;
       Master?: Master;
}

