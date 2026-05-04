# utils/

Shared utility modules used across the app.

## storage.js

The data layer for the app. All database reads and writes go through this file - pages never call Supabase or localStorage directly.

If `VITE_SUPABASE_URL` is present in `.env`, all functions use Supabase. If not, they fall back to localStorage automatically. This means the app works without a database connection for local development and testing.

### Functions

- `getApplications()` - fetch all applications
- `getStatusHistory()` - fetch all status change history records, used by the dashboard for conversion rate and response time metrics
- `saveApplication(data)` - insert a new application
- `updateApplication(id, data)` - update an existing application by ID. Also writes to `status_history` if the status changed.
- `deleteApplication(id)` - delete an application by ID

To add a new function, add it to both the Supabase branch and the localStorage branch, then export it at the bottom.

## validation.js

Form validation helpers. Each function returns an error message string if invalid, or `null` if valid.

- `validateRequired(value, fieldName)` - checks that a field is not empty
- `validateText(value, fieldName)` - checks that a text field meets character constraints
- `validateDate(value)` - checks that a date is present and not in the future
- `validateNotes(value)` - checks that notes don't exceed the character limit

## formUtils.js

DOM helpers for displaying and clearing inline validation errors on form inputs.

- `showError(input, message)` - marks an input invalid and renders an error message beneath it
- `clearError(input)` - removes the error state from an input

## supabase.js

Initializes the Supabase client using environment variables. Returns `null` if the env variables are not set, which triggers the localStorage fallback in `storage.js`.
