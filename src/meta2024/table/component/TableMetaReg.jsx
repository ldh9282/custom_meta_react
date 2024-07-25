import React, { useEffect, useState } from "react";
import { camel2Snake, CmmnUtils } from "../../../cmmn/utils/CmmnUtils";
import { nanoid } from "nanoid/non-secure";
import $ from "jquery";
import { AlertUtils } from "../../../cmmn/utils/AlertUtils";
import { useNavigate } from "react-router-dom";
import { LogUtils } from "../../../cmmn/utils/LogUtils";
import { useGlboalContext } from "../../../context";

const TableMetaReg = () => {
    /** 전역상태 */
    const { confirmModal } = useGlboalContext();

    /** 스키마명 목록 */
    const [schemaNameList, setSchemaNameList] = useState([]);
    /** 스키마명 */
    const [schemaName, setSchemaName] = useState("");
    /** 테이블명 */
    const [tableName, setTableName] = useState("");
    /** 테이블설명 */
    const [tableDesc, setTableDesc] = useState("");
    /** pk목록 */
    const [pkColumns, setPkColumns] = useState([]);
    /** 컬럼목록 */
    const [columns, setColumns] = useState([]);

    const navigate = useNavigate();

    /** 초기조회 */
    useEffect(() => {
        CmmnUtils.axios
            .get(CmmnUtils.url("METTB02"), CmmnUtils.requestParam({}))
            .then((response) => {
                if (CmmnUtils.header(response).status === "0000") {
                    let schemaNameInfo =
                        CmmnUtils.body(response).schemaNameInfo;
                    setSchemaNameList(schemaNameInfo.list);
                } else {
                    alert(CmmnUtils.header(response).errorMsg);
                }
            })
            .catch((error) => {
                LogUtils.debug(error.toString());
            });
    }, []);

    /**
     * @function handleAddPkColumn
     * @desc pk 컬럼 추가
     */
    const handleAddPkColumn = () => {
        setPkColumns([
            ...pkColumns,
            { columnName: "", columnCamelName: "", columnSnakeName: "" },
        ]);
    };

    /**
     * @function handlePkInputChange
     * @desc pk 컬럼카멜명 입력
     * @param {number} index
     * @param {string} fieldName
     * @param {string} value
     */
    const handlePkInputChange = (index, fieldName, value) => {
        const thePkColumns = [...pkColumns];
        thePkColumns[index] = {
            ...thePkColumns[index],
            [fieldName]: value,
        };
        if (fieldName === "columnCamelName") {
            thePkColumns[index] = {
                ...thePkColumns[index],
                ["columnSnakeName"]: camel2Snake(value).toUpperCase(),
            };
        }
        setPkColumns(thePkColumns);
    };

    /**
     * @function handleAddColumn
     * @desc 컬럼 추가
     */
    const handleAddColumn = () => {
        setColumns([
            ...columns,
            { columnName: "", columnCamelName: "", columnSnakeName: "" },
        ]);
    };

    /**
     * @function handleColumnInputChange
     * @desc 컬럼카멜명 입력
     * @param {number} index
     * @param {string} fieldName
     * @param {string} value
     */
    const handleColumnInputChange = (index, fieldName, value) => {
        const theColumns = [...columns];
        theColumns[index] = {
            ...theColumns[index],
            [fieldName]: value,
        };
        if (fieldName === "columnCamelName") {
            theColumns[index] = {
                ...theColumns[index],
                ["columnSnakeName"]: camel2Snake(value).toUpperCase(),
            };
        }
        setColumns(theColumns);
    };

    /**
     * @function handleRemovePkColumn
     * @desc pk 컬럼 삭제
     * @param {number} index
     */
    const handleRemovePkColumn = (index) => {
        const theColumns = [...pkColumns];
        theColumns.splice(index, 1);
        setPkColumns(theColumns);
    };

    /**
     * @function handleRemoveColumn
     * @desc 컬럼 삭제
     * @param {number} index
     */
    const handleRemoveColumn = (index) => {
        const theColumns = [...columns];
        theColumns.splice(index, 1);
        setColumns(theColumns);
    };

    /**
     * @function handleRegister
     * @desc 테이블 등록요청
     * @returns
     */
    const handleRegister = () => {
        // 필수값 입력체크
        var fieldList = [];
        $("input.form-input, select.form-select").each(function () {
            var fieldLabel = $(this).siblings("label").text();
            var fieldValue = $(this).val();
            var fieldObj = { label: fieldLabel, value: fieldValue };
            fieldList.push(fieldObj);
        });
        if (!AlertUtils.checkRequiredFields(fieldList)) {
            return;
        }
        confirmModal.showConfirm("등록하시겠습니까?", function () {
            let requestMap = {
                schemaName: schemaName,
                tableName: tableName,
                tableDesc: tableDesc,
                columnList: columns,
                pkColumnList: pkColumns,
            };
            CmmnUtils.axios
                .post(
                    CmmnUtils.url("METTB04"),
                    CmmnUtils.requestBody(requestMap)
                )
                .then((response) => {
                    if (CmmnUtils.header(response).status === "0000") {
                        AlertUtils.showSuccess("등록되었습니다", () =>
                            navigate("/METTB01")
                        );
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

    return (
        <main className="container mx-auto mt-5">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h5 className="text-xl mb-4">테이블 생성</h5>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            스키마명
                        </label>
                        <select
                            className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={schemaName}
                            onChange={(e) => setSchemaName(e.target.value)}
                        >
                            <option value=""></option>
                            {schemaNameList.map((item) => {
                                return (
                                    <option
                                        value={item.schemaName}
                                        key={nanoid()}
                                    >
                                        {item.schemaName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="tableName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            테이블명
                        </label>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={tableName}
                            onChange={(e) =>
                                setTableName(e.target.value.toUpperCase())
                            }
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="tableDesc"
                            className="block text-sm font-medium text-gray-700"
                        >
                            테이블설명
                        </label>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={tableDesc}
                            onChange={(e) => setTableDesc(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="button"
                        onClick={handleAddPkColumn}
                    >
                        + PK 컬럼 추가
                    </button>
                    <div>
                        {pkColumns.map((item, index) => {
                            return (
                                <div
                                    className="grid gap-6 mb-6 md:grid-cols-4"
                                    key={index}
                                >
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            컬럼명
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={item.columnName}
                                            onChange={(e) =>
                                                handlePkInputChange(
                                                    index,
                                                    "columnName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            컬럼카멜명
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={item.columnCamelName}
                                            onChange={(e) =>
                                                handlePkInputChange(
                                                    index,
                                                    "columnCamelName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            컬럼스네이크명
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={item.columnSnakeName}
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            type="button"
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={() =>
                                                handleRemovePkColumn(index)
                                            }
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="button"
                        onClick={handleAddColumn}
                    >
                        + 컬럼 추가
                    </button>
                    <div>
                        {columns.map((item, index) => {
                            return (
                                <div
                                    className="grid gap-6 mb-6 md:grid-cols-4"
                                    key={index}
                                >
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            컬럼명
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={item.columnName}
                                            onChange={(e) =>
                                                handleColumnInputChange(
                                                    index,
                                                    "columnName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            컬럼카멜명
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={item.columnCamelName}
                                            onChange={(e) =>
                                                handleColumnInputChange(
                                                    index,
                                                    "columnCamelName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            컬럼스네이크명
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={item.columnSnakeName}
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            type="button"
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={() =>
                                                handleRemoveColumn(index)
                                            }
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleRegister}
                    >
                        등록
                    </button>
                    <button
                        type="button"
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => navigate("/METTB01")}
                    >
                        목록
                    </button>
                </div>
            </div>
        </main>
    );
};

export default TableMetaReg;
