import {PostAsync} from './api/http'
import './App.css';

function App() {
  const HandleSubmit = async ()=>{
    const res = await PostAsync();
    alert(res.data.title);
  }


  return (
    <div>
      <p>Clike button to test</p>
      <button onClick={HandleSubmit}>test</button>
    </div>
  );
}

export default App;
