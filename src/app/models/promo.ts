export module Promo {

    class Serializable {
        fillFromJSON(json: any) {
            var jsonObj = json;
            for (var propName in jsonObj) {
                this[propName] = typeof jsonObj[propName] == 'object' ? this.fillFromJSON(jsonObj[propName]) : jsonObj[propName]
                this[propName] = jsonObj[propName]
            }
        }
    }

    export class PromoDetails {

        title: string;
        description: string;
        logoUrl: string;
        bannerUrl: string;
        dealerId: string;
        dealerName: string;
        promotionUrl: string;
        userIds: string[];

        constructor(data?: any) {

        }
    }

}
