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
        LogUtils.trace(url);
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

    static setTitle(title) {
        document.title = `${title} | 메타관리시스템`;
    }
}
