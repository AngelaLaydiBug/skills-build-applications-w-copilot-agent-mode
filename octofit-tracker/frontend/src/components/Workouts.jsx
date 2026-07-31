import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        const payload = await response.json();
        setWorkouts(normalizeCollection(payload));
      } catch (err) {
        setError('Unable to load workouts.');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id} className="list-group-item">
            <strong>{workout.name}</strong> - {workout.difficulty}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
