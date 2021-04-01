import React, { Component } from 'react';
import './Letter.scss';
import envelope from '../../assets/letter envelope.svg'
import envelope2 from '../../assets/letter envelope 2.svg'
import envelope3 from '../../assets/letter envelope 3.svg'

export default class Letter extends Component {
  constructor(props){
    super(props);
    this.letterRef = React.createRef();
    this.envelopeRef = React.createRef();
  }

  letterClicked = () => {
    this.envelopeRef.current.classList.add('open');
    this.letterRef.current.classList.add('open');
    setTimeout(() => {
      this.envelopeRef.current.classList.add('back');
    }, 600)
    setTimeout(() => {
      this.letterRef.current.classList.add('to-bottom');
    },1000);
  }

  letterExtracted = () => {
    this.letterRef.current.classList.remove('to-bottom');
    this.letterRef.current.classList.add('to-full-bottom');
  }

  render() {
    return (
      <div className="letter--wrapper">
        
        <div className='letter' ref={this.letterRef}>
          
          <div className="doblez-1" ref={this.envelopeRef} onClick={this.letterClicked}>
            <img id="envelope" src={envelope3} alt=""/>
          </div>
          <div className="border" onClick={this.letterClicked}></div>
          <div className="cover" onClick={this.letterClicked}></div>
          <div className="content" onClick={this.letterExtracted}></div>
          
        </div>
      </div>  
    )
  }
}