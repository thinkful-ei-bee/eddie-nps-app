'use strict';

// put your own value below!
const apiKey = 'q4VHcDlIpZh33evWMXrSEYFQRDOKW8BGY6LaANkI'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].title}</h3>
      <p>${responseJson.data[i].description}</p>
      <p> ${responseJson.data[i].url}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
}

function getParks(query, stateCode, limit=10) {
  const params = {
    api_key: apiKey,
    q: query,
    stateCode,
    limit,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    const state = $('#js-state').val();
    getParks(searchTerm, state, maxResults);
  });
}

$(watchForm);