import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
          const codespace = import.meta.env?.VITE_CODESPACE_NAME;
          const usersUrl = codespace
            ? `https://${codespace}-8000.app.github.dev/api/users/`
            : `${getApiBaseUrl()}/api/users/`;

          const response = await fetch(usersUrl);
          const payload = await response.json();
          setUsers(normalizeCollection(payload));
      } catch (err) {
        setError('Unable to load users.');
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id || user.id || user.email} className="list-group-item">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
