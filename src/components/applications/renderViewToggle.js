// Renders the switch to toggle between cards and table view
export function renderViewToggle(viewMode) {
  // add 'checked' attribute in input checkbox if the current view is 'table'
  const isTableChecked = viewMode === "table" ? "checked" : "";  

  return `
    <div class="flex justify-center mb-5">
      <label class="inline-flex items-center cursor-pointer">
        <span class="select-none text-sm font-medium text-heading">
          Cards
        </span>

        <input 
          type="checkbox" 
          id="view-toggle" 
          class="sr-only peer" 
          ${isTableChecked}
        >

        <div class="relative mx-3 w-9 h-5 bg-gray-400 rounded-full
                    peer-checked:bg-green-900
                    after:content-[''] after:absolute after:top-0.5 after:left-0.5
                    after:bg-white after:rounded-full after:h-4 after:w-4
                    after:transition-all
                    peer-checked:after:translate-x-full">
        </div>

        <span class="select-none text-sm font-medium text-heading">
          Table
        </span>
      </label>
    </div>
  `
}