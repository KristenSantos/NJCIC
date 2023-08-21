const apiKey = "AIzaSyDBeCZZIMXRct7XaRgHmv8ju1Wq8wZQ6u0";

const button = document.getElementById("searchButton");
button.addEventListener("click", (event) => {
  event.preventDefault();
  const address = document.getElementById("addressInput").value;
  fetchCivicInfo(address);
});

function show_list() {
  var courses = document.getElementById("courses_id");

  if (courses.style.display == "block") {
    courses.style.display = "none";
  } else {
    courses.style.display = "block";
  }
}
window.onclick = function (event) {
  if (!event.target.matches(".dropdown_button")) {
    document.getElementById("courses_id").style.display = "none";
  }
};

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
  resultsDiv.innerHTML = "";

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
    let officialsHTML = "";

    for (let i = 0; i < officials.length; i++) {
      if (officialIndices.includes(i)) {
        const official = officials[i];
        const photo = official.photoUrl;

        "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
          ? official.photoUrl
          : "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png";

        const email = official.emails
          ? official.emails.join(", ")
          : "No email provided from your local representative provided";
        const channel =
          official.channels && official.channels[1] ? official.channels[1] : {};
          const phone = official.phones ? official.phones.join(", ") : "No phone number provided";

        officialsHTML += `
          <div class="official-card">
          <div>
            <strong><p>${official.name}</p></strong>
            <p>${officialRole}</p>
            </div>
          <div id="number">
          <div id="btncon>
            <a class="myBtn1" href="https://twitter.com/intent/tweet?text=@${channel.id} the rest of the message"
            data-size="large">
             <img id="twitterBtn" src="https://seeklogo.com/images/T/twitter-x-logo-19D2657BAA-seeklogo.com.png?v=638258862870000000" alt="Twitter Logo">
             </a>
            <a class="myBtn2" href="mailto:${email}">
              <img id="emailBtn" src="https://freepngimg.com/thumb/gmail/64774-computer-gmail-email-icons-png-image-high-quality.png" alt="Email Icon">
            </a>
          </div>
          <p>Phone: ${phone}</p>
          </div>
          </div>`;
      }
    }
    resultsDiv.innerHTML += officialsHTML;
  }
}
