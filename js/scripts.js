
const { url , amount, nat, cardClassName, cardParentClassName, cardContainerClassName } = {
  url:"https://randomuser.me/api/?",
  amount: "12",
  nat: "us",
  cardClassName: ["card-img", "card-name cap","card-text", "card-text cap"],
  cardParentClassName: ["card-img-container", "card-info-container"],
  cardContainerClassName: ["card"]
}

appendSearchBarToDOM();
appendModalToDOM();

// returns array of objects
async function getRandomUsers() {
   const response = await fetch(`${url}results=${amount}&nat=${nat}`);
   const users = await response.json();
   return users;
}


// takes no arg; appends HTML to DOM.
function appendSearchBarToDOM() {
  document.querySelector(".search-container").innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
  `;
}


// function takes 1 arg obj;
function appendCardsToDOM(profile) {
  const galleryDiv = document.querySelector("#gallery");
  const htmlCardTemplate= createHTMLCardTemplate(profile);
  galleryDiv.insertAdjacentHTML("beforeend", htmlCardTemplate);
}


function createHTMLCardTemplate({ picture, name, email, location }) {

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


function createHTMLModalTemplate() {
  return `
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="" alt="profile picture">
              <h3 id="name" class="modal-name cap"></h3>
              <p class="modal-text"></p>
              <p class="modal-text cap"></p>
              <hr>
              <p class="modal-text"></p>
              <p class="modal-text cap"></p>
              <p class="modal-text">Birthday:</p>

              <div class="modal-btn-container">
                  <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                  <button type="button" id="modal-next" class="modal-next btn">Next</button>
              </div>
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
     insertIntoModal(cardSelected);
     whenModalButtonClicked(getIndexOfCardClicked(event.target.parentNode.parentNode), results);

 } else if (checkIfClassMatches(cardParentClassName, clickedElementClassName)) {
      const cardSelected = results[getIndexOfCardClicked(event.target.parentNode)];
      insertIntoModal(cardSelected);
      whenModalButtonClicked(getIndexOfCardClicked(event.target.parentNode), results);

   } else if(checkIfClassMatches(cardContainerClassName, clickedElementClassName)) {
      const cardSelected = results[getIndexOfCardClicked(event.target)];
      insertIntoModal(cardSelected);
      whenModalButtonClicked(getIndexOfCardClicked(event.target), results);
   }
  });




}

function whenModalButtonClicked(index, results) {
  document.querySelector(".modal-btn-container").addEventListener("click", (event)=> {
    if(event.target.textContent === "Next" && index < 11) {
      index += 1;
      results[index] ? insertIntoModal(results[index]) : null;

    } else if(event.target.textContent === "Prev" && index !== 0) {
      index -= 1;
      results[index] ? insertIntoModal(results[index]) : null;
    }
  });
}

function appendModalToDOM() {
  document.querySelector("body").insertBefore(createModalContainer(), document.querySelector("script"));
  addCloseListenerToModal();
}

function createModalContainer() {
  const div = document.createElement("div");
  div.className = "modal-container";
  div.innerHTML = createHTMLModalTemplate();
  return div;
}


function addCloseListenerToModal(){
  modalDisplayNone();
  document.querySelector("#modal-close-btn").addEventListener("click", ()=> {
    modalDisplayNone();
  });
}

function modalDisplayNone() {
   document.querySelector(".modal-container").style.display = "none";
}


function getIndexOfCardClicked(parentNode) {
  return [...document.querySelector("#gallery").children].indexOf(parentNode);
}


function getSearchInput() {
   return searchValue = document.querySelector("#search-input").value.toLowerCase().split(" ");
}


function hideCards(searchInput) {

document.querySelectorAll(".card-name").forEach(person => {
  const [firstName, lastName] = person.textContent.split(" ");
  if(searchInput.indexOf(firstName) === -1 && searchInput.indexOf(lastName) === -1) {
      person.parentNode.parentNode.style.display = "none";
    }
  });

}

function insertIntoModal({ picture, name, email, location, phone, dob }) {
  document.querySelector(".modal-img").src = picture.large;
  document.querySelector(".modal-name").textContent = `${name.first} ${name.last}`;
  document.querySelectorAll(".modal-text")[0].textContent = email;
  document.querySelectorAll(".modal-text")[1].textContent = location.state;
  document.querySelectorAll(".modal-text")[2].textContent = phone;
  document.querySelectorAll(".modal-text")[3].textContent = `${location.street}, ${location.state} ${location.postcode}`;
  document.querySelectorAll(".modal-text")[4].textContent = formatBirthday(dob.date);
  document.querySelector(".modal-container").style.display = "block";
}


getRandomUsers().then(data => {
  const { results } = data;

  createEmployeeDirectory(results);

  whenCardIsClicked(results);

});

document.querySelector("#search-submit").addEventListener("click", event => {
  event.preventDefault();
  const searchInput = getSearchInput();
  hideCards(searchInput);
});
