import "./datatable.scss";
import { DataGrid, GridColumns, GridRowsProp, GridRowParams, MuiEvent, GridCallbackDetails, GridEventListener } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

type DatatableProps = {
  title: string, 
  inputRows: GridRowsProp,
  columnTitles: GridColumns,
  rowIdField?: string, 
  addEntryLink?: string,
  handleRowClick?: GridEventListener<'rowClick'>,
  children?: React.ReactNode,
}

export const Datatable: React.FC<DatatableProps> = ({title, inputRows, columnTitles, rowIdField="id", addEntryLink="", handleRowClick }: DatatableProps) => {

  const createAddActionButton = (link: string) => {
      if (link !== "")
        return (
          <Link to={addEntryLink} className="link">
            Add New
          </Link>
        )
  };
  
  // const handleEvent: GridEventListener<'rowClick'> = (
  //   params: GridRowParams, 
  //   event: MuiEvent<React.MouseEvent<HTMLElement>>,
  //   details: GridCallbackDetails,
  // ) => {
  //   const row = params.row;
  // };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h2>{title}</h2>
        {createAddActionButton(addEntryLink)}
      </div>
      <DataGrid
        className="datagrid"
        getRowId={(row) => row[rowIdField]} 
        rows={inputRows}
        columns={columnTitles} // TODO: find way to set flex=1 for each column here or above (but in this file)
        // pageSize={10}
        rowsPerPageOptions={[]}
        onRowClick={handleRowClick}
        // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
