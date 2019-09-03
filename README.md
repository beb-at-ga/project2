# Background and Overview 
Foot on Ferry is an application to provide forecasting and alerts for ferry commuters, particularly walking and cycling commuters. By performing a mashup of WSDOT Web Services, geolocation, estimated commute times from Mapbox or Google Maps, and a user's personal preferrences, the application was intended to estimate a departure time, alert the user when they should plan their departure, and alert again when they should depart based on real world conditions rather than regular schedules. 

The project was born to solve a problem: catching a particular ferry, whether the ferry is on-schedule or not, while maximizing happy hour time. In other words, "As a user, I want to leave my fixed location as late as possible to arrive at a departing ferry just-in-time so that I can maximize my non-commute time and minimize the wait at the terminal." There are currently about 30 user stories spread between bar napkins, markdown editors and Jira. 

The first step of the project was to understand the available data in the WSDOT Web Services API. This turned out to be more cumbersome and time consuming than expected. Data is spread and duplicated among several endpoints, with inconsistent and unclear relationships between them. This resulted in several cases of re-work to obtain the desired data. The issue of re-work was compounded by the lack of a clear user experience plan. As data was obtained, mashed up, and presented, it became clear that the data being obtained was insufficient to meet the next objective. By Wednesday afternoon of project week, nearly the entire project had been scrapped and started anew with a different set of endpoints and a new design approach. Adding to the inadiquate/poor design problem, was the technical ambiguity around getting data from the back-end to the front-end efficiently and with as few steps as possible. The resultant product is a blend of back-end and client-side processing that is grossly convoluted. Because data processing is spread between tiers, error handling is inadiquate even for an MVP. Lastly, the geolocation service of HTML5 is aweful. Using the service nativly or from within Mapbox, the success rate of obtain any geolocation data is between 40-60%. It works great for awhile, then not at all under completly identical conditions.  

The application currently registers a new user, provides a sign-in/sign-out function, stores some simple user preferrences, provides a look-up WSDOT Ferry "journeys", the uni-directional component of a bi-directional route and allows the "favoriting" of those journeys. The application provides a simple map that is dynamically updated with an estimated route based on the users walking/cycling preferrence from their current location to a selected terminal. The application does not provide the estimated time of departure, nor the estimated time enroute from current location to next terminal, at this time. 


# Instructions
Access the application at https://footonferry.com.

- Register an account.
- Update your preferences: first name, phone, preferred transport to terminals (walking/cycling).
- Add Journeys
- View routes to terminals.
- Remove Journeys from preferrences.


# Tools/Technologies
- MacBook Pro
- WSDOT Traveler Information API (https://www.wsdot.wa.gov/traffic/api/)
- Visual Studio Code
  - Beutify
  - Dash
  - Docker
  - ESLint
  - GitLens
  - HTML Boilerplate
  - HTML Snippets
  - Open in Browser
  - Material Theme, Ocean High Contrast
- Docker
  - PostgreSQL ("latest", for local devlopment. https://hub.docker.com/_/postgres)
  - Node.js ("current-alpine", https://hub.docker.com/_/node/)
- Node.js
  - Express and related packages
  - Embeded JavaScript (EJS)
  - Sequelize
  - PostgreSQL
  - Async  
  - Axios
  - Bcryptjs
  - Passport
- Client Libraries
  - jQuery
  - DataTables.net
  - Mapbox
  - Materialize
- DBeaver
- Git/Github
- Jira Software (for project planning)
- Joplin (for Markdown notes)
- Dash (for offline documentation)
- Beyond Compare
- Monster Energy Zero-Ultra, Reign Peach Fizz, loads of General Assembly coffee and occasionally a Pegasus iced doppio.
- Sparky (aka Jordan Levine, product manager extraodinaire)
- Vibe Coworks (https://www.vibecoworks.com/)
- draw.io (https://about.draw.io/)
- Amazon Web Services (production deployment)
  - Route 53, EC2, RDS

