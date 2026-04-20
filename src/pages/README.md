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
- **Applications** - lists all applications fetched from storage. Supports inline status updates and delete, as well as filter by status.
- **Dashboard** - summary statistics and charts powered by Chart.js
