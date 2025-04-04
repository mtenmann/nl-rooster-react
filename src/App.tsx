import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamOverview from "./TeamOverview";
import { Header } from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-wow-bg text-white">
        <Header />

        <hr className="border-gray-700" />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<TeamOverview team="boble" />} />
            <Route path="/tempo" element={<TeamOverview team="tempo" />} />
            <Route path="/delta" element={<TeamOverview team="delta" />} />
            <Route path="/foniks" element={<TeamOverview team="foniks" />} />
            <Route path="/boble" element={<TeamOverview team="boble" />} />
            <Route path="/axemen" element={<TeamOverview team="axemen" />} />
            <Route
              path="/kildevangen"
              element={<TeamOverview team="kildevangen" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
