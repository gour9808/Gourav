import { environment } from '../../environments/environment';

export class Constants {
    public static CARBOOK_BASE_URL = !environment.production ? "https://apis.test.carbookplus.com/" : "https://apis.carbookplus.com/";
    public static LOGIN_OAUTH2_URL = "oauth2-login/oauth2/";
    public static USER_DETAILS = "carbook-user-srv/rest/user";
    public static SEARCH_USER = "carbook-user-srv/rest/user/search?email="
    public static USER_VEHICLES = "carbook-vehicle-srv/rest/vehicles/";
    public static VEHICLES = "carbook-vehicle-srv/rest/vehiclemodels/";
    public static LOGBOOK_SRV_URL = "carbook-logbook-srv/rest/logbook?from=0&to=0&lastUpdatedTime=0";
    public static LOGBOOK_PRINT_SRV_URL = "carbook-logbook-print-srv/";
    public static FUEL_TYPE_SRV_URL = "carbook-fueltype-srv-v1/rest/fueltypes/localizations?locale=";

    public static CIDAAS_BASE_URL = !environment.production ? "https://apis-cidaas.test.carbookplus.com/" : "https://cidaas.carbookplus.com/";
    public static CIDAAS_USER_URL = "oauth2-usermanagement/oauth2/userinfo";
    public static CIDAAS_USER_GROUP_URL = "oauth2-dashboard/public/mapmultiplegroup";
    public static CIDAAS_USER_GROUPLIST_URL = "oauth2-usermanagement/group/grouplist/";
    public static VEHICLE_DETAIL_SERVICE_URL = "carbook-masterentry-srv/rest/vehicledetails/";
    public static SEARCH_VEHICLE_SERVICE_URL = "carbook-masterentry-srv/rest/vehicledetails/makemodelvariant";
    public static VEHICLE_PARTS_SERVICE_URL = "carbook-masterentry-srv/rest/parts/partsprices/";

    public static UPDATE_VENDOR_URL = "carbook-vendor-srv/rest/vendors";
    public static VENDOR_URL = "carbook-vendor-srv/rest/vendors";
    public static IMAGE_URL= "carbook-image-srv/rest/image";
    public static DEALER_SEARCH_BY_NAME_URL= "carbook-vendor-srv/rest/vendors/name";
    public static DEALER_SEARCH_BY_EMAIL= "carbook-vendor-srv/rest/vendors/email/"
    public static USER_LIST_URL= "carbook-user-srv/rest/user/dealer";
    public static SEARCH_MAKE_MODEL_URL= "carbook-vehicle-srv/rest/vehiclemodels/search";
    public static SEARCH_DEALER = "carbook-vendor-srv/rest/es/vendors/search?searchvalue=";
    public static DEALER_LIST = "carbook-vendor-srv/rest/vendors/make/";


    public static GET_POST_URL = function () {
        return Constants.CARBOOK_BASE_URL + Constants.VEHICLE_DETAIL_SERVICE_URL;
    }

    public static GET_VEHICLE_LIST = function () {
        return Constants.CARBOOK_BASE_URL + Constants.VEHICLE_DETAIL_SERVICE_URL;
    }

    public static GET_VEHICLE_INFO = function(vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.VEHICLE_DETAIL_SERVICE_URL + vehicleId;
    }

    public static UPDATE_VEHICLE_DETAILS = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.VEHICLE_DETAIL_SERVICE_URL + "?id=" +vehicleId;
    }

    public static SEARCH_VEHICLE = function () {
        return Constants.CARBOOK_BASE_URL + Constants.SEARCH_VEHICLE_SERVICE_URL;
    }

    public static GET_VEHICLE_BY_CREATOR = function (userId) {
        return Constants.CARBOOK_BASE_URL + Constants.SEARCH_VEHICLE_SERVICE_URL + userId;
    }

    public static DELETE_VEHICLE = function (vehicleDetailsId) {
        return Constants.CARBOOK_BASE_URL + Constants.VEHICLE_DETAIL_SERVICE_URL + vehicleDetailsId;
    }

    public static GET_PART_FOR_VEHICLE = function(){
        return Constants.CARBOOK_BASE_URL + Constants.VEHICLE_PARTS_SERVICE_URL + "makemodel";
    }

     public static CREATE_DEALER = function () {
        return Constants.CARBOOK_BASE_URL + 'carbook-vendor-srv/rest/dataentry/vendors';
    }

    public static GET_DEALER_DETAILS = function(id){
        return Constants.CARBOOK_BASE_URL + Constants.VENDOR_URL + "/"+id;
    }

    public static DEALER_PROMO_URL = function () {
        return Constants.CARBOOK_BASE_URL + Constants.VENDOR_URL + "/promo";
    }

    public static GET_USER_LIST = function (id) {
        return Constants.CARBOOK_BASE_URL + Constants.USER_LIST_URL + id;

    }

     public static GET_VEHICLE_LOGO = function (make) {
        let url = "pictures/MAKE/" + make.toLowerCase() + "_logo.png";

        return url
    }

    public static IMAGE_UPLOAD_URL = function(){
        return Constants.CARBOOK_BASE_URL + Constants.IMAGE_URL;
    }

    public static UPDATE_VENDOR_SRV_URL=function(id)
    {
        return Constants.CARBOOK_BASE_URL + Constants.UPDATE_VENDOR_URL + "/" +id;
    }

    public static SEARCH_DEALER_URL = function(keyword){
        return Constants.CARBOOK_BASE_URL + Constants.DEALER_SEARCH_BY_NAME_URL + "/" + keyword;
    }

    public static SEARCH_DEALER_ES = function(name,countrycode){
        return Constants.CARBOOK_BASE_URL+ Constants.SEARCH_DEALER + name + '&countrycode=' + countrycode + '&vendortype=VEHICLEDEALER'
    }
}
