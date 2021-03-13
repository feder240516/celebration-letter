import React, { Component } from 'react';
import './SubImage.scss';

export default class SubImage extends Component {
  constructor(props){
    super(props);
    const {x,y,numRows,numCols} = props;
    this.state = {
      x,y,
      numRows,numCols
    };
  }

  componentDidMount(){
    
  }

  getTop = () => {
    const { y, numRows } = this.state;
    return y * (100 / numRows);
  }

  getLeft = () => {
    const { x, numCols } = this.state;
    return x * (100 / numCols);
  }

  getWidth = () => {
    const { numCols } = this.state;
    return 100 / numCols;
  }

  getHeight = () => {
    const { numRows } = this.state;
    return 100 / numRows;
  }

  getStyle = () => {
    const { x, y } = this.state;
    return {
      top: `${this.getTop()}%`,
      left: `${this.getLeft()}%`,
      width: `${this.getWidth()}%`,
      height: `${this.getHeight()}%`,
      backgroundColor: `rgb(${x*20},${y*20},0)`
    }
  }

  render() {
    return (
      <div className='sub-image' style={this.getStyle()}>
        ({this.state.x}, {this.state.y})
      </div>
    )
  }
}