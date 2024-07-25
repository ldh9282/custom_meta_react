import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./cmmn/component/Layout";
import TableMetaList from "./meta2024/table/component/tableMetaList";
import TableMetaReg from "./meta2024/table/component/TableMetaReg";

import ConfirmModal from "./cmmn/component/ConfirmModal";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/METTB01" element={<TableMetaList />} />
                        <Route path="/METTB02" element={<TableMetaReg />} />
                    </Routes>
                </Layout>
            </Router>

            <ToastContainer />
            <ConfirmModal />
        </>
    );
}

export default App;
