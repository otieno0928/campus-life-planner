  CAMPUS LIFE PLANNER 
  
A lightweight, accessible and responsive web application designed to help university students manage their daily coursework, studey schedules an dcampus events. Built strictly with the standard web tech, this project provides smooth organization tools without requiring heavy modern frameworks or external library dependencies.

Live Application: https://otieno0928.github.io/campus-life-planner/
Github repository: [link](https://github.com/otieno0928/campus-life-planner)
DEMO VIDEO LINK:https://youtu.be/Z7vZ6gOH6Bg
  TABLE OF CONTENTS
  
  1. Project Overview
  2. Features
  3. Setup & Local Installation
  4. Regex Validation Catalog 
  5. Keyborad Navigation Map 
  6. Accessibility (a11y) Notes
  7. Testing Instructions 
  8. Project structure

#Project Overview

Managing classes, assignments, library deadlines, and study group sessions can be overwhelming. The Campus LIfe planner gives students a single, fast dashboard to keep track of their tasks, calculate weekly study workload durations and quickly filter through items using live regex searches.
The application runs entirely on the browser's client side, using localstorage to save data safely between browser sessions without needing an external database setup. 

 #Features
 
*Event& task management(CRUD): Create, view, edit and delete academic tasks and campus events easily.
*Real-time Form Validation: Form entries are verified immediately as you type using custom regular expressions to catch errors before submission. 
*Live Search & filter: Dynamic live-search bar supporting plain text queries as well as custom Regular Expressions(Regex) with optional case insensitive sorting.
*Dashboard Metrics & Duration Warning: Automatically totals active tasks, calculates aggregate duration in minutes, and flags warnings if the weekly target caps are exceeded.
*Local Storage: All planner entries are stored in browser local storage, ensuring data remains saved after refreshing or closing the page.
*JSON import & export: Backup your planner data into a downloadable .json file or import existing data files into the system with built in schema error handling.
*Accessibility& Keyboard Friendly: It is fully structured with standard semantic html 5 elements, high contrast visual focus rings , visible ARIA live regions and screen reader support.

 #Setup& Local installation 
 
Because this application relies on standard HTML5, CSS3 and ES6, Javascript Modules without build tool dependencies, you can run it locally in just a few simple steps.
 Prerequisites:
 1. Any modern web browser(chrome, mozilla firefox, microsoft edge)
 2. VS Code with live server extension( or any local static file server) top support ES Module importing.
    
  #Running locally:
  
1. Clone the repo to your local machine ie git clone https://github.com/otieno0928/campus-life-planner.git
2. Navigate into the project folder ie cd campus life planner
3. Open the folder in an editor( e.g., VS Code)
4. Start a local HTTP Server ie in VS Code, right click the file i.e., index.html and select "open with live server"
5. Open your browser and navigate to ie http://127.0.0.1.5500/index.html

    #Regex Validation Catalog
   
This  is is divided into 3 sections; Field, Regex Pattern and Purpose / Validation Logic as illustrated below:
*Title Pattern == ^[A-Za-z0-9\s\-_:]{3,50}$ ==  Enforces 3 to 50 alphanumeric characters including spaces, hyphens, underscores, and colons.
*ISO Date == ^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$ == Validates strict YYYY-MM-DD date formatting.
*Duration == ^(?:[1-9]\d*|0(?:\.\d+)?)$ == Validates positive numerical values (integers or decimals).
*Category Tag == ^@[a-zA-Z0-9_-]{2,20}$ == Enforces category tags starting with @ followed by 2–20 alphanumeric characters.
*Safe Search ==  (?=.*[a-zA-Z])(?=.*\d) ==Advanced lookahead expression ensuring dynamic queries compile safely during real-time search.
#N/B: The symbols "==" have been used to separate the 3 sections due to lack of proper formating components ie rows and columns.

   #Keyboard Navigation Map
     
The entire web application can be comfortably navigated via a standard keyboard:
* Tab: Navigates forward through all the interactive controls, input fields, navigation links, and action buttons.
* Shift + Tab: Navigates through interactive elements. 
* Enter/Space: Activates buttons, toggles checkboxes, submits forms, or triggers navigation links.
* Esc: Clears focused inputs or dismissive active inline search filters.

Visual focus states are prominently styled using custom --focus-ring variables (#ff6f00) to guarantee high visual feedback during keyboard navigation. 

   #Accessibility(a11y) Notes 
   
* Semantic Layout: Designed using landmark elements(<headers>, <nav>, <main>, <footer>, <section>) and strict sequential heading hierachies(<h1> and <h3>).
* Form Association: Every input field explicitly connected to a dedicated <label> using matching for and id attributes.
* Screen Reader Support: Dynamic updates (such as live validation messages and task filters) use aria-live="polite" regions so assistive technology reads live state updates clearly without disrupting user interaction. 
* Color Contrast: All custom CSS variables maintain a WCAGAA- compliant contrast ratio relative to background container colors.

     #Testing Instructions
  
Automated test assertions are built into the repository to verify input rules and live search pattern logic: 
1. Open a browser and navigate to http://127.0.0.1:5500/tests.html 
2. The browser will run the assertion section automatically via ES modules upon loading. 
3. Review the test dashboard items: 
* Green panels indicate success in the regex checks and inputs.
* Any failing tests will display red alert boxes detailing expected outcomes vs actual outcomes. 

#Project structure

campus-life-planner/
├── index.html           # Main application interface & dashboard
├── tests.html           # Automated testing validations page
├── README.md            # Project procedure & guidelines
├── styles/
│   ├── style.css        # Main stylesheet, variables, and responsive layout
│   └── tests.css        # Specific styles for the validation test runner UI (tests.html)
└── scripts/
    ├── app.js           # Core application entry point & DOM event wiring
    ├── storage.js       # localStorage management & JSON import/export
    ├── validation.js    # Regex validation definitions & error handlers
    ├── search.js       # Live search & regex pattern filtering engine
    └── tests.js         # Automated assertion test suite engine
