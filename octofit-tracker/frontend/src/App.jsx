import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './api';

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">React 19 presentation tier for the multi-tier application.</p>
          <p className="text-muted">API base URL: {getApiBaseUrl()}</p>
          <p className="text-muted">Define VITE_CODESPACE_NAME in .env.local for Codespaces URLs.</p>
        </header>

        <nav className="nav nav-pills mb-4">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" to="/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<div className="alert alert-info">Select a section to explore the app.</div>} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
