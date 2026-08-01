import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
          const codespace = import.meta.env?.VITE_CODESPACE_NAME;
          const teamsUrl = codespace
            ? `https://${codespace}-8000.app.github.dev/api/teams/`
            : `${getApiBaseUrl()}/api/teams/`;

          const response = await fetch(teamsUrl);
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
