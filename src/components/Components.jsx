import React, {Component} from 'react'
import {Circle, Line} from 'react-progressbar.js'
import FileInput from 'react-file-input';
import {BarChart as ChartBar,LineChart as ChartLine, Line as LineGraph, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts'
import {Table as MaterialTable, TableBody, TableHeader, TableHeaderColumn,TableRow,TableRowColumn,MuiThemeProvider} from 'material-ui'
import store from '../reducers/combineReducers.jsx'




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
        <div className='trigger' onClick={
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

export class RadioButton extends Component {
  render() {
    return (
      <p className='radio-button' style={this.props.style}>
       <input type="radio" id={this.props.id} name={this.props.group}/>
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

export class TimeSheetTimeButton extends Component {
  render(){
    return(
    <button className ='btn-secondary' style={{float:'left'}}>
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
        <large>{this.props.label}</large>
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
                    row.column.map((column, index) =>
                    (
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
