const apiKey = "AIzaSyDBeCZZIMXRct7XaRgHmv8ju1Wq8wZQ6u0";

const button = document.getElementById("searchButton");
button.addEventListener("click", (event) => {
  event.preventDefault();
  const address = document.getElementById("addressInput").value;
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
            : "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"

        const email = official.emails
          ? official.emails.join(", ")
          : "No email provided from your local representative provided";
        const channel =
          official.channels && official.channels[1] ? official.channels[1] : {};

        officialsHTML += `
          <div class="official-card">
          <img class="repPhoto" src="${photo}"/>
            <p>${officialRole}: ${official.name}</p>

            <a class="myBtn1" href="#">
            <img id="twitterBtn" src="https://seeklogo.com/images/T/twitter-x-logo-19D2657BAA-seeklogo.com.png?v=638258862870000000" alt="Twitter Logo">
        </a>

        <div class="myModal1 modal">

          <div class="modal-content">
            <span class="close">&times;</span>
            <p>${channel.type || "Twitter"}: ${
          channel.id || "No Twitter Provided"
        }</p>
        ${official.name} Twitter Handle is ${channel.id}
            <a class="twitter-share-button"
            href="https://twitter.com/intent/tweet?text=@${
              channel.id
            } the rest of the message"
            data-size="large">
            Tweet</a>
            </p>
          </div>
        </div>

        <a class="myBtn2" href="#">
        <img id="emailBtn" src="https://freepngimg.com/thumb/gmail/64774-computer-gmail-email-icons-png-image-high-quality.png" alt="Email Icon">
    </a>

    <div class="myModal2 modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Email: ${email}
        Click on the following campaigns to send an email to your local representative
        </p>
        <a href="mailto:${email}">Health care</a>
        
        <a href="mailto:${email}">Immigration</a>
        </p>
      </div>
    </div>

          </div>`;
      }
    }
    resultsDiv.innerHTML += officialsHTML;
  }

  for (let i = 0; i < 16; i++) {
    let modal1 = document.getElementsByClassName("myModal1")[i];
    let btn1 = document.getElementsByClassName("myBtn1")[i];
    let span1 = modal1.querySelector(".close");

    btn1.onclick = function () {
      modal1.style.display = "block";
    };

    span1.onclick = function () {
      modal1.style.display = "none";
    };
  }

  for (let i = 0; i < 16; i++) {
    let modal2 = document.getElementsByClassName("myModal2")[i];
    let btn2 = document.getElementsByClassName("myBtn2")[i];
    let span2 = modal2.querySelector(".close");

    btn2.onclick = function () {
      modal2.style.display = "block";
    };

    span2.onclick = function () {
      modal2.style.display = "none";
    };
  }

  window.onclick = function (event) {
    for (let i = 0; i < 16; i++) {
      let modal1 = document.getElementsByClassName("myModal1")[i];
      let modal2 = document.getElementsByClassName("myModal2")[i];

      if (event.target == modal1) {
        modal1.style.display = "none";
      } else if (event.target == modal2) {
        modal2.style.display = "none";
      }
    }
  };
}
