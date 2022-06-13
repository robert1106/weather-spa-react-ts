import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WeatherItemPage from './components/WeatherItemPage';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import Lang from './components/Lang';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
  }
  
  body {
    background:  linear-gradient(90deg, #020024 0%, #090979 50%, #020024 100%);
    padding: 2rem;
  }
  
  ul {
    list-style: none;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={setupStore()}>
    <Global />
    <Lang />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path={'/:idCity'} element={<WeatherItemPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
