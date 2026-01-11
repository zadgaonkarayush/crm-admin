import {
  Button,
  Checkbox,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useMemo, useReducer, useState } from 'react';

type Column = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
};

type Props = {
  columns: Column[];
  data: any[];
  title?: string;
  onCreate?: () => void;
  onBulkDelete?: (ids: string[]) => void;
  getRowId?: (row: any) => string;
};

type TableState ={
  page:number;
  searchTerm:string;
  selectedRow:string[]
};

type TableAction =
|{type:'SET_PAGE';payload:number}
|{type:'SET_SEARCH';payload:string}
|{type:'TOGGLE_ROW';payload:string}
|{type:'TOGGLE_ALL';payload:string[]}
|{type:'RESET_SELECTION'}

const PAGE_SIZE = 10;

function tableReducer(state:TableState,action:TableAction):TableState{
switch(action.type){
  case 'SET_PAGE':
    return {...state,page:action.payload}
  case 'SET_SEARCH':
    return{
      ...state,
      searchTerm:action.payload,
      page:1,
      selectedRow:[]
    }
  case 'TOGGLE_ROW':
    return{
      ...state,
      selectedRow:state.selectedRow.includes(action.payload) 
      ?state.selectedRow.filter(id=>id !== action.payload) 
      :[...state.selectedRow,action.payload]
    }
  case 'TOGGLE_ALL':
    const selectedAll = action.payload.every(id=>
        state.selectedRow.includes(id)
      )
    return{
      ...state,
      selectedRow:selectedAll ?
      state.selectedRow.filter(id=>!action.payload.includes(id)) :
      [...new Set([...state.selectedRow,...action.payload])]
    }
  case 'RESET_SELECTION':
    return{...state,selectedRow:[]}
    default:
  return state;

}
}
const ReusableTable: React.FC<Props> = ({
  columns,
  data,
  title = 'Title',
  onCreate,
  onBulkDelete,
  getRowId,
}) => {
  const [state,dispatch] = useReducer(tableReducer,{
    page:1,
    searchTerm:'',
    selectedRow:[]
  })
 

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase())
    );
  }, [data, state.searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (state.page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, state.page]);

  const selectedAll =
    paginatedData.length > 0 &&
    paginatedData.every((row) => state.selectedRow.includes(row._id));

  const toggleSelectAll = () => {
    const pageIds = paginatedData.map((row) => row._id);
    dispatch({type:'TOGGLE_ALL',payload:pageIds})
  };

  const toggleSelectById = (id: string) => {
    dispatch({type:'TOGGLE_ROW',payload:id})
  };

  const resolveRowId = (row: any, index: number) =>
    getRowId ? getRowId(row) : row._id ?? String(index);

  useEffect(() => {
    dispatch({type:'RESET_SELECTION'})
  }, [data]);

  return (
    <Paper
      elevation={5}
      sx={{
        p: 3,
        borderRadius: 3,
        background: '#f3f6f9',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Typography variant="h6" fontWeight="bold" color="#3f51b5">
          {title}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', sm: 'auto' }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search..."
            value={state.searchTerm}
            onChange={(e) => {
             dispatch({type:'SET_SEARCH',payload:e.target.value})
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
            }}
            sx={{
              width: { xs: '100%', sm: 250 },
              backgroundColor: 'white',
              borderRadius: 1,
            }}
          />

          {state.selectedRow.length > 0 && onBulkDelete && (
            <Button
              variant="contained"
              color="error"
              sx={{
                background: 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)',
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: '0 3px 5px 2px rgba(244,67,54,.3)',
              }}
              onClick={() => onBulkDelete(state.selectedRow)}
            >
              Delete Selected ({state.selectedRow.length})
            </Button>
          )}

          {onCreate && (
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: '0 3px 5px 2px rgba(33,203,243,.3)',
              }}
              onClick={onCreate}
            >
              Create New
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Table */}
      <TableContainer sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
              }}
            >
              {onBulkDelete && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={state.selectedRow.length > 0 && !selectedAll}
                    onChange={toggleSelectAll}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': { color: 'white' },
                    }}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row, index) => {
              const isSelected = state.selectedRow.includes(row._id);
              return (
                <TableRow
                  key={resolveRowId(row, index)}
                  hover
                  sx={{
                    transition: '0.2s',
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f0f4ff',
                    ...(isSelected && {
                      backgroundColor: '#c8e6c9 !important',
                    }),
                    '&:hover': {
                      backgroundColor: '#e0f7fa !important',
                    },
                  }}
                >
                  {onBulkDelete && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleSelectById(row._id)}
                        sx={{
                          color: '#3f51b5',
                          '&.Mui-checked': { color: '#3f51b5' },
                        }}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Stack direction="row" justifyContent="flex-end" mt={3}>
          <Pagination
            count={Math.ceil(filteredData.length / PAGE_SIZE)}
            page={state.page}
            onChange={(_, value) => dispatch({type:'SET_PAGE',payload:value})}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 'bold',
                color: '#3f51b5',
              },
              '& .Mui-selected': {
                background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
                color: '#fff',
              },
            }}
          />
        </Stack>
      </TableContainer>
    </Paper>
  );
};

export default ReusableTable;
