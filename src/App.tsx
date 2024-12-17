import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginScreen } from './components/screens/LoginScreen';
import { GoalScreen } from './components/screens/GoalScreen';
import { RealityScreen } from './components/screens/RealityScreen';
import { OptionsScreen } from './components/screens/OptionsScreen';
import { WayForwardScreen } from './components/screens/WayForwardScreen';
import { SummaryScreen } from './components/screens/SummaryScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/goal" element={<GoalScreen />} />
        <Route path="/reality" element={<RealityScreen />} />
        <Route path="/options" element={<OptionsScreen />} />
        <Route path="/way-forward" element={<WayForwardScreen />} />
        <Route path="/summary" element={<SummaryScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;