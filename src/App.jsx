import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./cmmn/component/Layout";
import TableMetaList from "./meta2024/table/component/tableMetaList";
import TableMetaReg from "./meta2024/table/component/TableMetaReg";

import ConfirmModal from "./cmmn/component/ConfirmModal";
import { Slide, ToastContainer } from "react-toastify";
import ColumnMetaList from "./meta2024/column/component/ColumnMetaList";
import Dimm from "./cmmn/component/Dimm";

function App() {
    return (
        <>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/METTB02" element={<TableMetaReg />} />
                        <Route path="/METTB01" element={<TableMetaList />} />
                        <Route path="/METCU01" element={<ColumnMetaList />} />
                    </Routes>
                </Layout>
            </Router>
            {/* https://fkhadra.github.io/react-toastify/introduction/ */}
            <ToastContainer
                position="top-center"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
                transition={Slide}
            />
            <ConfirmModal />
            <Dimm />
        </>
    );
}

export default App;
