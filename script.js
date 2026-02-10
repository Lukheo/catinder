let catPic = document.getElementById("picture");
let dislike = document.getElementById("dislike");
let like = document.getElementById("like");
let favs = document.getElementById("favs");
let soundGo = new Audio("duckDisappears.mp3");
let soundCome = new Audio("DuckReappears.mp3");
const API_KEY =
  "live_YKc4v3hDWirgrD8COPJMjvaaj4T6I7xmzofutdO8Lvi96rkYIMFJhzE5pF7tztXE";

function getCat() {
  axios.get("https://api.thecatapi.com/v1/images/search").then((response) => {
    let catLink = response.data[0];
    catPic.dataset.id = catLink.id;
    catPic.src = catLink.url;
  });
}

getCat();
showFavs();

dislike.addEventListener("click", noCat);
like.addEventListener("click", () => favCat(catPic.dataset.id));

function noCat() {
  soundGo.play();
  getCat();
}

function favCat(url) {
  soundCome.play();
  console.log(url);

  axios
    .post(
      "https://api.thecatapi.com/v1/favourites",
      { image_id: url },
      { headers: { "x-api-key": API_KEY } },
    )
    .then(() => {
      console.log("Cat saved to favorites!");
      showFavs();
    });
  getCat();
}

function showFavs() {
  const request = "https://api.thecatapi.com/v1/favourites";
  axios.get(request, { headers: { "x-api-key": API_KEY } }).then((response) => {
    let catList = response.data;
    favs.innerHTML = "";
    catList.forEach((catto) => {
      let card = document.createElement("img");
      card.classList.add("fav");
      card.src = catto.image.url;
      favs.appendChild(card);
      card.addEventListener("click", () => {
        soundGo.play();
        axios
          .delete(`https://api.thecatapi.com/v1/favourites/${catto.id}`, {
            headers: { "x-api-key": API_KEY },
          })
          .then(() => {
            console.log("Cat removed from API");
            showFavs();
          });
      });
    });
  });
}
document.addEventListener("click", (e) => {
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;

    const x = e.clientX + (Math.random() - 0.5) * 50;
    const y = e.clientY + (Math.random() - 0.5) * 50;

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }
});
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  document.documentElement.style.setProperty("--bg-x", `${x}px`);
  document.documentElement.style.setProperty("--bg-y", `${y}px`);
});

