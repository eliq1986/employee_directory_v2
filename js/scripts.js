const requestedAmountOfUsers = 12;

const { url , amount, nat } = {
  url:"https://randomuser.me/api/?",
  amount: "12",
  nat: "us"
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
          <p class="card-text cap">${location.city}, ${location.state}</p>
      </div>
  </div>
  `

}

function buildModal(profile) {
  console.log(profile)
  const galleryDiv = document.querySelector("#gallery");
  const modal = `
   <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
              <h3 id="name" class="modal-name cap">name</h3>
              <p class="modal-text">email</p>
              <p class="modal-text cap">city</p>
              <hr>
              <p class="modal-text">(555) 555-5555</p>
              <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
              <p class="modal-text">Birthday: 10/21/2015</p>
          </div>
      </div>
  `
  galleryDiv.insertAdjacentHTML("beforeend", modal);

}


getRandomUsers().then(data => {
   data.results.forEach( profile => appendCardsToDOM(profile));

   document.querySelector("#gallery").addEventListener("click", event=> {
    if(event.target.tagName === "P" || event.target.tagName === "H3" || event.target.tagName === "IMG") {
      const index = [...document.querySelectorAll(".card")];
      console.log(index.indexOf(event.target));
     } else if (event.target.getAttribute("class") === "card-info-container" || event.target.getAttribute("class") === "card-img-container") {
       // buildModal(data);
     }
   });

});
