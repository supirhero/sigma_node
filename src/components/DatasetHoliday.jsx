import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search,PopUp,PageLoader,ReduxInput,datepickerUniversal,TablePagination, Pagination, ReduxInputDisabled} from './Components.jsx';
import {getDataMaster,addHoliday, updateHoliday,changePassword} from './actions.jsx'
import { routerMiddleware, push } from 'react-router-redux'
import {Field, reduxForm} from 'redux-form';

class DatasetHoliday extends Component {
  constructor(){
    super();
    this.state = {
      month : 8,
      year: 2017,
      search : ""
    };
  }


//   handleInitialize(data) {
//     const state = this.props.state.popup 
//     const initData = {
//       "HOLIDAY_START": state && state.editHoliday && state.editHoliday.data ? state.editHoliday.data.column[0].value : null,
//       "HOLIDAY_END":state && state.editHoliday && state.editHoliday.data ? state.editHoliday.data.column[1].value : null,
//       "HOLIDAY_ID":state && state.editHoliday && state.editHoliday.data ? state.editHoliday.data.column[2].value : null,
//     };
//     this.props.initialize(initData)

// }

onSubmitUpdateHoliday(props){
  alert("Holiday Updated")
  this.props.dispatch(updateHoliday(props)).then(res => {
    this.props.dispatch(getDataMaster("holiday",this.state.search))
    store.dispatch({
      type: 'POPUP',
      name: 'editHoliday',
      data: {
        active:false,
      }
    })
    
  })
}


  componentWillMount(){
    const state = store.getState()
    const holiday = state.data.holiday
    // const holiday = store.getState().data.holiday
    this.props.dispatch(getDataMaster("holiday",this.state.search))
  }

  onSubmit(props){
    alert("New Holiday Added")
    this.props.dispatch(addHoliday(props)).then(
      ()=> {
        this.props.dispatch(getDataMaster("holiday",this.state.search))
        store.dispatch({
          type: 'POPUP',
          name: 'createHoliday',
          data: {
            active:false,
          }
        })
      }
    )
  } 



  render() {
    const {handleSubmit} = this.props;
    const state = store.getState()
    const holiday = state.data.holiday
    // this.handleInitialize()
    

    if (!holiday){
      <PageLoader />
    }

    return (
      <div>

      <PopUp id="editHoliday" context={this} dividerText="EDIT HOLIDAY" btnClass='btn-primary' btnText="EDIT" style={{display:'inline-block', marginLeft:'35px'}}>
      <form onSubmit={handleSubmit(this.onSubmitUpdateHoliday.bind(this))}>
        <div>
          <div className="grid wrap narrow">
            <div className="unit whole">
                <Field
                inputName="HOLIDAY"
                name="HOLIDAY_EDIT"
                type='input'
                component={ReduxInputDisabled}
              />
            </div>
          </div>
          <div className="grid wrap narrow">
            <div className="unit whole">
              <Field
              inputName="START DATE"
              name="HOLIDAY_START_EDIT"
              type='input'
              component={datepickerUniversal}
            />

            </div>
          </div>
          <div className="grid wrap narrow">
            <div className="unit whole">
            <Field
            inputName="END DATE"
            name="HOLIDAY_END_EDIT"
            type='input'
            component={datepickerUniversal}
          />

            </div>
          </div>
            <div className="grid wrap narrow">
              <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary" onClick={
                  e=> {
                    store.dispatch({
                      type: 'POPUP',
                      name: 'editHoliday',
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

        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">

								<div className="unit one-quarter">
									<Header text='Holiday' style={{display:'inline-block'}} />
								</div>

                <div className="unit three-quarters">
                <button className='btn-primary hover'
                style={{display:'inline-block', marginRight: '20px',marginTop:'3px'}}
                onClick={
                e => {
                  console.log('PROPS', this.props);
                  this.props.dispatch({
                    type: 'POPUP',
                    name:'createHoliday',
                    data: {
                      active:true
                    }
                  })
                  e.preventDefault()
                }
              }>
                ADD NEW
              </button>
									<PopUp id="createHoliday" dividerText="CREATE HOLIDAY" btnClass='btn-primary' btnText="ADD NEW" style={{display:'inline-block', marginLeft:'35px'}}>
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
														<button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary" onClick={
                              e=> {
                                store.dispatch({
                                  type: 'POPUP',
                                  name: 'createHoliday',
                                  data: {
                                    active:false,
                                  }
                                })
                              }}> CANCEL </button>
														<button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
													</div>
												</div>
                    </div>
                    </form>
									</PopUp>
                  <Search placeholder='Search for Holiday' style={{width:'400px', display:'block', float:'right'}}
                  onChange={e=>{
                    this.setState({search:e.target.value},()=>{
                      store.dispatch(getDataMaster("holiday",this.state.search))
                    })
                    e.preventDefault()
                  }}
                  
                   >
            
                  </Search>
                  
								</div>
								<div className="unit whole">



                   <TablePagination
                   form='add_holiday'
                   editPopUp='editHoliday'
                   deletePopUp='deleteHoliday'
                   
                  tableHeader={[{value:'NAME'},{value:'START'},{value:'END'},{value:null}]}
                  tableData={
                   holiday ?  holiday.map((value,index)=>{
                    return {column:[
                      {value:value.HOLIDAY},
                      {value:value.HOLIDAY_START},
                      {value:value.HOLIDAY_END},
                      {value:value.HOLIDAY_ID},
                      
                    ]}
                  }) : [ ] }>
                  
                
                </TablePagination>
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
