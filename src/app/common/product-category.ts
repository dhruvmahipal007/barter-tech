import { Product } from "./product";

export class ProductCategory {
    menuGroupId : Number;
    groupName : string;
    groupNote: string;
    groupImageUrl : string;
    menuItems : Product[];
}
