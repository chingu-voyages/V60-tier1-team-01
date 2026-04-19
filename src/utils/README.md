# utils/

Shared utility modules used across the app.

## storage.js

The data layer for the app. All database reads and writes go through this file - pages never call Supabase or localStorage directly.

If `VITE_SUPABASE_URL` is present in `.env`, all functions use Supabase. If not, they fall back to localStorage automatically. This means the app works without a database connection for local development and testing.

### Functions

- `getApplications()` - fetch all applications
- `saveApplication(data)` - insert a new application
- `updateApplication(id, data)` - update an existing application by ID. Also writes to `status_history` if the status changed.
- `deleteApplication(id)` - delete an application by ID

To add a new function, add it to both the Supabase branch and the localStorage branch, then export it at the bottom.

## supabase.js

Initializes the Supabase client using environment variables. Returns `null` if the env variables are not set, which triggers the localStorage fallback in `storage.js`.

## auth.js (coming soon)

Handles GitHub OAuth via Supabase Auth.

- `signInWithGitHub()` - redirects to GitHub for authentication
- `signOut()` - signs the current user out
- `getUser()` - returns the currently authenticated user, or `null`
