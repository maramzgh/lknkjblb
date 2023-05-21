import '../assets/Home.css';
import Voiliers from './Voiliers';
import useFetch from '../useFetch';

import Banner from './Banner';

function Home() {
  const {
    data: voiliers,
    isPending,
    error,
  } = useFetch('http://localhost:5000/random-voiliers');

  return (
    <div className="home-container">
      <div>
        <Banner></Banner>
      </div>

      <div className="main-container">
        <div></div>
        <div>
          <h1 className="title">Some of our products</h1>
          {error && <div className="error">{error}</div>}
          {isPending && <div className="loading">Loading...</div>}
          {voiliers && (
            <div className="random-voiliers">
              <Voiliers voiliers={voiliers} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
