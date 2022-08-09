import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import store from './redux/store'
// import { Provider } from 'react-redux'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Game from './components/gameComponents/Game';
// import Statistics from './components/statisticsComponents/statistics';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  // <BrowserRouter>
  //   <Provider store={store}>
  //     <Routes>
  //       <Route path='/' element={<App />}>
  //         <Route path='/' element={<Game />} />
  //         <Route path='/statistics' element={<Statistics />} />
  //       </Route>
  //     </Routes>
  //   </Provider>

  // </BrowserRouter>
);

