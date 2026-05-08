# pages/

Each page lives in its own folder containing two files:

- `PageName.html` - the markup. Edit this for layout and content.
- `PageName.js` - imports the HTML and handles any JS logic (event listeners, data fetching, etc.)

## Routing

Pages are registered in `src/main.js` in the `routes` object. The router reads the URL hash (e.g. `#applications`) and calls the matching page function, injecting the result into `<div id="app">`.

To add a new page:

1. Create a new folder under `src/pages/`
2. Add a `.html` and `.js` file following the existing pattern
3. Export a function from the `.js` file
4. Import it in `main.js` and add it to the `routes` object

## Pages

- **Home** - landing page with hero section and CTAs
- **AddApplication** - form for submitting a new job application. Includes validation and draft persistence via localStorage.
- **Applications** - lists all applications fetched from storage. Supports inline status updates, edit (via modal), delete, filter by status, and a card/table view toggle.
- **Dashboard** - summary statistics and charts powered by Chart.js. Includes total counts, interview/offer/response rates, conversion rates, average time to response, and a pie chart that updates with the active color theme. Logic is split between `Dashboard.js` (markup) and `DashboardInit.js` (data fetching and chart initialization).

---

# components/

Reusable UI components shared across pages. Lives at `src/components/`.

## applications/

Rendering and interaction components for the Applications page.

- `renderTable.js` — `renderApplications(applications)` — renders the applications list as an HTML table
- `renderCards.js` — `renderCards(applications)` — renders the applications list as a card grid
- `renderStatusFilters.js` — `renderFilterButtons(activeFilter)` — renders the status filter button row, marking the active filter
- `renderViewToggle.js` — `renderViewToggle(viewMode)` — renders the card/table view toggle button
- `editModal.js` — `openEditModal(app, onSaveSuccess)` — opens a prefilled edit modal for an existing application. Calls `updateApplication` on save and invokes the `onSaveSuccess` callback to refresh the list.

## layout/

- `Header/Header.js` — `Header()` — renders the site header with navigation
- `Footer/Footer.js` — `Footer()` — renders the site footer
