import React, { Component } from 'react'
import SubImage from '../SubImage/SubImage'

export default class ImageArray extends Component {
  constructor(props){
    super(props)
    let {numRows, numCols} = props;
    this.state = {
      numRows,
      numCols
    };
  }

  getKey = (i,j) => {
    return this.state.numCols * i + j
  }

  renderImageArray = () => {
    let imgArray = []
    for(let i = 0; i < this.state.numRows; ++i){
      for(let j = 0; j < this.state.numCols; ++j){
        imgArray.push((<SubImage 
          key={this.getKey(i,j)} 
          x = {j} y = {i}
          numRows = {this.state.numRows}
          numCols = {this.state.numCols}
        />));
      }
    }
    return imgArray;
  }  

  render(){
    return (<div className='image-array'>
      {this.renderImageArray()}
    </div>);
  }
}