import "./index.css";
import {
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setBtnText } from "../utils/helpers.js";

//Preview Modal Selectors
const modalPreview = document.querySelector("#preview-modal");
const previewImage = modalPreview.querySelector(".modal__image");
const previewCloseBtn = modalPreview.querySelector(".modal__close-btn-preview");
const previewCaption = modalPreview.querySelector(".modal__caption");

//Delete Modal
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");
const cancelBtn = deleteModal.querySelector(".modal__cancel-btn");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn-delete");

//Avatar Modal Selectors
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
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
  setBtnText(submitBtn, true);

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
    .finally(() => {
      setBtnText(submitBtn, false);
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

  const submitBtn = evt.submitter;
  const inputValues = {
    name: newPostCap.value,
    link: newPostLink.value,
  };

  setBtnText(submitBtn, true);

  api
    .addCard(inputValues)
    .then((res) => {
      const getCard = getCardElement(res);
      cardsList.prepend(getCard);
      newPostForm.reset();
      disableButton(newSaveBtn);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false);
    });
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

//Card Template / Like / Delete Functions ---------------------------------------------------------
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");
//cardElement.remove();

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImgElement = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  //Like Button
  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));

  //Delete Card Button
  cardDeleteBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    handleDeleteCard(cardElement, data._id);
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
  const cardLiked = data.isLiked;
  if (cardLiked) {
    cardLikeBtn.classList.add("card__like-btn_active");
  }
  return cardElement;
}
//Card Template / Like / Delete Functions End -----------------------------------------------------

//Close Button
deleteCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

//Cancel Button
cancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

//Handle Like Function --------------------
function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  api
    .likeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
}

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

//Click Outside Modal Functions ----------------
clickOutside(editProfileModal);
clickOutside(newPostModal);
clickOutside(modalPreview);
clickOutside(deleteModal);
clickOutside(avatarModal);
//Click Outside Modal Functions End ------------

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

//Delete Card Handler && Submission -------------
let selectedCard, selectedCardId;

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  setBtnText(submitBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false, "Delete", "Deleting...");
    });
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

//Delete Card Handler && Submission End ---------

//Avatar Handle Submit
function avatarHandleSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;

  setBtnText(submitBtn, true);

  api
    .editAvatarInfo(avatarInput.value)
    .then(({ avatar }) => {
      profileImageElement.src = avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false);
    });
}
//Avatar Handle Submit End
