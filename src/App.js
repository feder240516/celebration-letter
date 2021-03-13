import ImageArray from './components/ImageArray/ImageArray'
import './App.css';

function App() {
  const numRows = 10;
  const numCols = 6;
  return (
    <div className="App">
      <ImageArray numRows={numRows} numCols={numCols}/>
    </div>
  );
}

export default App;
