import { useEffect, useState } from 'react';
import { fetchUsers, fetchActivities, API_BASE_URL } from './api';

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersData, activitiesData] = await Promise.all([fetchUsers(), fetchActivities()]);
        setUsers(usersData);
        setActivities(activitiesData);
      } catch (err) {
        setError('Unable to fetch API data.');
      }
    }

    loadData();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>Modern multi-tier React + Express + MongoDB starter.</p>
        <p>API base URL: <code>{API_BASE_URL}</code></p>
      </header>
      {error && <div className="error">{error}</div>}
      <section>
        <h2>Users</h2>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </section>
      <section>
        <h2>Activities</h2>
        <pre>{JSON.stringify(activities, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
