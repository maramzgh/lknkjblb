import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import VoilierDetails from './Components/VoilierDetails';
import Container from 'react-bootstrap/Container';
import Footer from './Components/Footer';
import AllVoiliers from './Components/AllVoiliers';
import ConnectButton from './Components/ConnectButton';
import Registration from './Components/Registration';
import SearchF from './Components/SearchF';


function App() {
  //search bar
  // const [searchResult, setSearchResult] = useState([]);
  // const performSearch = (searchQuery) => {
  //   const SearchResults = data.voiliers.filter((voilier) => {
  //     voilier.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   });
  //   setSearchResult(SearchResults);
  // };
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column">
        <MyNavbar></MyNavbar>
        <main className="main ">
          <Container>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route
                path="/voiliers/:id"
                element={<VoilierDetails></VoilierDetails>}
              />
              <Route
                path="/voiliers"
                element={<AllVoiliers></AllVoiliers>}
              ></Route>
              <Route
                path="/register" element={<Registration/>}
              ></Route>
              <Route
                path="/ConnectButton"
                element={<ConnectButton></ConnectButton>}
              ></Route>
               <Route path="/search" element={<SearchF />} />
              

            </Routes>
          </Container>
        </main>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
