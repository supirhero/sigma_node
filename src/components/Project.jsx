import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { push, replace, goBack } from "react-router-redux";


import store from '../reducers/combineReducers.jsx'
import { Divider, TimeSheetTimeButton, PopUpTimesheet, Select, Input, ReduxInput,PageLoader,datepickerTimesheet, PopUp } from './components.jsx';
import { getProjectDetail, pop,addTimesheet } from './actions.jsx'
import { Field, reduxForm } from 'redux-form';

class Project extends Component {
  constructor(){
    super();
    this.state = {
      active : 'Overview'
    };
  }

  onSubmit(props){
    this.props.addTimesheet(props.WP_ID,props.TS_DATE,props.HOUR,props.TS_SUBJECT,props.TS_MESSAGE)
  }

  componentWillMount(){
    const id = this.props.location.query.id
    this.props.dispatch(getProjectDetail(id))
  }

  componentWillUnmount(){
    store.dispatch(pop())
  }

  render(){
    const { handleSubmit } = this.props;
    const id = "?id=" + this.props.location.query.id
    const sidebar = [
      {type:'menu', name : 'Overview', path: `/project`},
      {type:'menu', name : 'Edit Project', path: `/project/edit-project`},
      {type:'menu', name : 'Activities', path: `/project/activities`},
      {type:'title', name : 'MANAGE'},
      {type:'menu', name : 'Workplan', path: `/workplan`},
      {type:'menu', name : 'Team Member', path: `/project/team-member`},
      {type:'menu', name : 'History', path: `/project/history`}, 
      {type:'menu', name : 'Doc & Files', path: `/project/docs-and-files`},
      {type:'menu', name : 'Issues', path: `/project/issues`},
      {type:'title', name : 'REPORTS'},
      {type:'menu', name : 'SPI & CPI', path: `/project/spi-and-cpi`},
      {type:'menu', name : 'S-Curve', path: `/project/s-curve`},
      // {type:'menu', name : 'Gantt Chart', path: `/project/${id}/gantt-chart`},
    ]
    return(
      <div className='project'>
          <div className='grid wrap'>
            <div className='unit one-fifth no-gutters'>
              <div className='sidebar'>
              <div className='grid wrap'>
                <div className='unit whole no-gutters'>

                </div>
              </div>
              <div className='grid wrap sidebar'>
                <div className='unit whole '>
                  <ul>
                    {
                      sidebar.map((value, index) => {
                        if (value.type == 'menu') {
                          {/* if( value.name == 'Team Member' && this.props.state.auth.privilege.project_member) { */}

                            return(
                              <li key={index}><a className={ value.name == this.props.location.state.page ? 'active' : '' } onClick={
                                e => {
                                  const name = value.name
                                  this.setState({
                                    active : value.name
                                  })
                                  if (value.name == 'Workplan') {
                                    this.props.dispatch(
                                      push({
                                        pathname: value.path,
                                        search: "?id=" + this.props.location.query.id,
                                        state: {
                                          page: value.name
                                        }
                                      })
                                    )
                                  }
                                  else {
                                    // browserHistory.replace(value.path)
                                    this.props.dispatch(
                                      replace({
                                        pathname: value.path,
                                        search: "?id=" + this.props.location.query.id,
                                        state: {
                                          page: value.name
                                        }
                                      })
                                    )
                                    

                                  }
                                  e.preventDefault()
                                }
                              }>{value.name}</a></li>
                            )
                            {/* } */}
                          {/* else return null */}
                        }
                        else {
                          return(

                            <li key={index} style={{marginTop:'45px'}}><medium>{value.name}</medium></li>
                          )
                        }

                    })
                  }


                  </ul>


                </div>
              </div>

            </div>
          </div>


        <div className='unit four-fifths'>

          {
            this.props.children


          }
        </div>
      </div>


      </div>

    )
  }

}


function mapStateToProps(state) {
  return {
    formValues: state.form.updateTimesheet,

    state,
    // filter: ownProps.location.query.filter
  };
}

export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'updateTimesheet',
})(
  connect(mapStateToProps, { addTimesheet })(Project),
);
