import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Field, reduxForm} from 'redux-form';

import {Divider, Header, ProjectHeader, PopUp, InputFile, PageLoader, ReduxInput, ReduxFileInput, EmptyData} from  './Components.jsx'
import { getDocsFiles, addDocsAndFiles } from './actions.jsx'



class ProjectDocsAndFiles extends Component {
  componentDidMount(){
    const id = store.getState().page.id
    store.dispatch(getDocsFiles(id))
  }
  onSubmit(props){

    const id = store.getState().page.id


    this.props.addDocsAndFiles(props, id)
  }
    render(){
      const {handleSubmit} = this.props;

      const appStore = store.getState()
      const project_doc_list = appStore.data.project_doc_list
      return(
        <div className='project-DocsFiles'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='DOCS & FILES'/>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>


              <PopUp id="uploadFile" dividerText="UPLOAD FILE" btnText="UPLOAD FILE" btnClass='btn-primary' btnStyle={{display:'block', margin: 'auto'}}>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <div>
                    <div className="grid wrap narrow">
                      <div className="unit whole">
                        <Field
                          inputName="FILE DESCRIPTION"
                          name="desc"
                          type='input'
                          component={ReduxInput}
                        />
                        {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
                      </div>
                    </div>
                    <div className="grid wrap narrow">
                      <div className="unit whole">
                        <h2 className="input-desc">SELECT FILE</h2>
                        <h2 className="input-desc" style={{margin:'0'}}><i>max file size is 5 MB. allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png</i></h2>
                      </div>
                      <div className="unit whole no-gutters">
                        <Field
                          inputName="Select File"
                          name="document"
                          type='file'
                          component={ReduxFileInput}
                        />
                       {/* <InputFile name="selectFile" /> */}
                      </div>
                    </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                          <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> UPLOAD </button>
                        </div>
                      </div>

                  </div>
                </form>

            </PopUp>

            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <Divider text='DOCS & FILES'/>
            </div>
          </div>

          {
            project_doc_list ?
            typeof project_doc_list[0] !== 'undefined'?
            project_doc_list.map((value, index) => {
              return (
                <div className='grid padding-left' key={index}>
                  <div className='unit whole'>
                    <div className='card' style={{padding:'15px'}}>
                      <div className='grid'>
                        <div className='unit four-fifths'>
                          <a style={{ display:'inline'}}>{value.url}</a>
                          <small style={{color:'#717171', display:'inline'}}>&nbsp;uploaded by Kara Gray at {value.date_upload}, 13:23</small>
                        </div>
                        <div className='unit one-fifth'>
                          <medium style={{textAlign:'right'}}><span className='icon-trash' style={{color:'#D62431'}}></span></medium>
                        </div>
                      </div>
                      <div className='grid'>
                        <div className='unit whole'>
                          <small>{value.doc_desc}</small>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )
            }):
            <div className='grid padding-left'>
              <div className='unit whole'>
                <EmptyData></EmptyData>
              </div>
            </div>
            :
            <div className='grid padding-left'>
              <div className='unit whole'>
                <PageLoader></PageLoader>
              </div>
            </div>

          }




        </div>

      )
    }

}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps, { addDocsAndFiles })
(
  reduxForm({
    form: 'add_docs_files',
  })(ProjectDocsAndFiles));
// export default connect(mapStateToProps)(ProjectDocsAndFiles)
// export default Login
