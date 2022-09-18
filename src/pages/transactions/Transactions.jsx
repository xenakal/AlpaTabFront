import "./transactions.scss"
import Datatable from "../../components/datatable/Datatable"
import Axios from "axios"
import { React, useState, useEffect } from 'react'

function getColumnNames() {
  return [
    { field: "id", headerName: "Transaction ID", flex:1 },
    { field: "nickname", headerName: "User Nickname", flex:1 },
    { field: "amount", headerName: "Amount", flex:1 },
    { field: "transactiontype", headerName: "Transaction Type", flex:1 },
    { field: "timestamp", headerName: "Timestamp", flex:1 },
    { field: "description", headerName: "Description", flex:1 },
  ];
}

export default function Transactions() {
  const [transaction, setTransactions] = useState();

  useEffect(() => {
    fetchAndSetTransactions();
  }, []);

  const fetchAndSetTransactions = () => {
    Axios.get("https://localhost:7228/transactions")
         .then((res) => {
            const req_data = res.data;
            setTransactions(req_data);
         })
         .catch(err => console.error(`MyError: ${err}`));
  }

  return (
    <div>
      <div className="listContainer">
        <Datatable title="Transactions List" inputRows={""} columnTitles={getColumnNames()}></Datatable>
      </div>
    </div>
  )
}

