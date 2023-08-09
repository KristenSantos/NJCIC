function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

const apiKey = "AIzaSyDBeCZZIMXRct7XaRgHmv8ju1Wq8wZQ6u0";

const button = document.getElementById("searchButton"); // Assuming there is a button with the id "searchButton"
button.addEventListener("click", (event) => {
  event.preventDefault();
  const address = document.getElementById("addressInput").value; // Assuming there is an input field with the id "addressInput"
  fetchCivicInfo(address);
});

function fetchCivicInfo(address) {
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${encodeURIComponent(
    address
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayCivicInfo(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayCivicInfo(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  const offices = data.offices;
  const officials = data.officials;

  if (!officials || officials.length === 0) {
    resultsDiv.innerHTML = "<p>No officials found for this address.</p>";
    return;
  }

  for (let i = 2; i < offices.length; i++) {
    let officialRole = offices[i].name;
    let officialIndices = offices[i].officialIndices;
    findOfficials(officialIndices, officialRole);
  }

  function findOfficials(officialIndices, officialRole) {
    let officialsHTML = ""; // Create an empty string to accumulate HTML content
    for (let i = 0; i < officials.length; i++) {
      if (officialIndices.includes(i)) {
        officialsHTML += `<p>
        ${officialRole}: ${officials[i].name}
        ${officials[i].emails}
        </p>`;
      }
    }
    resultsDiv.innerHTML += officialsHTML; // Append accumulated HTML content
  }
}
