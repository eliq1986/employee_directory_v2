
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


//function buildModal({ picture, name, email, location}) {


//
//   const body = document.querySelector("body");
//   const modal = `
//    <div class="modal-container">
//       <div class="modal">
//           <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//           <div class="modal-info-container">
//               <img class="modal-img" src=${picture.large} alt="profile picture">
//               <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
//               <p class="modal-text">${email}</p>
//               <p class="modal-text cap">${location.city}</p>
//               <hr>
//               <p class="modal-text">(555) 555-5555</p>
//               <p class="modal-text">${location.street}, ${location.state} ${location.postcode}</p>
//               <p class="modal-text">Birthday: 10/21/2015</p>
//           </div>
//       </div>
//   `
//   body.insertAdjacentHTML("beforeend", modal);
//   addEventListener();
//
// }

// function addEventListener() {
//   console.log("clicked");
//   document.querySelector("#modal-close-btn").addEventListener("click",()=> {
//     console.log("x was clicked");
//       document.querySelector(".modal-container").style.display = "none";
//   });
// }


getRandomUsers().then(data => {

  const { results } = data;

   results.forEach( profile => appendCardsToDOM(profile));

   document.querySelector("#gallery").addEventListener("click", event=> {
     const elementClassName = event.target.className;
    if(checkIfClassMatches(cardClassName, elementClassName)) {
      const index = [...document.querySelector("#gallery").children].indexOf(event.target.parentNode.parentNode);
      const cardSelected = results[index];
      buildModal(cardSelected);
    } else if (checkIfClassMatches(cardParentClassName, elementClassName)) {
      // const index = [...document.querySelector("#gallery").children].indexOf(event.target.parentNode);
      // const cardSelected = results[index];
      // buildModal(cardSelected);
    } else if(checkIfClassMatches(cardContainerClassName, elementClassName)){

    }
   });

});
