import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Snake from './components/Games/Snake/Snake';
import TicTacToe from './components/Games/TicTacToe';
import Dragon from './components/Games/Dragon';
import Game2048 from './components/Games/Game2048';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/snake" element={<Snake />}></Route>
          <Route exact path="/tictactoe" element={<TicTacToe />}></Route>
          <Route exact path="/dragon" element={<Dragon />}></Route>
          <Route exact path="/2048" element={<Game2048 />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
