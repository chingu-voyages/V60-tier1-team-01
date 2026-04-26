import './style.css';
import { Header } from './components/layout/Header/Header.js';
import { Footer } from './components/layout/Footer/Footer.js';
import { Home } from './pages/Home/Home.js';
import { AddApplication } from './pages/AddApplication/AddApplication.js';
import { Applications, setupApplicationFilters } from './pages/Applications/Applications.js';
import { deleteApplication, updateApplication } from './utils/storage.js';
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
  const result = page ? await page() : '<p>Page not found</p>';
  const html = typeof result === 'object' ? result.html : result;
  document.getElementById('app').innerHTML = `
  ${Header()}
  ${html}
  ${Footer()}
  `;
  if (result.init) result.init();

  if (hash === 'dashboard') {
    await initDashboard();
  }

  // if on "applications" page, initialize filter listeners
  // and pass render() to be called after a filter change
  if (hash === 'applications') {
    setupApplicationFilters(render);
  }

  // TODO: replace per-element listeners below with a single delegated listener on #app
  // to avoid re-attaching on every render
  document.querySelectorAll('[data-delete]').forEach(Xbutton => {
    Xbutton.addEventListener('click', async () => {
      if (window.confirm('Are you sure you want to delete this application?')) {
        await deleteApplication(Xbutton.dataset.id);
        await render();
      }
    }); 
  });

  document.querySelectorAll('[data-id]').forEach(Status_span => {
    Status_span.addEventListener('click', async () => {
      const span = Status_span;
      const select = document.createElement('select');
      select.style.width = 'auto';

      ['applied', 'interview', 'offer', 'rejected'].forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        if (option === span.dataset.status) opt.selected = true;
        select.appendChild(opt);
      });

      select.dataset.id = span.dataset.id;
      span.replaceWith(select);

      select.addEventListener('change', async () => {
        await updateApplication(select.dataset.id, { status: select.value });
        await render();
      });
    });
  });
}

window.addEventListener('hashchange', render);
render();
