import "./users.scss"
import { getUserColumnNames } from "../../columnDefs"
import Datatable from "../../components/datatable/Datatable"
import Axios from "axios"
import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import IUserModel from "../../shared/interfaces/UserModel"
import AlpaTabDataService from "../../services/AlpaTabDataService"
import { GridRowParams, MuiEvent, GridCallbackDetails, GridEventListener } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUserModel[]>([]);
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  const fetchAndSetUsers = async () => {
    if (isAuthenticated) {
      AlpaTabDataService.getAllUsers()
        .then((response: any) => {
          setUsers(response.data);
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
    navigate("/users/" + row.id);
  };

  return (
    <div>
      <div className="listContainer">
        <Datatable 
          title="Users List" 
          inputRows={users} 
          columnTitles={getUserColumnNames()}
          addEntryLink="/users/new"
          handleRowClick={handleRowClick}>;
        </Datatable>
      </div>
    </div>
  )
}


export default Users;
