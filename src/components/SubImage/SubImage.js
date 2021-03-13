import React, { Component } from 'react';
import profile from '../../assets/profile1.jpg'
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

  getStyle = (image) => {
    const { x, y, numCols, numRows } = this.state;
    return {
      top: `${this.getTop()}%`,
      left: `${this.getLeft()}%`,
      width: `${this.getWidth()}%`,
      height: `${this.getHeight()}%`,
      backgroundImage: `url(${image})`,
      backgroundPositionX: `${this.getLeft()}%`,
      backgroundPositionY: `${this.getTop()}%`,
      backgroundSize: `${100 * (numCols + 1)}% ${100 * (numRows + 1)}%`,
      backgroundRepeat: 'no-repeat',
    }
  }

  render() {
    return (
      <div className='sub-image' style={this.getStyle(profile)}>
        ({this.state.x}, {this.state.y})
      </div>
    )
  }
}