import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        const payload = await response.json();
        setTeams(normalizeCollection(payload));
      } catch (err) {
        setError('Unable to load teams.');
      }
    }

    loadTeams();
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.id} className="list-group-item">
            <strong>{team.name}</strong> - {team.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
