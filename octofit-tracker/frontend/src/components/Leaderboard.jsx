import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        const payload = await response.json();
        setEntries(normalizeCollection(payload));
      } catch (err) {
        setError('Unable to load leaderboard.');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id || entry.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <strong>{entry.user?.name || 'Unknown user'}</strong>
              <div className="text-muted">Score: {entry.score}</div>
            </div>
            <span className="badge bg-primary rounded-pill">#{entry.rank || 0}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
