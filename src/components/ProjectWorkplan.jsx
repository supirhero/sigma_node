import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { Grid } from 'react-redux-grid';
import store from '../reducers/combineReducers.jsx'
// <<<<<<< HEAD
import {Divider, Header, ProjectHeader,PopUp,ReduxInput,ReduxSelectNew, WorkplanRow,PageLoader, ReactDatePicker} from  './Components.jsx'
import { Field, reduxForm } from 'redux-form';
import {getWorkplanView, addTaskWorkplan, getTaskView} from './actions.jsx'



class ProjectWorkplan extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false

    };
  }
  onSubmit(props){
    const id =  this.props.state.page.id

    this.props.addTaskWorkplan(id,props)
  }
    componentWillMount() {
      const id =  this.props.state.page.id
      // store.dispatch(getWorkplanView(id))
      store.dispatch(getTaskView(id))


    }


    render(){
      const { handleSubmit } = this.props;



      // const workplan = this.props.state.data.workplan
      const workplan_view = this.props.state.data.parent ? this.props.state.data.parent : null
      const treeData = {
          root: {
              id: -1,
              'Name': 'Root',
              children: [
                  {
                      id: 1,
                      parentId: -1,
                      Name: 'Category 1',
                      GUID: '8f7152dc-fed7-4a65-afcf-527fceb99865',
                      Email: 'hgardnero6@ed.gov',
                      Gender: 'Male',
                      Address: '605 Manley Park',
                      'Phone Number': '31-(678)495-4134',
                      children: [
                          {
                              id: 11,
                              parentId: 1,
                              Name: 'Category 11',
                              GUID: '8f7152dc-fed7-4a65-afcf-527fceb991865',
                              Email: 'hgardneross6@ed.gov',
                              Gender: 'Male',
                              Address: '12 Manley Park',
                              'Phone Number': '31-(678)495-4134',
                          },
                          {
                              id: 12,
                              parentId: 1,
                              Name: 'Category 12',
                              GUID: '8f7152dc-fed7-4acf-527fceb991865',
                              Email: 'hgardneross6@ed.gov',
                              Gender: 'Male',
                              Address: '12 Manley Park',
                              'Phone Number': '31-(678)495-4134',
                              children: [
                                   {
                                      id: 121,
                                      parentId: 12,
                                      Name: 'Category 121',
                                      GUID: '8f7q2dc-fedsss7-4acf-527fceb991865',
                                      Email: 'hgoss6@eds.gov',
                                      Gender: 'Male',
                                      Address: '21 fake Park',
                                      'Phone Number': '31-(678)495-4134',
                                  },
                                  {
                                      id: 122,
                                      parentId: 12,
                                      Name: 'Category 122',
                                      GUID: '8f7q2dc-fed7-4acf-527fceb991865',
                                      Email: 'hgoss6@ed.gov',
                                      Gender: 'Male',
                                      Address: '21 fake Park',
                                      'Phone Number': '31-(678)495-4134',
                                      children: [
                                          {
                                              id: 1221,
                                              parentId: 122,
                                              Name: 'Category 1211',
                                              GUID: '8f7q2dc-facf-527fceb991865',
                                              Email: 'hgossjdjdjdj6@ed.gov',
                                              Gender: 'Male',
                                              Address: '21 fdjdjake Park',
                                              'Phone Number': '31-(678)495-4134'
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      id: 2,
                      parentId: -1,
                      Name: 'Category 2',
                      GUID: '8f7q2dc-facf-527fcebdk=-jdjd991865',
                      Email: 'hehehe@ed.gov',
                      Gender: 'Male',
                      Address: '212 Park',
                      'Phone Number': '31-(678)495-4134',
                      children: [
                          {
                              id: 21,
                              parentId: 2,
                              Name: 'Category 21',
                              GUID: '8f7q2dc-facf-527fcsw-jdjd991865',
                              Email: 'hehehe@ed.gov',
                              Gender: 'Male',
                              Address: '21112 Park',
                              'Phone Number': '31-(678)495-4134',
                              leaf: false
                          }
                      ]
                  }
              ]
          }
      };

      const treeConfig = {
        stateKey: 'workplan-grid',
         showTreeRootNode: false,
        gridType: 'tree', // either `tree` or `grid`,
        data: treeData,
        stateful: true,
        plugins:{
          BULK_ACTIONS: {
            enabled: false,
          }
        },
        // showTreeRootNode: false, // dont display root node of tree
        columns: [
            {
                name: 'Name',
                width: '30%',
                className: 'additional-class',
                dataIndex: 'Name',
                sortable: false,
                expandable: true
            },
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number',
                sortable: false,
                className: 'additional-class'
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: false,
                className: 'additional-class',
                defaultSortDirection: 'descend'
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: false,
                className: 'additional-class'
            }
        ],
    };
      const workplan2=
        {root : {
          task: 'Transaction Based Managed Service 2017',
          work: 258,
          parentId: null,
          parentId: -1,
          work_total: 55328,
          duration: 12,
          start_date: '08 Apr 2017',
          end_date: '23 Apr 2017',
          complete: 0.41,
          resources: '2 people',
          children: [
            {
              categoryCode: 'as-ffw-34neh-',
                id: 1,
                parentId: -1,
                task: 'Working Activity',
                work: 258,
                work_total: 55318,
                column: 'Column',
                duration: 12,
                start_date: '08 Apr 2017',
                end_date: '23 Apr 2017',
                complete: 0.41,
                resources: '2 people',
                sub: [
                  {
                    categoryCode: 'as-ffw-34wneh-',

                    id: 12,
                    parentId: 1,
                    task: 'Annual Working',
                    work: 258,
                    work_total: 55328,
                    duration: 12,
                    start_date: '08 Apr 2017',
                    end_date: '23 Apr 2017',
                    complete: 0.41,
                    resources: '2 people',
                  },

                ]
              },

            ]
          }
}

      return(
        <div className='project-workplan'>
          <div className='grid wrap'>
            <div className='unit whole'>
              <Divider text='WORKPLAN' btnLeftText='BACK' btnLeftClick={
                e=> {
                  browserHistory.goBack()
                  e.preventDefault()
                }
              }></Divider>
            </div>
          </div>
          <div className='grid wrap narrow'>
            <div className='unit one-third no-gutters'>
              <PopUp id='createTask' dividerText='CREATE TASK' btnText='CREATE TASK' btnClass="btn-primary" btnStyle={{width:'200px', float:'right'}}>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                      <div>
                        <div className="grid wrap">
                          <div className="unit whole">
                            <Field
                              inputName="NAME"
                              name="WBS_NAME"
                              type='input'
                              component={ReduxInput}
                            />
                          </div>
                        </div>
                        <div className='grid wrap'>
                          <div className='unit whole'>
                            <Field
                              inputName="PARENT"
                              name="WBS_PARENT_ID"
                              component={ReduxSelectNew}>
                                {
                                  workplan_view &&
                                  workplan_view.map((value,index) => (
                                    <option key={index} value={value.WBS_ID}>{value.WBS_NAME}</option>

                                  ))
                                }
                              </Field>
                          </div>
                        </div>
                        <div className="grid wrap">
                          <div className="unit half">
                            <Field
                              inputName="DATE"
                              name="START_DATE"

                              component={ReactDatePicker}
                            />

                          </div>
                          <div className="unit half">
                            <Field
                              inputName="DATE"
                              name="FINISH_DATE"

                              component={ReactDatePicker}
                            />

                          </div>
                        </div>

                        <div className="grid wrap">
                          <div className='unit whole' style={{textAlign:'center',marginTop:'40px'}}>
                            <button style={{ display:'inline-block', width:'200px'}} className='btn-secondary'> CANCEL </button>
                            <button style={{ display:'inline-block',width:'200px',marginLeft:'40px'}} type='submit' className='btn-primary'> ADD </button>
                          </div>
                        </div>


                      </div>

                    </form>
                  </PopUp>

            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', display:'block', margin:'auto'}} >RE-BASELINE</button>

            </div>
            <div className='unit one-third no-gutters'>
              <PopUp id='createTask' dividerText='UPLOAD WORKPLAN' btnText='UPLOAD' btnClass="btn-secondary" btnStyle={{width:'200px', float:'left'}}>
                  <div>
                    <small>You can upload your project workplan to generate task automatically on PRouDs. Please download the project workplan template <a>here</a></small>
                    <Field
                      inputName="WORK HOURS"
                      name="HOUR"
                      inputDesc="max file size is 5 MB allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png"
                      component={ReduxInput}
                    />
                  </div>
                      <div className='btn-wrapper'>
                        <button className='btn-secondary' style={{float:'left', display:'inline-block'}}>CANCEL</button>
                        <button className='btn-primary'style={{float:'right', display:'inline-block'}}>UPLOAD</button>

                      </div>

                </PopUp>
            </div>

          </div>
          <div className='grid wrap'>
            <div className='unit whole'>
              <div className='card' style={{padding:'0'}}>
                {/* <div className='grid wrap'>
                  <div className='unit whole'>
                  </div>
                </div> */}
                <div className='grid wrap'>
                  <div className='unit whole'>
                      {/* // !workplan ? <PageLoader></PageLoader> : */}
                      <Grid
                        {...treeConfig}
                        ></Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      )
    }

}

function mapStateToProps(state) {
  return {
    formValues: state.form.add_task,
    state
  }
}
export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'add_task',
})(
  connect(mapStateToProps, { addTaskWorkplan })(ProjectWorkplan),
);
// export default Login
