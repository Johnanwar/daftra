import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const PokemonDetail = lazy(() => import('./pages/PokemonDetail'));

function App() {
  return (
    <div >
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
