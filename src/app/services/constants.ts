import {environment} from '../../environments/environment';

export class Constants {
    public static GET_PRODUCTS = "https://my-json-server.typicode.com/banshilaldangi/ecommerce/products";
    public static GET_CATAGORIES = "https://my-json-server.typicode.com/banshilaldangi/ecommerce/categories";
    public static GET_BRANDS= "https://my-json-server.typicode.com/banshilaldangi/ecommerce/brands";
    public static GET_FEATURES = "https://my-json-server.typicode.com/banshilaldangi/ecommerce/features";
    
    public static GET_PRODUCTS_BY_ID = function (id) {
        return "https://my-json-server.typicode.com/banshilaldangi/ecommerce/products?brand_id=" + id;
    };
}
