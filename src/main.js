import './style.css';
import { Header } from './components/layout/Header/Header.js';
import { Footer } from './components/layout/Footer/Footer.js';
import { Home } from './pages/Home/Home.js';
import { AddApplication } from './pages/AddApplication/AddApplication.js';
import { Applications, setupApplicationFilters } from './pages/Applications/Applications.js';
import { deleteApplication, updateApplication, getApplications, flushQueue, getQueueLength } from './utils/storage.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';
import { initDashboard } from './pages/Dashboard/DashboardInit.js';
import { supabase } from './utils/supabase.js';
import { openEditModal } from './components/applications/editModal.js';

//url navigation
const routes = {
  '': Home,
  'add-application': AddApplication,
  'applications': Applications,
  'dashboard': Dashboard,
};

//parent event listeners
async function eventListener() {
  
  document.getElementById('app').addEventListener('click', async (e) => {
    if (e.target.closest('[data-delete]')) {
      // handle delete
      if (window.confirm('Are you sure you want to delete this application?')) {
        await deleteApplication(e.target.closest('[data-delete]').dataset.delete);
        await render();
      }; 
    }
    if (e.target.closest('[data-id]')) {
      // handle status
      const span = e.target.closest('[data-id]');
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
    }

    // handle edit application click
    const editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      const id = editBtn.dataset.edit;

      // fetch all applications
      const applications = await getApplications();

      // find specific application
      const app = applications.find(a => String(a.id) === String(id));
      
      // open modal with selected appplication and pass 'render' as a callback 
      // to refresh the UI after the data has been saved.
      if (app) {
        openEditModal(app, render);
      }
    }
  });

}

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

 
}

// apply theme from saved preference or system setting
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.documentElement.setAttribute('data-theme', savedTheme || systemTheme);

// keep in sync with system if no manual override is saved
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

window.addEventListener('hashchange', render);
render();
eventListener();

// online/offline indicator
function createConnectionIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'connection-indicator';
  indicator.className = 'connection-indicator';
  document.body.appendChild(indicator);
  return indicator;
}

let wasOffline = false;

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

    // just came back online — flush the queue
    if (wasOffline) {
      wasOffline = false;
      const flushed = await flushQueue();
      if (flushed > 0) {
        indicator.innerHTML = `<span class="connection-dot connection-dot--online"></span>${flushed} offline change${flushed > 1 ? 's' : ''} synced`;
        await render(); // refresh UI with up-to-date data
        setTimeout(() => {
          indicator.innerHTML = '<span class="connection-dot connection-dot--online"></span>online';
        }, 4000);
        return;
      }
    }

    indicator.innerHTML = '<span class="connection-dot connection-dot--online"></span>online';
  } catch {
    wasOffline = true;
    const queued = getQueueLength();
    const queuedText = queued > 0 ? ` · ${queued} queued` : '';
    indicator.innerHTML = `<span class="connection-dot connection-dot--offline"></span>offline${queuedText}`;
  }
}

createConnectionIndicator();
updateConnectionIndicator();
setInterval(updateConnectionIndicator, 30000);

// theme toggle button
function createThemeToggle() {
  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.className = 'theme-toggle';
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Toggle theme">
      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" class="toggle-icon-half"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" class="toggle-icon-ring"/>
    </svg>
  `;
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  });
}

createThemeToggle();
