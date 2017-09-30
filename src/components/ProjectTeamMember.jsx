import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'

import {Divider, Header, ProjectHeader, Input, PageLoader,ReduxInput} from  './Components.jsx'
import { getProjectTeamMember, getAvailableProjectTeamMember ,assignProjectTeamMember,assignProjectTeamNonMember,pop, deleteProjectTeamMember, showNotif, getProjectDetail } from './actions.jsx'
import ReactAutocomplete from 'react-autocomplete'



class ProjectTeamMember extends Component {
  constructor (props) {
    super(props)
    this.state = {
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

    render(){
      const appStore = this.props.state;
      const active_member = this.props.state.data.exist
      const overview = appStore.data.overview ? appStore.data.overview : null
      const available_assign = store.getState().data.data ? store.getState().data.data.map((value,index)=>{
       return {id:value.USER_ID , label:value.USER_NAME}
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
            <ReactAutocomplete
            menuStyle={{
              opacity:'1'

            }}
            getItemValue={(label) => label.label}
            style={{width:'500px',marginTop:'60px'}}
            items={available_assign}
            wrapperProps={{
              style:{width:'100%', zIndex:'3', position:'relative'}
              }}
            menuStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              background: 'white',
              padding: '2px 0',
              fontSize: '90%',
              position: 'fixed',
              display:'block',
              cursor:'pointer',
              overflow: 'auto',
              maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
            }}
            shouldItemRender={(item, value) => item.label && item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.label}
            renderItem={(item, highlighted) =>
              <div className="small-wrap">
                <small className='small-hover' style={{padding:'6px 0 0 5px'}} key={item.id}>{item.label}</small>  

              </div>
            }
            value={this.state.value}
            onChange={e => {
              this.setState({ value: e.target.value })
           
          }}
            onSelect={(id,label) => {
              console.log('LABELLLL',id)
              this.setState({ id:label.id})
              this.setState({label:label.label})
              this.setState({ value: label.label})
              
              // alert(`selected ${this.state.label}`)
              console.log(id)
          }}
          />
          <Input inputName="Non Member" onChange={e => {
            this.setState({ external: e.target.value }, () => {
              console.log(this.state.external)
            });
            e.preventDefault();
          }}></Input>

       
            </div>
            <div className='unit one-fifth'>
              <button className='btn-primary' 

                onClick=
                {
                  e => {
                    this.props.dispatch(assignProjectTeamNonMember(this.props.location.query.id,this.state.external)).then(()=>{
                      this.props.dispatch(getAvailableProjectTeamMember(this.props.location.query.id)) 
                    })
                  }
                }
                style={{marginTop:"115px"}}
              >INVITE</button>

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
