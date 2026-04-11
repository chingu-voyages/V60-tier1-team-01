import { getApplications } from '../../utils/storage.js';

export async function Applications() {
  const applications = await getApplications();

  const list = applications.map(app => `
    <div class="group flex items-center justify-between p-4 border rounded mb-2">
      <span>${app.company}</span>
      <span>${app.role}</span>
      <span>${app.status}</span>
      <button class="opacity-0 group-hover:opacity-100 text-red-500" data-id="${app.id}">✕</button>
    </div>
  `).join('');

  return `
    <main class="pt-20 px-6 max-w-3xl mx-auto">
      <h1>Applications</h1>
      ${list}
    </main>
  `;
}
