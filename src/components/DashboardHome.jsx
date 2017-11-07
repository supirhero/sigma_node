import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import _ from "lodash";
import { Link, browserHistory } from "react-router";
import { Circle, Line } from "react-progressbar.js";
import {
  changeRoute,
  getDashboardView,
  showNotif,
  searchHome
} from "./actions.jsx";
import { Meter, Search, PageLoader } from "./Components.jsx";
import store from "../reducers/combineReducers.jsx";
import moment from "moment";

class DashboardHome extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      this_year: moment().format("YYYY")
    };
  }
  componentDidMount() {
    this.props.dispatch(getDashboardView());
  }
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  render() {
    // var projects = state.data.projects ? state.data.projects : null
    var auth = this.props.state.data;
    var project = auth ? auth.project : null;
    const imageURL =
      auth.userdata && auth.userdata.image
        ? "url(http://prouds.telkomsigma.co.id:8089/sigmadev" +
          auth.userdata.image +
          ")"
        : null;
    // console.log(projects);
    return !auth.datatimesheet && !auth.project && !auth.userdata ? (
      <PageLoader />
    ) : (
      <div>
        <div className="grid wrap">
          <div className="unit half">
            <div className="card profile">
              {
                <div className="grid">
                  <div className="unit two-fifths">
                    <div
                      className="pic-wrapper"
                      style={{
                        width: "150px",
                        height: "150px",
                        backgroundImage: imageURL
                      }}
                    />
                  </div>
                  <div className="unit three-fifths">
                    <large style={{ fontSize: "18px" }}>
                      {auth.userdata ? auth.userdata.user_name : "-"}
                    </large>
                    <small>
                      {auth.userdata ? auth.userdata.profile_name : null}
                    </small>
                    <ul>
                      <li>
                        <span className="icon-speedometer">&nbsp;&nbsp;</span>
                        <a
                          href="/my-performance"
                          onClick={e => {
                            browserHistory.push("/my-performance");
                            e.preventDefault();
                          }}
                        >
                          My Performance
                        </a>
                      </li>
                      <li>
                        <span className="icon-list">&nbsp;&nbsp;</span>
                        <a
                          onClick={e => {
                            browserHistory.push("/my-assignments");
                            e.preventDefault();
                          }}
                        >
                          My Assignments
                        </a>
                      </li>
                      <li>
                        <span className="icon-clock">&nbsp;&nbsp;</span>
                        <a
                          onClick={e => {
                            browserHistory.push("/my-recent-activities");
                            e.preventDefault();
                          }}
                        >
                          My Recent Activities
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              }

              <div />
            </div>
          </div>
          <div className="unit half">
            <div className="margin" style={{ paddingTop: "20px" }}>
              <div className="grid">
                <div className="unit half">
                  <large>MY PERFORMANCE</large>
                  <small>{`This month, ${moment().format("MMMM")}`}</small>
                </div>
                <div className="unit half">
                  <Link to="/timesheet">
                    <button className="btn-primary" style={{ width: "100%" }}>
                      TIMESHEET
                    </button>
                  </Link>
                </div>
              </div>
              <div className="grid">
                <div className="unit half">
                  <Meter
                    progress={
                      auth.datatimesheet ? auth.datatimesheet.entry * 0.01 : "-"
                    }
                    text={
                      auth.datatimesheet ? (
                        Math.floor(auth.datatimesheet.entry)
                      ) : (
                        "-"
                      )
                    }
                    title="Entry"
                    status={
                      auth.datatimesheet ? auth.datatimesheet.status : null
                    }
                  />
                </div>
                <div className="unit half">
                  <Meter
                    progress={
                      auth.datatimesheet ? (
                        auth.datatimesheet.utilization * 0.01
                      ) : (
                        "-"
                      )
                    }
                    text={
                      auth.datatimesheet ? (
                        Math.floor(auth.datatimesheet.utilization)
                      ) : (
                        "-"
                      )
                    }
                    title="Utilization"
                    status={
                      auth.datatimesheet ? (
                        auth.datatimesheet.status_utilization
                      ) : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid wrap">
          <div className="unit whole">
            <div className="divider" />
          </div>
        </div>
        <div className="grid wrap ">
          <div className="unit whole">
            <Search
              placeholder="Search Business Units or Project"
              style={{ width: "500px", display: "block", margin: "auto" }}
              onChange={e => {
                this.setState({ search: e.target.value }, () => {
                  store.dispatch(searchHome(this.state.search));
                });
                e.preventDefault();
              }}
            />
            {/* <Search placeholder='search business units or project'></Search> */}
          </div>
        </div>
        <div className="projects">
          {auth &&
            auth.project &&
            auth.project.map((value, index) => {
              return (
                <div key={index}>
                  <div
                    style={{ marginBottom: "30px", margin: "20px auto 10px" }}
                    className="grid wrap"
                    key={index}
                  >
                    <div className="unit whole">
                      <large style={{ display: "inline-block" }}>
                        Business Unit&nbsp;:&nbsp;&nbsp;{" "}
                        <a
                          style={{ fontSize: "20px" }}
                          onClick={e => {
                            browserHistory.push(
                              "/business-unit?bu_code=" + value.bu_code
                            );
                            {
                              /* store.dispatch(changeRoute({
                          type: 'PUSH',
                          page: {
                            name: 'business-unit',
                            business_unit: {
                              bu_code: value.bu_code

                            }
                          }
                        })) */
                            }
                          }}
                        >
                          {value.bu_name}
                        </a>
                      </large>
                      {this.props.state.auth.privilege.create_project && (
                        <button
                          className="btn-secondary"
                          style={{ padding: "15px 22px" }}
                          onClick={e => {
                            browserHistory.push("/new-project");
                            this.props.dispatch(
                              changeRoute({
                                type: "PUSH",
                                page: {
                                  name: "new-project",
                                  new_project: {
                                    bu_code: value.bu_code
                                  }
                                }
                              })
                            );
                          }}
                        >
                          <i
                            style={{
                              verticalAlign: "bottom",
                              marginRight: "7px",
                              color: "#FC4D54"
                            }}
                            className="material-icons md-18"
                          >
                            add
                          </i>NEW PROJECT
                        </button>
                      )}
                    </div>
                  </div>

                  {value.project_list ? (
                    value.project_list.map((value, index) => {
                      var color = "#F48165";
                      switch (value.project_status.toUpperCase()) {
                        case "IN PROGRESS":
                          color = "#65BDF4";
                          break;
                        case "COMPLETED":
                          color = "#42C878";
                          break;
                        case "OVERDUE":
                          color = "#CB0000";
                          break;
                        case "ON HOLD":
                          color = "#777777";
                          break;
                        case "IN PLANNING":
                          color = "#777777";
                          break;
                        default:
                      }
                      return (
                        <div className="grid wrap" key={index}>
                          <div className="unit whole no-gutters">
                            <div
                              className="card"
                              style={{ marginBottom: "4px" }}
                              onClick={e => {
                                store.dispatch(
                                  changeRoute({
                                    type: "PUSH",
                                    page: {
                                      name: "project",
                                      id: value.project_id,
                                      project: {
                                        status: value.project_status,
                                        bu_code: value.bu_code
                                      }
                                    },
                                    state: {
                                      page:'Overview'
                                    }
                                  })
                                );

                                e.preventDefault();
                              }}
                            >
                              <div className="unit two-fifths">
                                <medium className="project-name list-pointer">
                                  {value.project_name}
                                </medium>
                                <small
                                  style={{ fontSize: "15px" }}
                                  className="project-name list-pointer"
                                >
                                  ({value.iwo_no})
                                </small>
                              </div>
                              <div className="unit one-fifth">
                                <medium
                                  style={{ fontSize: "15px" }}
                                  className="project-name"
                                >
                                  {value.project_type}
                                </medium>
                                <small
                                  style={{ fontSize: "15px" }}
                                  className="project-name"
                                >
                                  Effort : {value.type_effort}
                                </small>
                              </div>
                              <div className="unit two-fifths">
                                <small
                                  style={{
                                    fontSize: "15px",
                                    marginBottom: "11px"
                                  }}
                                  className="project-status"
                                >
                                  {value.project_status}
                                  &nbsp;(<large
                                    style={{
                                      color: color,
                                      display: "inline-block",
                                      fontSize: "15px"
                                    }}
                                  >
                                    {value.project_complete}%
                                  </large>)
                                </small>
                                <Line
                                  progress={value.project_complete * 0.01}
                                  initialAnimate={true}
                                  options={{
                                    strokeWidth: 3,
                                    color: color,
                                    trailColor: "#EEEEEE",
                                    trailWidth: 12,
                                    fontSize: 30,
                                    easing: "easeInOut",
                                    duration: 700
                                  }}
                                  containerClassName={"line-bar"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}
export default connect(mapStateToProps)(DashboardHome);
