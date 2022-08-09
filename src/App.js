import { Outlet } from 'react-router-dom';
import './App.css';
import Navigation from './components/layout/navigation'
import store from './redux/store';
import Game from './components/gameComponents/Game';
import Statistics from './components/statisticsComponents/statistics';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Navigation />
          <Routes>
            <Route path='/' element={<Game />} />
            <Route path='/statistics' element={<Statistics />} />
          </Routes>
        </Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
