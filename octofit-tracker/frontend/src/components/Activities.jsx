import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const payload = await response.json();
        setActivities(normalizeCollection(payload));
      } catch (err) {
        setError('Unable to load activities.');
      }
    }

    loadActivities();
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id} className="list-group-item">
            <strong>{activity.type}</strong> - {activity.durationMinutes} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
