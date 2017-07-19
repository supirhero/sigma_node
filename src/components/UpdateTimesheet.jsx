import React, {Component} from 'react';
import { connect } from 'react-redux';
import {axios} from 'axios';
import {Divider} from './Components.jsx';

class UpdateTimesheet extends Component {
    render(){
        return(
           <div className="updateTimeSheet">
            <div className="grid wrap wider">
                <div className="unit whole">
                    <Divider text='UPDATE TIMESHEET' back_text = 'X' />
                </div>
            </div>

            <div className='grid wrap wider updateSheet'>
                <div className='unit whole'>
                    <h2 className="input-desc">DATE</h2>
                        <input></input>
                    <h2 className="input-desc">PROJECT</h2>
                        <select value="">
                            <option value="project 1">project 1</option>
                            <option value="project 2">project 2</option>
                        </select>
                   
                    <h2 className="input-desc">TASK</h2>
                        <select value="">
                            <option value="project 1">project 1</option>
                            <option value="project 2">project 2</option>
                        </select>
                        
                    <h2 className="input-desc">WORK HOURS</h2>
                        <input></input>

                    <h2 className="input-desc">SUBJECT</h2>
                        <input></input>

                    <h2 className="input-desc">MESSAGE</h2>
                        <input></input>
                </div>
            </div>

            <div className='grid wrap wider buttons'>
              <div className='unit whole' style={{textAlign:'center'}}>
                <button style={{ display:'inline-block'}} className='btn-secondary'> CANCEL </button>
                <button style={{ display:'inline-block'}} className='btn-primary'> ADD NEW</button>
                
              </div>
            </div>

           </div> 
        );
    }
}

export default UpdateTimesheet;
