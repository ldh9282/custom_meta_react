import React, { useState } from "react";
import Modal from "react-modal";
import { useGlboalContext } from "../../context";

// 모달 스타일 정의
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 50, // z-index 값 설정
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: "320px",
        maxWidth: "90%",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        position: "relative",
    },
};

// 모달 컴포넌트
const ConfirmModal = () => {
    const { confirmModal } = useGlboalContext();

    const handleConfirm = () => {
        confirmModal.setIsOpen(false);
        if (confirmModal.confirmCb) {
            confirmModal.confirmCb();
        }
    };
    return (
        <Modal
            isOpen={confirmModal.isOpen}
            onRequestClose={() => confirmModal.setIsOpen(false)}
            style={customStyles}
            contentLabel="Modal"
            ariaHideApp={false}
        >
            <h2 className="text-lg font-bold mb-4">확인</h2>
            <p className="mb-4">{confirmModal.message}</p>
            <div className="flex justify-end">
                <button
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    onClick={handleConfirm}
                >
                    확인
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                    onClick={() => confirmModal.setIsOpen(false)}
                >
                    취소
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
