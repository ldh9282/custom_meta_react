import React, { useEffect, useState } from "react";
import { CmmnUtils } from "../../../cmmn/utils/CmmnUtils";
import { useNavigate } from "react-router-dom";
import { AlertUtils } from "../../../cmmn/utils/AlertUtils";
import { LogUtils } from "../../../cmmn/utils/LogUtils";
import { useGlboalContext } from "../../../context";

/**
 * @function TableMetaList
 * @desc 테이블목록 컴포넌트
 * @returns
 */
const TableMetaList = () => {
    /** 전역상태 */
    const { confirmModal } = useGlboalContext();

    /** defaultMap */
    const [defaultMap, setDefaultMap] = useState({
        pageNum: "1",
        rowAmountPerPage: "10",
        schemaName: "",
        tableName: "",
        tableDesc: "",
    });
    /** searchMap */
    const [searchMap, setSearchMap] = useState({
        pageNum: "1",
        rowAmountPerPage: "10",
        schemaName: "",
        tableName: "",
        tableDesc: "",
    });

    /** data */
    const [data, setData] = useState([]);

    /** pagingCreator */
    const [pagingCreator, setPagingCreator] = useState({});

    const navigate = useNavigate();

    /** 초기조회 */
    useEffect(() => {
        CmmnUtils.axios
            .get(CmmnUtils.url("METTB01"), CmmnUtils.requestParam(defaultMap))
            .then((response) => {
                if (CmmnUtils.header(response).status === "0000") {
                    let requestMap = CmmnUtils.body(response).requestMap;
                    let tableMetaInfoList =
                        CmmnUtils.body(response).tableMetaInfoList;
                    let thePagingCreator =
                        CmmnUtils.body(response).pagingCreator;

                    setDefaultMap(requestMap);
                    setSearchMap(requestMap);
                    setData(tableMetaInfoList);
                    setPagingCreator(thePagingCreator);
                } else {
                    AlertUtils.showError(CmmnUtils.header(response).errorMsg);
                }
            })
            .catch((error) => {
                LogUtils.debug(error.toString());
            });
    }, []);

    /**
     * @function handleSearch
     * @desc 검색
     */
    const handleSearch = () => {
        CmmnUtils.axios
            .get(CmmnUtils.url("METTB01"), CmmnUtils.requestParam(searchMap))
            .then((response) => {
                if (CmmnUtils.header(response).status === "0000") {
                    let requestMap = CmmnUtils.body(response).requestMap;
                    let tableMetaInfoList =
                        CmmnUtils.body(response).tableMetaInfoList;
                    let thePagingCreator =
                        CmmnUtils.body(response).pagingCreator;

                    setDefaultMap(requestMap);
                    setSearchMap(requestMap);
                    setData(tableMetaInfoList);
                    LogUtils.debug(tableMetaInfoList);
                    setPagingCreator(thePagingCreator);
                } else {
                    alert(CmmnUtils.header(response).errorMsg);
                }
            })
            .catch((error) => {
                LogUtils.debug(error.toString());
            });
    };

    /**
     * @function handleDelete
     * @desc 테이블삭제요청
     * @param {string} theTableMetaSno
     */
    const handleDelete = (theTableMetaSno) => {
        confirmModal.showConfirm("삭제하시겠습니까?", function () {
            CmmnUtils.axios
                .post(
                    CmmnUtils.url("METTB05"),
                    CmmnUtils.requestBody({ tableMetaSno: theTableMetaSno })
                )
                .then((response) => {
                    if (CmmnUtils.header(response).status === "0000") {
                        AlertUtils.showSuccess("삭제되었습니다", function () {
                            window.location.reload();
                        });
                    } else {
                        AlertUtils.showError(
                            CmmnUtils.header(response).errorMsg
                        );
                    }
                })
                .catch((error) => {
                    LogUtils.debug(error.toString());
                });
        });
    };

    /**
     * @function handleChangeRowAmount
     * @desc 페이지당 행수변경
     * @param {string} theRowAmountPerPage
     */
    const handleChangeRowAmount = (theRowAmountPerPage) => {
        CmmnUtils.axios
            .get(
                CmmnUtils.url("METTB01"),
                CmmnUtils.requestParam({
                    ...defaultMap,
                    rowAmountPerPage: theRowAmountPerPage,
                })
            )
            .then((response) => {
                if (CmmnUtils.header(response).status === "0000") {
                    let requestMap = CmmnUtils.body(response).requestMap;
                    let tableMetaInfoList =
                        CmmnUtils.body(response).tableMetaInfoList;
                    let thePagingCreator =
                        CmmnUtils.body(response).pagingCreator;

                    setDefaultMap(requestMap);
                    setSearchMap(requestMap);
                    setData(tableMetaInfoList);
                    setPagingCreator(thePagingCreator);
                } else {
                    AlertUtils.showError(CmmnUtils.header(response).errorMsg);
                }
            })
            .catch((error) => {
                LogUtils.debug(error.toString());
            });
    };

    return (
        <div>
            <h5 className="text-xl font-bold">테이블목록</h5>
            <form>
                <div className="mb-3">
                    <label htmlFor="rowAmountPerPage">페이지당 행 수:</label>
                    <select
                        id="rowAmountPerPage"
                        value={searchMap.rowAmountPerPage}
                        onChange={(e) => handleChangeRowAmount(e.target.value)}
                        className="ml-2 p-2 border"
                    >
                        <option value="10">10개</option>
                        <option value="20">20개</option>
                        <option value="50">50개</option>
                        <option value="100">100개</option>
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                        <label htmlFor="schemaName">스키마명:</label>
                        <input
                            type="text"
                            id="schemaName"
                            value={searchMap.schemaName}
                            onChange={(e) =>
                                setSearchMap({
                                    ...searchMap,
                                    schemaName: e.target.value,
                                })
                            }
                            className="ml-2 p-2 border w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="tableName">테이블명:</label>
                        <input
                            type="text"
                            id="tableName"
                            value={searchMap.tableName}
                            onChange={(e) =>
                                setSearchMap({
                                    ...searchMap,
                                    tableName: e.target.value,
                                })
                            }
                            className="ml-2 p-2 border w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="tableDesc">테이블설명:</label>
                        <input
                            type="text"
                            id="tableDesc"
                            value={searchMap.tableDesc}
                            onChange={(e) =>
                                setSearchMap({
                                    ...searchMap,
                                    tableDesc: e.target.value,
                                })
                            }
                            className="ml-2 p-2 border w-full"
                        />
                    </div>
                </div>
                <div className="text-right mb-3">
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        검색
                    </button>
                </div>
            </form>
            <table className="w-full bg-white border mt-3">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">테이블메타일련번호</th>
                        <th className="p-2 border">스키마명</th>
                        <th className="p-2 border">테이블명</th>
                        <th className="p-2 border">테이블설명</th>
                        <th className="p-2 border">테이블삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.tableMetaSno}>
                                <td className="p-2 border text-center">
                                    {item.tableMetaSno}
                                </td>
                                <td className="p-2 border text-center">
                                    {item.schemaName}
                                </td>
                                <td className="p-2 border text-center">
                                    {item.tableName}
                                </td>
                                <td className="p-2 border text-center">
                                    {item.tableDesc}
                                </td>
                                <td className="p-2 border text-center">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(item.tableMetaSno)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        테이블 삭제
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableMetaList;
