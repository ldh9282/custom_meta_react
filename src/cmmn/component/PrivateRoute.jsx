import { useEffect } from "react";
import { CmmnUtils } from "../utils/CmmnUtils";
import { LogUtils } from "../utils/LogUtils";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
    // 초기 조회
    if (localStorage.getItem("jwtToken")) {
        useEffect(() => {
            CmmnUtils.axios
                .get(CmmnUtils.url("METLG06"), CmmnUtils.requestParam({}))
                .then((response) => {
                    let header = CmmnUtils.header(response);
                    if (header.status === "0000") {
                        let body = CmmnUtils.body(response);
                        if (!body.isAuthenticated) {
                            localStorage.removeItem("jwtToken");
                        }
                    } else {
                        localStorage.removeItem("jwtToken");
                        AlertUtils.showError(header.errorMsg);
                    }
                })
                .catch((error) => {
                    localStorage.removeItem("jwtToken");
                    LogUtils.debug(error.toString());
                });
        }, []);
    }

    if (localStorage.getItem("jwtToken")) {
        return <Element {...rest} />;
    } else {
        return <Navigate to="/METLG04" />;
    }
};

export default PrivateRoute;
