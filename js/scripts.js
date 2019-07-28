const requestedAmountOfUsers = 12;
const randomUsers = {
  url:"https://randomuser.me/api/?",
  amount: "12",
  nat: "us"
}


async function getRandomUsers() {
  const response = await fetch(`${randomUsers.url}results=${randomUsers.amount}&nat=${randomUsers.nat}`);
   const users = await response.json();
   return users;

}


// function takes 1 arg obj;
function appendToDOM(profile) {
  const galleryDiv = document.querySelector("#gallery");
  const htmlTemplate = `
  <div class="card">
      <div class="card-img-container">
          <img class="card-img" src=${profile.picture.large} alt="profile pic">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${profile.name.first} ${profile.name.last}</h3>
          <p class="card-text">${profile.email}</p>
          <p class="card-text cap">${profile.location.city}, ${profile.location.state}</p>
      </div>
  </div>
  `
  galleryDiv.insertAdjacentHTML("beforeend", htmlTemplate);
}



getRandomUsers().then(data => {
  data.results.forEach( profile => appendToDOM(profile));
});
