import React, { Component } from "react";
import { Row, Col } from "reactstrap";

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider from "react-bootstrap-table2-toolkit";

//Import Breadcrumb
import "./sass/datatables.scss";

class TableScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      sizePerPage: this.props.member.length,
      productData: this.props.member,
    };
  }

  render() {
    const columns = [
      {
        dataField: "pos",
        text: "Pos",
        sort: true,
      },
      {
        dataField: "athlete",
        text: "Athlete",
        sort: false,
      },
      {
        dataField: "club",
        text: "Club",
        sort: false,
      },
      {
        dataField: "session_one",
        text: "Sesi-1",
        sort: false,
      },
      {
        dataField: "session_two",
        text: "Sesi-2",
        sort: false,
      },
      {
        dataField: "total",
        text: "Tot",
        sort: false,
      },
      {
        dataField: "10+x",
        text: "10+X",
        sort: false,
      },
      {
        dataField: "x",
        text: "X",
        sort: false,
      },
    ];

    const defaultSorted = [
      {
        dataField: "pos",
        order: "asc",
      },
    ];

    const pageOptions = {
      sizePerPage: this.props.member.length,
      totalSize: this.props.member.length, // replace later with size(customers),
      custom: true,
    };

    // Custom Pagination Toggle
    // const sizePerPageList = [
    //   { text: '5', value: 5 },
    //   { text: '10', value: 10 },
    //   { text: '15', value: 15 },
    //   { text: '20', value: 20 },
    //   { text: '25', value: 25 },
    //   { text: 'All', value: (this.state.productData).length }];

    // const { SearchBar } = Search;

    return (
      <React.Fragment>
        <div className="col-12">
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField="id"
            columns={columns}
            data={this.props.member}
          >
            {({ paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={this.props.member}
                search
              >
                {(toolkitProps) => (
                  <React.Fragment>
                    <Row>
                      <Col>
                        <div className="table-responsive">
                          <BootstrapTable
                            keyField={"id"}
                            responsive
                            bordered={false}
                            rowStyle={(row, rowIndex) => {
                              if(rowIndex == 1)
                                return {background:"#aaa707 none repeat scroll 0% 0%", color:"white"};
                              if(rowIndex == 0)
                                return {background:"#07aa2f none repeat scroll 0% 0%",color:"white"};
                              if(rowIndex == 2)
                                return {background:"#0711aa none repeat scroll 0% 0%",color:"white"};
                              if(rowIndex > 2 && rowIndex <= 10)
                                return {background:"rgba(209, 207, 213, 0.68) none repeat scroll 0% 0%",color:"black"};
                            }}
                            striped={false}
                            defaultSorted={defaultSorted}
                            classes={"table align-middle table-nowrap"}
                            headerWrapperClasses={"thead-light"}
                            {...toolkitProps.baseProps}
                            {...paginationTableProps}
                          />
                        </div>
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}
          </PaginationProvider>
        </div>
      </React.Fragment>
    );
  }
}

export default TableScore;