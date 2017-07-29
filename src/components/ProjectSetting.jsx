import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import { Line} from 'react-progressbar.js'
import {Divider, Input, RadioButton, Select, PopUp, ProjectHeader,InputFile} from './Components.jsx'


class NewProject extends Component {

    render(){
      return(
        <div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='SETTING'/>

            </div>
          </div>
          <form>

          <div className='grid wrap padding-left'>
            <div className='unit whole'>

              <div className='grid wrap'>
                <div className='unit whole'>
                  <small style={{textAlign:'left', marginTop:'20px', display:'inline-block'}}>IWO</small>

                  <small style={{textAlign:'left', marginTop:'20px', display:'inline-block', marginLeft:'40px'}}>Product</small>

                  <small style={{textAlign:'left', marginTop:'20px', display:'inline-block', marginLeft:'40px'}}>Status</small>

                  <small style={{textAlign:'left', marginTop:'20px', display:'inline-block', marginLeft:'40px'}}>Finance</small>
                </div>
              </div>
              <Divider text='IWO'></Divider>
            </div>
          </div>
              <div className= 'grid wrap padding-left'>
              <div className='unit whole'>
                <Select inputName="PROJECT ID" items={{
                  items : [
                    {title : 'TBWS21312'},
                    {title : 'TBWS21312'}
                  ]
                }}></Select>
                <Input style={{width:'100%'}} inputName='NAME'/>
                <Input style={{width:'100%'}} inputName='BUSINESS UNIT'/>
                <Input style={{width:'100%'}} inputName='RELATED BUSINESS UNIT'/>
                <Input style={{width:'100%'}} inputName='NAME'/>
              </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit one-third'>
                  <Input inputName='CUSTOMER' style={{width:'88%'}}/>
                </div>
                <div className='unit two-thirds'>
                  <Input inputName='END CUSTOMER' style={{width:'100%'}}/>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit two-thirds'>
                  <Input inputName='END CUSTOMER' style={{width:'94%'}}/>
                </div>
                <div className='unit one-third'>
                  <Input inputName='CUSTOMER' style={{width:'100%'}}/>
                </div>

              </div>
              <div className='grid wrap padding-left'>
                <div className='unit whole'>

                  <Divider text='PRODUCT'></Divider>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit half'>
                  <div className='grid wrap'>
                    <div className='unit half'>
                      <RadioButton id='test1' label='Project' group='project-type'/>
                    </div>
                    <div className='unit half'>
                      <RadioButton id='test2' label='Non-Project' group='project-type'/>
                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Select inputName='PROJECT MANAGER' style={{width:'96%'}} items={{
                        items : [
                          {title : 'TBWS21312'},
                          {title : 'TBWS21312'}
                        ]
                      }}></Select>
                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Select inputName='TYPE OF OFFER' style={{width:'96%'}} items={{
                        items : [
                          {title : 'TBWS21312'},
                          {title : 'TBWS21312'}
                        ]
                      }}></Select>
                    </div>
                  </div>
                </div>
                <div className='unit half'>
                  <div className='grid wrap'>
                    <div className='unit half'>

                      <RadioButton id='yes' label='YES' group='operation' style={{marginLeft: '20px'}}/>
                    </div>
                    <div className='unit half'>
                      <RadioButton id='no' label='NO' group='operation'/>
                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Select inputName='ACCOUNT MANAGER' style={{width:'96%', float:'right'}} items={{
                        items : [
                          {title : 'TBWS21312'},
                          {title : 'TBWS21312'}
                        ]
                      }}/>
                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Input fullWidth='true' inputName='PRODUCT TYPE' style={{width:'96%', float:'right'}}/>
                    </div>
                  </div>

                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit whole'>
                  <Divider text='STATUS'></Divider>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit whole'>
                  <Select inputName='ACCOUNT MANAGER' style={{width:'100%'}} items={{
                    items : [
                      {title : 'TBWS21312'},
                      {title : 'TBWS21312'}
                    ]
                  }}/>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit half'>
                  <Select inputName='START DATE' style={{width:'96%'}} items={{
                    items : [
                      {title : 'TBWS21312'},
                      {title : 'TBWS21312'}
                    ]
                  }}/>
                </div>
                <div className='unit half'>
                  <Select inputName='END DATE' style={{width:'96%', float:'right'}} items={{
                    items : [
                      {title : 'TBWS21312'},
                      {title : 'TBWS21312'}
                    ]
                  }}/>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit whole'>
                  <h1 className='input-desc'>VISIBILITY</h1>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit whole'>
                  <RadioButton id='business-member' label='Owning Busniness Member' group='visibility'/>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit whole'>
                  <RadioButton id='project-member' label='Project Members Only' group='visibility'/>
                </div>
              </div>

              <div className='grid wrap padding-left'>
                <div className='unit whole'>
                  <Divider text='FINANCE'></Divider>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit half'>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Select inputName='START DATE' style={{width:'96%'}} items={{
                        items : [
                          {title : 'TBWS21312'},
                          {title : 'TBWS21312'}
                        ]
                      }}/>
                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Input inputName='TYPE OF EXPENSE' style={{width:'96%'}}/>
                    </div>
                  </div>
                </div>
                <div className='unit half'>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Input inputName='PROJECT OVERHEAD' style={{width:'96%', float:'right'}}/>
                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Input inputName='COGS' style={{width:'96%', float:'right'}}/>
                    </div>
                  </div>

                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit whole'>
                  <Divider text='PROJECT CHARTER FORM'></Divider>
                </div>
              </div>
              <div className='grid wrap padding-left'>
                <div className='unit three-quarters'>
                  <large style={{display: 'block', marginBottom:'11px'}}>FORM STATUS:&nbsp;<span style={{color:'#65BDF4'}}>DRAFTED</span></large>
                  <large style={{display: 'inline-block'}}>COMPLETION:&nbsp;<span style={{color:'#65BDF4'}}>25%</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</large>

                  <div className='completion-bar' style ={{display:'inline-block'}}>

                    <Line
                      progress={30 *0.01}
                      initialAnimate={true}
                      options={{
                        strokeWidth: 3,
                        color: '#65BDF4',
                        trailColor:'#EEEEEE',
                        trailWidth: 12,
                        fontSize: 30,
                        easing: 'easeInOut',
                        duration: 700,
                      }}
                      containerClassName={'line-bar'}
                      >
                      </Line>
                  </div>

                </div>
                <div className='unit one-quarter'>
                  {/* <button className='btn-primary' onClick={
                    e => {
                      store.dispatch({
                        type : 'POPUP',
                        id : 'form',
                        popup : true
                      })
                      e.preventDefault()
                    }
                  }>COMPLETE FORM</button> */}
                  <PopUp id='complete' dividerText='PROJECT CHARTER FORM' btnText='VIEW FORM'>
                    <div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='PROJECT NAME' ></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit half'>
                          <Input inputName='IWO'></Input>
                        </div>
                        <div className='unit half'>
                          <Input inputName='PROJECT MANAGER'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit half'>
                          <Input inputName='CLIENT'></Input>
                        </div>
                        <div className='unit half'>
                          <Input inputName='END CUSTOMER'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit half'>
                          <Input inputName='WU DELIVERY'></Input>
                        </div>
                        <div className='unit half'>
                          <Input inputName='WU RELATED'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='PROJECT VALUE'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit half'>
                          <Select inputName='PROJECT START DATE' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }}></Select>
                        </div>
                        <div className='unit half'>
                          <Select inputName='PROJECT END DATE' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }}></Select>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <div className='divider' style={{margin:'15px 0', borderColor:'#cccccc'}}></div>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='PROJECT DESCRIPTION'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='SCOPE OF WORK' placeholder='Uraian terkait pekerjaan yang akan dideliver (hardware/software/services, dll)'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='CONSTRAINTS' placeholder='Sebutkan constraints (keterbatasan kondisi) yang ada di dalam project' ></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='ASSUMPTIONS' placeholder='Sebutkan asumsi-asumsi yang digunakan untuk menjalankan project'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='RISKS' placeholder='Sebutkan resiko-resiko yang mungkin terjadi di dalam project'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='DELIVERABLES' placeholder='Dokumen yang harus dideliver untuk penyelesaian project'></Input>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <div className='divider' style={{margin:'15px 0', borderColor:'#cccccc'}}></div>
                        </div>                      
                      </div> 
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <h2 className= "input-desc">MILESTONES</h2> <br/>
                        </div>
                        <div className="unit whole" style={{paddingLeft:'0', paddingTop:'0', marginTop:'-5%'}}>
                          <h2 className= "input-desc"><i>Tahapan penting dan tanggal penting dalam project</i></h2>
                        </div>  
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <Input inputName='DATE' style={{width:'40%', display:'inline-block'}} ></Input>
                          <Input inputName='MILESTONE' style={{width:'54%',display:'inline-block',marginLeft:'20px'}} ></Input>
                        </div>
                        <div className="unit half">
                          <Input inputName='DESCRIPTION' style={{width:'70%',display:'inline-block'}}></Input>                      
                      </div>
                      </div> 
                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <Input style={{width:'40%', display:'inline-block'}} ></Input>
                          <Input style={{width:'54%',display:'inline-block',marginLeft:'20px'}} ></Input>
                        </div>
                        <div className="unit half">
                          <Input style={{width:'70%',display:'inline-block'}}></Input>
                          <button className='btn-primary' style={{padding:'11px 14px',float:'right'}} ><span className="fa fa-trash fa-2x" style={{color:'white'}}></span></button>
                      </div>
                      </div>  
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <button className='btn-primary' style={{padding:'16px 25px',marginTop:'5px'}}>ADD MILESTONES</button>
                        </div>
                      </div> 
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <div className='divider' style={{margin:'15px 0', borderColor:'#cccccc'}}></div>
                        </div>                      
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <h2 className= "input-desc">ROLES AND RESPONSIBILITIES</h2> <br/>
                        </div>
                        <div className="unit whole" style={{paddingLeft:'0', paddingTop:'0', marginTop:'-5%'}}>
                          <h2 className= "input-desc"><i>Daftar role and responsibilities tim member </i></h2>
                        </div>  
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <Input inputName='NAME' style={{width:'40%', display:'inline-block'}} ></Input>
                          <Input inputName='ROLES' style={{width:'54%',display:'inline-block',marginLeft:'20px'}} ></Input>
                        </div>
                        <div className="unit half">
                          <Input inputName='RESPONSIBILITIES' style={{width:'70%',display:'inline-block'}}></Input>                      
                      </div>
                      </div> 
                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <Input style={{width:'40%', display:'inline-block'}} ></Input>
                          <Input style={{width:'54%',display:'inline-block',marginLeft:'20px'}} ></Input>
                        </div>
                        <div className="unit half">
                          <Input style={{width:'70%',display:'inline-block'}}></Input>
                          <button className='btn-primary' style={{padding:'11px 14px',float:'right'}} ><span className="fa fa-trash fa-2x" style={{color:'white'}}></span></button>
                      </div>
                      </div>  
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <button className='btn-primary' style={{padding:'16px 25px',marginTop:'5px'}}>ADD ROLES AND RESPONSIBILITIES</button>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName="PROJECT MANAGER'S RESPONSIBILITIES" placeholder='Uraian tanggung jawab PM'style={{width:'80%'}}></Input>
                        </div>
                      </div> 
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <div className='divider' style={{margin:'15px 0', borderColor:'#cccccc'}}></div>
                        </div>                      
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <h2 className='input-desc'>SUPPORTING DOCUMENT</h2>
                          <h2 className='input-desc'><i>You can attach one of these documents (Proposal, SPK/Contract, IWO, Change Management, Service Request, Others). If you want to add 2 or more, you can upload the compressed file (.zip). Max file size is 5 MB. allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png</i></h2>
                        </div>
                        <div className="unit whole no-gutters">
                          <InputFile placeholder="Select file from your computer"/>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className='unit whole' style={{textAlign:'center',marginTop:'50px'}}>
                          <button style={{ display:'inline-block', width:'200px'}} className='btn-secondary'> CLOSE </button>
                          <button style={{ display:'inline-block',width:'200px',marginLeft:'40px'}} className='btn-primary'> PRINT </button>
                        </div>
                      </div>



                    </div>

                  </PopUp>
                </div>


              </div>
              <div className='grid wrap'>
                <div className='unit whole'>
                    <button className='btn-primary'style={{float:'right', width:'18%'}}>SAVE</button>
                </div>
              </div>

            </form>
            </div>
      )
    }

}

function mapStateToProps(state) {
  return {
    state
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(NewProject)
// export default Login
