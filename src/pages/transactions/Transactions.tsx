import { getTransactionColumnNames } from "../../columnDefs";
import Datatable from "../../components/datatable/Datatable";
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ITransactionModel from "../../shared/interfaces/TransactionModel";
import AlpaTabDataService  from "../../services/AlpaTabDataService";
import { GridRowParams, MuiEvent, GridCallbackDetails, GridEventListener } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransactionModel[]>([]); 
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAndSetTransactions();
  }, []);

  const fetchAndSetTransactions = async () => {
    if (isAuthenticated) {
      AlpaTabDataService.getAllTransactions()
        .then((response: any) => {
          setTransactions(response.data);
        })
        .catch((e: Error) => {console.log(e); })
    }
  }

  const handleRowClick: GridEventListener<'rowClick'> = (
    params: GridRowParams, 
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails,
  ) => {
    const row = params.row;
    navigate("/transaction/" + row.id)
  };

  return (
    <div className="contentPage">
      <h1>Transactions list</h1>
      <div className="listContainer">
        <Datatable 
          title={"Transactions List"}
          inputRows={transactions} 
          columnTitles={getTransactionColumnNames()}
          addEntryLink="/transactions/new"
          handleRowClick={handleRowClick}
        >;
        </Datatable>
      </div>
    </div>
  )
}

export default Transactions;
