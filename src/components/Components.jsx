import React, {Component} from 'react'
import {Circle, Line} from 'react-progressbar.js'
import {BarChart as ChartBar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts';
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
        {this.props.inputName ? <h2 className='input-desc'>{this.props.inputName}</h2> : null}
        <input placeholder={this.props.placeholder}></input>
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

export class Select extends Component {
  render() {
    return (
      <div style={this.props.style}>
        {this.props.inputName ? <h2 className='input-desc'>{this.props.inputName}</h2> : null}
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
    <button className ='btn-secondary'>
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
            <Bar dataKey="value" fill="#F48165" />
          </ChartBar>
        </ResponsiveContainer>

      </div>
    )
}

}
export class Search extends Component {
  render() {
    return(
      <div className='search'>
        <div className='card'>
          <input placeholder={this.props.placeholder}></input>
          <i className='icon-magnifier'></i>
        </div>
      </div>
    )
  }
}

export class PopUp extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     clicked : false
  //
  //   };
  // }

  render() {
    const dom = store.getState().dom
    console.log('dom : ',dom);
    return(
      <div>

        <div className={dom.popup ? 'popup-container active' : 'popup-container'}>
            <div className='grid wrap' style={{position:'relative'}}>
              <div className='unit whole'>
                <div className='card shadow' style={{marginTop:'6%'}}>
                    <Divider text={this.props.dividerText} btnRightStyle={{padding : '15px 16px'}} btnRightText={<i className='material-icons' style={{color:'#333333'}}>close</i>} btnRightClick={
                      e => {
                        document.body.style.overflow = 'scroll';
                        document.body.scrollTop = 0; // For Chrome, Safari and Opera
                        document.documentElement.scrollTop = 0; // For IE and Firefox
                        store.dispatch({
                          type : 'POPUP',
                          id : this.props.id,
                          popup : false
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
        <button className='btn-primary'
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

              store.dispatch({
                type : 'POPUP',
                id : this.props.id,
                popup : true
              })
              e.preventDefault()
            }}
          >{this.props.btnText}</button>
      </div>

    )
  }
}
