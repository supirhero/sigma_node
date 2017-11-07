import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link, browserHistory } from "react-router";
import { Grid } from "react-redux-grid";
import moment from "moment";
import Select from 'react-select';
import store from "../reducers/combineReducers.jsx";

import {
  Divider,
  Header,
  ProjectHeader,
  PopUp,
  ReduxInput,
  WorkplanRow,
  PageLoader,
  datepickerUniversal,
  ReduxInputDisabled,
  required,
  ReduxSelect,
  ReduxUploadWorkplan,
  Menu,
  MenuItem,
  MenuSection,
  Loader
} from "./Components.jsx";

import { Field, reduxForm } from "redux-form";

import {
  getWorkplanView,
  addTaskWorkplan,
  getCreateTaskView,
  getTaskMemberView,
  requestRebaselineFetch,
  assignTaskMember,
  uploadWorkplan,
  getEditTaskView,
  editTaskAction,
  requestRebaseline,
  deleteTask,
  denyRebaseline,
  acceptRebaseline,
  baseline,
  showNotif,
  getCurrentProgress,
  editTaskPercentAction,
  removeTaskMember
} from "./actions.jsx";
import ReactAutocomplete from "react-autocomplete";

class ProjectWorkplan extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      WBS_id: "",
      WBS_NAME: "",
      value:[],
      array: {
        new_task: [],
        modified_task: [],
        manualUpdate: []
      },
      assignMember: {
        MEMBER: "",
        EMAIL: "",
        NAME: ""
      },
      label: "",
      id: "",
      selectArr : [],
    };
  }

  handleInitialize(data) {
    this.props.initialize(data ? data : null);
  }

  menu(value) {
    var padding = (value.LEVEL * 20).toString();

    function status(value) {
      let className = "";

      switch (value) {
        case "create":
          className = "material-icons rebase-create";
          break;
        case "update":
          className = "material-icons rebase-edit";
          break;
        case "delete":
          className = "material-icons rebase-delete";
          break;
      }
      return <i className={className}>error</i>;
    }

    return (
      <tr
        onClick={e => {
          var key = value.WBS_ID.toString();
          if (this.state[key]) {
            this.setState({ [key]: false });
          } else {
            this.setState({ [key]: true });
          }
          e.preventDefault();
        }}
      >
        <td style={{ overflow: "visible", width: "410px" }}>
          <div
            style={{
              paddingLeft: padding + "px",
              wordBreak: "break-word",
              paddingRight: "15px"
            }}
          >
            {/* <div style={{width:'200px', overflow:'hidden'}}> */}
            <span
              style={{
                verticalAlign: "middle",
                fontSize: "16px",
                color: "black"
              }}
              className="material-icons"
            >
              {value.children.length != 0 ? this.state[
                value.WBS_ID.toString()
              ] ? (
                "expand_more"
              ) : (
                "expand_less"
              ) : (
                ""
              )}
            </span>&nbsp;&nbsp;&nbsp;&nbsp;{value.WBS_NAME}
            {/* </div> */}
          </div>
        </td>
        <td>{value.WORK}</td>
        <td>{value.WORK_COMPLETE}</td>
        <td>{value.ORDE !== "0" ? value.DURATION : ""}</td>
        <td>{value.ORDE !== "0" ? value.START_DATE : ""}</td>
        <td>{value.ORDE !== "0" ? value.FINISH_DATE : ""}</td>
        <td>
          {value.WORK_PERCENT_COMPLETE != 0 ? (
            Math.round(value.WORK_PERCENT_COMPLETE * 100) / 100
          ) : (
            Math.round(parseInt(value.PROGRESS_WBS * 100)) / 100
          )}%
        </td>
        <td>{value.RESOURCE_WBS} people</td>
        <td style={{ position: "relative", paddingRight: "10px" }}>
          {// React.cloneElement(this.props.children, { data: value })
          value.LEAF != 0 &&
          value.WBS_PARENT_ID !== null &&
          this.props.state.auth.privilege.workplan_modification && (
            <Menu
              menuStyle={{ top: "41", right: "10", width: "200px" }}
              style={{ display: "inline" }}
              triggerClass="material-icons"
              triggerStyle={{ fontSize: "17px", color: "#fa5962" }}
              workplanIcon="more_horiz"
            >
              <MenuSection>
                {value.LEAF == 1 &&
                this.props.state.auth.privilege.workplan_modification && (
                  <MenuItem
                    title="Manual Update"
                    onClick={e => {
                      this.props
                        .dispatch(getCurrentProgress(value.WBS_ID))
                        .then(res => {
                          this.setState({ WBS_id: value.WBS_ID });
                          this.props.dispatch({
                            type: "POPUP",
                            name: "manualUpdate",
                            data: {
                              active: true
                            }
                          });
                          console.log("POPUP", res);
                          this.handleInitialize({
                            PROJECT_ID: res.data.manual_update[0].PROJECT_ID,
                            WBS_ID: res.data.manual_update[0].WBS_ID,
                            WORK_PERCENT_COMPLETE:
                              res.data.manual_update[0].WORK_PERCENT_COMPLETE
                          });
                        });
                      e.preventDefault();
                    }}
                  />
                )}
                {value.LEAF == 1 &&
                this.props.state.auth.privilege.workplan_modification && (
                  <MenuItem
                    title="Edit"
                    onClick={e => {
                      this.props.dispatch({
                        type: "POPUP",
                        name: "edit_task",
                        data: {
                          active: true
                        }
                      });
                      this.props
                        .dispatch(getEditTaskView(value.WBS_ID))
                        .then(res => {
                          this.setState({ WBS_id: value.WBS_ID });

                          console.log("POPUP", res);
                          this.handleInitialize({
                            NAME_EDIT: res.data.detail_task[0].WBS_NAME,
                            PARENT_EDIT: res.data.detail_task[0].WBS_PARENT_ID,
                            START_DATE_EDIT: res.data.detail_task[0].START_DATE,
                            FINISH_DATE_EDIT:
                              res.data.detail_task[0].FINISH_DATE
                          });
                        });

                      e.preventDefault();
                    }}
                  />
                )}
                {value.LEAF == 1 &&
                this.props.state.auth.privilege.workplan_modification && (
                  <MenuItem
                    title="Assign"
                    onClick={e => {
                      // this.setState({WBS_id:value.WBS_id})
                      this.setState({ WBS_NAME: value.WBS_NAME });
                      this.setState({ WBS_ID: value.WBS_ID });
                      this.props.dispatch({
                        type: "POPUP",
                        name: "assign_task",
                        data: {
                          active: true
                        }
                      });
                      this.handleInitialize({
                        WBS_NAME: value.WBS_NAME,
                        WBS_ID: value.WBS_ID
                      });
                      const id = this.props.location.query.id;

                      this.props.dispatch(getTaskMemberView(id, value.WBS_ID));
                      console.log(value.WBS_ID);

                      e.preventDefault();
                    }}
                  />
                )}
                {value.LEAF == 1 &&
                this.props.state.auth.privilege.workplan_modification && (
                  <MenuItem
                    title="Delete"
                    onClick={e => {
                      // this.props.dispatch()
                      {
                        /* this.props.dispatch({
                  type: 'POPUP',
                  name:'delete',
                  data: {
                    active:true
                  }
                }) */
                      }
                      this.props.dispatch({
                        type: "CONFIRM",
                        message: "Would you like to delete task?",
                        show: true,
                        onConfirm: () => {
                          this.props
                            .dispatch(deleteTask(value.WBS_ID))
                            .then(res => {
                              {
                                /* showNotif('Task deleted', 'GREEN') */
                              }
                              this.props.dispatch({
                                type: "CONFIRM",
                                message: "",
                                show: false
                              });
                              const id = this.props.location.query.id;
                              this.props.dispatch(getWorkplanView(id));
                            });
                        }
                      });

                      e.preventDefault();
                    }}
                  />
                )}
              </MenuSection>
            </Menu>
          )}
        </td>
        <td style={{ position: "relative" }}>
        {console.log(value.status,"INI LOH SI VALUE STATUS")}
          {value.LEAF !== "0" && value.status !== "none" && status(value.status)}
        </td>
      </tr>
    );
  }
  renderRow(value) {
    return value.children.map((value, index) => [
      this.menu(value),

      this.state[value.WBS_ID.toString()] &&
        this.state[value.WBS_ID.toString()] != false &&
        this.renderRow(value)
    ]);
  }

  onSubmit(props) {
    const id = this.props.location.query.id;
    this.props.addTaskWorkplan(id, this.state.WBS_id, props).then(res => {
      this.props.dispatch(getCreateTaskView(id));

      this.props.dispatch({
        type: "POPUP",
        name: "addTimesheetWorkplan",
        data: {
          active: false
        }
      });
      var newState = this.state.array.new_task.concat({
        project_id: id,
        wbs_name: props.WBS_NAME,
        wbs_parent_id: props.WBS_PARENT_ID,
        start_date: props.START_DATE,
        finish_date: props.FINISH_DATE
      });
      // Object.assign({},this.state.array, )
      // console.log('BEFORE STATE', newState)
      // this.setState({array : {
      //   modified_task: this.state.array.modified_task,
      //   new_task : newState}
      // }, ()=>{
      //   console.log('AFTER STATE', this.state)
      // })
    });
  }

  onSubmitAssign(props) {
    console.log("DARI MANAA",this.state)
    const id = this.props.location.query.id;
    this.props
      .assignTaskMember(
        props,
        this.state.value,
      )
      .then(res => {
        console.log("MEESAGE", res.data.message);
        showNotif("Member berhasil ditambah", "GREEN");
        this.props.dispatch(getWorkplanView(id));
        this.props.dispatch(getTaskMemberView(id, this.state.WBS_ID));
        resetForm()
      });
  }

  handleSelectChange (value) {
    const ArrayMantap = value.map((value,index)=>{
      return value.value
    })
    console.log(ArrayMantap,"INI LOOH")
    this.setState({ value:ArrayMantap })
      // console.log('You\'ve selected:', this.state.value);
      // console.log('You\'ve selected:', this.state.value.map((value,index)=>{
      //   return [value.value]
      // })
	}

  onSubmitManualUpdate(props) {
    const id = this.props.location.query.id;
    console.log(this.state.WBS_ID);
    this.props.editTaskPercentAction(id, this.state.WBS_id, props).then(res => {
      // var newState = this.state.array.manualUpdate.concat(
      //   {
      //     // PROJECT_ID: this.props.location.query.id,
      //     PROJECT_ID:id,
      //     WBS_ID: this.state.WBS_id,
      //     DESCRIPTION:props.DESCRIPTION,
      //     WORK_PERCENT_COMPLETE: props.WORK_PERCENT_COMPLETE
      //   }
      // )
      this.props.dispatch({
        type: "POPUP",
        name: "manualUpdate",
        data: {
          active: false
        }
      });
      showNotif("Successfully update task manually", "GREEN");
      this.props.dispatch(getWorkplanView(id));
    });
  }

  onSubmitRebaseline(props) {
    var id = this.props.location.query.id;
    this.props
      .dispatch(requestRebaselineFetch(id, props.reason, props.evidence))
      .then(res => {
        // this.props.requestRebaseline(id,props, JSON.stringify(this.state.array)).
        console.log("REBASE ERROR", res.statusText);
        if (res.statusText == "Forbidden") {
          showNotif("You are not allowed to do this operation", "RED");
        } else if (!res.ok) {
          showNotif("Failed to perform rebaseline", "RED");
        } else {
          showNotif("Re-baseline Request Success", "GREEN");
          this.props.dispatch(getCreateTaskView(id));
          this.props.dispatch(getWorkplanView(id));
          this.props.dispatch({
            type: "POPUP",
            name: "request_rebaseline",
            data: {
              active: false
            }
          });
        }
      });
  }
  onSubmitWorkplan(props) {
    const id = this.props.location.query.id;
    this.props.uploadWorkplan(id, props.document).then(res => {
      this.props.dispatch(getWorkplanView(id));
    });
  }
  onSubmitEditTask(props) {
    const id = this.props.location.query.id;
    this.props.editTaskAction(id, this.state.WBS_id, props).then(res => {
      this.props.dispatch(getCreateTaskView(id));

      var newState = this.state.array.modified_task.concat({
        project_id: id,
        wbs_id: this.state.WBS_id,
        wbs_parent_id: props.PARENT_EDIT,
        wbs_name: props.NAME_EDIT,
        start_date: props.START_DATE_EDIT,
        finish_date: props.FINISH_DATE_EDIT
      });
      // console.log('BEFORE STATE', newState)
      // this.setState({array : {
      //   new_task: this.state.array.new_task,
      //   modified_task : newState}
      // }, ()=>{
      //   console.log('AFTER STATE', this.state)
      // })

      this.props.dispatch({
        type: "POPUP",
        name: "edit_task",
        data: {
          active: false
        }
      });
    });
  }

  componentWillMount() {
    const id = this.props.location.query.id;
    this.props.dispatch(getWorkplanView(id));
    this.props.dispatch(getCreateTaskView(id));
  }

  render() {
    const { handleSubmit } = this.props;
    // console.log('STATUSSS',this.props.state.data.project_status)
    const status = (this.props.state.data.project_status
      ? this.props.state.data.project_status
      : "").toUpperCase();
    const id = this.props.location.query.id;

    const workplan_modification = this.props.state.auth.privilege
      .workplan_modification;
    const approve_rebaseline = this.props.state.auth.privilege
      .approve_rebaseline;

    const workplan = this.props.state.data.workplan;
    const workplan_view = this.props.state.data.parent;
    const available_to_assign = this.props.state.data.available_to_assign
      ? this.props.state.data.available_to_assign.map((value, index) => {
          return {
            EMAIL: value.EMAIL,
            value: value.RP_ID,
            label: value.USER_NAME
          };
        })
      : null;
    const available_to_assign2 = this.props.state.data.available_to_assign
      ? this.props.state.data.available_to_assign.map((value, index) => {
          return {
            EMAIL: value.EMAIL,
            RP_ID: value.RP_ID,
            USER_NAME: value.USER_NAME
          };
        })
      : null;

    function statusAssign(value) {
      let className = "";
      switch (value) {
        case "create":
          className = "material-icons rebase-create";
          break;
        case "delete":
          className = "material-icons rebase-delete";
          break;
      }
      return (
        <i
          className={className}
          style={{
            display: "inline-block",
            marginLeft: "20px",
            marginTop: "-3px"
          }}
        >
          error
        </i>
      );
    }

    const currently_assigned = this.props.state.data.currently_assigned;
    return (
      <div className="project-workplan">
        <div className="grid wrap narrow">
          <div className="unit whole">
            <PopUp
              id="manualUpdate"
              dividerText="TASK PROGRESS"
              btnText="UPLOAD FILE"
              btnClass="btn-primary"
              btnStyle={{ display: "block", margin: "auto" }}
            >
              {!this.props.state.data.manualUpdate &&
              !this.props.state.data.parent ? (
                <PageLoader />
              ) : (
                <form
                  onSubmit={handleSubmit(this.onSubmitManualUpdate.bind(this))}
                >
                  <div>
                    <label />
                    <div className="grid wrap narrow">
                      <div className="unit whole">
                        <Field
                          inputName="ON PROGRESS %"
                          name="WORK_PERCENT_COMPLETE"
                          type="input"
                          component={ReduxInput}
                        />
                        {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
                      </div>
                      <div className="unit whole">
                        <Field
                          inputName="DESCRIPTION"
                          name="DESCRIPTION"
                          type="input"
                          component={ReduxInput}
                        />
                        {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
                      </div>
                    </div>
                    <div className="grid wrap narrow">
                      <div
                        className="unit whole"
                        style={{ textAlign: "center", marginTop: "30px" }}
                      >
                        <button
                          type="submit"
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginLeft: "40px"
                          }}
                          className="btn-primary"
                        >
                          {" "}
                          SAVE{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </PopUp>

            <PopUp
              id="edit_task"
              dividerText="EDIT TASK"
              btnText="UPLOAD FILE"
              btnClass="btn-primary"
              btnStyle={{ display: "block", margin: "auto" }}
            >
              {!this.props.state.data.detail_task &&
              !this.props.state.data.parent ? (
                <PageLoader />
              ) : (
                <form onSubmit={handleSubmit(this.onSubmitEditTask.bind(this))}>
                  <div>
                    <div className="grid wrap narrow">
                      <div className="unit whole">
                        <Field
                          inputName="NAME"
                          name="NAME_EDIT"
                          type="input"
                          component={ReduxInput}
                        />
                        {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
                      </div>
                    </div>
                    <div className="grid wrap narrow">
                      <div className="unit whole">
                        <Field
                          inputName="PARENT"
                          name="PARENT_EDIT"
                          type="input"
                          component={ReduxSelect}
                        >
                          {this.props.state.data.parent.map((value, index) => (
                            <option key={index} value={value.WBS_ID}>
                              {value.WBS_NAME}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div className="grid wrap narrow">
                      <div className="unit half">
                        <Field
                          inputName="START DATE"
                          name="START_DATE_EDIT"
                          type="input"
                          component={datepickerUniversal}
                        />
                      </div>
                      <div className="unit half">
                        <Field
                          inputName="END DATE"
                          name="FINISH_DATE_EDIT"
                          type="input"
                          component={datepickerUniversal}
                        />
                      </div>
                    </div>

                    <div className="grid wrap narrow">
                      <div
                        className="unit whole"
                        style={{ textAlign: "center", marginTop: "30px" }}
                      >
                        <button
                          style={{ display: "inline-block", width: "200px" }}
                          className="btn-secondary"
                        >
                          {" "}
                          CANCEL{" "}
                        </button>
                        <button
                          style={{
                            display: "inline-block",
                            width: "200px",
                            marginLeft: "40px"
                          }}
                          className="btn-primary"
                        >
                          {" "}
                          SAVE{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </PopUp>
            <PopUp
              id="request_rebaseline"
              dividerText={
                status == "NOT STARTED" ? (
                  "BASELINE"
                ) : status == "IN PROGRESS" ? (
                  "RE-BASELINE"
                ) : (
                  "RE_BASELINE"
                )
              }
              btnText="UPLOAD FILE"
              btnClass="btn-primary"
              btnStyle={{ display: "block", margin: "auto" }}
            >
              {!this.props.state.data.detail_task &&
              !this.props.state.data.parent ? (
                <PageLoader />
              ) : (
                <form
                  onSubmit={handleSubmit(this.onSubmitRebaseline.bind(this))}
                >
                  <div className="grid wrap narrow">
                    <div className="unit whole">
                      <h2 className="input-name">SELECT EVIDENCE</h2>
                      <div className="grid wrap">
                        <Field
                          style={{ width: "100%" }}
                          inputName="SELECT FILE"
                          name="evidence"
                          component={ReduxUploadWorkplan}
                        />
                      </div>
                      <Field
                        inputName="REASON"
                        name="reason"
                        type="input"
                        component={ReduxInput}
                      />

                      <button
                        style={{
                          display: "inline-block",
                          marginTop: "30px",
                          padding: "15px 65px"
                        }}
                        className="btn-secondary"
                        onClick={e => {
                          this.props.dispatch({
                            type: "POPUP",
                            name: "request_rebaseline",
                            data: {
                              active: false
                            }
                          });
                          e.preventDefault();
                        }}
                      >
                        CLOSE
                      </button>
                      <button
                        type="submit"
                        style={{
                          display: "inline-block",
                          marginTop: "30px",
                          padding: "15px 65px"
                        }}
                        className="btn-secondary"
                      >
                        REQUEST
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </PopUp>
          </div>
        </div>

        <PopUp
          id="assign_task"
          dividerText="ASSIGN TASK"
          btnText="UPLOAD FILE"
          btnClass="btn-primary"
          btnStyle={{ display: "block", margin: "auto" }}
        >
          {!this.props.state.data.available_to_assign &&
          !this.props.state.data.task_name ? (
            <PageLoader />
          ) : (
            <form onSubmit={handleSubmit(this.onSubmitAssign.bind(this))}>
              <div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Field
                      inputName="TASK"
                      name="WBS_NAME"
                      type="input"
                      component={ReduxInputDisabled}
                    />

                    {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit three-fifths">
                    <h2 className="input-name">Invite Member</h2>
                  {/*   <ReactAutocomplete
                      menuStyle={{
                        opacity: "1"
                      }}
                      getItemValue={label => label.label}
                      style={{ width: "500px", marginTop: "60px" }}
                      items={available_to_assign}
                      wrapperProps={{ style: { width: "100%" } }}
                      menuStyle={{
                        borderRadius: "3px",
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                        background: "rgba(255, 255, 255, 5)",
                        padding: "2px 0",
                        fontSize: "90%",
                        position: "fixed",
                        overflow: "auto",
                        maxHeight: "50%",
                        cursor: "pointer",
                        display: "block"
                      }}
                      shouldItemRender={(item, value) =>
                        item.USER_NAME
                          .toLowerCase()
                          .indexOf(value.toLowerCase()) > -1}
                      // shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item.USER_NAME}
                      renderItem={(item, highlighted) => (
                        <small key={item.RP_ID}>{item.USER_NAME}</small>
                      )}
                      value={this.state.value}
                      onChange={e => {
                        this.setState({ value: e.target.value });
                      }}
                      onSelect={(USER_NAME, RP_ID, EMAIL) => {
                        console.log(RP_ID);
                        this.setState({ value: USER_NAME });
                        this.setState({ data: RP_ID }, () => {
                          console.log(this.state.data);
                        });
                      }}
                    /> */}
                    {/*
                    <Menu
                    style={{position:'relative', display:'inline'}}
                    menuStyle={{
                     width:'500px', top:'50px', right:'auto',
                     height:'300px', overflow:'scroll'

                   }}
                   placeholder = "Select Member"
                   triggerInput='true'
                   inputStyle={

                     { width: '100%', display: 'inline-block', float: 'left' }}
                     >
                     {

                       available_to_assign.map((value,index)=> {
                         return(
                             <MenuItem key={index}
                             style={{paddingLeft:'10px', paddingTop:'10px', zIndex:'10'}}
                             >
                              <input type="checkbox" style={{display:'inline-block', width:'auto'}} onClick={e=>{
                                console.log("CHECKED VAL",e.target.checked)
                                if(e.target.checked == true) {
                                  var newState = this.state.selectArr.concat(value.RP_ID)
                                  this.setState({selectArr : newState}

                                  ,()=>{
                                    console.log("selectARR",this.state.selectArr)
                                  })
                                }
                                else {
                                  var newState = this.state.selectArr.filter((val)=>{
                                    return val != value.RP_ID})
                                    this.setState({selectArr : newState}, ()=> console.log("selectARR",this.state.selectArr))

                                }

                                console.log(value.id,e.target)
                              }}></input>
                              <small style={{display:'inline-block', marginLeft:'10px'}}>{value.USER_NAME}</small>
                             </MenuItem>



                        )

                       }


                       )
                     }

                     </Menu>
                     */}
                     <Select
                     closeOnSelect={false}
                     disabled={false}
                     multi
                     // joinValues={true}
                     // onChange={e=>{
                     //   // console.log(e)
                     //   this.setState({value:e},()=>{
                     //     console.log(this.state.value)
                     //   })
                     // }}
                     onChange={this.handleSelectChange.bind(this)}
                     options={available_to_assign}
                     placeholder="Select Member"
                     // simpleValue = {true}
                     value={this.state.value}
                     className="yooo"
                     style={{height:'50px',borderRadius:0,border:'1px solid #eee'}}
                   />
                  </div>

                  <div className="unit two-fifths">
                    <button
                      type="submit"
                      style={{
                        display: "inline-block",
                        width: "200px",
                        marginLeft: "40px",
                        marginTop: "60px",
                        float: "right"
                      }}
                      className="btn-primary"
                      // onClick={
                      //   e => {
                      //     alert('BLAAAA')
                      //     this.props.dispatch(assignTaskMember(this.state.WBS_id,this.state.data.RP_ID,this.state.data.EMAIL,this.state.data.USER_NAME,this.state.WBS_name))
                      //     e.preventDefault()
                      //   }
                    >
                      ADD
                    </button>
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit four-fifths">
                    <small style={{ display: "inline-block", float: "left" }}>
                      RESOURCES
                    </small>
                  </div>
                </div>
                {this.props.state.data.currently_assigned.map(
                  (value, index) => (
                    <div className="grid wrap narrow">
                      <div className="unit four-fifths">
                        <div className="unit two-fifths">
                          <medium
                            style={{ display: "inline-block", float: "left" }}
                          >
                            {value.USER_NAME}
                          </medium>
                        </div>
                        <div className="unit two-fifths">
                          <small
                            style={{ display: "inline-block", float: "left" }}
                          >
                            {value.EMAIL}
                          </small>
                        </div>
                        <div className="unit one-fifth">
                          <h2
                            className="input-desc list-pointer"
                            style={{
                              display: "inline-block",
                              float: "left",
                              textAlign: "center",
                              width: "50px"
                            }}
                          >
                            <i
                              style={{ color: "#D62431" }}
                              className="icon-trash"
                              onClick={e => {
                                this.props
                                  .dispatch(
                                    removeTaskMember(
                                      this.state.WBS_ID,
                                      value.RP_ID,
                                      value.EMAIL,
                                      value.USER_NAME,
                                      this.state.WBS_NAME
                                    )
                                  )
                                  .then(res => {
                                    const id = this.props.location.query.id;
                                    this.props.dispatch(
                                      getTaskMemberView(id, this.state.WBS_ID)
                                    );

                                    showNotif("Task member berhasil di hapus", "GREEN");
                                  });
                                e.preventDefault();
                              }}
                            />
                          </h2>
                          {value.status !== "none" &&
                            statusAssign(value.status)}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </form>
          )}
        </PopUp>
        <div className="grid wrap">
          <div className="unit whole">
            <Divider
              text="WORKPLAN"
              btnLeftText="BACK"
              btnLeftClick={e => {
                browserHistory.goBack();
                e.preventDefault();
              }}
            />
          </div>
        </div>
        <div className="grid wrap narrow">
          {/* <div className='unit whole'> */}
          {this.props.state.auth.privilege.workplan_modification && (
            <button
              className="btn-primary"
              style={{ width: "200px", float: "left",marginRight:'10px' }}
              onClick={e => {
                console.log("PROPS", this.props);

                this.props.dispatch({
                  type: "POPUP",
                  name: "createTask",
                  data: {
                    active: true
                  }
                });
                e.preventDefault();
              }}
            >
              CREATE TASK
            </button>
          )}
          {
            <PopUp
              id="createTask"
              dividerText="CREATE TASK"
              btnText="CREATE TASK"
              btnClass="btn-primary"
              btnStyle={{ width: "200px", float: "right" }}
            >
            <Loader id="createTask" style={{ height: "480px" }}>
            
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                  <div className="grid wrap">
                    <div className="unit whole">
                      <Field
                        inputName="NAME"
                        name="WBS_NAME"
                        type="input"
                        component={ReduxInput}
                      />
                    </div>
                  </div>
                  <div className="grid wrap">
                    <div className="unit whole">
                      <Field
                        inputName="PARENT"
                        name="WBS_PARENT_ID"
                        component={ReduxSelect}
                      >
                        <option />
                        {workplan_view &&
                          workplan_view.map((value, index) => (
                            <option key={index} value={value.WBS_ID}>
                              {value.WBS_NAME}
                            </option>
                          ))}
                      </Field>
                    </div>
                  </div>
                  <div className="grid wrap">
                    <div className="unit half">
                      <Field
                        inputName="DATE"
                        name="START_DATE"
                        component={datepickerUniversal}
                      />
                    </div>
                    <div className="unit half">
                      <Field
                        inputName="DATE"
                        name="FINISH_DATE"
                        component={datepickerUniversal}
                      />
                    </div>
                  </div>

                  <div className="grid wrap">
                    <div
                      className="unit whole"
                      style={{ textAlign: "center", marginTop: "40px" }}
                    >
                      <button
                        style={{ display: "inline-block", width: "200px" }}
                        className="btn-secondary"
                        onClick={e => {
                          this.props.dispatch({
                            type: "POPUP",
                            name: "createTask",
                            data: {
                              active: false
                            }
                          });

                          e.preventDefault();
                        }}
                      >
                        {" "}
                        CANCEL{" "}
                      </button>
                      <button
                        style={{
                          display: "inline-block",
                          width: "200px",
                          marginLeft: "40px"
                        }}
                        type="submit"
                        className="btn-primary"
                      >
                        {" "}
                        ADD{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </Loader>
            </PopUp>
          }
          {workplan_modification == true &&
          status == "NOT STARTED" && (
            <button
              className="btn-secondary"
              style={{ width: "200px", float: "left",marginRight:'10px' }}
              onClick={e => {
                this.props.dispatch(baseline(id)).then(res => {
                  this.props.dispatch(getWorkplanView(id));

                  showNotif("Baseline successful", "GREEN");
                });
              }}
            >
              BASELINE
            </button>
          )}

          {workplan_modification == true &&
          status == "IN PROGRESS" && (
            <button
              className="btn-secondary"
              style={{ width: "200px", float: "left" }}
              onClick={e => {
                this.props.dispatch({
                  type: "POPUP",
                  name: "request_rebaseline",
                  data: {
                    active: true
                  }
                });
              }}
            >
              RE-BASELINE
            </button>
          )}

          {approve_rebaseline == true &&
          status == "ON HOLD" && (
            <button
              className="btn-secondary"
              style={{ width: "200px", float: "left" }}
              onClick={e => {
                this.props.dispatch(denyRebaseline(id)).then(res => {
                  showNotif("Rebaseline request denied", "GREEN");

                  this.props.dispatch(getWorkplanView(id));
                });
              }}
            >
              DENY
            </button>
          )}

          {approve_rebaseline == true &&
          status == "ON HOLD" && (
            <button
              className="btn-secondary"
              style={
                status == "ON HOLD" ? (
                  { width: "200px", float: "left" }
                ) : (
                  { width: "200px", float: "left" }
                )
              }
              onClick={e => {
                this.props.dispatch(acceptRebaseline(id)).then(res => {
                  showNotif("Rebaseline request Accepted", "GREEN");

                  this.props.dispatch(getWorkplanView(id));
                });
              }}
            >
              ACCEPT
            </button>
          )}

          {this.props.state.auth.privilege.workplan_modification && (
            <button
              className="btn-secondary"
              style={{ width: "200px", float: "left" }}
              onClick={e => {
                console.log("PROPS", this.props);
                this.props.dispatch({
                  type: "POPUP",
                  name: "uploadWorkplan",
                  data: {
                    active: true
                  }
                });
                e.preventDefault();
              }}
            >
              UPLOAD
            </button>
          )}
          <PopUp
            id="uploadWorkplan"
            dividerText="UPLOAD WORKPLAN"
            btnText="UPLOAD"
            btnClass="btn-secondary"
            btnStyle={{ width: "200px", float: "left" }}
          >
            <Loader id="upload_workplan" style={{ height: "280px" }}>
              <form onSubmit={handleSubmit(this.onSubmitWorkplan.bind(this))}>
                <div>
                  <h2 className="input-desc">
                    You can upload your project workplan to generate task
                    automatically on PRouDS. Please download the project
                    workplan template <a href="http://45.77.45.126/dev/document_assets/wp_temp/template_workplan.xls">here</a>
                  </h2>
                  <h2 className="input-desc">
                    <i>SELECT FILE</i>
                  </h2>
                  {/*  <h2 className='input-desc'><i>You can attach one of these documents (Proposal, SPK/Contract, IWO, Change Management, Service Request, Others). If you want to add 2 or more, you can upload the compressed file (.zip). Max file size is 5 MB. allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png</i></h2>  */}
                  <h2 className="input-desc">
                    <i>
                      Max file 5mb, must be only xls with supported file format
                    </i>
                  </h2>
                  <div className="grid wrap">
                    <Field
                      inputName="SELECT FILE"
                      name="document"
                      component={ReduxUploadWorkplan}
                    />
                  </div>
                </div>
                <div className="btn-wrapper">
                  <button
                    style={{ display: "inline-block", width: "200px" }}
                    className="btn-secondary"
                    onClick={e => {
                      this.props.dispatch({
                        type: "POPUP",
                        name: "uploadWorkplan",
                        data: {
                          active: false
                        }
                      });

                      e.preventDefault();
                    }}
                  >
                    {" "}
                    CANCEL{" "}
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ float: "right", display: "inline-block" }}
                  >
                    UPLOAD
                  </button>
                </div>
              </form>
            </Loader>
          </PopUp>
        </div>
        <div className="grid wrap">
          <div className="unit whole">
            <div className="card" style={{ padding: "0", overflow: "visible" }}>
              {/* <div className='grid wrap'>
                  <div className='unit whole'>
                  </div>
                </div> */}
              <div className="grid wrap">
                <div className="unit whole">
                  {!workplan ? (
                    <PageLoader />
                  ) : (
                    <table className="table workplan">
                      <thead>
                        <Header
                          style={{ padding: "20px 0 0 20px" }}
                          text="Project Detail"
                        />

                        <tr>
                          <th>TASK</th>
                          <th>WORK</th>
                          <th>
                            WORK<br />TOTAL
                          </th>
                          <th>
                            DURATION<br />(DAYS)
                          </th>
                          <th>
                            START<br />DATE
                          </th>
                          <th>
                            END<br />DATE
                          </th>
                          <th>
                            % WORK<br />COMPLETE
                          </th>
                          <th>
                            RESOURCES<br />
                          </th>
                          <th />
                          <th />
                        </tr>
                      </thead>

                      {workplan == null ? (
                        <tbody>EMPTY</tbody>
                      ) : (
                        <tbody>
                          {this.menu(workplan)}
                          {workplan.children.length != 0 &&
                            this.state[workplan.WBS_ID.toString()] &&
                            this.renderRow(workplan)}
                        </tbody>
                      )}
                    </table>
                  )}
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
    formValues: state.form.add_task,
    formValues: state.form.upload_workplan,
    formValues: state.form.manualUpdate,
    state
  };
}
export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: "add_task",
  form: "upload_workplan",
  form: "manualUpdate"
})(
  connect(mapStateToProps, {
    addTaskWorkplan,
    uploadWorkplan,
    editTaskAction,
    requestRebaseline,
    assignTaskMember,
    getCurrentProgress,
    editTaskPercentAction
  })(ProjectWorkplan)
);
// export default Login
