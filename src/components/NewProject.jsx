import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Input, RadioButton, Select} from './Components.jsx'






class NewProject extends Component {

    render(){
      return(
        <div>
          <form>
          <div className='grid wrap'>
            <div className='unit whole'>
              <Divider btnLeftText='BACK' btnLeftClick={ e => {
                browserHistory.goBack()
                e.preventDefault()

              }} text='CREATE NEW PROJECT'></Divider>
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
                  <Divider text='STATUS'></Divider>
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
                      <RadioButton id='test2' label='Project' group='project-type'/>
                    </div>
                    <div className='unit half'>
                      <RadioButton id='test2' label='Non-Project' group='project-type'/>
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
