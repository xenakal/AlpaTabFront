import "./users.scss"
import Datatable from "../../components/datatable/Datatable"
import Axios from "axios"
import { React, useState, useEffect } from 'react'


function getColumnNames() {
  return [
    { field: "userID", headerName: "User ID", flex:0.5 },
    { field: "nickName", headerName: "Nickname", flex:1 },
    { field: "firstName", headerName: "First Name", flex:1},
    { field: "lastName", headerName: "Last Name", flex:1},
    { field: "email", headerName: "Email", flex:1},
    { field: "userType", headerName: "User Type", flex:1},
    { field: "balance", headerName: "Balance", flex:1},
  ];
}

const usersRowIdField = "userID";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAndSetUsers();
  }, [users]);

  const fetchAndSetUsers = async () => {
    await Axios.get("https://localhost:7228/users")
         .then((res) => {
            const req_data = res.data;
            setUsers(req_data);
         })
         .catch(err => console.error(`MyError: ${err}`));
  }

  return (
    <div>
      <div className="listContainer">
        <Datatable title="Users List" inputRows={users} columnTitles={getColumnNames()} rowIdField={usersRowIdField}></Datatable>
      </div>
    </div>
  )
}


