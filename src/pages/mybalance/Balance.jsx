import "./balance.scss"
import {getTransactionColumnNames} from "../../columnDefs"
import Datatable from "../../components/datatable/Datatable"
import Axios from "axios"
import { React, useState, useEffect } from 'react'

export default function Balance() {

  const [balance, setBalance] = useState(0);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
      fetchAndSetUserTransactions();
  }, []);

  const fetchAndSetUserTransactions = async () => {
    if ({})
    await Axios.get("https://localhost:7228/transactions/user/Lele1")
         .then((res) => {
            const req_data = res.data;
            setUserTransactions(req_data);
            const userBalance = req_data.map(_ => _.amount)
                                     .reduce((partialSum, amount) => partialSum + amount, 0);
            setBalance(userBalance);
         })
         .catch(err => console.error(`MyError: ${err}`));
    }
  
    return (
        <div>
            <div className="balanceContainer">
                Total balance: {balance} &euro;
            </div>
            <div className="listContainer">
                <Datatable 
                  title="User Transactions History" 
                  inputRows={userTransactions} 
                  columnTitles={getTransactionColumnNames()}>
                </Datatable>
            </div>
        </div>
    )
}