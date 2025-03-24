import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveMenu from "./ResponsiveMenu";
import TeamOverview from "./TeamOverview";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-wow-bg text-white font-wow">
        <header className="py-6 text-center">
          <h1 className="text-4xl font-bold">Nerdelandslaget</h1>
          <ResponsiveMenu />
        </header>
        <hr className="border-gray-700" />
        <main className="p-4">
          <Routes>
            <Route path="/tempo" element={<TeamOverview team="tempo" />} />
            <Route path="/delta" element={<TeamOverview team="delta" />} />
            <Route path="/foniks" element={<TeamOverview team="foniks" />} />
            <Route path="/boble" element={<TeamOverview team="boble" />} />
            <Route path="/panser" element={<TeamOverview team="panser" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
