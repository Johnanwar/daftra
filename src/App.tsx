import { Routes, Route, Link } from 'react-router-dom';
import PokemonDetail from './pages/PokemonDetail';
import Home from './pages/Home';

function App() {
  return (
    <div className="p-4">


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
