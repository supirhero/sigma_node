import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import { Line} from 'react-progressbar.js'
import {Divider, Input, RadioButton, Select, PopUp} from './Components.jsx'


class NewProject extends Component {

    render(){
      return(
        <div>
          <form>
          <div className='grid wrap'>
            <div className='unit whole'>
              <Divider btnLeftText='BACK' style={{marginTop:'0'}} btnLeftClick={ e => {
                browserHistory.goBack()
                e.preventDefault()

              }} text='CREATE NEW PROJECT'></Divider>
              <div className='grid wrap'>
                <div className='unit one-quarter'>
                  <medium style={{textAlign:'center', marginTop:'20px'}}>IWO</medium>
                </div>
                <div className='unit one-quarter'>
                  <medium style={{textAlign:'center', marginTop:'20px'}}>PRODUCT</medium>
                </div>
                <div className='unit one-quarter'>
                  <medium style={{textAlign:'center', marginTop:'20px'}}>STATUS</medium>
                </div>
                <div className='unit one-quarter'>
                  <medium style={{textAlign:'center', marginTop:'20px'}}>FINANCE</medium>
                </div>
              </div>
              <Divider text='IWO'></Divider>
            </div>
          </div>
              <div className= 'grid wrap'>
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
              <div className='grid wrap'>
                <div className='unit one-third'>
                  <Input inputName='CUSTOMER' style={{width:'88%'}}/>
                </div>
                <div className='unit two-thirds'>
                  <Input inputName='END CUSTOMER' style={{width:'100%'}}/>
                </div>
              </div>
              <div className='grid wrap'>
                <div className='unit two-thirds'>
                  <Input inputName='END CUSTOMER' style={{width:'94%'}}/>
                </div>
                <div className='unit one-third'>
                  <Input inputName='CUSTOMER' style={{width:'100%'}}/>
                </div>

              </div>
              <div className='grid wrap'>
                <div className='unit whole'>

                  <Divider text='PRODUCT'></Divider>
                </div>
              </div>
              <div className='grid wrap'>
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
              <div className='grid wrap'>
                <div className='unit whole'>
                  <Divider text='STATUS'></Divider>
                </div>
              </div>
              <div className='grid wrap'>
                <div className='unit whole'>
                  <Select inputName='ACCOUNT MANAGER' style={{width:'100%'}} items={{
                    items : [
                      {title : 'TBWS21312'},
                      {title : 'TBWS21312'}
                    ]
                  }}/>
                </div>
              </div>
              <div className='grid wrap'>
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
              <div className='grid wrap'>
                <div className='unit whole'>
                  <h1 className='input-desc'>VISIBILITY</h1>
                </div>
              </div>
              <div className='grid wrap'>
                <div className='unit whole'>
                  <RadioButton id='business-member' label='Owning Busniness Member' group='visibility'/>
                </div>
              </div>
              <div className='grid wrap'>
                <div className='unit whole'>
                  <RadioButton id='project-member' label='Project Members Only' group='visibility'/>
                </div>
              </div>

              <div className='grid wrap'>
                <div className='unit whole'>
                  <Divider text='FINANCE'></Divider>
                </div>
              </div>
              <div className='grid wrap'>
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
              <div className='grid wrap'>
                <div className='unit whole'>
                  <Divider text='PROJECT CHARTER FORM'></Divider>
                </div>
              </div>
              <div className='grid wrap'>
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
                  <PopUp id='complete' dividerText='PROJECT CHARTER FORM' btnText='COMPLETE FORM'>
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
                          <Select inputName='WU DELIVERY' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }}></Select>
                        </div>
                        <div className='unit half'>
                          <Select inputName='WU RELATED' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }}></Select>
                        </div>
                      </div>


                    </div>

                  </PopUp>
                </div>


              </div>
              <div className='grid wrap'>
                <div className='unit whole'>
                  <div className='btn-wrapper'>
                    <button className='btn-secondary'>CANCEL</button>
                    <button className='btn-primary'style={{float:'right'}}>CREATE PROJECT</button>

                  </div>

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
