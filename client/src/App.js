import './App.css';
import { BrowserRouter, Route, Routes ,Navigate } from 'react-router-dom';
import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import VoilierDetails from './Components/VoilierDetails';
import Footer from './Components/Footer';
import AllVoiliers from './Components/AllVoiliers';
import Registration from './Components/Registration';
import SearchF from './Components/SearchF';
import Compare from './Components/Compare';
import Favorites from './Components/Favorites';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import Dashboard from './Components/Dashboard';

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [favoriteSailboats, setFavoriteSailboats] = useState([]);
  const [userRole, setUserRole] = useState('user');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (typeof storedToken === 'string' && storedToken !== '') {
      try {
        const decodedToken = jwtDecode(storedToken);
        console.log('Decoded Token:', decodedToken);

        setUsername(decodedToken.username);
        setUserId(decodedToken.userId);
        setUserRole(decodedToken.role);
        setLoginSuccess(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setLoginSuccess(false);
      }
    } else {
      setLoginSuccess(false);
    }
  }, []);

  useEffect(() => {
    const fetchFavoriteSailboats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/users/${userId}/favorites`
        );
        const data = await response.json();
        setFavoriteSailboats(data.favorites);
      } catch (error) {
        console.error('Error fetching favorite sailboats:', error);
      }
    };

    if (loginSuccess && userId) {
      fetchFavoriteSailboats();
    }
  }, [loginSuccess, userId]);
  console.log(userRole)
  return (
    <BrowserRouter>
      {userRole === 'Admin' && <Dashboard />}
      {userRole === 'user' && (
        <div className="App d-flex flex-column">
          <MyNavbar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/voiliers/:id"
                element={
                  <VoilierDetails
                    loginSuccess={loginSuccess}
                    userId={userId}
                    favoriteSailboats={favoriteSailboats}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <Favorites
                    userId={userId}
                    favoriteSailboats={favoriteSailboats}
                  />
                }
              />

              <Route path="/voiliers" element={<AllVoiliers />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/search" element={<SearchF />} />
              <Route path="/compare" element={<Compare />} />

              {/* Redirect to home page if user role is not recognized */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer></Footer>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
