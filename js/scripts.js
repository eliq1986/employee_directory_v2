
const { url , amount, nat, cardClassName, cardParentClassName, cardContainerClassName } = {
  url:"https://randomuser.me/api/?",
  amount: "12",
  nat: "us",
  cardClassName: ["card-img", "card-name cap","card-text", "card-text cap"],
  cardParentClassName: ["card-img-container", "card-info-container"],
  cardContainerClassName: ["card"]
}


// returns array of objects
async function getRandomUsers() {
  const response = await fetch(`${url}results=${amount}&nat=${nat}`);
   const users = await response.json();
   return users;
}


// function takes 1 arg obj;
function appendCardsToDOM(profile) {
  const galleryDiv = document.querySelector("#gallery");
  const htmlCardTemplate= createHtmlCardTemplate(profile);
  galleryDiv.insertAdjacentHTML("beforeend", htmlCardTemplate);
}


function createHtmlCardTemplate({ picture, name, email, location }) {

  return `
  <div class="card">
      <div class="card-img-container">
          <img class="card-img" src=${picture.large} alt="profile pic">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${location.state}</p>
      </div>
  </div>
  `

}

function checkIfClassMatches(cardClassArr ,cardClassName) {
 return cardClassArr.filter(possibleClassName => possibleClassName === cardClassName).length;
}


function createEmployeeDirectory(results) {
  results.forEach( employeeProfile => appendCardsToDOM(employeeProfile));
}

//As stated; formats DOB from 1989-05-02T23:27:04Z --> 05/02/1989
function formatBirthday(birthdate) {
 const yearMonthDayArr = birthdate.substring(0,10).split("-");
 return `${yearMonthDayArr[1]}/${yearMonthDayArr[2]}/${yearMonthDayArr[0]}`;

}


function whenCardIsClicked(results) {

  document.querySelector("#gallery").addEventListener("click", event => {

    const clickedElementClassName = event.target.className;

   if(checkIfClassMatches(cardClassName, clickedElementClassName)) {

     const cardSelected = results[getIndexOfCardClicked(event.target.parentNode.parentNode)];
     buildModal(cardSelected);

 } else if (checkIfClassMatches(cardParentClassName, clickedElementClassName)) {

      const cardSelected = results[getIndexOfCardClicked(event.target.parentNode)];
      buildModal(cardSelected);

   } else if(checkIfClassMatches(cardContainerClassName, clickedElementClassName)){

      const cardSelected = results[getIndexOfCardClicked(event.target)];
      buildModal(cardSelected);
   }
  });

}


function tearDownPreviousModal() {
  const modalContainer = document.querySelector(".modal-container");
  if(modalContainer) {
    const parent = modalContainer.parentNode;
    parent.removeChild(modalContainer);
  }
}

function buildModal({ picture, name, email, location, phone, dob }) {
  tearDownPreviousModal();
  const body = document.querySelector("body");
  const div = document.createElement("div");
  div.className = "modal-container";
  const modal = `

      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${picture.large} alt="profile picture">
              <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
              <p class="modal-text">${email}</p>
              <p class="modal-text cap">${location.city}</p>
              <hr>
              <p class="modal-text">${phone}</p>
              <p class="modal-text cap">${location.street}, ${location.state} ${location.postcode}</p>
              <p class="modal-text">Birthday: ${formatBirthday(dob.date)}</p>
          </div>

  `
  div.innerHTML = modal;
  const javaScriptFile = document.querySelector("script");
  body.insertBefore(div, javaScriptFile);
  document.querySelector("#modal-close-btn").addEventListener("click", ()=> {
    document.querySelector(".modal-container").style.display = "none";

  });

}



function getIndexOfCardClicked(parentNode) {
  return [...document.querySelector("#gallery").children].indexOf(parentNode);
}


getRandomUsers().then(data => {

  const { results } = data;

  createEmployeeDirectory(results);

  whenCardIsClicked(results);

});
