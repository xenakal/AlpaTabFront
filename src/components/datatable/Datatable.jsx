import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Datatable = ({title, inputRows, columnTitles, rowIdField}) => {

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       flex: 1,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             <Link to="/users/test" style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//             </Link>
//           </div>
//         );
//       },
//     },
//   ];
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h2>{title}</h2>
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={inputRows}
        columns={columnTitles} // TODO: find way to set flex=1 for each column here or above (but in this file)
        // pageSize={10}
        rowsPerPageOptions={[]}
        // checkboxSelection
        getRowId={(row) => row[rowIdField]}
    />
    </div>
  );
};

export default Datatable;