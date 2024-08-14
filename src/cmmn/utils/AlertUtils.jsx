import $ from "jquery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "../component/Message";
import { LogUtils } from "./LogUtils";

export class AlertUtils {
    static checkRequiredFields(fieldList) {
        let missingFields = [];

        for (let idx in fieldList) {
            if (!fieldList[idx].value) {
                missingFields.push(fieldList[idx]);
            }
        }

        if (missingFields.length > 0) {
            let message = "다음 필수값을 입력해주세요:\n\n";
            missingFields.forEach(function (field) {
                message += "- " + field.label + "\n";
            });
            if (!AlertUtils) {
                alert(message);
            } else {
                AlertUtils.showError(message);
            }

            return false;
        }

        return true;
    }

    static showInfo(message, callback) {
        toast.info(
            <Message>{message?.toString().replace(/\n/g, "<br>")}</Message>,
            {
                onOpen: callback,
            }
        );
    }
    static showError(message, callback) {
        toast.error(
            <Message>{message?.toString().replace(/\n/g, "<br>")}</Message>,
            {
                onOpen: callback,
            }
        );
    }
    static showSuccess(message, callback) {
        toast.success(
            <Message>{message?.toString().replace(/\n/g, "<br>")}</Message>,
            {
                onOpen: callback,
            }
        );
    }
}
