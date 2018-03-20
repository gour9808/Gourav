import { environment } from '../../environments/environment';

export class Constants {
    public static HEALTHCUBE_BASE_URL = !environment.production ? "https://dev-ezdx.healthcubed.com/" : "https://ezdx.healthcubed.com/";
    public static LOGIN_OAUTH2_URL = "oauth2-login/oauth2/";
    public static USER_DETAILS = "ezdx-patient-query/api/v1/patients/self";
    public static USER_VISITS = "ezdx-visit-query/api/v1/visits/search";
    public static FAMILY_DETAILS = "ezdx-patient-query/api/v1/patients/search?";

    public static GET_VISITS = function (id) {
        return Constants.HEALTHCUBE_BASE_URL + Constants.USER_VISITS + '?searchcriteria=PATIENT&patientId=' + id + '&page=0&limit=0'
    };

    public static GET_FAMILY_DETAILS = function (number) {
        return Constants.HEALTHCUBE_BASE_URL + Constants.FAMILY_DETAILS + 'searchcriteria=PHONE&' + 'phone=' + number;
    }
}
