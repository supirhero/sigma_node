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
import DropZone from 'react-dropzone'

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
        <div className={this.props.triggerClass} onClick={
          () => {
              console.log('working');
              if (this.state.clicked) {
                this.setState({clicked:false})
              }
              else {
                this.setState({clicked:true})
              }
            }
          }>
        </div>

            <div onMouseLeave = {
              () => {
                this.setState({
                  clicked : false
                })
              }
            } className={this.state.clicked ? 'menu active' : 'menu'}>
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
      <div className='menu-item' onClick={this.props.onClick}>
        <small className='menu-title'>{this.props.title}</small>
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
      <div className='menu-header'>
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
        <h2><span>{this.props.text}</span></h2>
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
          <input placeholder={this.props.placeholder}></input>
          {this.props.children}
        </div>

    )
  }
}

export class RenderRadioGroup extends Component {
  // static childContextTypes: {
  //   muiTheme: React.PropTypes.object
  // }
  constructor() {
    super();

    this.constructor.childContextTypes = {
      muiTheme: React.PropTypes.object
    };
  }
  // getChildContext() {
  //   return {
  //     muiTheme: this.state.muiTheme
  //   };
  // }
  getChildContext() {
               return { muiTheme: getMuiTheme(baseTheme) };
           }
  render(){
    return(
      <RadioButtonGroup
        {...this.props.input}
        valueSelected={this.props.input.value}
        onChange={(event, value) => this.props.input.onChange(value)}
      />

    )
}}

export class ReduxInput extends Component {
  render(){
    return(
        <div style={this.props.style}>
          {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
          {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
          <input
            style={{width:'100%'}}
            placeholder={this.props.placeholder}
            type='text'
            {...this.props.input}
          >
          </input>
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
      <p className='checkbox-button' style={this.props.style}>
        <input type='checkbox' id={this.props.id} name={this.props.group} />
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
        <select className='select'>
          {this.props.items.items.map((value,index) => {
            return(
              <option key={index} value={value.title}>{value.title}</option>

            )
          })}
        </select>

      </div>
    )
  }
}


export class ReduxSelect extends Component {
  render() {
    return (
      <div style={this.props.style}>

        {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
        {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
        <select className='select' {...this.props.select} {...this.props.custom}
          onChange={(event,index,value)=>this.props.input.onChange(event.target.value)}
        >
          {this.props.children}
        </select>

      </div>
    )
  }
}

export class ReduxSelectNew extends Component {
  render() {
    return (
      <div style={this.props.style}>

        {this.props.inputName ? <h2 className='input-name'>{this.props.inputName}</h2> : null}
        {this.props.inputDesc ? <h2 className='input-desc'>{this.props.inputDesc}</h2> : null}
        <select className='select' {...this.props.select} {...this.props.custom}
          onChange={(event,index,value)=>this.props.input.onChange(event.target.value)}
        >
          {this.props.children}
        </select>

      </div>
    )
  }
}


// export class ReduxSelect extends Component {
//   render() {
//     return (
//       <div style={this.props.style}>
//         {this.props.inputName ? <h2 className="input-name">{this.props.inputName}</h2> : null}
//         {this.props.inputDesc ? <h2 className="input-desc">{this.props.inputDesc}</h2> : null}
//         <select className="select" {...this.props.select} {...this.props.custom}
//         onChange={(event, index, value) => this.props.input.onChange(event.target.value)}
//           >
//           {this.props.items.items.map((value, index) => (
//               <option key={index} value={value.title} {...this.props.option}>{value.title}</option>
//             ))}
//         </select>
//
//       </div>
//     );
//
//   }
// }


export class TimeSheetTimeButton extends Component {
  render(){
    return(
    <button className ='btn-secondary' style={{float:'left'}} onClick={this.props.onClick}>
      {this.props.text}
      <small>{this.props.hours}</small>
    </button>
    )
  }
}

export class Meter extends Component {
  render(){
    return(
      <div className='circle-container'>
        <Circle
          progress={this.props.progress}
          initialAnimate={true}
          text= {this.props.text}
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
      <div className='bar-chart-container'>
        <large style={this.props.labelStyle}>{this.props.label}</large>
        <ResponsiveContainer width='100%' height={250}>
          <ChartBar width={680} height={250} data={this.props.data}>
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />

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
              <LineGraph type="monotone" key={props.key} dataKey={props.key} stroke={props.stroke} />)}
          </ChartLine>
        </ResponsiveContainer>
      </div>
    )
  }
}



export class Search extends Component {
  render() {
    return(
      <div className='search' style={this.props.style}>
        <div className='card'>
          <input placeholder={this.props.placeholder}></input>
          <i className='icon-magnifier'></i>
        </div>
      </div>
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

export class WorkplanRow extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false,
      working : false,
      non_working : false

    };
  }
  render(){
    var value = this.props.data
    return (
      <tbody>
        <tr onClick={
          e => {
            if (this.state.clicked) {
              this.setState({clicked:false})
            }
            else {
              this.setState({clicked:true})

            }
            e.preventDefault()
          }
        }>
        <td style={{paddingLeft: '20px'}}>{value.task}</td>
        <td>{value.work}</td>
        <td>{value.work_total}</td>
        <td>{value.duration}</td>
        <td>{value.start_date}</td>
        <td>{value.end_date}</td>
        <td>{value.work_complete}</td>
        <td>{value.resources}</td>
      </tr>
      {
        this.state.clicked &&
        <tr onClick={
          e => {
            if (this.state.working) {
              this.setState({working:false})
            }
            else {
              this.setState({working:true})

            }
            e.preventDefault()
            }
          }>
          <td style={{paddingLeft: '40px'}}>{value.working_activity.task}</td>
          <td>{value.working_activity.work}</td>
          <td>{value.working_activity.work_total}</td>
          <td>{value.working_activity.duration}</td>
          <td>{value.working_activity.start_date}</td>
          <td>{value.working_activity.end_date}</td>
          <td>{value.working_activity.work_complete}</td>
          <td>{value.working_activity.resources}</td>
      </tr>
      }
      {
        this.state.working && this.state.clicked &&
        <ActivityRow data={value.working_activity}></ActivityRow>
      }

      {
        this.state.clicked &&
        <tr onClick={
          e => {
            if (this.state.non_working) {
              this.setState({non_working:false})
            }
            else {
              this.setState({non_working:true})

            }
            e.preventDefault()
            }
          }>
          <td style={{paddingLeft: '40px'}}>{value.non_working_activity.task}</td>
          <td>{value.non_working_activity.work}</td>
          <td>{value.non_working_activity.work_total}</td>
          <td>{value.non_working_activity.duration}</td>
          <td>{value.non_working_activity.start_date}</td>
          <td>{value.non_working_activity.end_date}</td>
          <td>{value.non_working_activity.work_complete}</td>
          <td>{value.non_working_activity.resources}</td>
      </tr>
      }



      {
        this.state.non_working && this.state.clicked &&
        <ActivityRow data={value.non_working_activity}></ActivityRow>
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

// export class ReduxFileInput2 extends Component {
//   render(){
//     return(
//       <FileField
//         name={this.props.name}
//         placeholder={this.props.placeholder}
//         accept=".zip,.doc,.docs,.docx,.xls,.pdf,.xlsx,.jpg,.jpeg,.png"
//         onChange={(event)=> this.props.input.onChange(event.target.files[0])}
//         {...this.props.custom}
//         >
//       </FileField>
//     )
//   }
// }


// export class ReduxDropZone extends Component{
//   render(){
//     return (
//       <div>
//       <DropZone
//       accept=".zip,.doc,.docs,.docx,.xls,.pdf,.xlsx,.jpg,.jpeg,.png"
//       onDrop={( filesToUpload, e ) => this.props.input.onChange(filesToUpload)}
//       // onDrop={(event)=> this.props.input.onChange(event.target.files[0])}
//       {...this.props.custom}
//       >
//       <div>TARO FILE</div>
//       </DropZone>
//       </div>
//     )
//   }
// }

export class ReduxDropZone2 extends Component {
  render(){
    return(
      <DropZone
        name={this.props.name}
        placeholder={this.props.placeholder}
        accept=".zip,.doc,.docs,.docx,.xls,.pdf,.xlsx,.jpg,.jpeg,.png"
        onChange={(event)=> this.props.input.onChange(event.target.files[0])}
        {...this.props.custom}
        >
      </DropZone>
    )
  }
}

export class ReduxDrop extends Component {
  render(){
    return(
      <DropZone
      name={this.props.name}
      accept=".zip,.doc,.docs,.docx,.xls,.pdf,.xlsx,.jpg,.jpeg,.png"
      onDrop={( filesToUpload, e ) => this.props.input.onChange(filesToUpload)}
      >
      <div>Try dropping some files here, or click to select files to upload.</div>
      </DropZone>
    )
  }
}


export class LoaderLogin extends Component {
  render(){
    return(
      <div className='loader-login-wrapper'>
        <div className='load' id={this.props.id}>
          <div className='loader'  style={this.props.style}>
            <div className='loader__figure'></div>

          </div>
        </div>
        {this.props.children}
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

export class datepickerUniversal extends Component {

    static defaultProps(){
      placeholder: ''
    }

    constructor (props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange (date) {
      this.props.input.onChange(moment(date).format('DD-MMM-YY'))
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
          dateFormat="DD-MMM-YY"
          // selected={input.value ? moment(input.value, `DD-MMM${.toUpperCase()}-YY`) : null}
          selected={input.value ? moment(input.value, 'DD-MMM-YY') : null}
          onChange={this.handleChange}
         >
          {this.props.children}
          </DatePicker>




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
