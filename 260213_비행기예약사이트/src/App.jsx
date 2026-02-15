import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Features from './components/Features';
import SnakeGame from './components/SnakeGame';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <Features />
        <SnakeGame />
      </main>
      <Footer />
    </div>
  );
}

export default App;
