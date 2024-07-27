import React from "react";

const PagingCreator = ({ pagingCreator, goToPaging }) => {
    const pageNumList = Array.from(
        {
            length:
                pagingCreator.endPagingNum - pagingCreator.startPagingNum + 1,
        },
        (_blank, index) => pagingCreator.startPagingNum + index
    );
    return (
        <div className="row m-5">
            <div className="col-lg-12">
                <nav aria-label="Page navigation example">
                    <ul className="pagination flex justify-center space-x-2">
                        {pagingCreator.prev && (
                            <>
                                <li className="page-item">
                                    <a
                                        className="page-link px-3 py-1 border rounded hover:bg-gray-200"
                                        href="#"
                                        onClick={() => goToPaging(1)}
                                    >
                                        처음
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link px-3 py-1 border rounded hover:bg-gray-200"
                                        href="#"
                                        onClick={() =>
                                            goToPaging(
                                                pagingCreator.startPagingNum - 1
                                            )
                                        }
                                    >
                                        이전
                                    </a>
                                </li>
                            </>
                        )}
                        {pageNumList.map((thePageNum) => (
                            <li className="page-item" key={thePageNum}>
                                <a
                                    className={`page-link px-3 py-1 border rounded hover:bg-gray-200 ${
                                        thePageNum === pagingCreator.pageNum
                                            ? "bg-blue-500 text-white"
                                            : ""
                                    }`}
                                    href="#"
                                    onClick={() => goToPaging(thePageNum)}
                                >
                                    {thePageNum}
                                </a>
                            </li>
                        ))}
                        {pagingCreator.next && (
                            <>
                                <li className="page-item">
                                    <a
                                        className="page-link px-3 py-1 border rounded hover:bg-gray-200"
                                        href="#"
                                        onClick={() =>
                                            goToPaging(
                                                pagingCreator.endPagingNum + 1
                                            )
                                        }
                                    >
                                        다음
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link px-3 py-1 border rounded hover:bg-gray-200"
                                        href="#"
                                        onClick={() =>
                                            goToPaging(
                                                pagingCreator.lastPageNum
                                            )
                                        }
                                    >
                                        끝
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default PagingCreator;
