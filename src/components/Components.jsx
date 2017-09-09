import React, {Component} from 'react'
import {Circle, Line} from 'react-progressbar.js'
import FileInput from 'react-file-input';
import {BarChart as ChartBar,LineChart as ChartLine, Line as LineGraph, Cell, XAxis, YAxis, CartesianGrid,Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts'
import {Table as MaterialTable, TableBody, TableHeader, TableHeaderColumn,TableRow,TableRowColumn,MuiThemeProvider} from 'material-ui'
import store from '../reducers/combineReducers.jsx'
import {RadioButtonGroup} from 'material-ui/RadioButton'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import DatePicker from 'react-datepicker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import DayPicker from 'react-day-picker';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest';
import {initialize, change} from 'redux-form';
import ReactAutocomplete from 'react-autocomplete'


import {checkIWOUsed, deleteHoliday, getDataMaster,changeRoute,editProfileView,gethistorydetail,getUserAccess} from './actions.jsx'

const cookies = new Cookies();
const baseURL = "http://45.77.45.126"
// const token = store.getState().auth ? store.getState().auth.token : null
const token = cookies.get('token')
const token_string = `?token=${token}`
import PasswordMask from 'react-password-mask';



const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
export const required = value => (value ? undefined : 'Required')
export const isInt = value => (Number.isInteger(value) ? undefined : 'Wring input type')

// export const required = value => (console.log("REQUIRED",value))

// export const isIWOUsed = (value /*, dispatch */) => {
//   return sleep(1000).then(() => {
//     // simulate server latency
//     // if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
//     //   throw { username: 'That username is taken' }
//     // }
//     console.log('VALUE IWO',value);
//     throw { IWO_NO: 'That username is taken' };
//   })
// }
// export const isIWOUsed = (value) =>{
//
//     console.log('VALUEE',value);
//     // return new Promise ((resolve, reject) => {
//     return axios({
//       method: 'POST',
//       url: `${baseURL}/dev/project/checkiwoused`+token_string,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       data: {
//         IWO_NO: value.IWO_NO
//       }
//
//     }).then(
//       (res)=> {
//         // resolve('BLa')
//         console.log(res);
//         console.log('JUMLAH',res.data.jumlah);
//         if (value.IWO_AVAILABLE != 'false' ) {
//           alert('asyc')
//           if (res.data.jumlah <= '0' || res.data.jumlah <=0) {
//             // return 'IWO already used'
//             throw undefined;
//
//
//           }
//           else {
//             throw { IWO_NO: 'IWO is already used' };
//
//             // return null
//           }
//         }
//         else {
//           alert('bla')
//           throw undefined;
//
//         }
//       }
//     )
//   }

  // })


// export const required = value => value ? undefined : 'Required'
export const maxHours = value => Number(value.HOURS) > 24 ? 'Cant be max than 24' : null
export const validate = () => {
  const required = value => value ? undefined : 'Required'
}

export const muiTheme = getMuiTheme({
  fontFamily: 'lato, sans-serif',
  fontSize: '17px',
  radioButton: {
    size: '24px',

    checkedColor:  "#F48165",
    borderColor: "#F48165",
    labelColor: '#777777'
  },

});

export class Menu extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false

    };
  }
  render(){
    return(
      <div style={this.props.style}>
      {
        this.props.triggerInput=='true' ?
        <input 
        placeholder = {this.props.placeholder}
        style={this.props.inputStyle}
        value={this.props.defaultValue}
        onkeydown="return false;"

        onClick={
          () => {
            console.log('working');
            if (this.state.clicked) {
              this.setState({clicked:false})
            }
            else {
              this.setState({clicked:true})
            }
          }
        }
        ></input>
        :
        <div className={this.props.triggerClass} style={this.props.triggerStyle} 

        onClick={
          () => {
            if (this.state.clicked) {
              this.setState({clicked:false})
            }
            else {
              this.setState({clicked:true})
            }
          }
        }>{this.props.icon}
        </div>}


        <div
        
        onMouseLeave = {
          () => {
            this.setState({
              clicked : false
            })
          }
        } style={this.props.menuStyle} className={this.state.clicked ? 'menu active' : 'menu'}>
        {this.props.children}

        </div>
        </div>
        )
  }

}

export class MenuSection extends Component {
  render() {
    return(
      <div className='menu-section'>
      {this.props.children}
      </div>
      )
  }
}

export class MenuItem extends Component {
  render() {
    return(
      <div className='menu-item' style={this.props.style} onClick={this.props.onClick}>
      {this.props.children}
      {
        this.props.title &&
        <small className='menu-title' style={this.props.textStyle}>{this.props.title}</small>
      }
      </div>
      )
  }
}

export class MenuNotifItem extends Component {
  render() {
    return(
      <div className='menu-notif-item' onClick={this.props.onClick}>
      <small className='menu-title'>{this.props.children}</small>
      </div>
      )
  }
}


export class MenuHeader extends Component {
  render() {
    return (
      <div className='menu-header' style={this.props.style}>
      <large className='title'>{this.props.title}</large>
      {
        this.props.subTitle != null ?
        <small>{this.props.subTitle}</small>:
        null
      }
      </div>
      )
  }
}

export class Divider extends Component {
  render() {
    return (
      <div className='divider-wrapper' style={this.props.style}>
      {
        this.props.btnLeftText && <button className='btn-secondary' onClick={this.props.btnLeftClick}>{this.props.btnLeftText}</button>
      }
      <h2>
      {
        this.props.text &&
        <span>{this.props.text}</span>
      }
      </h2>
      {
        this.props.btnRightText && <button className='btn-secondary btn-right' style={this.props.btnRightStyle} onClick={this.props.btnRightClick}>{this.props.btnRightText}</button>
      }

      </div>
      )
  }
}



export class Input extends Component {
  render() {
    return (
      <div style={this.props.style}>
      {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
      {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
      <input style={this.props.inputStyle} placeholder={this.props.placeholder}></input>
      {this.props.children}
      </div>

      )
  }
}

export class RenderRadioGroup extends Component {
  // static childContextTypes: {
  //   muiTheme: React.PropTypes.object
  // }
  // constructor() {
  //   super();

  //   this.constructor.childContextTypes = {
  //     muiTheme: React.PropTypes.object
  //   };
  // }
  // // getChildContext() {
  // //   return {
  // //     muiTheme: this.state.muiTheme
  // //   };
  // // }
  // getChildContext() {
  //              return { muiTheme: getMuiTheme(baseTheme) };
  //          }
  render(){
    return(
      <div style={this.props.style}>
      <RadioButtonGroup
      {...this.props.input}
      valueSelected={this.props.input.value}
      onChange={(event, value) => this.props.input.onChange(value)}
      >
      {this.props.children}
      </RadioButtonGroup>
      {this.props.meta.touched && ((this.props.meta.error && <span className='error-alert'>{this.props.meta.error}</span>) )}


      </div>
      )
  }}


  export class ReduxInput extends Component {
    componentDidUpdate() {

      console.log('PROPS', this.props);
    }
    render(){
      if(this.props.meta.error == 'IWO is already used'){
        console.log("ERRORRR",this.props.meta.error );
        this.props.meta.error = undefined
      }
      return(
        <div style={this.props.style}>
        {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
        {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
        <input
        className={this.props.meta.touched && ((this.props.meta.error && 'error'))}
        style={{width:'100%'}}
        placeholder={this.props.placeholder}
        type='text'
        {...this.props.input}

        // {...this.props.field}
        >
        </input>
        {this.props.meta.touched && ((this.props.meta.error && <span className='error-alert'>{this.props.meta.error}</span>) )}
        </div>
        )
    }

  }

  export class ReduxAutoComplete extends Component {
    constructor() {
      super()
      this.state= {
        value: '',
        USER_NAME: null,
        RP_ID: null
      }
    }
 
    render(){
    
      return(
        <div>
          {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
          
        <ReactAutocomplete
        menuStyle={{
          opacity:'1'
        }}
        getItemValue={(label) => label.label}
        style={{width:'100%'}}
        items={this.props.data}
        wrapperProps={{style: {width:'100%'}}}
        menuStyle={{
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 5)',
          padding: '2px 0',
          fontSize: '90%',
          top:'10',
          zIndex: '1',
          overflow: 'auto',
          maxHeight: '300px',
          cursor:'pointer',
          display:'block'
        }}
        shouldItemRender={(item, value) => item.IWO_NO.toLowerCase().indexOf(value.toLowerCase()) > -1}
        // shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.IWO_NO}
        renderItem={(item, highlighted) =>
          <small style={{padding:'8px'}} key={item.IWO_NO}>{item.IWO_NO}</small>  
        }
        {...this.props.select}
        {...this.props.custom}
        {...this.props.input}
        value={this.state.value}
        onChange={e => {
          this.setState({value: e.target.value}, ()=> {
            this.props.input.onChange(this.state.value)

          })
          
      }}
        onSelect={(IWO_NO, value) => {
          this.props.input.onChange(IWO_NO)
          this.setState({value: IWO_NO})

          var fields = [
                        {
                          field: 'AMOUNT',
                          // value: arr.AMOUNT
                          value: value.AMOUNT == null ? 0 : value.AMOUNT
                        },
                        {
                          field: 'PROJECT_NAME',
                          // value: value.PROJECT_NAME
                          value: value.PROJECT_NAME == null ? 'none' : value.PROJECT_NAME
                        },
                        {
                          field: 'RELATED',
                          // value: value.RELATED_BU
                          value: value.RELATED_BU == null ? 'none' : value.RELATED_BU
                        },
                        {
                          field: 'CUST_ID',
                          // value: value.CUSTOMER_ID
                          value: value.CUSTOMER_ID == null ? 'none' : value.CUSTOMER_ID
                        }
                        ,
                        {
                          field: 'MARGIN',
                          // value: value.MARGIN == null ? 'none' : value.MARGIN
                          value: value.MARGIN == null ? 0 : value.MARGIN
                        },
                        {
                          field: 'END_CUST_ID',
                          // value: value.END_CUSTOMER
                          value: value.END_CUSTOMER == null ? 'none' : value.END_CUSTOMER
                        },
                        {
                          field: 'AM_ID',
                          // value: value.END_CUSTOMER
                          value: value.AM_ID == null ? 'none' : value.AM_ID
                        }
                      ]
                      fields.map((value, index) => {
                        store.dispatch(change(this.props.forms, 
                          value.field, value.value
                        ))
                      })


                        this.setState({data:IWO_NO},()=>{
                          console.log(this.state.data)
                        })
                    }}
                  />
                  {this.props.meta.touched && ((this.props.meta.error && <span className='error-alert'>{this.props.meta.error}</span>))}
                  
                  </div>

        )
    }

  }


    export class ReduxInputAsync extends Component {
      constructor(){
        super();
        this.state = {
          error : null

        };
      }

      componentDidUpdate() {

        console.log('PROPS', this.props);
      }

      render(){
        return(
          <div style={this.props.style}>
          {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
          {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
          <input
          // className={this.props.meta.touched && ((this.props.meta.error && 'error'))}
          className= {
           this.state.error != null &&
           this.props.input.value == '' || this.state.error == 'IWO already used'? 'error' : ''

         }
         style={{width:'100%'}}
         // onFocus = {e=> {
            //   this.setState({error : null})
            // }}
            placeholder={this.props.placeholder}
            type='text'
            {...this.props.input}


            // onBlur={
            //   (e)=> {
            //   // alert(e.target.value)
            //   console.log()
            //   // if (e.target.value == '') {
            //   //   this.setState({error : 'Required'})
            //   // }
            //   // else if (e.target.value != '') {
            //   //   this.setState({error : null})
            //   //
            //   // }
            //   // else {
            //     isIWOUsed(e.target.value).then(
            //       res => this.setState({error : res})
            //
            //     )
            //   // }
            // }}

            // {...this.props.field}
            >
            </input>
            {this.props.meta.touched && ((this.props.meta.error && <span className='error-alert'>{this.props.meta.error}</span>))}

          {/* {
            this.props.input.value == '' && this.state.error !=null? <span className='error-alert'>Required</span> :
            this.state.error!=null && this.props.input.value != '' &&
              <span className='error-alert'>{this.state.error}</span>
            } */}

            </div>
            )
      }
    }


    export class ReduxInputMask extends Component {
      render(){
        return(
          <div style={this.props.style}>
          {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
          {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
          <PasswordMask
          className={this.props.meta.touched && ((this.props.meta.error && 'error'))}
          style={{width:'100%'}}
          placeholder={this.props.placeholder}
          type='text'
          buttonStyles = {{display:'none'}}
          {...this.props.input}

          // {...this.props.field}
          >
          </PasswordMask>
          {this.props.meta.touched && ((this.props.meta.error && <span className='error-alert'>{this.props.meta.error}</span>) )}
          </div>
          )
      }
    }



    export class ReduxInputDisabled extends Component {
      render(){
        return(
          <div style={this.props.style}>
          {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
          {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
          <input
          style={{width:'100%'}}
          placeholder={this.props.placeholder}
          type='text'
          value={this.props.value}
          {...this.props.input}

          disabled
          >
          </input>
          </div>
          )
      }
    }

// export class RenderRadioGroup extends Component {
//   render() {
//     return (
//       <p className='radio-button' style={this.props.style}>
//        <input type="radio" id={this.props.id} name={this.props.name} value={this.props.value} {...this.props.input} onChange={(event, value) => this.props.input.onChange(value)} />
//        <label htmlFor={this.props.id}>{this.props.label}</label>
//      </p>
//     )
//   }
// }

export class RadioButton extends Component {
  render() {
    return (
      <p className='radio-button' style={this.props.style}>
      <input type="radio" id={this.props.id} name={this.props.name} value={this.props.value} {...this.props.input} onChange={(event, value) => this.props.input.onChange(value)} />
      <label htmlFor={this.props.id}>{this.props.label}</label>
      </p>
      )
  }
}

export class Checkbox extends Component{
  render(){
    return (
      <p className='checkbox-button' style={this.props.style} >
        <input type='checkbox' id={this.props.id} name={this.props.group} onClick={this.props.onClick} checked={this.props.checked}/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </p>
      )
  }
}

export class Select extends Component {
  render() {
    return (
      <div style={this.props.style}>
      {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
      {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
      <select onChange={this.props.onChange} className='select' style={{height: '49px'}}>
      {this.props.children}
      </select>

      </div>
      )
  }
}


export class ReduxSelect extends Component {
  constructor(){
    super();
    this.state = {
      error : null

    };
  }
  componentDidUpdate() {

    console.log('PROPS', this.props);
  }
  render() {
    // if(this.props.input.value == undefined){
    //   console.log("ERRORRR",this.props.meta.error );
    //   this.props.meta.error = undefined
    // }

    console.log('SELECT PROPS',this.props);
    return (
      <div style={this.props.style}>

      {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
      {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
      <select
      style={this.props.selectStyle}
      // className='select'
      className={'select ' + (this.props.meta.touched && this.props.meta.error && 'error')}

      {...this.props.select}
      {...this.props.custom}
      {...this.props.input}

      // onChange={(event,index,value)=>this.props.input.onChange(event.target.value)}
      placeholder={this.props.placeholder}
      // onBlur = {e=> {
          //
          // }}
          >
          {this.props.children}
          </select>
          {this.props.meta.touched && ((this.props.meta.error && <span className='error-alert'>{this.props.meta.error}</span>) )}
        {/* {this.state.error && this.props.input.value ==  ''   && <span className='error-alert'>Required</span>} */}
        </div>
        )
  }
}



export class TimeSheetTimeButton extends Component {
  render(){
    return(
      <button className ='btn-secondary' style={{float:'left', width:'122px', height:'125px'}} onClick={this.props.onClick}
      
      >
      {this.props.text}
      <small style={{marginTop:'10px'}}>{this.props.hours}</small>
      </button>
      )
  }
}

export class Meter extends Component {
  render(){
    return(
      <div className='circle-container'>
      <div className='meter-container'>
      <small>{this.props.text}</small>

      <Circle
      progress={this.props.progress > 100 ? 100 : this.props.progress}
      // initialAnimate={true}
      // text= {this.props.text}
      options={{
        strokeWidth: 12,
        color: '#F48165',
        trailWidth: 12,
        fontSize: 30,
        easing: 'easeInOut',
        duration: 700,
      }}
      containerClassName={'circle-bar'}
      >
      </Circle>
      </div>
      <div className='circle-desc'>
      <medium>{this.props.title}</medium>
      <small className='status'>{this.props.status}</small>
      </div>
      </div>
      )
  }
}

export class BarChart extends Component {
  render() {
    return(
      <div style={this.props.style} className='bar-chart-container'>
        <large style={this.props.labelStyle}>{this.props.label}</large>
        <ResponsiveContainer width='100%' height={250}>
          <ChartBar width={680} height={250} data={this.props.data}>
            <XAxis dataKey="name" interval={0} tickCount={12} padding={{right:10}} />
            {/* <YAxis /> */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            <Text scaleToFit={true} />

            <Bar dataKey="value" fill={this.props.fill ? this.props.fill : "#F48165"} />
          </ChartBar>
        </ResponsiveContainer>

  </div>
  )
  }
}

export class BarChartSPI extends Component {
  render() {
    const COLORS = ['#42C878', '#CF000F'];
    return(
      <div className='bar-chart-container'>
      <large style={this.props.labelStyle}>{this.props.label}</large>
      <ResponsiveContainer width='100%' height={250}>
      <ChartBar width={600} height={250} data={this.props.data}>
      <XAxis dataKey="name"/>
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8">
      {
        this.props.data &&
        this.props.data.map((entry, index) => {
          const color = entry.value > 0.83 ? COLORS[0] : COLORS[1];
          return <Cell key={index} fill={color} />;
        })
      }
      </Bar>
      </ChartBar>
      </ResponsiveContainer>

      </div>
      )
  }
}



export class BarChartCPI extends Component {

  render() {
    const customLabel = "yee";
    const COLORS = ['#42C878', '#CF000F'];
    return(
      <div className='bar-chart-container'>
      <large style={this.props.labelStyle}>{this.props.label}</large>
      <ResponsiveContainer width='100%' height={250}>
      <ChartBar width={600} height={250} data={this.props.data}>
      <XAxis dataKey="name" name="value" />
      <Tooltip />
      <Bar dataKey="value" key="value" fill="#8884d8" label={customLabel}>
      {
        this.props.data &&
        this.props.data.map((entry, index) => {
          const color = entry.value > 0.77 ? COLORS[0] : COLORS[1];
          return <Cell key={index} fill={color} />;
        })
      }
      </Bar>
      </ChartBar>
      </ResponsiveContainer>

      </div>
      )
  }
}


export class LineChart extends Component{
  render(){
    return(
      <div className="bar-chart-container">
      <large style={{margin:'30px 50px'}}>{this.props.label}</large>
      <ResponsiveContainer width='100%' height={250}>
      <ChartLine width={680} height={250} data={this.props.data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip />
      <Legend iconType="circle" iconSize={8}/>
      {this.props.lines.map((props)=>
        <LineGraph type="monotone" dataKey={props.key} stroke={props.stroke} />)}
      </ChartLine>
      </ResponsiveContainer>
      </div>
      )
  }
}

const custom =(props) => {
  const { payload, x, y, index } = props;
  console.log('PAYLOADDDDD',payload)
  return(
    <text y={y}   style= {{
      fontFamily: 'lato,sans-serif',
      fontWeight: '300',
      fontSize:'13px',
      marginLeft:'10px'

    }}>{payload.value}%</text>
    )
}

export class SCurve extends Component{
  render(){
    return(
      <div className="bar-chart-container">
      <large style={{margin:'30px 50px'}}>{this.props.label}</large>
      <ResponsiveContainer width='100%' height={270}>
      <ChartLine width={680} height={270} data={this.props.data}>
      <XAxis dataKey="name" />
      <YAxis tick={custom}  padding='0 0 0 10px' label={<AxisLabel axisType='yAxis'>%</AxisLabel>} />
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip />
      <Legend iconType="circle" iconSize={8}/>
      {this.props.lines.map((props)=>
        <LineGraph type="monotone" dataKey={props.key} stroke={props.stroke} />)}
      </ChartLine>
      </ResponsiveContainer>
      </div>
      )
  }
}

const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
  const isVert = axisType === 'yAxis';
  const cx = isVert ? x : x + (width / 2);
  const cy = isVert ? (height / 2) + y : y + height + 10;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
    {children}
    </text>
    );
};




export class Search extends Component {
  render() {
    return(
      <div className='search' style={this.props.style}>
      <div className='card'>
      <input placeholder={this.props.placeholder} onChange={this.props.onChange}></input>
      <i className='icon-magnifier'></i>
      </div>
      </div>
      )
  }
}

export class Confirmation extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false

    };
  }

  render() {
    console.log('POPUP PROPS',this.props);
    const popup = store.getState().data.popup
    return(

      store.getState().alert.confirmation && store.getState().alert.confirmation.show ?
      <div style={this.props.style}>
      <div 
      className={' popup-container'} style={{zIndex:'30', display:'block'}}
      >
      <div className='grid wrap' style={{position:'relative'}}>
      <div className='unit whole' style={{position:'absolute'}}>
      <div className='card shadow' style={{margin:'6% auto', width:'70%', marginLeft:'9%'}}>
      <small>{store.getState().alert.confirmation && store.getState().alert.confirmation.message }</small>
      <div style={{margin:'auto', width:'430px', marginTop:'50px'}}>
      <button className='btn-secondary' style={{width:'45%', float:'left'}} onClick={
        e=> {
          store.dispatch({
            type: 'CONFIRM',
            message: '',
            show:false,
            
          })
          e.preventDefault()
        }
      }>CANCEL</button>
      <button className='btn-primary' style={{width:'45%', float:'right'}} onClick={(e)=> store.getState().alert.confirmation.onConfirm(e)}>APPROVE</button>
      </div>
      

      </div>
      </div>
      </div>
      <div className='tint'></div>}

      </div>
      </div> : null

      )
  }

}


export class PopUp extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false

    };
  }

  render() {
    // const dom = store.getState().dom
    console.log('POPUP PROPS',this.props);
    const popup = store.getState().data.popup
    return(

      <div style={this.props.style}>
      {
        popup &&
        popup[this.props.id] &&
        popup[this.props.id].active == true &&
        <div className={popup && popup[this.props.id] && popup[this.props.id].active ? this.props.id + ' popup-container active' : this.props.id +  ' popup-container'} style={{zIndex:'2'}}>
        <div className='grid wrap' style={{position:'relative'}}>
        <div className='unit whole'>
        <div className='card shadow' style={{marginTop:'6%'}}>
        <Divider text={this.props.dividerText} btnRightStyle={{padding : '15px 16px'}} btnRightText={<i className='material-icons' style={{color:'#333333'}}>close</i>} btnRightClick={
          e => {
            document.body.style.overflow = 'scroll';
                        document.body.scrollTop = 0; // For Chrome, Safari and Opera
                        document.documentElement.scrollTop = 0; // For IE and Firefox
                        store.dispatch({
                          type: 'POPUP',
                          name:this.props.id,
                          data: {
                            active:false
                          }
                        })

                        e.preventDefault()
                      }
                    }></Divider>



                    {this.props.children}

                    </div>
                    </div>
                    </div>
                    <div className='tint'></div>}

                    </div>
                  }
                  </div>

                  )
  }

}


export class PopUpTimesheet extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false

    };
  }

  render() {
    // const dom = store.getState().dom
    // console.log('dom : ',dom);
    return(
      <div style={this.props.style}>

      <div className={this.state.clicked ? 'popup-container active' : 'popup-container'}>
      <div className='grid wrap' style={{position:'relative'}}>
      <div className='unit whole'>
      <div className='card shadow' style={{marginTop:'6%'}}>
      <Divider text={this.props.dividerText} btnRightStyle={{padding : '15px 16px'}} btnRightText={<i className='material-icons' style={{color:'#333333'}}>close</i>} btnRightClick={
        e => {
          document.body.style.overflow = 'scroll';
                        document.body.scrollTop = 0; // For Chrome, Safari and Opera
                        document.documentElement.scrollTop = 0; // For IE and Firefox
                        this.setState({
                          clicked:false
                        })
                        e.preventDefault()
                      }
                    }></Divider>
                    {this.props.children}

                    <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center', display:'inline-block' }}>
                    <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"
                    onClick={
                      e => {
                        document.body.style.overflow = 'scroll';
                        document.body.scrollTop = 0; // For Chrome, Safari and Opera
                      document.documentElement.scrollTop = 0; // For IE and Firefox
                        // if (window.addEventListener) // older FF
                        //     window.addEventListener('DOMMouseScroll', preventDefault, false);
                        //     window.onwheel = preventDefault; // modern standard
                        //     window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
                        //     window.ontouchmove  = preventDefault; // mobile
                        //     document.onkeydown  = preventDefaultForScrollKeys;

                        this.setState({
                          clicked:false
                        })
                        e.preventDefault()
                      }}
                      >CANCEL</button>

                      <button type="submit" style={{ display: 'inline-block', width: '200px', marginLeft: '40px'}} className="btn-primary"
                      onClick={
                        e => {
                          document.body.style.overflow = 'scroll';
                        document.body.scrollTop = 0; // For Chrome, Safari and Opera
                      document.documentElement.scrollTop = 0; // For IE and Firefox
                        // if (window.addEventListener) // older FF
                        //     window.addEventListener('DOMMouseScroll', preventDefault, false);
                        //     window.onwheel = preventDefault; // modern standard
                        //     window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
                        //     window.ontouchmove  = preventDefault; // mobile
                        //     document.onkeydown  = preventDefaultForScrollKeys;

                        this.setState({
                          clicked:false
                        })
                        e.preventDefault()
                      }}
                      >ADD NEW</button>


                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      <div className='tint'></div>
                      </div>

                      <button style={this.props.btnStyle} className={this.props.btnClass}
                      onClick={
                        e => {
                          document.body.style.overflow = 'hidden';
              document.body.scrollTop = 0; // For Chrome, Safari and Opera
            document.documentElement.scrollTop = 0; // For IE and Firefox
              // if (window.addEventListener) // older FF
              //     window.addEventListener('DOMMouseScroll', preventDefault, false);
              //     window.onwheel = preventDefault; // modern standard
              //     window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
              //     window.ontouchmove  = preventDefault; // mobile
              //     document.onkeydown  = preventDefaultForScrollKeys;

              this.setState({
                clicked:true
              })
              e.preventDefault()
            }}
            >{this.props.btnText}</button>
            </div>

            )
}
}

export class PopUpTimesheet2 extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false

    };
  }

  render() {
    // const dom = store.getState().dom
    // console.log('dom : ',dom);
    return(
      <div style={this.props.style}>

      <div className={this.state.clicked ? 'popup-container active' : 'popup-container'} style={{zIndex:'2'}}>
      <div className='grid wrap' style={{position:'relative'}}>
      <div className='unit whole'>
      <div className='card shadow' style={{marginTop:'6%'}}>
      <Divider text={this.props.dividerText} btnRightStyle={{padding : '15px 16px'}} btnRightText={<i className='material-icons' style={{color:'#333333'}}>close</i>} btnRightClick={
        e => {
          document.body.style.overflow = 'scroll';
                        document.body.scrollTop = 0; // For Chrome, Safari and Opera
                        document.documentElement.scrollTop = 0; // For IE and Firefox
                        this.setState({
                          clicked:false
                        })
                        e.preventDefault()
                      }
                    }></Divider>
                    <div className="wrap narrow">
                    {this.props.children}
                    <div className="unit whole" style={{ textAlign: 'center' , display:'inline-block' }}>
                    <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"
                    onClick={
                      e => {
                        document.body.style.overflow = 'scroll';
                        document.body.scrollTop = 0; // For Chrome, Safari and Opera
                      document.documentElement.scrollTop = 0; // For IE and Firefox
                        // if (window.addEventListener) // older FF
                        //     window.addEventListener('DOMMouseScroll', preventDefault, false);
                        //     window.onwheel = preventDefault; // modern standard
                        //     window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
                        //     window.ontouchmove  = preventDefault; // mobile
                        //     document.onkeydown  = preventDefaultForScrollKeys;

                        this.setState({
                          clicked:false
                        })
                        e.preventDefault()
                      }}
                      >CANCEL</button>
                      </div>
                      </div>

                      </div>
                      </div>
                      </div>
                      <div className='tint'></div>
                      </div>

                      <button style={this.props.btnStyle} className={this.props.btnClass}
                      onClick={
                        e => {
                          document.body.style.overflow = 'hidden';
              document.body.scrollTop = 0; // For Chrome, Safari and Opera
            document.documentElement.scrollTop = 0; // For IE and Firefox
              // if (window.addEventListener) // older FF
              //     window.addEventListener('DOMMouseScroll', preventDefault, false);
              //     window.onwheel = preventDefault; // modern standard
              //     window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
              //     window.ontouchmove  = preventDefault; // mobile
              //     document.onkeydown  = preventDefaultForScrollKeys;

              this.setState({
                clicked:true
              })
              e.preventDefault()
            }}
            >{this.props.btnText}</button>
            </div>

            )
  }
}

export class Table extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider>
      <MaterialTable >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      {this.props.tableHeader.map((header, index) => (
        <TableRowColumn>
        <TableHeaderColumn>{header.value}</TableHeaderColumn>
        </TableRowColumn>
        ))}
      </TableHeader>

      <TableBody displayRowCheckbox={false} >
      {this.props.tableData.map((row, index) => (
        <TableRow key={index}>
        {


          row.column.map((column,index)=>(
            <TableRowColumn>{column.value}</TableRowColumn>
            ))
        }

        </TableRow>
        ))
    }
    </TableBody>

    </MaterialTable>
    </MuiThemeProvider>
    </div>
    );
  }
}

export class TableNew extends Component{
  render(){
    return(
      <table className='table' style={{width:'100%'}}>
      <thead>
      <tr>
      {
        this.props.tableHeader.map((value,index)=>(
          <th key={index}>{value.value}</th>
          ))
      }
      </tr>
      </thead>

      <tbody>
      {
        this.props.tableData &&
        this.props.tableData.map((row,index)=>(
          <tr className='items' key={index}>
          {
            row.column.map((column,index)=>(
              <td key={index}>{column.value}</td>

              ))
          }
          </tr>
          ))
      }

      </tbody>
      </table>
      )
  }
}

export class TablePaginationMIS extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 1,
      ceiling: 10,
      floor: 0,
    };
  }
  // getInitialState() {
  //   return { 
  //     page : 0,
  //     ceiling: 0,
  //     floor: 10,
  //     data : props.tableData.slice(0,10)

  //   };
  // }
  render() {
    var pages = [];
    const pagesAmount = this.props.tableData ? Math.ceil(this.props.tableData.length/10) : 0

    
    for (var i=1; i<=pagesAmount; i++) {
      pages.push(i);
    }

    return (
      <div>
      <div className="grid">
      <div className="unit whole">

      
      <table className="table" style={{ width: '100%' }}>
      <thead>
      <tr>
      {
        this.props.tableHeader.map((value, index) => (
          <th key={index}>{value.value}</th>
          ))
      }
      </tr>
      </thead>

      <tbody>
      {
        
        this.props.tableData &&
        this.props.tableData.slice((this.state.page *10)-10, this.state.page*10).map((row, index) => (
          <tr className="items" key={index}>
          {
            row.column.map((column, index) => (
              <td key={index}>{column.value}</td>
              ))
          }
          <td style={{ position: 'relative', float:'right' }}> 
          </td>
          </tr>
          ))
      }

      </tbody>
      </table>

      </div>
      </div>
      <div className="grid">
      <div className="unit whole">
      
      </div>
      <div className="container" style={{float:'right'}}>
      <button className="arrow" onClick={e=> {
        this.setState({page : this.state.page-1 == 0 ? this.state.page : this.state.page -1})
        
        e.preventDefault()
      }}> <b> &lt; </b> </button>
      {
        
        pages.slice(
          3 % this.state.page != 3 ? 0 :
          this.state.page % 3  == 0  ? 
          this.state.page % 2 != 0 ? this.state.page -2 :
          
          (this.state.page-3)
          : this.state.page-3  
          ,
          3 % this.state.page != 3 ? 5 :
          this.state.page % 3  == 0  ? 
          this.state.page % 2 != 0 ? this.state.page +1 :
          this.state.page+2
          : this.state.page+2  

          ).map((value, index)=> (
            <button 
            className={this.state.page == value ? "pagination" : 'arrow'}
            onClick={e=> {
              this.setState({page: value},()=>[
                console.log(this.state.page)
                ])
              
              var ceiling = value*10
              var floor = ceiling-10
              this.setState({
                ceiling : ceiling,
                floor : floor
              })
                          {/* const newData = this.props.tableData.slice(floor, ceiling)
                          this.setState({data : newData})  */}
                          e.preventDefault()
                        }}>
                        <b>{value}</b></button>
                        ))
        }
        <button className="arrow">. . .</button>
        <button className="arrow" onClick={e=> {
          this.setState({page : this.state.page+1 > pagesAmount ? this.state.page : this.state.page +1})
          
          e.preventDefault()
        }}> <b> &gt; </b> </button>
        </div>
        </div>
        </div>

        );
}
}


export class TablePagination extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 1,
      ceiling: 10,
      floor: 0,
    };
  }
  // getInitialState() {
  //   return { 
  //     page : 0,
  //     ceiling: 0,
  //     floor: 10,
  //     data : props.tableData.slice(0,10)

  //   };
  // }
  render() {
    var pages = [];
    const pagesAmount = this.props.tableData ? Math.ceil(this.props.tableData.length/10) : 0

    
    for (var i=1; i<=pagesAmount; i++) {
      pages.push(i);
    }

    return (
      <div>
      <div className="grid">
      <div className="unit whole">

      
      <table className="table" style={{ width: '100%' }}>
      <thead>
      <tr>
      {
        this.props.tableHeader.map((value, index) => (
          <th key={index}>{value.value}</th>
          ))
      }
      </tr>
      </thead>

      <tbody>
      {
        
        this.props.tableData &&
        this.props.tableData.slice((this.state.page *10)-10, this.state.page*10).map((row, index) => (
          <tr className="items" key={index}>
          {
            row.column.map((column, index) => (
              <td key={index}>{column.value}</td>
              ))
          }
          <td style={{ position: 'relative', float:'right' }}>
          <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',marginRight:'7px',width:'100px',height:'30px',borderRadius:'2px', padding: '0'}} onClick={e => {
            store.dispatch({
              type: 'POPUP',
              name: this.props.editPopUp,
              data: {
                active:true,
              }
            })
            store.dispatch(initialize(this.props.form,
            {
              HOLIDAY_ID_EDIT: row.column[3].value,
              HOLIDAY_START_EDIT: row.column[1].value,
              HOLIDAY_END_EDIT: row.column[2].value,
              HOLIDAY_EDIT: row.column[0].value,
            }
            ))
            e.preventDefault()
          }}> 
          EDIT
          </button>
          
          <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',width:'30px',height:'30px',borderRadius:'2px', padding: '0', margin:'0'}} onClick={e => {
            store.dispatch({
              type: 'CONFIRM',
              message: 'Delete Holday?',
              show:true,
              onConfirm: ()=> {
                store.dispatch(deleteHoliday(row.column[3].value,)).then(()=>{
                  store.dispatch({
                    type: 'CONFIRM',
                    message: '',
                    onConfirm: null
                  }).thenI(

                    store.dispatch(getDataMaster("holiday",""))
                  )

                })
              }
            })
            
            e.preventDefault()
          }}> 
          <span className="fa fa-trash fa-2x" style={{ color: 'white', fontSize: '17px'}} />
          </button>
          </td>
          </tr>
          ))
      }

      </tbody>
      </table>

      </div>
      </div>
      <div className="grid">
      <div className="unit whole">
      
      </div>
      <div className="container" style={{float:'right'}}>
      <button className="arrow" onClick={e=> {
        this.setState({page : this.state.page-1 == 0 ? this.state.page : this.state.page -1})
        
        e.preventDefault()
      }}> <b> &lt; </b> </button>
      {
        
        pages.slice(
          3 % this.state.page != 3 ? 0 :
          this.state.page % 3  == 0  ? 
          this.state.page % 2 != 0 ? this.state.page -2 :
          
          (this.state.page-3)
          : this.state.page-3  
          ,
          3 % this.state.page != 3 ? 5 :
          this.state.page % 3  == 0  ? 
          this.state.page % 2 != 0 ? this.state.page +1 :
          this.state.page+2
          : this.state.page+2  

          ).map((value, index)=> (
            <button 
            className={this.state.page == value ? "pagination" : 'arrow'}
            onClick={e=> {
              this.setState({page: value},()=>[
                console.log(this.state.page)
                ])
              
              var ceiling = value*10
              var floor = ceiling-10
              this.setState({
                ceiling : ceiling,
                floor : floor
              })
                          {/* const newData = this.props.tableData.slice(floor, ceiling)
                          this.setState({data : newData})  */}
                          e.preventDefault()
                        }}>
                        <b>{value}</b></button>
                        ))
        }
        <button className="arrow">. . .</button>
        <button className="arrow" onClick={e=> {
          this.setState({page : this.state.page+1 > pagesAmount ? this.state.page : this.state.page +1})
          
          e.preventDefault()
        }}> <b> &gt; </b> </button>
        </div>
        </div>
        </div>

        );
}
}

export class TablePaginationHistory extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 1,
      ceiling: 10,
      floor: 0,
    };
  }
    // getInitialState() {
    //   return { 
    //     page : 0,
    //     ceiling: 0,
    //     floor: 10,
    //     data : props.tableData.slice(0,10)
    
    //   };
    // }
    render() {
      var pages = [];
      const pagesAmount = this.props.tableData ? Math.ceil(this.props.tableData.length/10) : 0 
      
      for (var i=1; i<=pagesAmount; i++) {
        pages.push(i);
      }
      
      return (
        <div>
        <div className="grid">
        <div className="unit whole">
        
        
        <table className="table" style={{ width: '100%' }}>
        <thead>
        <tr>
        {
          this.props.tableHeader.map((value, index) => (
            <th key={index} >{value.value}</th>
            ))
        }
        </tr>
        </thead>
        
        <tbody>
        {
          
          this.props.tableData &&
          this.props.tableData.slice((this.state.page *10)-10, this.state.page*10).map((row, index) => (
            <tr className="items" key={index}>
            <td>{row.column[0].value}</td>
            <td> {row.column[1].value}</td>
            <td>{row.column[2].value}</td>
            <td> {row.column[3].value}</td>
            <td>{row.column[4].value}</td>
            
                        {/* {
                          row.column.map((column, index) => (
                        <td key={index}>{column.value}</td>
                          ))
                        } */}
                        <td style={{ position: 'relative', float:'right' }}>
                        <button className="btn-primary" title='Detail' style={{display: 'inline-block', verticalAlign:'middle',marginRight:'7px',width:'100px',height:'30px',borderRadius:'2px', padding: '0'}} onClick={e => {
                          store.dispatch(gethistorydetail(row.column[5].value))
                          console.log(row)
                          store.dispatch({
                            type: 'POPUP',
                            name: this.props.editPopUp,
                            data: {
                              active:true,
                            }
                          })
                          e.preventDefault()
                        }}> 
                        DETAIL
                        </button>
                        </td>
                        </tr>
                        ))
        }
        
        </tbody>
        </table>
        
        </div>
        </div>
        <div className="grid">
        <div className="unit whole">
        
        </div>
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
        <button className="arrow" onClick={e=> {
          this.setState({page : this.state.page-1 == 0 ? this.state.page : this.state.page -1})
          
          e.preventDefault()
        }}> <b> &lt; </b> </button>
        {
          
          pages.slice(
            3 % this.state.page != 3 ? 0 :
            this.state.page % 3  == 0  ? 
            this.state.page % 2 != 0 ? this.state.page -2 :
            
            (this.state.page-3)
            : this.state.page-3  
            ,
            3 % this.state.page != 3 ? 5 :
            this.state.page % 3  == 0  ? 
            this.state.page % 2 != 0 ? this.state.page +1 :
            this.state.page+2
            : this.state.page+2  
            
            ).map((value, index)=> (
              <button 
              className={this.state.page == value ? "pagination" : 'arrow'}
              onClick={e=> {
                this.setState({page: value},()=>[
                  console.log(this.state.page)
                  ])
                
                var ceiling = value*10
                var floor = ceiling-10
                this.setState({
                  ceiling : ceiling,
                  floor : floor
                })
                            {/* const newData = this.props.tableData.slice(floor, ceiling)
                            this.setState({data : newData})  */}
                            e.preventDefault()
                          }}>
                          <b>{value}</b></button>
                          ))
          }
          <button className="arrow">. . .</button>
          <button className="arrow" onClick={e=> {
            this.setState({page : this.state.page+1 > pagesAmount ? this.state.page : this.state.page +1})
            
            e.preventDefault()
          }}> <b> &gt; </b> </button>
          </div>
          </div>
          </div>
          
          );
}
}




    
 


export class TablePaginationBU extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 1,
      ceiling: 10,
      floor: 0,
    };
  }
    // getInitialState() {
    //   return { 
    //     page : 0,
    //     ceiling: 0,
    //     floor: 10,
    //     data : props.tableData.slice(0,10)
    
    //   };
    // }
    render() {
      var pages = [];
      const pagesAmount = this.props.tableData ? Math.ceil(this.props.tableData.length/10) : 0
      
      for (var i=1; i<=pagesAmount; i++) {
        pages.push(i);
      }
      
      return (
        <div>
        <div className="grid">
        <div className="unit whole">
        
        
        <table className="table" style={{ width: '100%' }}>
        <thead>
        <tr>
        {
          this.props.tableHeader.map((value, index) => (
            <th key={index}>{value.value}</th>
            ))
        }
        </tr>
        </thead>
        
        <tbody>
        {
          
          this.props.tableData &&
          this.props.tableData.slice((this.state.page *10)-10, this.state.page*10).map((row, index) => (
            <tr className="items" key={index}>
            <td>{row.column[0].value}</td>
            <td> {row.column[1].value}</td>
            <td>{row.column[2].value}</td>
            

                        {/* {
                          row.column.map((column, index) => (
                        <td key={index}>{column.value}</td>
                          ))
                        } */}
                        <td style={{ position: 'relative', float:'right' }}>
                        <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',marginRight:'7px',width:'70px',height:'30px',borderRadius:'2px', padding: '0'}} onClick={e => {
                          store.dispatch(getDataMaster("bu"))
                          store.dispatch(changeRoute({
                            type: 'PUSH',
                            page: {
                              name: 'business-unit',
                              business_unit: {
                                bu_code:row.column[5].value
                              }
                            }
                          }))
                          // store.dispatch(deleteHoliday(row.column[3].value,)).then(()=>{
                          //   store.dispatch(getDataMaster("holiday"))
                          // })
                          e.preventDefault()
                        }}> 
                        DETAIL
                        </button>

                        <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',marginRight:'7px',width:'100px',height:'30px',borderRadius:'2px', padding: '0'}} onClick={e => {
                          store.dispatch({
                            type: 'POPUP',
                            name: this.props.editPopUp,
                            data: {
                              active:true,
                            }
                          })
                          console.log("SAFDSADADASD", row)
                          store.dispatch(initialize(this.props.form,
                          {
                            BU_PARENT_ID_EDIT:row.column[4].value,
                            BU_NAME_EDIT:row.column[1].value,
                            BU_ALIAS_EDIT:row.column[3].value,
                            BU_HEAD_EDIT:row.column[2].value,
                            BU_CODE_EDIT:row.column[5].value,
                          }
                          ))
                          e.preventDefault()
                        }}> 
                        EDIT
                        </button>
                        
                        <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',width:'30px',height:'30px',borderRadius:'2px', padding: '0', margin:'0'}} onClick={e => {
                          
                          
                          
                          // store.dispatch(deleteHoliday(row.column[3].value,)).then(()=>{
                          //   store.dispatch(getDataMaster("holiday"))
                          // })
                          e.preventDefault()
                        }}> 
                        <span className="fa fa-trash fa-2x" style={{ color: 'white', fontSize: '17px'}} />
                        </button>
                        
                        </td>
                        </tr>
                        ))
        }
        
        </tbody>
        </table>
        
        </div>
        </div>
        <div className="grid">
        <div className="unit whole">
        
        </div>
        <div className="container" style={{float:'right'}}>
        <button className="arrow" onClick={e=> {
          this.setState({page : this.state.page-1 == 0 ? this.state.page : this.state.page -1})
          
          e.preventDefault()
        }}> <b> &lt; </b> </button>
        {
          
          pages.slice(
            3 % this.state.page != 3 ? 0 :
            this.state.page % 3  == 0  ? 
            this.state.page % 2 != 0 ? this.state.page -2 :
            
            (this.state.page-3)
            : this.state.page-3  
            ,
            3 % this.state.page != 3 ? 5 :
            this.state.page % 3  == 0  ? 
            this.state.page % 2 != 0 ? this.state.page +1 :
            this.state.page+2
            : this.state.page+2  
            
            ).map((value, index)=> (
              <button 
              className={this.state.page == value ? "pagination" : 'arrow'}
              onClick={e=> {
                this.setState({page: value},()=>[
                  console.log(this.state.page)
                  ])
                
                var ceiling = value*10
                var floor = ceiling-10
                this.setState({
                  ceiling : ceiling,
                  floor : floor
                })
                            {/* const newData = this.props.tableData.slice(floor, ceiling)
                            this.setState({data : newData})  */}
                            e.preventDefault()
                          }}>
                          <b>{value}</b></button>
                          ))
          }
          <button className="arrow">. . .</button>
          <button className="arrow" onClick={e=> {
            this.setState({page : this.state.page+1 > pagesAmount ? this.state.page : this.state.page +1})
            
            e.preventDefault()
          }}> <b> &gt; </b> </button>
          </div>
          </div>
          </div>
          
          );
}
}



export class TablePaginationProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 1,
      ceiling: 10,
      floor: 0,
    };
  }
      // getInitialState() {
      //   return { 
      //     page : 0,
      //     ceiling: 0,
      //     floor: 10,
      //     data : props.tableData.slice(0,10)
      
      //   };
      // }
      render() {
        var pages = [];
        const pagesAmount = this.props.tableData ? Math.ceil(this.props.tableData.length/10) : 0
        
        for (var i=1; i<=pagesAmount; i++) {
          pages.push(i);
        }
        
        return (
          <div>
          <div className="grid">
          <div className="unit whole">
          
          
          <table className="table" style={{ width: '100%' }}>
          <thead>
          <tr>
          {
            this.props.tableHeader.map((value, index) => (
              <th key={index}>{value.value}</th>
              ))
          }
          </tr>
          </thead>
          
          <tbody>
          {
            
            this.props.tableData &&
            this.props.tableData.slice((this.state.page *10)-10, this.state.page*10).map((row, index) => (
              <tr className="items" key={index}>
              <td>{row.column[0].value}</td>
              <td> {row.column[1].value}</td>
              <td>{row.column[2].value}</td>
              <td>{row.column[3].value}</td>
              
              
                          {/* {
                            row.column.map((column, index) => (
                          <td key={index}>{column.value}</td>
                            ))
                          } */}
                          <td style={{ position: 'relative', float:'right' }}>
                          
                          
                          
                          </td>
                          </tr>
                          ))
          }
          
          </tbody>
          </table>
          
          </div>
          </div>
          <div className="grid">
          <div className="unit whole">
          
          </div>
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
          <button className="arrow" onClick={e=> {
            this.setState({page : this.state.page-1 == 0 ? this.state.page : this.state.page -1})
            
            e.preventDefault()
          }}> <b> &lt; </b> </button>
          {
            
            pages.slice(
              3 % this.state.page != 3 ? 0 :
              this.state.page % 3  == 0  ? 
              this.state.page % 2 != 0 ? this.state.page -2 :
              
              (this.state.page-3)
              : this.state.page-3  
              ,
              3 % this.state.page != 3 ? 5 :
              this.state.page % 3  == 0  ? 
              this.state.page % 2 != 0 ? this.state.page +1 :
              this.state.page+2
              : this.state.page+2  
              
              ).map((value, index)=> (
                <button 
                className={this.state.page == value ? "pagination" : 'arrow'}
                onClick={e=> {
                  this.setState({page: value},()=>[
                    console.log(this.state.page)
                    ])
                  
                  var ceiling = value*10
                  var floor = ceiling-10
                  this.setState({
                    ceiling : ceiling,
                    floor : floor
                  })
                              {/* const newData = this.props.tableData.slice(floor, ceiling)
                              this.setState({data : newData})  */}
                              e.preventDefault()
                            }}>
                            <b>{value}</b></button>
                            ))
            }
            <button className="arrow">. . .</button>
            <button className="arrow" onClick={e=> {
              this.setState({page : this.state.page+1 > pagesAmount ? this.state.page : this.state.page +1})
              
              e.preventDefault()
            }}> <b> &gt; </b> </button>
            </div>
            </div>
            </div>
            
            );
}
}

export class TablePaginationUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 1,
      ceiling: 10,
      floor: 0,
    };
  }
  // getInitialState() {
  //   return { 
  //     page : 0,
  //     ceiling: 0,
  //     floor: 10,
  //     data : props.tableData.slice(0,10)

  //   };
  // }
  render() {
    var pages = [];
    const pagesAmount = this.props.tableData ? Math.ceil(this.props.tableData.length/10) : 0

    
    for (var i=1; i<=pagesAmount; i++) {
      pages.push(i);
    }

    return (
      <div>
      <div className="grid">
      <div className="unit whole">

      
      <table className="table" style={{ width: '100%' }}>
      <thead>
      <tr>
      {
        this.props.tableHeader.map((value, index) => (
          <th key={index}>{value.value}</th>
          ))
      }
      </tr>
      </thead>

      <tbody>
      {
        
        this.props.tableData &&
        this.props.tableData.slice((this.state.page *10)-10, this.state.page*10).map((row, index) => (
          <tr className="items" key={index}>
          {
            row.column.map((column, index) => (
              <td key={index}>{column.value}</td>
              ))
          }
          <td style={{ position: 'relative', float:'right' }}>
          <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',marginRight:'7px',width:'100px',height:'30px',borderRadius:'2px', padding: '0'}} onClick={e => {
            store.dispatch({
              type: 'POPUP',
              name: this.props.editPopUp,
              data: {
                active:true,
              }
            })
            store.dispatch(initialize(this.props.form,
            {
              USER_ID: row.column[0].value,
            }
            ))
            e.preventDefault()
          }}> 
          EDIT
          </button>
          
          <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',width:'30px',height:'30px',borderRadius:'2px', padding: '0', margin:'0'}} onClick={e => {
            store.dispatch({
              type: 'CONFIRM',
              message: 'Delete Holday?',
              show:true,
              onConfirm: ()=> {
                store.dispatch(deleteHoliday(row.column[3].value,)).then(()=>{
                  store.dispatch({
                    type: 'CONFIRM',
                    message: '',
                    onConfirm: null
                  })
                  store.dispatch(getDataMaster("holiday"))

                })
              }
            })
            
            e.preventDefault()
          }}> 
          <span className="fa fa-trash fa-2x" style={{ color: 'white', fontSize: '17px'}} />
          </button>
          </td>
          </tr>
          ))
      }

      </tbody>
      </table>

      </div>
      </div>
      <div className="grid">
      <div className="unit whole">
      
      </div>
      <div className="container" style={{float:'right'}}>
      <button className="arrow" onClick={e=> {
        this.setState({page : this.state.page-1 == 0 ? this.state.page : this.state.page -1})
        
        e.preventDefault()
      }}> <b> &lt; </b> </button>
      {
        
        pages.slice(
          3 % this.state.page != 3 ? 0 :
          this.state.page % 3  == 0  ? 
          this.state.page % 2 != 0 ? this.state.page -2 :
          
          (this.state.page-3)
          : this.state.page-3  
          ,
          3 % this.state.page != 3 ? 5 :
          this.state.page % 3  == 0  ? 
          this.state.page % 2 != 0 ? this.state.page +1 :
          this.state.page+2
          : this.state.page+2  

          ).map((value, index)=> (
            <button 
            className={this.state.page == value ? "pagination" : 'arrow'}
            onClick={e=> {
              this.setState({page: value},()=>[
                console.log(this.state.page)
                ])
              
              var ceiling = value*10
              var floor = ceiling-10
              this.setState({
                ceiling : ceiling,
                floor : floor
              })
                          {/* const newData = this.props.tableData.slice(floor, ceiling)
                          this.setState({data : newData})  */}
                          e.preventDefault()
                        }}>
                        <b>{value}</b></button>
                        ))
        }
        <button className="arrow">. . .</button>
        <button className="arrow" onClick={e=> {
          this.setState({page : this.state.page+1 > pagesAmount ? this.state.page : this.state.page +1})
          
          e.preventDefault()
        }}> <b> &gt; </b> </button>
        </div>
        </div>
        </div>

        );
}
}



export class TablePaginationRoles extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 1,
      ceiling: 10,
      floor: 0,
    };
  }
      // getInitialState() {
      //   return { 
      //     page : 0,
      //     ceiling: 0,
      //     floor: 10,
      //     data : props.tableData.slice(0,10)
      
      //   };
      // }
      render() {
        var pages = [];
        const pagesAmount = this.props.tableData ? Math.ceil(this.props.tableData.length/10) : 0 
        
        for (var i=1; i<=pagesAmount; i++) {
          pages.push(i);
        }
        
        return (
          <div>
          <div className="grid">
          <div className="unit whole">
          
          
          <table className="table" style={{ width: '100%' }}>
          <thead>
          <tr>
          {
            this.props.tableHeader.map((value, index) => (
              <th key={index}>{value.value}</th>
              ))
          }
          </tr>
          </thead>
          
          <tbody>
          {
            
            this.props.tableData &&
            this.props.tableData.slice((this.state.page *10)-10, this.state.page*10).map((row, index) => (
              <tr className="items" key={index}>
              <td>{row.column[0].value}</td>
              <td> {row.column[1].value}</td>
              <td>{row.column[2].value}</td>
              
              
                          {/* {
                            row.column.map((column, index) => (
                          <td key={index}>{column.value}</td>
                            ))
                          } */}
                          <td style={{ position: 'relative', float:'right' }}>
                          <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',marginRight:'7px',width:'100px',height:'30px',borderRadius:'2px', padding: '0'}} onClick={e => {
                            alert(row.column[0].value)
                            console.log(row,"TESTLIAT")
                            store.dispatch(editProfileView(row.column[0].value)).then(
                              res => {

                                console.log(row.column[1].value,"NAMAA")
                                store.dispatch(initialize('addNewRole',
                                  // {
                                  //   BISA LAMA
                                  //   profile_id:row.column[0].value,
                                  //   role_name:row.column[1].value,
                                  //   role_desc:row.column[2].value,
                                  //   role_1:res.data.profile_privilege[3].PRIVILEGE,
                                  //   role_2:res.data.profile_privilege[4].PRIVILEGE,
                                  //   role_3:res.data.profile_privilege[5].PRIVILEGE,
                                  //   role_4:res.data.profile_privilege[6].PRIVILEGE,
                                  //   role_5:res.data.profile_privilege[7].PRIVILEGE,
                                  //   role_6:res.data.profile_privilege[0].PRIVILEGE,
                                  //   role_7:res.data.profile_privilege[1].PRIVILEGE,
                                  //   role_8:res.data.profile_privilege[2].PRIVILEGE,
                                  //   role_9:res.data.profile_privilege[8].PRIVILEGE,
                                  //   role_10:res.data.profile_privilege[9].PRIVILEGE,
                                  //   role_11:res.data.profile_privilege[10].PRIVILEGE,
                                  //   role_12:res.data.profile_privilege[11].PRIVILEGE,
                                  //   role_13:res.data.profile_privilege[12].PRIVILEGE,
                                  //   role_14:res.data.profile_privilege[13].PRIVILEGE,
                                  //   role_15:res.data.profile_privilege[14].PRIVILEGE,
                                  // }
                                  {
                                    profile_id:row.column[0].value,
                                    role_name:row.column[1].value,
                                    role_desc:row.column[2].value,
                                    role_1:res.data.profile_privilege[0].PRIVILEGE,
                                    role_2:res.data.profile_privilege[1].PRIVILEGE,
                                    role_3:res.data.profile_privilege[2].PRIVILEGE,
                                    role_4:res.data.profile_privilege[3].PRIVILEGE,
                                    role_5:res.data.profile_privilege[4].PRIVILEGE,
                                    role_6:res.data.profile_privilege[5].PRIVILEGE,
                                    role_7:res.data.profile_privilege[6].PRIVILEGE,
                                    role_8:res.data.profile_privilege[7].PRIVILEGE,
                                    role_9:res.data.profile_privilege[8].PRIVILEGE,
                                    role_10:res.data.profile_privilege[9].PRIVILEGE,
                                    role_11:res.data.profile_privilege[10].PRIVILEGE,
                                    role_12:res.data.profile_privilege[11].PRIVILEGE,
                                    role_13:res.data.profile_privilege[12].PRIVILEGE,
                                    role_14:res.data.profile_privilege[13].PRIVILEGE,
                                    role_15:res.data.profile_privilege[14].PRIVILEGE,
                                  }
                                  ))
                              }
                              )
                            store.dispatch({
                              type: 'POPUP',
                              name: this.props.editPopUp,
                              data: {
                                active:true,
                              }
                            })
                            e.preventDefault()
                          }}> 
                          EDIT
                          </button>
                          
                          <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',width:'30px',height:'30px',borderRadius:'2px', padding: '0', margin:'0'}} onClick={e => {
                            // store.dispatch(deleteHoliday(row.column[3].value,)).then(()=>{
                            //   store.dispatch(getDataMaster("holiday"))
                            // })
                            e.preventDefault()
                          }}> 
                          <span className="fa fa-trash fa-2x" style={{ color: 'white', fontSize: '17px'}} />
                          </button>
                          </td>
                          </tr>
                          ))
}

</tbody>
</table>

</div>
</div>
<div className="grid">
<div className="unit whole">

</div>
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
<button className="arrow" onClick={e=> {
  this.setState({page : this.state.page-1 == 0 ? this.state.page : this.state.page -1})
  
  e.preventDefault()
}}> <b> &lt; </b> </button>
{
  
  pages.slice(
    3 % this.state.page != 3 ? 0 :
    this.state.page % 3  == 0  ? 
    this.state.page % 2 != 0 ? this.state.page -2 :
    
    (this.state.page-3)
    : this.state.page-3  
    ,
    3 % this.state.page != 3 ? 5 :
    this.state.page % 3  == 0  ? 
    this.state.page % 2 != 0 ? this.state.page +1 :
    this.state.page+2
    : this.state.page+2  
    
    ).map((value, index)=> (
      <button 
      className={this.state.page == value ? "pagination" : 'arrow'}
      onClick={e=> {
        this.setState({page: value},()=>[
          console.log(this.state.page)
          ])
        
        var ceiling = value*10
        var floor = ceiling-10
        this.setState({
          ceiling : ceiling,
          floor : floor
        })
                              {/* const newData = this.props.tableData.slice(floor, ceiling)
                              this.setState({data : newData})  */}
                              e.preventDefault()
                            }}>
                            <b>{value}</b></button>
                            ))
  }
  <button className="arrow">. . .</button>
  <button className="arrow" onClick={e=> {
    this.setState({page : this.state.page+1 > pagesAmount ? this.state.page : this.state.page +1})
    
    e.preventDefault()
  }}> <b> &gt; </b> </button>
  </div>
  </div>
  </div>
  
  );
}
}



export class TablePaginationAccess extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 1,
      ceiling: 10,
      floor: 0,
    };
  }
      // getInitialState() {
      //   return { 
      //     page : 0,
      //     ceiling: 0,
      //     floor: 10,
      //     data : props.tableData.slice(0,10)
      
      //   };
      // }
      render() {
        var pages = [];
        const pagesAmount = this.props.tableData ? Math.ceil(this.props.tableData.length/10) : 0 
        
        for (var i=1; i<=pagesAmount; i++) {
          pages.push(i);
        }
        
        return (
          <div>
          <div className="grid">
          <div className="unit whole">
          
          
          <table className="table" style={{ width: '100%' }}>
          <thead>
          <tr>
          {
            this.props.tableHeader.map((value, index) => (
              <th key={index}>{value.value}</th>
              ))
          }
          </tr>
          </thead>
          
          <tbody>
          {
            
            this.props.tableData &&
            this.props.tableData.slice((this.state.page *10)-10, this.state.page*10).map((row, index) => (
              <tr className="items" key={index}>
              <td>{row.column[0].value}</td>
              <td> {row.column[1].value}</td>
              <td>{row.column[2].value}</td>
              <td>{row.column[3].value}</td>
              
              
                          {/* {
                            row.column.map((column, index) => (
                          <td key={index}>{column.value}</td>
                            ))
                          } */}
                          <td style={{ position: 'relative', float:'right' }}>
                          <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',marginRight:'7px',width:'100px',height:'30px',borderRadius:'2px', padding: '0'}} onClick={e => {
                            alert(row.column[0].value)
                            console.log(row,"TESTLIAT")
                            store.dispatch(getUserAccess()).then(
                              res => {

                                store.dispatch(initialize('editAccess',
                                  {
                                    user_id:row.column[0].value,
                                    prof_id:row.column[3].value,
                                    
                                  }
                                  ))
                              }
                              )
                            store.dispatch({
                              type: 'POPUP',
                              name: this.props.editPopUp,
                              data: {
                                active:true,
                              }
                            })
                            e.preventDefault()
                          }}> 
                          EDIT
                          </button>
                          
                          <button className="btn-primary" title='Edit' style={{display: 'inline-block', verticalAlign:'middle',width:'30px',height:'30px',borderRadius:'2px', padding: '0', margin:'0'}} onClick={e => {
                            // store.dispatch(deleteHoliday(row.column[3].value,)).then(()=>{
                            //   store.dispatch(getDataMaster("holiday"))
                            // })
                            e.preventDefault()
                          }}> 
                          <span className="fa fa-trash fa-2x" style={{ color: 'white', fontSize: '17px'}} />
                          </button>
                          </td>
                          </tr>
                          ))
}

</tbody>
</table>

</div>
</div>
<div className="grid">
<div className="unit whole">

</div>
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
<button className="arrow" onClick={e=> {
  this.setState({page : this.state.page-1 == 0 ? this.state.page : this.state.page -1})
  
  e.preventDefault()
}}> <b> &lt; </b> </button>
{
  
  pages.slice(
    3 % this.state.page != 3 ? 0 :
    this.state.page % 3  == 0  ? 
    this.state.page % 2 != 0 ? this.state.page -2 :
    
    (this.state.page-3)
    : this.state.page-3  
    ,
    3 % this.state.page != 3 ? 5 :
    this.state.page % 3  == 0  ? 
    this.state.page % 2 != 0 ? this.state.page +1 :
    this.state.page+2
    : this.state.page+2  
    
    ).map((value, index)=> (
      <button 
      className={this.state.page == value ? "pagination" : 'arrow'}
      onClick={e=> {
        this.setState({page: value},()=>[
          console.log(this.state.page)
          ])
        
        var ceiling = value*10
        var floor = ceiling-10
        this.setState({
          ceiling : ceiling,
          floor : floor
        })
                              {/* const newData = this.props.tableData.slice(floor, ceiling)
                              this.setState({data : newData})  */}
                              e.preventDefault()
                            }}>
                            <b>{value}</b></button>
                            ))
  }
  <button className="arrow">. . .</button>
  <button className="arrow" onClick={e=> {
    this.setState({page : this.state.page+1 > pagesAmount ? this.state.page : this.state.page +1})
    
    e.preventDefault()
  }}> <b> &gt; </b> </button>
  </div>
  </div>
  </div>
  
  );
}
}






export class TableNewMasterData extends Component{
  render(){
    return(
      <table className='table' style={{width:'100%'}}>
      <thead>
      <tr>
      {
        this.props.tableHeader.map((value,index)=>(
          <th key={index}>{value.value}</th>
          ))
      }
      </tr>
      </thead>

      <tbody>
      {
        this.props.tableData &&
        this.props.tableData.map((row,index)=>(
          <tr className='items' key={index}>
          {
            row.column.map((column,index)=>(
              <td key={index}>{column.value}</td>
              ))
          }
          <td style={{position:'relative'}}>
          <Menu menuStyle={{top:'41', right:'10', width:'200px'}} style={{display:'inline'}} triggerClass='material-icons' icon='more_horiz'>
          <MenuSection>
          <MenuItem title='Edit' onClick={e => {
            store.dispatch({
              type: 'POPUP',
              name:'edit',
              data: {
                active:true
              }
            })
            e.preventDefault()
          }}/>
          <MenuItem title='Delete' onClick={e => {
            store.dispatch({
              type: 'POPUP',
              name:'deleteHoliday',
              data: {
                active:true
              }
            })
            store.dispatch(deleteHoliday(this.props.id))
            e.preventDefault()
          }}/>
          </MenuSection>
          </Menu>
          </td>
          </tr>
          ))
      }

      </tbody>
      </table>
      )
  }
}



export class Header extends Component {
  render() {
    return(
      <div className={this.props.center ? 'header center' : 'header'} style={this.props.style}>
      <large>{this.props.text}</large>
      <span></span>
      </div>
      )
  }
}

export class ProjectHeader extends Component {
  render () {
    return (
      <div className='project-header'>
      <large>{this.props.projectName}</large>
      <large>{this.props.sectionName}</large>
      </div>
      )
  }
}


// export class TableNew extends Component {
//   render () {
//     return (
//       <table className='table' style={{width:'100%'}}>
//           <thead>
//                 <tr>
//                   {
//                     this.props.tableHeader.map((value, index) => (
//                         <th>{value.value}</th>
//                     ))
//                   }
//                 </tr>
//             </thead>
//               <tbody>
//                 {
//                   this.props.tableData.map((row,index) => (
//                     <tr className='items' key={index}>
//                       {
//                         row.column.map((column,index) => (
//                           <td>{column.value}</td>
//                         ))
//                       }
//                     </tr>
//                   ))
//                 }
//               </tbody>
//       </table>
//     )
//   }
// }

function renderAdjacent(onWhatever){
  return [
  <tr><td>Item 1</td></tr>,
  <tr><td>Item 2</td></tr>
  ];
}




export class WorkplanRow extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false,
      clicked_child : false
    };
  }
  menu(value) {
    var padding =(value.LEVEL * 20 + 20).toString()

    return(
      <tr onClick={
        e => {
          var key = (value.WBS_ID).toString()
          if (this.state[key]) {
            this.setState({[key]:false})
          }
          else {
            this.setState({[key]:true})
          }
          e.preventDefault()
        }
      }>

      <td style={{overflow:'visible', width:'410px'}}>
      <div style={{paddingLeft: padding+'px', wordBreak:'break-word', paddingRight:'15px'}}>
    {/* <div style={{width:'200px', overflow:'hidden'}}> */}
    <span style={{verticalAlign:'middle', fontSize:'16px', color:'black'}} className='material-icons'>
    {value.children.length!=0 ? this.state[(value.WBS_ID).toString()] ? 'expand_more': 'expand_less' : ""}
    </span>&nbsp;&nbsp;&nbsp;&nbsp;{value.WBS_NAME}
  {/* </div> */}

  </div>
  </td>
  <td>{value.WORK}</td>
  <td>{value.WORK_TOTAL}</td>
  <td>{value.DURATION}</td>
  <td>{value.START_DATE}</td>
  <td>{value.FINISH_DATE}</td>
  <td>{Math.round(value.WORK_PERCENT_COMPLETE * 100)/100}%</td>
  <td>{value.RESOURCE_WBS} people</td>
  <td style={{position:'relative', paddingRight:'20px'}} >
  {
    value.LEAF == 1 &&
        // React.cloneElement(this.props.children, { data: value })
        <WorkplanRow data={workplan} >
        <Menu menuStyle={{top:'41', right:'10', width:'200px'}} style={{display:'inline'}} triggerClass='material-icons' triggerStyle={{fontSize:'17px', color:'#fa5962'}} icon='more_horiz'>
        <MenuSection>
        <MenuItem title='Add Timesheet' onClick={e => {
          this.props.dispatch({
            type: 'POPUP',
            name:'addTimesheetWorkplan',
            data: {
              active:true
            }
          })

          e.preventDefault()
        }}/>
        <MenuItem title='Manual Update' onClick={e => {
          this.props.dispatch({
            type: 'POPUP',
            name:'manualUpdate',
            data: {
              active:true
            }
          })

          e.preventDefault()
        }}/>
        <MenuItem title='Edit' onClick={e => {
                // this.props.dispatch(getEditTaskView(   props.data))
                this.props.dispatch({
                  type: 'POPUP',
                  name:'edit',
                  data: {
                    active:true
                  }
                })


                e.preventDefault()
              }}/>
              <MenuItem title='Assign' onClick={e => {
                this.props.dispatch({
                  type: 'POPUP',
                  name:'assign',
                  data: {
                    active:true
                  }
                })

                e.preventDefault()
              }}/>

              <MenuItem title='Delete' onClick={e => {
                // this.props.dispatch()
                this.props.dispatch({
                  type: 'POPUP',
                  name:'delete',
                  data: {
                    active:true
                  }
                })

                e.preventDefault()
              }}/>



              </MenuSection>

              </Menu>
              </WorkplanRow>

            }

            </td>

            </tr>
            )
  }
  renderRow(value){
    return(
      value.children.map((value,index)=> [

        this.menu(value),

        this.state[(value.WBS_ID).toString()] && this.state[(value.WBS_ID).toString()] !=false &&
        this.renderRow(value)

        ])
      )
  }

  render(){
    var value = this.props.data
    return (
      <tbody>

      {
        this.menu(value)

      }
      {
        value.children.length !=0 && this.state[(value.WBS_ID).toString()] &&
        this.renderRow(value)
      }
      </tbody>


      )
  }
}


export class ActivityRow extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false,
    };
  }
  render(){
    var value = this.props.data
    return (
      <tbody>
      {
        value.sub.map((value, index) => (
          <tr>
          <td style={{paddingLeft: '60px'}}>{value.task}</td>
          <td>{value.work}</td>
          <td>{value.work_total}</td>
          <td>{value.duration}</td>
          <td>{value.start_date}</td>
          <td>{value.end_date}</td>
          <td>{value.work_complete}</td>
          <td>{value.resources}</td>
          </tr>
          ))
      }
      </tbody>
      )
  }
}

export class InputFile extends Component {

  handleChange(event) {
    console.log('Selected file:', event.target.files[0]);
  }

  render(){
    return(
      <div style={this.props.style}>
      <form>
      <FileInput
      name={this.props.name}
      placeholder={this.props.placeholder}
      accept=".zip,.doc,.docs,.docx,.xls,.pdf,.xlsx,.jpg,.jpeg,.png"
      onChange={this.handleChange}
      >
      </FileInput>
      </form>
      </div>
      )
  }
}

export class ReduxFileInput extends Component {
  render(){
    return(
      <FileInput
      name={this.props.name}
      placeholder={this.props.placeholder}
      accept=".zip,.doc,.docs,.docx,.xls,.pdf,.xlsx,.jpg,.jpeg,.png"
      onDrop={(event)=> this.props.input.onDrop(event.target.files[0])}
      {...this.props.custom}
      >
      </FileInput>
      )
  }
}

export class ReduxUploadWorkplan extends Component {
  constructor() {
    super()
    this.state= {
      value:''
    }
  } 
  render(){
    return(
      <div>
      <Dropzone
      name={this.props.name}
      className="upload-workplan"
      style={this.props.style}
      placeholder='Upload File'
      accept=".zip,.doc,.docs,.docx,.xls,.pdf,.xlsx,.jpg,.jpeg,.png"
      onDrop={( filesToUpload, e ) => {this.props.input.onChange(filesToUpload)
        console.log(filesToUpload)
        this.setState({
          value:filesToUpload[0].name
        })
        
      }}
      >
       <input placeholder={this.props.placeholder} type="text" value={this.state.value} onkeydown="return false;"></input> 
      </Dropzone>

      </div>
      )
  }
}

export class ReduxUploadUser extends Component {
  constructor() {
    super()
    this.state= {
      value:''
    }
  } 
  render(){
    return(
      <div>
      <Dropzone
      name={this.props.name}
      className="upload-workplan"
      style={this.props.style}
      placeholder='Upload File'
      accept=".xls,.xlsx"
      onDrop={( filesToUpload, e ) => {this.props.input.onChange(filesToUpload)
        console.log(filesToUpload)
        this.setState({
          value:filesToUpload[0].name
        })
        
      }}
      >
      <input placeholder={this.props.placeholder} type="text" value={this.state.value} onkeydown="return false;"></input>
      </Dropzone>

      </div>
      )
  }
}




export class ReduxDropProfilePicture extends Component {
  render(){
    return(
      <Dropzone
      name={this.props.name}
      className="btn-primary"
      style={{width:'170px',height:'30px'}}
      placeholder={this.props.placeholder}
      accept=".zip,.doc,.docs,.docx,.xls,.pdf,.xlsx,.jpg,.jpeg,.png"
      onDrop={( filesToUpload, e ) => this.props.input.onChange(filesToUpload)}
      >
      </Dropzone>
      )
  }
}

export class Loader extends Component {
  render(){
    return(
      <div className='loader-login-wrapper' style={this.props.style}>
        {
          store.getState().loader[this.props.id] && store.getState().loader[this.props.id].show ?
          <div className='load' id={this.props.id}>
            <div className='loader'  >
              <div className='loader__figure'></div>
            </div>
          </div>
          :
          this.props.children

        }
      </div>
      )
  }
}

export class EmptyData extends Component {
  render(){
    return(
      <div style={{width:'100%'}}>
      <large style={{width:'100%', textAlign:'center'}} >NO DATA TO SHOW</large>
      </div>
      )
  }
}

export class PageLoader extends Component {
  render(){
    return(
      <div className='loader-wrapper'>
      <div className='load' id={this.props.id}>
      <div className='loader'  style={this.props.style}>
      <div className='loader__figure'></div>

      </div>
      </div>
      </div>
      )
  }
}

export class Pagination extends Component {
  render(){
    return(
      <div className="container" style={{float:'right'}}>
      <button className="arrow"> <b> &lt; </b> </button>
      <button className="pagination"><b>1</b></button>
      <button className="arrow"> <b> &gt; </b> </button>
      </div>
      )
  }
}

export class datepickerUniversal extends Component {

  static defaultProps(){
    placeholder: ''
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.props.input.onChange(moment(date).format('DD-MMM-YYYY'))

  }

  render () {
    console.log('DATE PICKER PROPS', this.props.meta)
    const {
      input, placeholder,
      meta: {touched, error}
    } = this.props

    return (
      <div style={this.props.style}>
      {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
      {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
      <DatePicker
      style={{width:'100%'}}
      {...input}
      placeholder={placeholder}
      dateFormat="DD-MMM-YYYY"
      className={ this.props.meta.touched && this.props.meta.error != null && 'error'}
      
      // selected={input.value ? moment(input.value, `DD-MMM${.toUpperCase()}-YY`) : null}
      selected={input.value ? moment(input.value, "DD-MMM-YYYY") : null}
      // selected={input.value ? moment(input.value, "YYYY-MM-DD") : null}

      // onChange={this.handleChange}
      >
      {this.props.children}
      </DatePicker>
      {this.props.meta.touched && ((this.props.meta.error && <span className='error-alert'>{this.props.meta.error}</span>) )}





      </div>

      )
  }
}

export class datepickerTimesheet extends Component {

  static defaultProps(){
    placeholder: ''
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.props.input.onChange(moment(date).format('YYYY-MM-DD'))
      // this.props.input.onChange(moment(date).format(`DD-${MMM.toUpperCase()}-YY`))
    }

    render () {
      const {
        input, placeholder,
        meta: {touched, error}
      } = this.props

      return (
        <div style={this.props.style}>
        {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
        {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
        <DatePicker
        {...input}
        placeholder={placeholder}
        dateFormat="YYYY-MM-DD"
        // selected={input.value ? moment(input.value, `DD-MMM${.toUpperCase()}-YY`) : null}
        selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
        onChange={this.handleChange}
        minDate={moment().subtract(2,'month')}
        maxDate={moment()}
        >
        {this.props.children}
        </DatePicker>
        </div>

        )
    }
  }

  function mapStateToProps(state) {
    return {
      // formValues: state.form.add_task,
      state,
      data: state.data,
      popup: state.data.popup,
    }

  }

  // export connect(mapStateToProps)(PopUp)
  