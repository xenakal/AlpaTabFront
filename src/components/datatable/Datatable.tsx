import "./datatable.scss";
import adduserIcon from "../../res/images/user-add-fill.svg";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridEventListener,
  GridToolbar,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ClassNames } from "@emotion/react";

type DatatableProps = {
  title: string,
  inputRows: GridRowsProp,
  columnTitles: GridColumns,
  rowIdField?: string,
  addEntryLink?: string,
  handleRowClick?: GridEventListener<'rowClick'>,
  children?: React.ReactNode,
}

export const Datatable: React.FC<DatatableProps> = ({ title, inputRows, columnTitles, rowIdField = "id", addEntryLink = "", handleRowClick }: DatatableProps) => {

  const createAddActionButton = (link: string) => {
    if (link !== "")
      return (
        <>
          {/* This WILL break: REFACTOR NEEDED */}
          <form className="inlineForm" action={link}>
            <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1knaqv7-MuiButtonBase-root-MuiButton-root addEntryButton"
              type="submit" aria-label="Show filters">
              <span className="MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon">
                <span className="MuiBadge-root BaseBadge-root css-1c32n2y-MuiBadge-root">
                  <img src={adduserIcon} className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" aria-hidden="true" data-testid="FilterListIcon">
                    {/* <path d='../../res/images/user-add-fill.svg'>
                  </path> */}
                  </img>
                  <span className="MuiBadge-badge MuiBadge-standard MuiBadge-invisible MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular MuiBadge-colorPrimary BaseBadge-badge BaseBadge-invisible css-1pi4uwz-MuiBadge-badge">
                    0
                  </span>
                </span>
              </span>
              Add New
              <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root">
              </span>
            </button>
          </form>
          {/* <img className='addUsrImg' src={adduserIcon} width="18px" height="18px" alt=""/>
                <Link to={addEntryLink} className="link">
                  ADD NEW
                </Link> */}
        </>
      )
  };

  // const handleEvent: GridEventListener<'rowClick'> = (
  //   params: GridRowParams, 
  //   event: MuiEvent<React.MouseEvent<HTMLElement>>,
  //   details: GridCallbackDetails,
  // ) => {
  //   const row = params.row;
  // };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <div>
          {createAddActionButton(addEntryLink)}
          <GridToolbarQuickFilter />
        </div>
        <div className="right-side-toolbar-container">
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
      </GridToolbarContainer>
    );
  }


  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        getRowId={(row) => row[rowIdField]}
        rows={inputRows}
        columns={columnTitles} // TODO: find way to set flex=1 for each column here or above (but in this file)
        // pageSize={10}
        rowsPerPageOptions={[]}
        onRowClick={handleRowClick}
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
