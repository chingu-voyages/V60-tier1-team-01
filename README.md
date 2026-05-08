# Project Overview

Jobify is an application management system for busy job seekers to organize and track their job applications all in one place. Add, edit, and delete applications, filter and sort by status, and view analytics and metrics in a visual dashboard. Jobify works offline: changes queue locally and sync to the database when your connection is restored.

## Stack

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)

## Installation

```bash
#clone repository and change directory
git clone https://github.com/chingu-voyages/V60-tier1-team-01.git
cd V60-tier1-team-01

#install dependencies
npm ci

#run dev server
npm run dev
```

### Database configuration

You will need an `.env` file configured with the parameters outlined in `.env.example` for the database to connect to Supabase.

Without an `.env` file, the app falls back to localStorage automatically, so you can develop and test without a Supabase connection.

## Using the App

### Adding an application

Click **Add Application** in the nav. Fill in Company Name, Role, Date Applied, Location, and Status. All fields are required except Notes. Submit the form to save it. Validation errors appear inline if anything is missing or invalid.

### Viewing and managing applications

Click **Applications** in the nav to see all your entries. Toggle between table and card view using the button in the top right. Filter by status using the buttons above the list. To update a status inline, click the status to use the dropdown directly in the row or card. To edit other fields, click the **Edit** button to open a prefilled modal. To remove an entry, click **Delete**.

### Dashboard

Click **Dashboard** in the nav for an overview of your job search. The top section shows total application counts and recent activity. Below that, conversion rate metrics break down your Applied > Interview, Interview > Offer, and rejection rates, along with your average response time. A pie chart visualizes your application statuses.

### Offline mode

Jobify works without an internet connection. If your connection drops, a status indicator appears in the bottom corner of the screen showing **offline** and a count of any pending changes. Write operations (add, edit, delete) are queued locally and applied immediately to the UI so you can keep working. When your connection is restored, the queue flushes automatically and the indicator briefly shows how many changes were synced.

<details>
<summary><strong>Acceptance Criteria</strong></summary>

- [x] You should include a good readme in your project repo.
- [x] Add acceptance criteria to your readme for any stretch goals you choose to implement.
- [x] Error messages are displayed at the time an error is detected. These should be clear and provide advice for how to correct the error.
- [x] The UI provides clear feedback for invalid inputs.
- [x] The UI should be responsive.
- [x] Your application must allow users to add a job application by entering at least the following fields: Company Name, Role, Date Applied, Location, Status.
- [x] Users should be able to view all applications in a structured layout (table or cards). Each application must clearly display essential attributes.
- [x] Users should be able to change the status of an existing application.
- [x] Users must be able to edit an existing application and be able to delete an application from the tracker.
- [x] Data is stored for use in repeat sessions.
- [x] Users must be able to filter applications by status.
- [x] Your application must include a dashboard or summary section displaying basic information such as:
  - Total number of applications
  - Recent applications
- [x] Users must have conversion rate analytics dashboard showing metrics on:
  - Applied → Interview %
  - Interview → Offer %
  - Rejection rate
  - Average response time — date applied to first status change

</details>

<details>
<summary><strong>Stretch Goals</strong></summary>

- [ ] Allow users to search by company name or role. Search must update dynamically.
- [ ] In addition to status filtering, allow users to filter by date range or location.
- [ ] Add tagging system (e.g. Remote, Startup, Contract).
- [ ] Add a resume upload field since job seekers may apply to different jobs with different resumes.
- [ ] Allow users to import data into a spreadsheet they can open with Excel.
- [ ] Allow users to add network contacts to applications and to set auto-reminders for contacting them.
- [x] Implement visual charts (bar or pie charts) to help users with analytics and tracking.
- [x] You can allow users to toggle between table, card and board views when viewing applications.
- [ ] Authenticate users via Google or Github to enhance your app's security.
- [x] Allow users to switch between light and dark mode.
- [ ] Integrate AI into your app to provide users with job search performance insights.
- [ ] Allow users to have application deadline and a deadline approaching warning.
- [ ] Allow users to have a trend analysis for applications/interviews per month chart.
- [x] Allow users to have offline mode.

</details>

## Branch/PR Workflow

- Branch off the `development` branch and title branches using category prefixes (eg. `feature/branch`, `bugfix/branch`, `docs/branch`)
- PRs automatically compare to `development` as the default branch
- `development` gets merged into `main` at the end of each sprint

## Deployments

- [Production](https://v60-tier1-team-01.vercel.app/)
- [Development](https://github.com/chingu-voyages/V60-tier1-team-01/deployments/Preview)

## Our Team


- Dustin Hoeppner: [GitHub](https://github.com/dhoepp) / [LinkedIn](https://linkedin.com/in/dustin-hoeppner)
- Zien Alhawshi: [GitHub](https://github.com/Zien-Alhawshi) / [LinkedIn](https://www.linkedin.com/in/zien-alhawshi-a5235a25b/)
- Gabriele Zenobi: [GitHub](https://github.com/GabrieleRepo) / [LinkedIn](https://linkedin.com/in/gabriele-zenobi)
- Priscilla Anim: [GitHub](https://github.com/priscilla-anim) / [LinkedIn](https://linkedin.com/in/priscilla-koramah-anim)
- Martin Karimi  : [GitHub](https://github.com/buzzcodier) / [LinkedIn](https://www.linkedin.com/in/martin-rubi-92b51a400)
