import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search,PopUp,PopUpBaruBisa,PageLoader,ReduxInput,datepickerUniversal,TableNewMasterDataPopUp} from './Components.jsx';
import {getDataMaster,addHoliday,updateHoliday} from './actions.jsx'
import { routerMiddleware, push } from 'react-router-redux'
import {Field, reduxForm} from 'redux-form';

class DatasetHoliday extends Component {
  constructor(){
    super();
    this.state = {
      month : 8,
      year: 2017
    };
  }


  handleInitialize(data) {
    const initData = {
      "HOLIDAY_START":data.HOLIDAY_START,
      "HOLIDAY_END":data.HOLIDAY_END,
      "HOLIDAY_ID":data.HOLIDAY_ID,
    };

  this.props.initialize(initData);
}

  componentWillMount(){
    const state = store.getState()
    const holiday = state.data.holiday
    // const holiday = store.getState().data.holiday
    store.dispatch(getDataMaster("holiday"))
  }

  onSubmit(props){
    store.dispatch(addHoliday(props))
  }

  onSubmitUpdateHoliday(props){
    store.dispatch(updateHoliday(props))
  }

  

  render() {
    const {handleSubmit} = this.props;
    const state = store.getState()
    const holiday = state.data.holiday


    if (!holiday){
      <PageLoader />
    }
    
    return (
      <div> 
      <PopUpBaruBisa id="edit" dividerText="EDIT HOLIDAY" btnClass='btn-primary' style={{display:'inline-block', marginLeft:'35px'}}>
      <form onSubmit={handleSubmit(this.onSubmitUpdateHoliday.bind(this))}>
        <div>
          <div className="grid wrap narrow">
            <div className="unit whole">
                <Field
                inputName="HOLIDAY"
                name="HOLIDAY_ID"
                type='input'
                component={ReduxInput}
              />
            </div>
          </div>
          <div className="grid wrap narrow">
            <div className="unit whole">
              <Field
              inputName="START DATE"
              name="HOLIDAY_START"
              type='input'
              component={datepickerUniversal}
            />
            
            </div>
          </div>
          <div className="grid wrap narrow">
            <div className="unit whole">
            <Field
            inputName="END DATE"
            name="HOLIDAY_END"
            type='input'
            component={datepickerUniversal}
          />
              
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
      </PopUpBaruBisa>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">
								
								<div className="unit one-quarter">
									<Header text='Holiday' style={{display:'inline-block'}} />
								</div>

                <div className="unit three-quarters">
             
									<PopUp id="delete" dividerText="CREATE HOLIDAY" btnClass='btn-primary' btnText="ADD NEW" style={{display:'inline-block', marginLeft:'35px'}}>
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
											<div className="grid wrap narrow">
                        <div className="unit whole">
                            <Field
                            inputName="HOLIDAY"
                            name="HOLIDAY"
                            type='input'
                            component={ReduxInput}
                          />
												</div>
											</div>
											<div className="grid wrap narrow">
                        <div className="unit whole">
                          <Field
                          inputName="START DATE"
                          name="HOLIDAY_START"
                          type='input'
                          component={datepickerUniversal}
                        />
												
												</div>
											</div>
											<div className="grid wrap narrow">
                        <div className="unit whole">
                        <Field
                        inputName="END DATE"
                        name="HOLIDAY_END"
                        type='input'
                        component={datepickerUniversal}
                      />
													
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
									<Search placeholder='search holiday' style={{float:'right',width:'400px'}} />
								</div>

								<div className="unit whole">
									 <TableNewMasterDataPopUp
                  tableHeader={[{value:'NAME'},{value:'START'},{value:'END'}]}
                  tableData={holiday?holiday.map((value,index)=>{
                    return {column:[
                      {value:value.HOLIDAY},
                      {value:value.HOLIDAY_START},
                      {value:value.HOLIDAY_END},
                    ]}
                  }):null}>
                </TableNewMasterDataPopUp>															
								</div>

							 <div className="unit whole">
                  <div className="container" style={{float:'left'}}>
                    <small style={{display:'inline-block'}}>show entries</small>
                     <Select 
                          style={{width:'85px', height:'40px',marginLeft:'20px',display:'inline-block'}}
                          items={{
                            items : [
                              {title : '10'},
                              {title : '20'}
                            ]
                           }}
                        />
                  
                  </div>
                  <div className="container" style={{float:'right'}}>                  
                    <button className="arrow"> <b> &lt; </b> </button>
                    <button className="pagination"><b>1</b></button>
                    <button className="arrow"> <b> &gt; </b> </button>
                  </div>
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

export default connect(mapStateToProps, { addHoliday,getDataMaster })(
  reduxForm({
    form: 'add_holiday',
  })(DatasetHoliday));
