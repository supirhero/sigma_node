import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import store from '../reducers/combineReducers.jsx';
import { Field, reduxForm } from 'redux-form';
import { Divider, Header, ProjectHeader, PopUp, Input, Select, InputFile, ReduxInput, ReduxFileInput, ReduxFileInput3,ReduxFinal,ReduxSelect,EmptyData,PageLoader } from './Components.jsx';
import { getIssue, addIssue, pop } from './actions.jsx';


class ProjectIssues extends Component {
  componentWillMount() {
    const id = store.getState().data.page.id;
    store.dispatch(getIssue(id));
  }

  onSubmit(props) {
    const id = store.getState().data.page.id;
    this.props.addIssue(props,id);
  }


  render() {
    const { handleSubmit } = this.props;
    const priority = [
        { value: 'high' },
        { value: 'medium' },
        { value: 'low' },
    ]
    function status(value) {
      let className = 'resolved';
      let text = 'RESOLVED';
      switch (value) {
        case 'Done':
          className = 'resolved';
          text = 'RESOLVED';
          break;
        case 'On Progress':
          className = 'not-resolved';
          text = 'NOT RESOLVED';
          break;
        default:
      }
      return(<medium style={{ textAlign: 'right'}} className={className}>{text}</medium>)
    }

    const state = store.getState()
    const projectIssueList = state.data.project.project_issue_list

    return (
      <div className="project-DocsFiles">
        <div className="grid padding-left">
          <div className="unit whole">
            <ProjectHeader projectName="Transaction Based Managed Services 2017" sectionName="Issues" />
          </div>
        </div>
        <div className="grid padding-left">
          <PopUp id="issue" dividerText="REPORT AN ISSUE" btnText="REPORT AN ISSUE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: '0 auto' }}>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Field
                      inputName="SUBJECT"
                      name="SUBJECT"
                      type="input"
                      component={ReduxInput}
                    />

                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Field
                      inputName="MESSAGE"
                      name="MESSAGE"
                      type="input"
                      component={ReduxInput}
                    />
                  </div>
                </div>

                <div className="grid wrap narrow">
                  <div className="unit golden-small">
                    <Field
                      inputName="PRIORITY"
                      name="PRIORITY"
                      style={{ width: '96%' }}
                      component={ReduxInput}
                    />
                  </div>
                  <div className="unit golden-large">
                    <h2 className="input-desc">EVIDENCE</h2>
                  </div>
                  <div className="unit golden-large">
                    <Field
                      inputName="EVIDENCE"
                      name="file_upload"
                      type="file"
                   
                      component={ReduxFileInput}
                    />
                  </div>
                  <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                      <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                      <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </PopUp>


        </div>
        <div className="grid padding-left">
          <div className="unit whole">
            <Divider text="Issues" />
          </div>
        </div>
{
  projectIssueList ?
  projectIssueList.map((value,index)=>{
    return(
      <div className="grid padding-left">
        <div className="unit whole">
          <div className="card" style={{ padding: '15px' }}>
            <div className="grid">
              <div className="unit four-fifths">
                <a style={{ display: 'inline' }}>ISSUES #{value.issue_id}</a>
                <small style={{ color: '#717171', display: 'inline' }}>&nbsp;&nbsp;reported by {value.reported_by} at {value.date_issue}, 13:23</small>
              </div>
              <div className="unit one-fifth">
                <medium style={{ textAlign: 'right' }}><span className="icon-options" /></medium>
              </div>
            </div>
            <div className="grid">
              <div className="unit whole">
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."</small>
              </div>
            </div>
            <div className="grid">
              <div className="unit half">
                <medium>PRIORITY: {(value.priority).toUpperCase()}</medium>
              </div>
              <div className="unit half">
                <medium style={{ textAlign: 'right' }}>{status(value.status)}</medium>
      
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }):
 
  <div className='grid padding-left'>
  <div className='unit whole'>
    <PageLoader></PageLoader>
  </div>
</div>
}


      </div>

    );
  }

}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, { addIssue })(
  reduxForm({
    form: 'add_issue',
  })(ProjectIssues));

// export default Login
