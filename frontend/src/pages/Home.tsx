import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../api/auth';
import type { AxiosResponse } from 'axios';


const Home = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then((res: AxiosResponse) => {
        setUser(res.data.user)
      })
      .catch(() => navigate('/login'));
  }, [])

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard {user.username || user.email}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Home;
