import { useEffect } from "react";
import { CmmnUtils } from "../utils/CmmnUtils";
import { LogUtils } from "../utils/LogUtils";
import { Navigate } from "react-router-dom";
import { AuthUtils } from "../utils/AuthUtils";

const PrivateRoute = ({ element: Element, ...rest }) => {
    // 초기 조회
    useEffect(() => {
        if (AuthUtils.isAuthenticated()) {
            CmmnUtils.authAxios
                .get(CmmnUtils.url("METLG06"), CmmnUtils.requestParam({}))
                .then((response) => {
                    let header = CmmnUtils.header(response);
                    if (header.status === "0000") {
                        let body = CmmnUtils.body(response);
                        if (header.auth.authenticatedYn === "1") {
                            AuthUtils.setAuthItems(header);
                        } else {
                            AuthUtils.removeAuthItems();
                        }
                    } else {
                        AuthUtils.removeAuthItems();
                        AlertUtils.showError(header.errorMsg);
                    }
                })
                .catch((error) => {
                    AuthUtils.removeAuthItems();
                    LogUtils.debug(error.toString());
                });
        }
    }, []);

    if (AuthUtils.isAuthenticated()) {
        return <Element {...rest} />;
    } else {
        AuthUtils.removeAuthItems();
        return <Navigate to="/METLG04" />;
    }
};

export default PrivateRoute;
