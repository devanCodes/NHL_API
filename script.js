// The fetch function is called with the below API URL as a parameter. This initiates the HTTP GET request to this API
fetch('https://statsapi.web.nhl.com/api/v1/teams')
// 'then' returns a promise from the fetch function and will parse the response as JSON
  .then(response => response.json())
// the second 'then' returns a promise from the first 'then' with the partse JSON data as a parameter  
  .then(data => {
// retrives franchises property from the parsed data which will be an array of objects, each object representing an NHL franchise
    const teams = data.teams;
// using the ID of the dropdown box in index.html file    
    const selectedTeam = document.getElementById("teamSelect"); 
// forEach loop iterates over each franchise object in the franchises array and extracts the teamName property
    teams.forEach(teams => {
        const teamName = teams.name;
        const teamID = teams.id;
// new option element is created and the text property of the option element is set to the teamName of the current franchise        
        const optionElement = document.createElement("option");
        optionElement.value = teamID;
        optionElement.text = teamName;
// this optionElement is then appended to the selectElement (aka the dropdown box options)       
        selectedTeam.appendChild(optionElement);
    });
  })
// handle any errors that might occur during the fetch request  
  .catch(error => {
    console.log('Error:', error);
  });


// function to be called when the button is clicked
function displayInfo() {
// get the selected team from the dropdown box  
  const selectedTeam = document.getElementById("teamSelect").value;
// check if a team is selected
  if (selectedTeam !== "") {
// construct the URL for fetching team-specific data    
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${selectedTeam}`)
      .then(response => response.json())
      .then(data => {
        const teamName = data.teams[0].name;
        const venueName = data.teams[0].venue.name;
        const venueCity = data.teams[0].venue.city;
        const abbreviation = data.teams[0].abbreviation;
        const firstYearOfPlay = data.teams[0].firstYearOfPlay;
        const divisionName = data.teams[0].division.name;
        const conferenceName = data.teams[0].conference.name;  
// Create a table to display the team information
        const table = document.createElement("table");
        table.innerHTML = `
          <tr>
            <th>Team Name</th>
            <td>${teamName}</td>
          </tr>
          <tr>
            <th>Venue Name</th>
            <td>${venueName}</td>
          </tr>
          <tr>
            <th>Venue City</th>
            <td>${venueCity}</td>
          </tr>
          <tr>
            <th>Abbreviation</th>
            <td>${abbreviation}</td>
          </tr>
          <tr>
            <th>First Year of Play</th>
            <td>${firstYearOfPlay}</td>
          </tr>
          <tr>
            <th>Division</th>
            <td>${divisionName}</td>
          </tr>
          <tr>
            <th>Conference</th>
            <td>${conferenceName}</td>
          </tr>
        `;  
// Append the table to a container on the HTML page
        const container = document.getElementById("teamInfoContainer");
        container.innerHTML = "";
        container.appendChild(table);
      })
// handle any errors that might occur during the fetch request
      .catch(error => {
        console.log('Error:', error);
      });
  } else {
    console.log("No team selected.");
  }
}
