import './style.css';
import { Header } from './components/layout/Header/Header.js';
import { Footer } from './components/layout/Footer/Footer.js';
import { Home } from './pages/Home/Home.js';
import { AddApplication } from './pages/AddApplication/AddApplication.js';
import { Applications } from './pages/Applications/Applications.js';
import { deleteApplication } from './utils/storage.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';
import { initDashboard } from './pages/Dashboard/DashboardInit.js';

//url navigation
const routes = {
  '': Home,
  'add-application': AddApplication,
  'applications': Applications,
  'dashboard': Dashboard,
};

//page renderer for dynamic loading
async function render() {
  const hash = window.location.hash.slice(1) || '';
  const page = routes[hash];
  document.getElementById('app').innerHTML = `
    ${Header()}
    ${page ? await page() : '<p>Page not found</p>'}
    ${Footer()}
  `;
  if (hash === 'dashboard') {
    await initDashboard();
  }

  document.querySelectorAll('[data-id]').forEach(button => {
    button.addEventListener('click', async () => {
      if (window.confirm('Are you sure you want to delete this application?')) {
        await deleteApplication(button.dataset.id);
        await render();
      }
    });
  });
}

window.addEventListener('hashchange', render);
render();
