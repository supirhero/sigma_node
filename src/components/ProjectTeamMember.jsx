import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import Select from 'react-select';

import {Divider, Header, ProjectHeader, Input, PageLoader,ReduxInput,Menu,MenuItem} from  './Components.jsx'
import { getProjectTeamMember, getAvailableProjectTeamMember ,assignProjectTeamMember,assignProjectTeamNonMember,pop, deleteProjectTeamMember, showNotif, getProjectDetail } from './actions.jsx'



class ProjectTeamMember extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectArr : [],
      names:[],
      value:[],
      label: '',
      id:'',
      external:''
    }
  }

  componentWillMount() {
    const id = this.props.location.query.id
    // store.dispatch(getProjectTeamMember(id))
    this.props.dispatch(getProjectDetail(id))

    store.dispatch(getAvailableProjectTeamMember(id))
  }

  handleSelectChange (value) {
    const ArrayMantap = value.map((value,index)=>{
      return value.value
    })
    console.log(ArrayMantap,"INI LOOH")
    this.setState({ value:ArrayMantap })
      // console.log('You\'ve selected:', this.state.value);
      // console.log('You\'ve selected:', this.state.value.map((value,index)=>{
      //   return [value.value]
      // })
	}

    render(){
      const appStore = this.props.state;
      const active_member = this.props.state.data.exist
      const overview = appStore.data.overview ? appStore.data.overview : null
      const available_assign = store.getState().data.data ? store.getState().data.data.map((value,index)=>{
       return {value:value.USER_ID , label:value.USER_NAME}
      }) : []
      return(
        !this.props.state.data.overview ? <PageLoader/> :

        <div className='project-overview'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName={overview.project_name} sectionName='TEAM MEMBER'/>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit four-fifths'>
            <h2 className='input-name'>Available Member</h2>
            <Select
            closeOnSelect={false}
            disabled={false}
            multi
            // joinValues={true}
            // onChange={e=>{
            //   // console.log(e)
            //   this.setState({value:e},()=>{
            //     console.log(this.state.value)
            //   })
            // }}
            onChange={this.handleSelectChange.bind(this)}
            options={available_assign}
            placeholder="Select Member"
            // simpleValue = {true}
            value={this.state.value}
            className="yooo"
            style={{height:'50px',borderRadius:0,border:'1px solid #eee'}}
          />
          <Input inputName="Non Member" onChange={e => {
            this.setState({ external: e.target.value }, () => {
              console.log(this.state.external)
            });
            e.preventDefault();

          }}
          placeholder = "Input Non-Member Email"

          ></Input>


            </div>
            <div className='unit one-fifth'>
              <button className='btn-primary'
              style={{marginTop:'60px',padding:'7px 42px'}}

                onClick=
                {
                  e => {
                    this.props.dispatch(assignProjectTeamMember(this.props.location.query.id,this.state.value))
                    .then(()=>{
                      this.setState({value:''},()=>{
                        console.log(this.state.value)
                      })
                    })
                    .then(()=>{
                      this.props.dispatch(getAvailableProjectTeamMember(this.props.location.query.id))
                      reset()
                    })

                  }
                }

                // onSubmit={
                //   e=>{
                //     this.setState({value:''},()=>{
                //       console.log(this.state.value,"MANA LO")
                //     })
                //     e.preventDefault()
                //   }
                // }

              >INVITE MEMBER</button>

              <button className='btn-primary'
              style={{marginTop:'52px',padding:'4px 42px'}}

                              onClick=
                              {
                                e => {
                                  this.props.dispatch(assignProjectTeamNonMember(this.props.location.query.id,this.state.external)).then(()=>{
                                    this.props.dispatch(getAvailableProjectTeamMember(this.props.location.query.id))
                                  })
                                }
                              }

                            >INVITE NON-MEMBER</button>

            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <Divider text='ACTIVE MEMBERS'/>
            </div>
          </div>

          <div className='grid padding-left'>
            <div className='unit whole'>
              {
                active_member ?
                active_member.map((value, index) => (
                  <div className='card' style={{padding:'15px'}} key={index}>
                    <div className='grid'>
                      <div className='unit three-fifths no-gutters'>
                        <div className='pic-wrapper' style={{height:'35px', width:'35px', display:'inline-block'}}></div>
                        <div style={{display:'inline-block', marginLeft:'17px'}}>
                          <medium style={{fontSize:'15px'}}>{value.USER_NAME}</medium>
                          <small style={{fontSize:'15px'}}>{value.EMAIL}</small>
                        </div>
                      </div>
                      <div className='unit one-fifth no-gutters'>
                        <small style={{textAlign:'center', color:'#717171', marginTop:'7px'}}>{value.USER_TYPE_ID}</small>
                      </div>
                      <div className='unit one-fifth no-gutters'>
                        <medium style={{textAlign:'right', marginTop:'9px'}}>ONLINE &nbsp;&nbsp;&nbsp;&nbsp;<span className='icon-trash' style={{color:'#D62431'}} onClick={
                          e=> {

                            this.props.dispatch({
                                type: 'CONFIRM',
                                message: 'Would you like to remove member?',
                                show:true,
                                onConfirm: ()=> {
                                      this.props.dispatch(deleteProjectTeamMember(value.RP_ID)).then(()=> {
                                        {/* showNotif('Successfully removed member from project', 'GREEN') */}
                                        const id = this.props.state.data.project_id
                                        this.props.dispatch(getProjectTeamMember(id))
                                        this.props.dispatch({
                                          type: 'CONFIRM',
                                          message: 'Would you like to remove member?',
                                          show:false,
                                        })

                                        this.props.dispatch(getAvailableProjectTeamMember(id))
                                      })
                                }
                              })


                            e.preventDefault()
                          }
                        }></span></medium>
                      </div>
                    </div>
                  </div>

                )):

                <PageLoader></PageLoader>
              }

            </div>
          </div>


        </div>

      )
    }

}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(ProjectTeamMember)
