import './App.css';
import Navigation from './components/layout/navigation'
import store, {persistor} from './redux/store';
import Game from './components/gameComponents/Game';
import Statistics from './components/statisticsComponents/statistics';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <Routes>
              <Route path='/' element={<Game />} />
              <Route path='/statistics' element={<Statistics />} />
            </Routes>            
          </PersistGate>

        </Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
