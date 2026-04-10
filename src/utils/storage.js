const useSupabase = !!import.meta.env.VITE_SUPABASE_URL;
const STORAGE_KEY = 'job_applications'

let getApplications, saveApplication, updateApplication, deleteApplication;

if (useSupabase) {

  getApplications = async () => {
    // TODO: supabase implementation
  }

  saveApplication = async (application) => {
    // TODO: supabase implementation
  }

  updateApplication = async (id, data) => {
    // TODO: supabase implementation
  }

  deleteApplication = async (id) => {
    // TODO: supabase implementation
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
