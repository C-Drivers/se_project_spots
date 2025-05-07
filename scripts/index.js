const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function(){
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function(){
  newPostModal.classList.remove("modal_is-opened");
});


// const initialCards = [
//   {
//     name: "la",
//     link: "https://unsplash.com/photos/aerial-view-of-white-and-brown-dome-concrete-building-PiqHSHYO3Uw",
//   },
//   {
//     name: "sd",
//     link: "https://unsplash.com/photos/cars-on-road-during-night-time-KtUFXs4LDRw",
//   },
//   {
//     name: "seattle",
//     link: "https://unsplash.com/photos/public-market-farmers-market-led-sign-16ziVZtz8vA",
//   },
//   {
//     name: "nashville",
//     link: "https://unsplash.com/photos/a-view-of-a-city-with-tall-buildings-8GOtEYr7qho",
//   },
//   {
//     name: "sedona",
//     link: "https://unsplash.com/photos/brown-rocky-mountain-under-blue-sky-during-daytime-tfqrqGH7S9A",
//   },
//   {
//     name: "honolulu",
//     link: "https://unsplash.com/photos/buildings-near-body-of-water-XwCgFPLalP4",
//   },
// ];