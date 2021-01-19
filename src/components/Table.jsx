import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function BasicTable({records, tableref}) {
  const classes = useStyles();
  if(records.length < 1){
    return null
  }
  const headings = Object.keys(records[0]);
  return (
    <div ref={tableref}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headings.map(head=><StyledTableCell key={head}>{head}</StyledTableCell>)}          
            </TableRow>
          </TableHead>
          <TableBody>
          {records.map((record,i)=>(
              <StyledTableRow key={i}>
                {headings.map((item,i)=><StyledTableCell key={i}>{record[item]}</StyledTableCell>)}
              </StyledTableRow>  
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
