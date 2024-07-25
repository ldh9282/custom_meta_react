import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [confirmCb, setConfirmCb] = useState(() => () => {});

    const globalState = {
        /**
         * @object confirmModal
         * @desc 확인모달 object
         */
        confirmModal: {
            /**
             * @variable isOpen
             * @desc 열림유무
             */
            isOpen: isOpen,
            /**
             * @function setIsOpen
             * @desc 열림유무 set
             */
            setIsOpen: setIsOpen,
            /**
             * @variable message
             * @desc 메시지
             */
            message: message,
            /**
             * @function confirmCb
             * @desc 확인 callback
             */
            confirmCb: confirmCb,
            /**
             * @function showConfirm
             * @desc 확인모달 show
             * @param {string} message
             * @param {function} confirmCb
             */
            showConfirm: function (message, confirmCb) {
                setIsOpen(true);
                setMessage(message);
                setConfirmCb(() => confirmCb);
            },
        },
    };

    return (
        <AppContext.Provider value={globalState}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlboalContext = () => {
    return useContext(AppContext);
};
