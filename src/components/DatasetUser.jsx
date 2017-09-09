import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TablePaginationUser,Header,Search ,PageLoader,PopUp,ReduxInputDisabled,ReduxInput,ReduxUploadWorkplan,ReduxUploadUser,Loader} from './Components.jsx';
import {getDataMasterUser,getDataMaster,changePassword,uploadUsers} from './actions.jsx'
import {Field, reduxForm} from 'redux-form';

class DatasetUser extends Component {
  constructor() {
    super()
    this.state= {
      search : ""
    }
  }

  componentWillMount(){
    const user = store.getState().data.user
    // store.dispatch(getDataMaster())
    store.dispatch(getDataMaster("user",this.state.search))
    
  }

  onSubmitUpdateUser(props){
    alert("User Password Changed")
    this.props.dispatch(changePassword(props)).then(res => {
      this.props.dispatch(getDataMaster("user",this.state.search))
      store.dispatch({
        type: 'POPUP',
        name: 'editUser',
        data: {
          active:false,
        }
      })
      
    })
  }

  onSubmitUploadUser(props){
    this.props.dispatch(uploadUsers(props.userfile)).then(res => {
      
      this.props.dispatch(getDataMaster("user",this.state.search))
      store.dispatch({
        type: 'POPUP',
        name: 'uploadUser',
        data: {
          active:false,
        }
      })
      
    })
  }





  render() {
    const {handleSubmit} = this.props;
    const state = store.getState()
    const user = state.data.user


    if (!user){
      <PageLoader />
    }
    return (
      <div>

      <PopUp id="editUser" context={this} dividerText="CHANGE USER PASSWORD" btnClass='btn-primary' btnText="EDIT" style={{display:'inline-block', marginLeft:'35px'}}>
      <form onSubmit={handleSubmit(this.onSubmitUpdateUser.bind(this))}>
        <div>     
          <div className="grid wrap narrow">
            <div className="unit whole">
            <Field
            inputName="User ID"
            name="USER_ID"
            type='input'
            component={ReduxInputDisabled}
          />
            </div>
          </div>
          <div className="grid wrap narrow">
          <div className="unit whole">
          <Field
          inputName="New Password"
          name="PASSWORD"
          type='input'
          component={ReduxInput}
        />
          </div>
        </div>
            <div className="grid wrap narrow">
              <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary" onClick={
                  e=> {
                    store.dispatch({
                      type: 'POPUP',
                      name: 'editUser',
                      data: {
                        active:false,
                      }
                    })
                  e.prevenDefault()
                  }
                  }> CANCEL </button>
                <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary">EDIT</button>
              </div>
            </div>
        </div>
        </form>
      </PopUp>

      <PopUp id="uploadUser" context={this} dividerText="UPLOAD USER" btnClass='btn-primary' btnText="EDIT" style={{display:'inline-block', marginLeft:'35px'}}>
      <Loader id='uploadUser' style ={{height:'280px'}}>
      <form onSubmit={handleSubmit(this.onSubmitUploadUser.bind(this))}>
        <div>    
        <div className="grid wrap narrow">
        <div className="unit golden-large" style={{padding:'0'}}>
        <h2 className="input-desc" style={{marginTop:'25px',marginLeft:'10px'}}>Select File</h2>
      </div> 
            <div className="unit whole">
            <Field
            inputName="UPLOAD FILE"
            name="userfile"
            type='input'
            placeholder="Press to Select File"
            component={ReduxUploadUser}
          />
            </div>
          </div>
            <div className="grid wrap narrow">
              <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary" onClick={
                  e=> {
                    store.dispatch({
                      type: 'POPUP',
                      name: 'uploadUser',
                      data: {
                        active:false,
                      }
                    })
                  e.prevenDefault()
                  }
                  }> CANCEL </button>
                <button type = "submit" style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary">UPLOAD</button>
              </div>
            </div>
        </div>
        </form>
        </Loader>
      </PopUp>

        <div className="grid wrap dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="unit whole">
              <Header text='User' style={{display:'inline-block'}} />
              <button className='btn-primary hover'
              style={{display:'inline-block', marginLeft: '22%',marginTop:'3px'}}
              onClick={
              e => {
                console.log('PROPS', this.props);
                this.props.dispatch({
                  type: 'POPUP',
                  name:'uploadUser',
                  data: {
                    active:true
                  }
                })
                e.preventDefault()
              }
            }>
              UPLOAD
            </button>
                
                <Search placeholder='Search for User' style={{width:'400px', display:'block', float:'right'}}
                onChange={e=>{
                  this.setState({search:e.target.value},()=>{
                    store.dispatch(getDataMaster("user",this.state.search))
                  })
                  e.preventDefault()
                }}
                
                 >
          
                </Search>
              </div>
              <div className="unit whole">
              <TablePaginationUser 
              form='uploadUser' 
              editPopUp='editUser' 
              deletePopUp='deleteUser' 
               
             tableHeader={[{value:'ID'},{value:'NAME'},{value:'EMAIL'},{value:'USER TYPE'},{value:'LAST LOGIN'},{value:null}]} 
             tableData={ 
              user ?  user.map((value,index)=>{ 
                return {column:[ 
                  {value:value.USER_ID}, 
                  {value:value.USER_NAME}, 
                  {value:value.EMAIL}, 
                  {value:value.USER_TYPE_ID}, 
                  {value:value.LAST_LOGIN && `${(value.LAST_LOGIN).substr(0,10)} | ${(value.LAST_LOGIN).substr(11,5)} ${(value.LAST_LOGIN).substr(26,2)}`} 
                ]} 
             }) : [ ] }> 
              
            
           </TablePaginationUser>                      
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
    state
		// filter: ownProps.location.query.filter
  };
}

export default connect(mapStateToProps, { getDataMaster })(
  reduxForm({
    form: 'editUser',
    form: 'uploadUser'
  })(DatasetUser));
