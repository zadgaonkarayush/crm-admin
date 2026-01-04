import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useMemo, useState,useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

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

const PAGE_SIZE = 10;

const ReusableTable: React.FC<Props> = ({
  columns,
  data,
  title = 'title',
  onCreate,
  onBulkDelete,
  getRowId,
}) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [seletctedRow, setSelectedRows] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, page]);

  const selectedAll = paginatedData.length > 0 &&
  paginatedData.every((row) => seletctedRow.includes(row._id));

  const toggleSelectAll = () => {
    const pageIds = paginatedData.map((row) => row._id);
    if (selectedAll) {
      setSelectedRows((prev)=>
        prev.filter((id)=>!pageIds.includes(id))
      )
    } else {
     setSelectedRows((prev) => [
      ...new Set([...prev, ...pageIds]),
    ]);
    }
  };
  const toggleSelectById = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  const resolveRowId = (row: any, index: number) =>
  getRowId ? getRowId(row) : row._id ?? String(index);

  useEffect(() => {
  setSelectedRows([]);
}, [data]);

  return (
    <Paper className='p-4'>
      {/* Header */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4'>
        <h2 className='text-xl font-semibold'>{title}</h2>

        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 w-full sm:w-auto'>
          <div className='flex items-center border px-3 py-2 rounded w-full sm:w-64'>
            <SearchIcon className='mr-2 text-gray-500' />
            <input
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
                setSelectedRows([]);
              }}
              className='outline-none'
            />
          </div>
          {seletctedRow.length > 0 && onBulkDelete && (
            <Button
              variant='contained'
              color='error'
              onClick={() => onBulkDelete(seletctedRow)}
              className='w-full sm:w-auto'
            >
              Deleted Selected ({seletctedRow.length})
            </Button>
          )}

          {onCreate && (
            <Button variant='contained' onClick={onCreate}>
              Create New
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              {onBulkDelete && (
                <TableCell padding='checkbox'>
                  <input
                    type='checkbox'
                    checked={selectedAll}
                    onChange={toggleSelectAll}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={row._id || index} hover>
                {onBulkDelete && (
                  <TableCell padding='checkbox'>
                    <input
                      type='checkbox'
                      checked={seletctedRow.includes(row._id)}
                      onChange={() => toggleSelectById(row._id)}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className='flex justify-end mt-4'>
          <Pagination
            count={Math.ceil(filteredData.length / PAGE_SIZE)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </div>
      </TableContainer>
    </Paper>
  );
};

export default ReusableTable;
