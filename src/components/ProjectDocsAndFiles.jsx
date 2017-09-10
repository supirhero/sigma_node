import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Field, reduxForm} from 'redux-form';
import fileDownload from 'react-file-download';
import {Divider, Header, ProjectHeader, PopUp, PageLoader, ReduxInput,ReduxDrop, ReduxUploadWorkplan, EmptyData,required} from  './Components.jsx'
import { getDocsFiles, addDocsAndFiles,deleteProjectDoc,showNotif } from './actions.jsx'



class ProjectDocsAndFiles extends Component {
  componentDidMount(){
    const id = store.getState().page.id
    store.dispatch(getDocsFiles(id))
  }
  onSubmit(props){
    const id = store.getState().page.id
    this.props.dispatch(addDocsAndFiles(props.desc, props.document,id)).then(
      (res)=>{
        showNotif('Successfully added document', 'GREEN')
        
        store.dispatch(getDocsFiles(id))
        this.props.dispatch({
          type: 'POPUP',
          name:'uploadFileDocsFiles',
          data: {
            active:false
          }
        })
        // res.preventDefault()
        // console.log("closed")
      }
    )
  }

  onSubmitDelete(){
    const id = store.getState().page.id
    this.props.dispatch(deleteProjectDoc(id)).then(
      (res)=>{
        this.props.dispatch(getDocsFiles(id))
        
        // res.preventDefault()
        // console.log("closed")
      }
    )
    
  }
  

    render(){
      const {handleSubmit} = this.props;
      const appStore = store.getState()
      const project_doc_list = appStore.data.project_doc_list
      const overview = appStore.data.overview ? appStore.data.overview : null
      return(
        <div className='project-DocsFiles'>
          
          <PopUp id="uploadFileDocsFiles" dividerText="UPLOAD FILE" btnText="UPLOAD FILE" btnClass='btn-primary' btnStyle={{display:'block', margin: 'auto'}}>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Field
                      inputName="FILE DESCRIPTION"
                      name="desc"
                      type='input'
                      component={ReduxInput}
                      validate={[required]}
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
                      style={{width:'780px'}}
                      component={ReduxUploadWorkplan}
                    />
                   {/* <InputFile name="selectFile" /> */}
                  </div>
                </div>
                  <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"
                    onClick={e=>{
                      this.props.dispatch({
                        type: 'POPUP',
                        name:'uploadFileDocsFiles',
                        data: {
                          active:false
                        }
                      })

                      e.preventDefault()
                    }}> CANCEL </button>
                      <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary" > UPLOAD </button>
                    </div>
                  </div>

              </div>
            </form>

        </PopUp>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName={overview.project_name} sectionName='DOCS & FILES'/>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              {
                this.props.state.auth.privilege.upload_doc &&
                <button className='btn-primary'
                  style={{display:'block', margin: 'auto'}}
                  onClick={
                  e => {
                    console.log('PROPS', this.props);
                    this.props.dispatch({
                      type: 'POPUP',
                      name:'uploadFileDocsFiles',
                      data: {
                        active:true
                      }
                    })
                    e.preventDefault()
                  }}
                  >
                  UPLOAD FILE
                </button>
              }

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
                          <a href ={`http://prouds.telkomsigma.co.id:8089/sigmadev/document_assets/rebaseline_evidence/${value.url}`} style={{ display:'inline'}} 
                          
                          >{value.doc_name}</a>
                          <small style={{color:'#717171', display:'inline'}}>&nbsp;uploaded by {value.upload_by} at {value.date_upload}</small>
                        </div>
                        <div className='unit one-fifth'>
                          <medium style={{textAlign:'right', marginTop:'9px'}}> &nbsp;&nbsp;&nbsp;&nbsp;<span className='icon-trash' style={{color:'#D62431'}} onClick={
                            e=> {
                              value.jenis !== "rebaseline" ?
                              store.dispatch({
                              type: 'CONFIRM',
                              message: 'Would you like to delete this document?',
                              show:true,
                              onConfirm: ()=> {
                                this.props.dispatch(deleteProjectDoc(value.doc_id)).then(()=> {
                                  const id = store.getState().page.id
                                  
                                  // store.dispatch(getProjectTeamMember(id))
                                  this.props.dispatch(getDocsFiles(id))
                                  {/* showNotif('Successfully removed doc from project', 'GREEN') */}
                                })
                                store.dispatch({
                                type: 'CONFIRM',
                                message: '',
                                show:false,
                                
                              })

                              }
                              
                            }) : alert("Can't delete document from re-baseline evidence")
                              e.preventDefault()
                            }
                          }></span></medium>
                        </div>
                      </div>
                      <div className='grid'>
                        <div className='unit whole'>
                          <small>{value.doc_desc}</small>
                          <br />
                          <br />
                          <small>{value.jenis === "rebaseline" ? "type : rebaseline" : "type: document"}</small>
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
