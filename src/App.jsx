import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollProgress from './components/ScrollProgress';
import BackgroundGrid from './components/BackgroundGrid';
import Nav from './components/Nav';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import Pricing from './pages/Pricing';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-black font-body selection:bg-black selection:text-white overflow-x-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@700&display=swap');
          .font-display { font-family: 'Space Grotesk', sans-serif; }
          .font-body { font-family: 'Inter', sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
          .outline-text { -webkit-text-stroke: 1.5px black; color: transparent; }
        `}</style>

        <ScrollProgress />
        <BackgroundGrid />
        <Nav />
        <ScrollToTopButton />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;