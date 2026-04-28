# Project Overview

Jobify is an application management system for busy job seekers to organize and track their job applications all in one place. Allowing the user to enter as many applications as they need, sort and filter them, and view analytics and metrics in a visual dashboard. 

## Stack

- Vite
- Tailwind CSS
- Vanilla JS
- Supabase
- Chart.js


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
- [ ] Users must be able to edit an existing application and be able to delete an application from the tracker.
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
- [ ] Allow users to have offline mode.

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
