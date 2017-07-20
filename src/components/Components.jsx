import React, {Component} from 'react'

export class Menu extends Component {
    constructor(){
      super();
      this.state = {
        clicked : false

      };
    }
    render(){
      return(
        <div>
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

      </div>
    )
  }
}



export class Input extends Component {
  render() {
    return (
      <div style={this.props.style}>
        <h2 className='input-desc'>{this.props.inputName}</h2>
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
        <h2 className='input-desc'>{this.props.inputName}</h2>
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
