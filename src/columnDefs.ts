// REFACTOR needed to make more generic. Ideas: 
//// get from db ? 

import moment from 'moment';
import { GridRenderCellParams } from '@mui/x-data-grid';

//// use introspection (?) on ITransactionModel & IUserModel ? 
export const getUserColumnNames = () => {
  return [
    { field: "id", headerName: "User ID", flex:0.5 },
    { field: "nickName", headerName: "Nickname", flex:1 },
    { field: "firstName", headerName: "First Name", flex:1},
    { field: "lastName", headerName: "Last Name", flex:1},
    { field: "email", headerName: "Email", flex:1},
    { field: "userType", headerName: "User Type", flex:1},
    { field: "balance", headerName: "Balance", flex:1},
  ];
}

export const getTransactionColumnNames = () => {
  return [
    { field: "id", headerName: "Transaction ID", flex:1 },
    { field: "nickName", headerName: "User Nickname", flex:1 },
    { field: "amount", headerName: "Amount", flex:1 },
    { field: "transactionType", headerName: "Transaction Type", flex:1 },
    { field: "timestamp", headerName: "Timestamp", flex:1, 
        renderCell: (params: GridRenderCellParams<Date>) => moment(params.row.timestamp).format("DD/MM/YY hh:mm")
    },
    { field: "description", headerName: "Description", flex:1 },
  ];
}