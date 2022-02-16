
import { Master } from ".";

export class stockAdjustment{
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

export class StockFilterModel{
    term?: string;
    dload?: number;
    tag?: number;
    shelf?: string;
    barcode?: string;
    department?: number;
    quantity?: number;
    sku?: string;
    retailPrice?: string;
    description?: string;
    searchtext?: string;
    empno?:number;
}
export class formStore{
   
    header?: string;
    fileName?: string;
    fileDate?: string;
    storeNumber?: string;
    category?: string;
    recordCount?: string;
    status?:string;
}
