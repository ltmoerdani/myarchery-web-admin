import React from "react";
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './sass/datatables.scss';

const tableColumns = [
  {
    dataField: 'id',
    text: 'Id',
    sort: true,
  },
  {
    dataField: 'class',
    text: 'Kelas',
    sort: true,
  },
  {
    dataField: 'death_bird',
    text: 'Batas Lahir',
    sort: true,
  },
  {
    dataField: 'arange',
    text: 'Jarak',
    sort: true,
  },
  {
    dataField: 'kuota',
    text: 'Kuota Terisi',
    sort: true,
  },
  {
    dataField: 'registrasi',
    text: 'Biaya Registrasi',
  },
  {
    dataField: 'status',
    text: 'Status',
    formatter: (cell, row) => (
      <div>
        <span className={`${row.status ? "bg-danger" : "bg-success"} text-white rounded-3 px-2`}>
          {row.status ? "Full Booked" : "On Sale"}
        </span>
      </div>
    ),
  }
];

const CategoryTable = ({ data, pagination, ...props }) => {
  return (
    <Table responsive>
      {/* Replace bootstrap-table with standard Table implementation */}
      {/* ...existing code... */}
    </Table>
  );
};

CategoryTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    class: PropTypes.string.isRequired,
    death_bird: PropTypes.string.isRequired,
    arange: PropTypes.string.isRequired,
    kuota: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    registrasi: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.bool.isRequired
  })).isRequired,
  page: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizePerPageChange: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    sort: PropTypes.bool,
    formatter: PropTypes.func
  }))
};

CategoryTable.displayName = 'CategoryTable';

export { CategoryTable, tableColumns };