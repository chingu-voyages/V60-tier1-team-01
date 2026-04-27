import './style.css';
import { Header } from './components/layout/Header/Header.js';
import { Footer } from './components/layout/Footer/Footer.js';
import { Home } from './pages/Home/Home.js';
import { AddApplication } from './pages/AddApplication/AddApplication.js';
import { Applications, setupApplicationFilters } from './pages/Applications/Applications.js';
import { deleteApplication, updateApplication } from './utils/storage.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';
import { initDashboard } from './pages/Dashboard/DashboardInit.js';
import { supabase } from './utils/supabase.js';

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

  // if on "applications" page, initialize filter listeners
  // and pass render() to be called after a filter change
  if (hash === 'applications') {
    setupApplicationFilters(render);
  }

  document.querySelectorAll('[data-delete]').forEach(Xbutton => {
    Xbutton.addEventListener('click', async () => {
      if (window.confirm('Are you sure you want to delete this application?')) {
        await deleteApplication(Xbutton.dataset.delete);
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

window.addEventListener('hashchange', render); // re-renders page content and re-attaches event listeners on every navigation
render();

// online/offline indicator
function createConnectionIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'connection-indicator';
  indicator.className = 'connection-indicator';
  document.body.appendChild(indicator);
  return indicator;
}

async function updateConnectionIndicator() {
  let indicator = document.getElementById('connection-indicator');
  if (!indicator) indicator = createConnectionIndicator();

  if (!supabase) { // debugging branch for renaming the .env file
    indicator.innerHTML = '<span class="connection-dot connection-dot--offline"></span>offline';
    return;
  }

  try { // probe supabase for response, or default to offline
    const { error } = await supabase.from('applications').select('id').limit(1);
    if (error) throw error;
    indicator.innerHTML = '<span class="connection-dot connection-dot--online"></span>online';
  } catch {
    indicator.innerHTML = '<span class="connection-dot connection-dot--offline"></span>offline';
  }
}

createConnectionIndicator();
updateConnectionIndicator();
setInterval(updateConnectionIndicator, 30000);
