import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link, browserHistory } from "react-router";
import { deleteAuthentication } from "./actions.jsx";
import store from "../reducers/combineReducers.jsx";
import {
  Select,
  Input,
  BarChart,
  Divider,
  Meter,
  Table,
  TableNew,
  Header,
  PageLoader,
  Menu,
  MenuSection,
  MenuItem,
  MenuHeader
} from "./Components.jsx";

import { reportPeople, reportDownloadPeople, getListBU } from "./actions.jsx";

class ReportsPeople extends Component {
  constructor() {
    super();
    this.state = {
      bu: "",
      month: 0,
      year: 0,
      bu_name: ""
    };
  }

  componentWillMount() {
    store.dispatch(
      reportPeople(store.getState().auth.userdata.bu_id.toString(), "9", "2017")
    );
    // store.dispatch(reportPeople(store.dispatch(reportPeople((store.getState().auth.userdata.bu_id).toString(),"6","2017"))))
    store.dispatch(getListBU());
  }

  handleMonthChange(e) {
    this.setState({ month: e.target.value });
    console.log(e.target.value);
    e.preventDefault();
  }

  handleYearChange(e) {
    this.setState({ year: e.target.value });
    console.log(e.target.value);
    e.preventDefault();
  }

  render() {
    const report_people = this.props.state.data.report_people;

    const tablePeople = report_people ? (
      report_people.map((value, index) => {
        return {
          column: [
            { value: value.USER_NAME },
            { value: value.EMAIL },
            { value: value.entry },
            { value: value.status_entry },
            { value: value.utilisasi },
            { value: value.status_utilisasi }
          ]
        };
      })
    ) : (
      <PageLoader />
    );

    const month = [
      { name: "JANUARY", number: "1" },
      { name: "FEBRUARY", number: "2" },
      { name: "MARCH", number: "3" },
      { name: "APRIL", number: "4" },
      { name: "MAY", number: "5" },
      { name: "JUNE", number: "6" },
      { name: "JULY", number: "7" },
      { name: "AUGUST", number: "8" },
      { name: "SEPTEMBER", number: "9" },
      { name: "OCTOBER", number: "10" },
      { name: "NOVEMBER", number: "11" },
      { name: "DECMBER", number: "12" }
    ];

    const year = [{ year: "2017" }, { year: "2016" }, { year: "2015" }];

    return !report_people ? (
      <PageLoader />
    ) : (
      <div>
        <div className="grid wrap">
          <div className="unit golden-large">
            <Menu
              style={{ position: "relative", display: "inline" }}
              defaultValue={this.state.bu_name}
              menuStyle={{
                width: "500px",
                top: "50px",
                right: "auto",
                height: "300px",
                overflow: "scroll"
              }}
              triggerInput="true"
              inputStyle={{
                width: "100%",
                display: "inline-block",
                float: "left"
              }}
            >
              {this.props.state.data.list_bu &&
                this.props.state.data.list_bu[0].children.map(
                  (value, index) => {
                    console.log("------child" + index, value.BU_NAME);
                    return [
                      <MenuItem
                        style={{ paddingLeft: "20px", paddingTop: "15px" }}
                        key={index}
                        title={value.BU_NAME}
                        textStyle={{
                          paddingLeft: "20px",
                          paddingTop: "15px",
                          fontWeight: "400"
                        }}
                        onClick={e => {
                          console.log("working222");

                          this.setState({
                            bu: value.BU_ID,
                            bu_name: value.BU_NAME
                          });
                          e.preventDefault();
                        }}
                      />,

                      value.children !== null &&
                        value.children.map((value2, index) => {
                          console.log("child.child" + index, value2.BU_NAME);

                          return (
                            <MenuItem
                              key={index}
                              style={{
                                paddingLeft: "35px",
                                paddingTop: "10px",
                                zIndex: "10"
                              }}
                              title={value2.BU_NAME}
                              onClick={e => {
                                this.setState({
                                  bu: value2.BU_ID,
                                  bu_name: value2.BU_NAME
                                });
                              }}
                            />
                          );
                        })
                    ];
                  }
                )}
            </Menu>
          </div>
          <div className="unit golden-small">
            <select
              onChange={this.handleMonthChange.bind(this)}
              className="select"
              style={{
                height: "49px",
                width: "130px",
                display: "inline-block"
              }}
            >
              {month.map((value, index) => {
                return (
                  <option key={index} value={value.number}>
                    {value.name}
                  </option>
                );
              })}
            </select>

            <select
              onChange={this.handleYearChange.bind(this)}
              className="select"
              style={{
                height: "49px",
                width: "100px",
                display: "inline-block",
                marginLeft: "5px"
              }}
            >
              {year.map((value, index) => {
                return (
                  <option key={index} value={value.year}>
                    {value.year}
                  </option>
                );
              })}
            </select>
            <button
              className="btn-primary"
              style={{
                padding: "11px 14px",
                display: "inline-block",
                marginLeft: "30px",
                marginTop: "5px"
              }}
            >
              <span
                className="material-icons"
                style={{ color: "white" }}
                onClick={e => {
                  console.log(this.state.month, this.state.year);
                  store.dispatch(
                    reportPeople(
                      this.state.bu,
                      this.state.month,
                      this.state.year
                    )
                  );
                  // store.dispatch(myPerformance('1','2017'))
                  e.preventDefault();
                }}
              >
                search
              </span>
            </button>
            <div className="unit whole no-gutters">
              <button
                className="btn-primary"
                style={{ marginTop: "20px" }}
                onClick={e => {
                  this.props.dispatch(
                    reportDownloadPeople(
                      this.state.bu,
                      this.state.year,
                      this.state.month
                    )
                  );
                  e.preventDefault();
                }}
              >
                DOWNLOAD EXCEL
              </button>
            </div>
          </div>
        </div>

        <div className="grid wrap">
          <div className="unit whole">
            <div className="card" style={{ padding: "35px" }}>
              <div className="grid wrap">
                <div className="unit half">
                  <Header
                    text="Timesheet Report"
                    style={{ display: "inline-block" }}
                  />
                </div>
                <div className="unit half">
                  <Input
                    style={{ width: "100%", display: "inline-block" }}
                    placeholder="Search a name"
                  />
                </div>
              </div>
              <div className="grid wrap">
                <div className="unit whole">
                  <TableNew
                    tableHeader={[
                      { value: "Name" },
                      { value: "Email" },
                      { value: "Entry" },
                      { value: "Entry Status" },
                      { value: "Utilization" },
                      { value: "Utilization Status" }
                    ]}
                    tableData={tablePeople}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
    // filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps)(ReportsPeople);
// export default Login
