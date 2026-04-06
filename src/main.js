import './style.css';
import { Header } from './components/layout/Header/Header.js';
import { Footer } from './components/layout/Footer/Footer.js';
import { Home } from './pages/Home/Home.js';
import { AddApplication } from './pages/AddApplication/AddApplication.js';
import { Applications } from './pages/Applications/Applications.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';

//url navigation 
const routes = {
  '': Home,
  'add-application': AddApplication,
  'applications': Applications,
  'dashboard': Dashboard,
};

//page renderer for dynamic loading
function render() {
  const hash = window.location.hash.slice(1) || '';
  const page = routes[hash];
  document.getElementById('app').innerHTML = `
    ${Header()}
    ${page ? page() : '<p>Page not found</p>'}
    ${Footer()}
  `;
}

window.addEventListener('hashchange', render);
render();
