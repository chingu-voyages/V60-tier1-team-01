import { supabase } from './supabase.js';


const useSupabase = !!import.meta.env.VITE_SUPABASE_URL;
const STORAGE_KEY = 'job_applications';
const CACHE_KEY = 'cached_applications';
const QUEUE_KEY = 'offline_queue';

// probe supabase to check if we have a live connection
async function isOnline() {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('applications').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}

function getQueue() {
  return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
}

function enqueue(operation) {
  const queue = getQueue();
  queue.push({ ...operation, timestamp: new Date().toISOString() });
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

let getApplications, saveApplication, updateApplication, deleteApplication, getStatusHistory;

// if/else branch for using Supabase database 
// if the .env attributes are present and functioning correctly 
// and the system is online. otherwise fallback to localStorage (browser). 
// This enables testing and development even without a connection to the database
if (useSupabase) {

  getApplications = async () => {
    if (!await isOnline()) {
      return JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
    }
    const { data, error } = await supabase.from('applications').select('*').order('id');
    if (error) throw error;
    localStorage.setItem(CACHE_KEY, JSON.stringify(data)); // keep cache fresh
    return data;
  }

  saveApplication = async (application) => {
    if (!await isOnline()) {
      const queued = { ...application, id: crypto.randomUUID(), created_at: new Date().toISOString() };
      enqueue({ type: 'save', payload: queued });
      const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
      cache.push(queued);
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      return queued;
    }
    const { data, error } = await supabase.from('applications').insert([application]).select().single();
    if (error) throw error;
    return data;
  }

  updateApplication = async (id, data) => {
    if (!await isOnline()) {
      enqueue({ type: 'update', payload: { id, data } });
      const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
      const index = cache.findIndex(app => app.id === id);
      if (index !== -1) cache[index] = { ...cache[index], ...data };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      return cache[index];
    }
    const { data: current, error: fetchError } = await supabase.from('applications').select('status').eq('id', id).single();
    if (fetchError) throw fetchError;

    if (data.status && data.status !== current.status) {
      await supabase.from('status_history').insert([{
        application_id: id,
        status: data.status,
        changed_at: new Date().toISOString()
      }]);
    }

    const { data: updated, error } = await supabase.from('applications').update(data).eq('id', id).select().single();
    if (error) throw error;
    return updated;
  }

  deleteApplication = async (id) => {
    if (!await isOnline()) {
      enqueue({ type: 'delete', payload: { id } });
      const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache.filter(app => app.id !== id)));
      return;
    }
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) throw error;
  }

  // status_history table functions
  getStatusHistory = async () => {
    const { data, error } = await supabase.from('status_history').select('*').order('id');
    if (error) throw error;
    return data;
  }

} else { // fallback to localStorage if supabase fails

  getApplications = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  }

  saveApplication = (application) => {
    const applications = getApplications()
    const newApplication = {
      ...application,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    applications.push(newApplication)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
    return newApplication
  }

  updateApplication = (id, data) => {
    const applications = getApplications()
    const index = applications.findIndex(app => app.id === id)
    if (index === -1) return null

    if (data.status && data.status !== applications[index].status) {
      const history = JSON.parse(localStorage.getItem('status_history') || '[]')
      history.push({
        id: crypto.randomUUID(),
        application_id: id,
        status: data.status,
        changed_at: new Date().toISOString()
      })
      localStorage.setItem('status_history', JSON.stringify(history))
    }

    applications[index] = { ...applications[index], ...data, updatedAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
    return applications[index]
  }

  deleteApplication = (id) => {
    const applications = getApplications()
    const filtered = applications.filter(app => app.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return filtered
  }

  getStatusHistory = () => {
    return JSON.parse(localStorage.getItem('status_history') || '[]')
  }

}

// drains the offline queue and replays each operation against Supabase
export async function flushQueue() {
  const queue = getQueue();
  if (!queue.length) return 0;

  const remaining = [];

  for (const operation of queue) {
    try {
      if (operation.type === 'save') {
        const { id, created_at, ...fields } = operation.payload;
        await supabase.from('applications').insert([fields]);
      } else if (operation.type === 'update') {
        await supabase.from('applications').update(operation.payload.data).eq('id', operation.payload.id);
      } else if (operation.type === 'delete') {
        await supabase.from('applications').delete().eq('id', operation.payload.id);
      }
    } catch {
      remaining.push(operation); // keep failed operations in the queue
    }
  }

  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));

  const flushed = queue.length - remaining.length;
  if (flushed > 0) {
    // refresh cache from Supabase after flush
    const { data } = await supabase.from('applications').select('*').order('id');
    if (data) localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  }

  return flushed;
}

export function getQueueLength() {
  return getQueue().length;
}

export { getApplications, saveApplication, updateApplication, deleteApplication, getStatusHistory };
