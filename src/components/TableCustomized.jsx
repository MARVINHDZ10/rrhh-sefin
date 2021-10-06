import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HeaderTable from './HeaderTable';
import SearchBar from "material-ui-search-bar";
import '../css/TableCustomized.css';

import TableFooter from '@material-ui/core/TableFooter';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TablePaginationActions from "./TablePaginationActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function TableCustomized(props) {

  const rows = props.rows;
  const headcells = props.headcells;
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [dense] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = props.orderby === property && props.order === 'asc';
    props.changeOrder(isAsc ? 'desc' : 'asc');
    props.changeOrderBy(property);
  };
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  
  const handleChangePage = (event, newPage) => {
    props.changePage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    props.changeRowsPerPage(parseInt(event.target.value, 10));
    props.changePage(0);
  };
  
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal: string) => {
    props.searchTable(searchedVal);
  };
  
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div className={classes.root}>
      <div className='row rowsearch'>
          <div className='col-8 mb-3 rowsPerPageSelect'>
          <FormControl variant="outlined" className={classes.formControl}>
              <Select
                defaultValue={5}
                onChange={handleChangeRowsPerPage}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>25</MenuItem>
              </Select>
          </FormControl>
          
          </div>
          <div className='col-4 mb-3'>
            <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder="Buscar"
            />
          </div>          
        </div>
        
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <HeaderTable
                classes={classes}
                numSelected={selected.length}
                order={props.order}
                orderBy={props.orderby}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headcells={headcells}
              />
              <TableBody>
                {props.paseSalidasList}                
              </TableBody>
              <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={props.colSpan}
              count={rows.length}
              rowsPerPage={props.rowsperpage}
              page={props.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              labelDisplayedRows={
                ({ from, to, count }) => {
                  return '' + from + '-' + to + ' de ' + count
                }
              }
              rowsPerPageOptions={[]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
    </div>
  );
}

export default TableCustomized;