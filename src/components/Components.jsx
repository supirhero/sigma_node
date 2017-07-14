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
      <div className='divider-wrapper'>
        {
          this.props.back && <button className='btn-secondary' onClick={this.props.back}>{this.props.back_text}</button>
        }
        <h2><span>{this.props.text}</span></h2>

      </div>
    )
  }
}
