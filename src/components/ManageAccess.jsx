import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication , getUserAccess,editUserAccess} from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew ,Header, Search, PopUp,ReduxSelect,ReduxInput,ReduxInputDisabled,RadioButton ,TablePaginationAccess} from './Components.jsx';
import { Field, reduxForm } from 'redux-form';


class ManageAcess extends Component {



  componentWillMount(){
    store.dispatch(getUserAccess())
  }


  onSubmitEdit(props){
    alert("Access Updated")
    this.props.dispatch(editUserAccess(props)).then(
      ()=> {
        
        store.dispatch({
          type: 'POPUP',
          name: 'editAccess',
          data: {
            active:false,
          }
        })
        store.dispatch(getUserAccess())
      }
    )
  }

  render() {
    const { handleSubmit } = this.props;
    const user_list = store.getState().data.user_list;
    
    return (
      <div>
      <PopUp id="editAccess" dividerText="EDIT ACCESS" btnText="EDIT" btnClass='btn-primary' style={{ display: 'inline-block', marginLeft: '35px' }}>
      <form onSubmit={handleSubmit(this.onSubmitEdit.bind(this))}>
        <div>
          <div className="grid wrap narrow">
            <div className="unit whole">
                <Field
                inputName="USER ID"
                name="user_id"
                component={ReduxInputDisabled}
                // validate={[required]}
              />
            </div>
          </div>
          <div className="grid wrap narrow">
            <div className="unit whole">
            <Field
            inputName="ACCESS"
            name="prof_id"
            component={ReduxSelect}
            // validate={[required]}
          >
          {
            user_list ? user_list.map((value,index)=>{
              return <option key={index} value={value.PROF_ID}>{value.PROF_NAME}</option>
            }
          ) : null
      }
          </Field>
            </div>
          </div>

          <div className="grid wrap narrow">
            <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
              <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary" onClick={e=> {
                this.props.dispatch({
                    type: 'POPUP',
                    name:'editAccess',
                    data: {
                      active:false
                    }
                  })
                e.preventDefault()
                }}> CANCEL </button>
              <button type='submit' style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> EDIT </button>
            </div>
          </div>
        </div>
        </form>
      </PopUp>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">							
                <div className="unit whole">
									<Header text='User Access' style={{display:'inline-block'}} />
									<Search placeholder='search customer' style={{float:'right',width:'400px'}} />
                </div>
                <div className="unit whole">
                <TablePaginationAccess
                form='dataset_bu'
                editPopUp='editAccess'
                tableHeader={[{value:'NIK'},{value:'NAME'},{value:'EMAIL'},{value:'ROLE'}]}
                tableData={ store.getState().data.user_list ? store.getState().data.user_list.map((value,index)=>{
                  return {column:[
                    {value:value.USER_ID},
                    {value:value.USER_NAME},
                    {value:value.EMAIL},
                    {value:value.PROF_NAME},
                    {value:value.PROF_ID}
                    
                  ]}
                }):null}>
              </TablePaginationAccess>   
                
                </div>
                 <div className="unit whole">
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

    formValues: state.form.editAccess,
    state,
    // filter: ownProps.location.query.filter
  };
}

export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'editAccess',
})(
  connect(mapStateToProps, { deleteAuthentication , getUserAccess,editUserAccess} )(ManageAcess),
);
