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

            <div className={this.state.clicked ? 'menu active' : 'menu'}>
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
