import axios from "axios";
import { LogUtils } from "./LogUtils";

const path = "http://localhost:8080/v2/";

export class CmmnUtils {
    static axios = axios.create({
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
    });
    static url(url) {
        if (url.charAt(0) === "/") {
            url = url.substring(1);
        }
        return path + url;
    }

    static requestParam(data) {
        LogUtils.trace(data);
        return { params: data };
    }
    static requestBody(data) {
        LogUtils.trace({ ...data });
        return { ...data };
    }

    static header(response) {
        LogUtils.trace(response.data?.body);
        return response.data?.header;
    }

    static body(response) {
        return response.data?.body;
    }

    static nvl(value, defaultValue) {
        if (!value) {
            return defaultValue;
        }
        return value;
    }
}

export function camel2Snake(str) {
    str = str.charAt(0).toLowerCase() + str.substr(1, str.length);
    return str.replace(/([A-Z])/g, (word) => "_" + word.toLowerCase());
}
export function snake2Camel(str) {
    str = str.toLowerCase();
    return str.replace(/_./g, (word) => word.charAt(1).toUpperCase());
}
export function chanegeCase(str) {
    if (str === str.toLowerCase()) {
        return str.toUpperCase();
    } else if (str === str.toUpperCase()) {
        return str.toLowerCase();
    } else {
        return str;
    }
}
