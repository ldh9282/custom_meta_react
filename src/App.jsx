import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Layout from "./cmmn/component/Layout";
import TableMetaList from "./meta2024/table/component/tableMetaList";
import TableMetaReg from "./meta2024/table/component/TableMetaReg";

import ConfirmModal from "./cmmn/component/ConfirmModal";
import { Slide, ToastContainer } from "react-toastify";
import ColumnMetaList from "./meta2024/column/component/ColumnMetaList";
import Dimm from "./cmmn/component/Dimm";
import SeqMetaList from "./meta2024/seq/component/seqMetaList";
import SchemaMetaReg from "./meta2024/schema/component/SchemaMetaReg";
import ColumnMetaDetail from "./meta2024/column/component/ColumnMetaDetail";
import DomainReg from "./meta2024/domain/component/domainReg";
import DomainList from "./meta2024/domain/component/DomainList";

function App() {
    return (
        <>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/METTB02" />} />
                        <Route path="/METDM01" element={<DomainReg />} />
                        <Route path="/METDM03" element={<DomainList />} />
                        <Route path="/METTM01" element={<SchemaMetaReg />} />
                        <Route path="/METTM03" element={<SchemaMetaReg />} />
                        <Route path="/METSC02" element={<SchemaMetaReg />} />
                        <Route path="/METTB02" element={<TableMetaReg />} />
                        <Route path="/METTB01" element={<TableMetaList />} />
                        <Route path="/METCU01" element={<ColumnMetaList />} />
                        <Route path="/METCU02" element={<ColumnMetaDetail />} />
                        <Route path="/METSE01" element={<SeqMetaList />} />
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
