import { supabase } from './supabase.js';


const useSupabase = !!import.meta.env.VITE_SUPABASE_URL;
const STORAGE_KEY = 'job_applications'

let getApplications, saveApplication, updateApplication, deleteApplication;

if (useSupabase) {

  getApplications = async () => {
    const { data, error } = await supabase.from('applications').select('*');
    if (error) throw error;
    return data;
  }

  saveApplication = async (application) => {
    const { data, error } = await supabase.from('applications').insert([application]).select().single();
    if (error) throw error;
    return data;
  }

  updateApplication = async (id, data) => {
    const { data: updated, error } = await supabase.from('applications').update(data).eq('id', id).select().single();
    if (error) throw error;
    return updated;
  }

  deleteApplication = async (id) => {
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) throw error;
  }

} else {

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
    applications[index] = {
      ...applications[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
    return applications[index]
  }

  deleteApplication = (id) => {
    const applications = getApplications()
    const filtered = applications.filter(app => app.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return filtered
  }

}

export { getApplications, saveApplication, updateApplication, deleteApplication };
