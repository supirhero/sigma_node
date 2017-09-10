import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import store from '../reducers/combineReducers.jsx';
import { Field, reduxForm } from 'redux-form';
import { Divider, Header, ProjectHeader, PopUp, ReduxDrop, Input, Select, InputFile,required ,ReduxInput, ReduxUploadWorkplan,ReduxDropZone2, ReduxFileInput ,ReduxDropBisa,ReduxFinal,ReduxSelect,EmptyData,PageLoader } from './Components.jsx';
import { getIssue, addIssue, pop } from './actions.jsx';
import DropZone from 'react-dropzone'

class ProjectIssues extends Component {
  componentWillMount() {
    const id = store.getState().page.id;
    this.props.dispatch(getIssue(id));
  }

  onSubmit(props) {
    const id = store.getState().page.id;
    this.props.dispatch(addIssue(id,props.SUBJECT,props.MESSAGE,props.PRIORITY,props.file_upload)).then(res=>{
      this.props.dispatch(getIssue(id));
     
        this.props.dispatch({
          type: 'POPUP',
          name:'issue',
          data: {
            active:false
          }
        })
    
    });
    // console.log(store.getState().form.add_issue.values.file_upload.preview)
    // const preview = store.getState().form.add_issue.values.file_upload.map((value,index)=>{
    //   return value.preview
    // })
    // console.log(preview.toString())
    // console.log(String(preview))
    

    // console.log(store.getState().form.add_issue.values.file_upload.size)
  }


  render() {
    const { handleSubmit } = this.props;
    const priority = [
        { value: 'High' },
        { value: 'Medium' },
        { value: 'Low' },
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
    const projectIssueList = state.data.project_issue_list;
    const overview = state.data.overview ? state.data.overview : null

    return (
      <div className="project-DocsFiles">
        <div className="grid padding-left">
          <div className="unit whole">
            <ProjectHeader projectName={overview.project_name} sectionName="Issues" />
          </div>
        </div>
        <div className="grid padding-left">
        {
          this.props.state.auth.privilege.upload_issue &&

          <button className='btn-primary'
        style={{display:'block', margin: 'auto'}}
        onClick={
        e => {
          console.log('PROPS', this.props);
          this.props.dispatch({
            type: 'POPUP',
            name:'issue',
            data: {
              active:true
            }
          })
          e.preventDefault()
        }
      }
        >
        UPLOAD ISSUE
      </button>}
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
                      validate={[required]}
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
                      validate={[required]}
                    />
                  </div>
                </div>

                <div className="grid wrap narrow">
                  <div className="unit golden-small">
                    <Field
                      inputName="PRIORITY"
                      name="PRIORITY"
                      style={{ width: '96%' }}
                      component={ReduxSelect}>
                      <option></option>
                      {
                        priority.map((value, index)=> (
                          <option key={index} value={value.value} {...this.props.option}>{value.value}</option>
                        ))
                      }
                      

                    </Field>
                  </div>

                <div className="unit golden-large" style={{padding:'0'}}>
                  <h2 className="input-desc" style={{marginTop:'25px'}}>EVIDENCE</h2>
                </div>
                <div className="unit golden-large">
                  <Field
                  style={{width:'473px'}}
                  inputName="EVIDENCE"
                  name="file_upload"
                  type='file'
                  component = {ReduxUploadWorkplan}
                />
                </div>

                  <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                     <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"
                      onClick={e=>{
                        this.props.dispatch({
                          type: 'POPUP',
                          name:'issue',
                          data: {
                            active:false
                          }
                        })
  
                        e.preventDefault()
                      }}> CANCEL </button>
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
      <div className="grid padding-left" key={index}>
        <div className="unit whole">
          <div className="card" style={{ padding: '15px' }}>
            <div className="grid">
              <div className="unit four-fifths">
                <a style={{ display: 'inline' }}>ISSUES #{value.issue_id}</a>
                <small style={{ color: '#717171', display: 'inline' }}>&nbsp;&nbsp;reported by {value.reported_by} at {value.date_issue}</small>
              </div>
              <div className="unit one-fifth">
                <medium style={{ textAlign: 'right' }}><span className="icon-options" /></medium>
              </div>
            </div>
            <div className="grid">
              <div className="unit whole">
                <small>{value.note}</small>
                {/* <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."</small> */}
              </div>
            </div>
            <div className="grid">
              <div className="unit half">
                <medium>PRIORITY: {value.priority ? (value.priority).toUpperCase():''}</medium>
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
