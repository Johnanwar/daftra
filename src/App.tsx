import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const PokemonDetail = lazy(() => import('./pages/PokemonDetail'));

function App() {
  return (
    <div className="p-4">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
