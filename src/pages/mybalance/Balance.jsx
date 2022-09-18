import "./balance.scss"
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

export default function Balance() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState();

    return (
        <div>
            <div className="balanceContainer">
                Total balance: {balance} &euro;
            </div>
            <div className="listContainer">
                <Datatable title="User Transactions History" inputRows={""} columnTitles={getColumnNames()}></Datatable>
            </div>
        </div>
    )
}