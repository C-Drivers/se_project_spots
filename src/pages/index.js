import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
  disableButton,
  setEventListeners,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setBtnText } from "../utils/helpers.js";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Los Angeles",
    link: "https://images.unsplash.com/photo-1572975165711-e9636eba67fc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "San Diego",
    link: "https://images.unsplash.com/photo-1583133010806-4368fdcb29e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Seattle",
    link: "https://images.unsplash.com/photo-1549092273-8b23dde8ac2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Nashville",
    link: "https://images.unsplash.com/photo-1698323363518-a7681b81a9d7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sedona",
    link: "https://images.unsplash.com/photo-1583729476095-82e61108a043?q=80&w=2007&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Honolulu",
    link: "https://images.unsplash.com/photo-1573992554018-83e7853bd45f?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

//Preview Modal Selectors
const modalPreview = document.querySelector("#preview-modal");
const previewContainer = modalPreview.querySelector(".modal__image-container");
const previewImage = modalPreview.querySelector(".modal__image");
const previewCloseBtn = modalPreview.querySelector(".modal__close-btn-preview");
const previewCaption = modalPreview.querySelector(".modal__caption");

//Delete Modal
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");
const deleteBtn = deleteModal.querySelector(".modal__save-btn");
const cancelBtn = deleteModal.querySelector(".modal__cancel-btn");

//Avatar Modal Selectors
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarModalSaveBtn = avatarModal.querySelector(".modal__save-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

//Edit Profile Selectors
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#card-name-input");
const editProfileDescInput = editProfileModal.querySelector(
  "#profile-description-input",
);

const profileNameElement = document.querySelector(".profile__name");
const profileDescElement = document.querySelector(".profile__description");
const profileImageElement = document.querySelector(".profile__avatar");

//Open & Close Modal Functions ------------------------
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescInput.value,
    })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileDescElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(()=>{
      setBtnText(submitBtn, true)
    });
}
//Open & Close Modal Functions End --------------------


//Avatar Modal Functions
avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", avatarHandleSubmit);
//Avatar Modal Functions End


//Avatar Handle Submit
function avatarHandleSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo(avatarInput.value)
    .then(({ avatar }) => {
      console.log(profileImageElement, avatar);
      profileImageElement.src = avatar;
    })
    .catch(console.error);
}
//Avatar Handle Submit End


//Edit Profile Form / Button -----------------------------------------
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescInput.value = profileDescElement.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescInput],
    settings,
  );
  openModal(editProfileModal);
});
//Edit Profile Form / Button End -----------------------------------------



//New Post Selectors / Functions ---------------------------------------
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newSaveBtn = newPostModal.querySelector(".modal__save-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLink = newPostModal.querySelector("#card-image-input");
const newPostCap = newPostModal.querySelector("#profile-caption-input");

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostCap.value,
    link: newPostLink.value,
  };

  const getCard = getCardElement(inputValues);
  cardsList.prepend(getCard);
  newPostForm.reset();
  disableButton(newSaveBtn);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  resetValidation(newPostForm, [newPostLink, newPostCap], settings);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});
//New Post Selectors / Functions End ---------------------------------------

//Delete Card Handler && Submission -------------
let selectedCard, selectedCardId;

function handleDeleteCard(cardElement, cardId){
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt){
  evt.preventDefault();
  api
  .deleteCard(selectedCardId)
  .then(
    selectedCard.remove(),
    closeModal(deleteModal)
  )
  .catch(console.error);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);


//Delete Card Handler && Submission End ---------

//Card Template / Like / Delete Functions ---------------------------------------------------------
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

//Handle Like Function --------------------
function handleLike(evt, id){
  // remove - evt.target.classList.toggle("card__like-btn_active");
  //1. check card like status with variable (i.e. isLiked = false)
  //2. call the API function with arguments
  //3. handle response
  //4. in the .then toggle active class
}
//Handle Like Function End ----------------

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImgElement = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

// TODO -- if the card is liked, set active class on the card

  //Like Button
  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));

  //Delete Card Button
  cardDeleteBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    handleDeleteCard(cardElement, data._id)
  });

  //Cancel Button
  cancelBtn.addEventListener("click", () => {
    closeModal(deleteModal);
  });

  //Preview
  cardImgElement.addEventListener("click", () => {
    openModal(modalPreview);
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
  });

  cardImgElement.src = data.link;
  cardImgElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  return cardElement;
}
//Card Template / Like / Delete Functions End -----------------------------------------------------


//Main Event Listeners -----------------------------------------
previewCloseBtn.addEventListener("click", () => {
  closeModal(modalPreview);
});

function clickOutside(modal) {
  modal.addEventListener("click", function (evt) {
    if (evt.target === modal) {
      modal.classList.remove("modal_is-opened");
    }
  });
}

clickOutside(editProfileModal);
clickOutside(newPostModal);
clickOutside(modalPreview);

function escapeModal(modal) {
  document.addEventListener("keydown", (escapeKey) => {
    if (escapeKey.key === "Escape") {
      modal.classList.remove("modal_is-opened");
    }
  });
}
//Main Event Listeners End -------------------------------------


//API Class -------------------------------------------------------
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f4360fd5-b681-46f2-9578-9f987629f3bb",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach(function (item) {
      const getCard = getCardElement(item);
      cardsList.append(getCard);
    });
    profileNameElement.textContent = user.name;
    profileDescElement.textContent = user.about;
    profileImageElement.src = user.avatar;
  })
  .catch((err) => {
    console.error(err);
  });
//API Class End ---------------------------------------------------

//MISC. Functions --------------
escapeModal(editProfileModal);
escapeModal(newPostModal);
escapeModal(modalPreview);
enableValidation(settings);
resetValidation;
showInputError;
hideInputError;
checkInputValidity;
hasInvalidInput;
toggleButtonState;
disableButton;
setEventListeners;
//MISC. Functions End ----------