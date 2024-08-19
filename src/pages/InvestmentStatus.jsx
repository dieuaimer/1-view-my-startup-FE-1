import { useState, useEffect, useCallback } from "react";
import { getInvestmentStatus } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";
import { Pagination } from "../components/Pagination/Pagination";

import { InvestmentStatusTableHeader } from "../utils/tableTypes";
import "./Home.css";

function InvestmentStatus() {
  const [orderBy, setOrderBy] = useState("virtualInvestment_desc");
  const [companyList, setCompanyList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const init = useCallback(async () => {
    try {
      const data = await getInvestmentStatus({ orderBy, page, limit });

      const { list, totalCount } = data;
      setCompanyList(list);
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [orderBy, limit, page]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className="Home">
      <div className="top-bar">
        <h2>투자 현황</h2>
        <DropDown
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          buttonType="typeThree"
        />
      </div>
      <Table list={companyList} tableHeaders={InvestmentStatusTableHeader} />

      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={totalPages}
      />
    </section>
  );
}

export default InvestmentStatus;
