import React, { Component } from 'react';
import './Letter.scss';
import envelope3 from '../../assets/letter envelope 3.svg'
import speak from '../../assets/audio/speak.wav';
import sea from '../../assets/audio/sea2.mp3';

export default class Letter extends Component {
  constructor(props){
    super(props);
    this.AUDIO_POOL_SIZE = 1;
    this.letterRef = React.createRef();
    this.envelopeRef = React.createRef();
    this.contentRef = React.createRef();
    this.audioRefs = []
    for(let i = 0; i < this.AUDIO_POOL_SIZE; ++i){
      this.audioRefs.push(React.createRef());
    }
    this.seaAudioRef = React.createRef();
    this.text = [
      'This is a format for a letter to a dear friend, a lover or anyone in the middle.',
      'If you want to use it, be free to fork the github project, and edit the file components/Letter/Letter.js',
      'I had other things in mind when creating the project, so there may be some garbage files.',
      'In the future, I may update this project to allow generating customized letters without having to fork it, so be patient.',
      'Thank you for checking this project. I have some other projects you may like in my github page at https://github.com/feder240516/'
    ];
    this.sender = 'Federico Reina, dev'
    this.destiny = 'Anyone who reads this.'
    this.state = {
      currentText: '',
      hiddenText: '',
      letterNumber: 0,
      pauses: 0,
      lastUsedAudio: 0,
      finishedPage: true,
      letterExpanded: false,
      currentPage: 0,
      animatingCard: false,
    };
  }

  componentDidMount(){
    this.audioRefs.forEach(audio => {
      audio.current.playbackRate = 2.5
      audio.current.volume = 0.5;
    });
    this.seaAudioRef.current.volume = 0.2;
  }

  letterClicked = () => {
    this.envelopeRef.current.classList.add('open');
    this.letterRef.current.classList.add('open');
    this.seaAudioRef.current.play();
    setTimeout(() => {
      this.envelopeRef.current.classList.add('back');
    }, 600)
    setTimeout(() => {
      this.letterRef.current.classList.add('to-bottom');
    },1000);
  }

  letterExtracted = () => {
    if (this.state.animatingCard || !this.state.finishedPage) { return; }

    if (this.state.letterExpanded) { this.letterExpanded(); }
    else {
      this.letterRef.current.classList.remove('to-bottom');
      this.letterRef.current.classList.add('to-full-bottom');
      this.setState((state,props) => ({...state, animatingCard: true}))
      setTimeout(() => {
        this.letterExpanded();
      }, 1000);
    } 
  }

  letterExpanded = () => {
    if (this.state.letterExpanded){
      this.startWriting(this.state.currentPage);
    } else{
      this.setState((state, props) => {
        return {...state, animatingCard: true};
      })
      this.contentRef.current.classList.add('scale-up-center');
      setTimeout(() => {
        this.startWriting(0);
      },1500);
    }
  }

  renderedText = () => {
    return (
      <>
        {this.state.currentText.split('\n').map((w, i) => (
          <>
            <span>{w}</span>
            <br/>
          </>
        ))}
      </>
    )
  }

  audioPool = () => {
    
    const audioPool = [];
    for(let i = 0; i < this.AUDIO_POOL_SIZE; ++i){
      audioPool.push(
        <audio key={i} ref={this.audioRefs[i]}>
          <source src={speak}></source>
        </audio>
      );
    }
    return audioPool
  }

  startWriting = (pageNumber) => {
    this.setState((state, props) => {
      return {...state,
               finishedPage: false, 
               currentPage: pageNumber + 1, 
               currentText: '', 
               letterNumber: 0, 
               animatingCard: false,
                letterExpanded: true,
              };
    })
    if (pageNumber < this.text.length){
      let intervalID = setInterval(() => {
        this.setState((state, props) => {
          if (state.pauses > 0) { return {...state, pauses: state.pauses - 1}}
          if (state.letterNumber >= this.text[pageNumber].length) {
            clearInterval(intervalID);
            return {...state, finishedPage: true};
          }
          const currentLetter = this.text[pageNumber][state.letterNumber];
          let pauses = 0;
          if (currentLetter === '.'){ pauses = 5; }
          if (currentLetter === ','){ pauses = 3; }
          if (currentLetter !== ' ' && currentLetter !== '\n') { this.audioRefs[state.lastUsedAudio].current.play(); }
          return {
            currentText: state.currentText + this.text[pageNumber][state.letterNumber],
            letterNumber: state.letterNumber + 1,
            pauses: pauses,
            lastUsedAudio: (state.lastUsedAudio + 1) % this.AUDIO_POOL_SIZE,
          }
        })
      }, 40);
    } else {
      this.setState((state, props) => {
        return {...state, currentText: this.text.reduce((a,b) => `${a}\n\n${b}`)};
      })
    }
  }

  render() {
    return (
      <>
      <div className="letter--wrapper">
        
        <div className='letter' ref={this.letterRef}>
          
          <div className="doblez-1" ref={this.envelopeRef} onClick={this.letterClicked}>
            <img id="envelope" src={envelope3} alt=""/>
          </div>
          <div className="border" onClick={this.letterClicked}></div>
          <div className="cover" onClick={this.letterClicked}>
            <div className="destiny">To: <u>{this.destiny}</u><br/>From: <u>{this.sender}</u></div>
          </div>
          <div className="content with-scrollbar" ref={this.contentRef} onClick={this.letterExtracted}>
            {this.renderedText()}
            <span className="continue" hidden={!this.state.finishedPage || this.state.animatingCard || !this.state.letterExpanded}>
              Click to continue
            </span>
            <span className="click-here" hidden={this.state.letterExpanded || this.state.animatingCard}>
              Click here!
            </span>
          </div>
            
        </div>
      </div>
      <audio id="sea-audio-ref" ref={this.seaAudioRef} loop>
          <source src={sea}></source>
      </audio>
      {this.audioPool()}
      </>
    )
  }
}