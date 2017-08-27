import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header, Search, PopUp,TableNewMasterDataPopUp,PageLoader ,ReduxInput,ReduxSelectNew,required} from './Components.jsx';
import {getDataMaster,addBU} from './actions.jsx'
import {Field, reduxForm} from 'redux-form';



class DatasetBu extends Component {
  componentWillMount(){
    const bu = store.getState().data.bu
    store.dispatch(getDataMaster("bu"))
  }
  
  onSubmit(props){
    store.dispatch(addBU(props))
  }

  render() {
    const {handleSubmit} = this.props;
    const state = store.getState()
    const bu = state.data.bu

    if (!bu){
      <PageLoader />
    }
    return (
      <div>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="table-wrap">

                <div className="unit one-quarter">
                  <Header text="Business Unit" style={{ display: 'inline-block' }} />
                </div>

                <div className="unit three-quarters">
                  <PopUp id="createBusinessUnit" dividerText="CREATE BUSINESS UNIT" btnClass='btn-primary' btnText="ADD NEW" style={{ display: 'inline-block', marginLeft: '35px' }}>
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <Field
                          inputName="NAME"
                          name="BU_NAME"
                          type='input'
                          component={ReduxInput}
                        />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                            <Field
                            inputName="CODE"
                            name="BU_CODE"
                            type='input'
                            component={ReduxInput}
                          />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">

                        <Field
                        inputName="HEAD"
                        name="BU_HEAD"                      
                        component={ReduxSelectNew}
                        validate={[required]}>
                        {
                              bu?bu.map((value,index)=>{
                                return <option key={index} value={value.BU_HEAD}>{value.BU_HEAD_NAME}</option>
                              }
                            ):null
                        }


                        </Field>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                        <Field
                        inputName="PARENT"
                        name="BU_PARENT_ID"
                        component={ReduxSelectNew}
                        validate={[required]}>
                        {
                          bu?bu.map((value,index)=>{
                            return <option key={index} value={value.BU_PARENT_ID}>{value.BU_PARENT_ID}</option>
                          }
                        ):null
                        }
                        </Field>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                          <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
                        </div>
                      </div>
                    </div>
                    </form>
                  </PopUp>
                  <Search placeholder="search project type" style={{ float: 'right', width: '400px' }} />
                </div>
                <div className="unit whole">
                  <TableNewMasterDataPopUp
                  tableHeader={[{value:'LEVEL'},{value:'NAME'},{value:'HEAD'}]}
                  tableData={bu ? bu.map((value,index)=>{
                    return {column:[
                      {value:value.LEVEL},
                      {value:value.BU_NAME},
                      {value:value.BU_HEAD},
                    ]}
                  }):null}>
                </TableNewMasterDataPopUp>       
                
                </div>

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

export default connect(mapStateToProps, { addBU,getDataMaster })(
  reduxForm({
    form: 'add_holiday',
  })(DatasetBu))