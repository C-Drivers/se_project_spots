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

//Edit Profile Selectors
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#card-name-input");
const editProfileDescInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileNameElement = document.querySelector(".profile__name");
const profileDescElement = document.querySelector(".profile__description");

//Open & Close Modal Functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescElement.textContent = editProfileDescInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescInput.value = profileDescElement.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescInput],
    settings
  );
  openModal(editProfileModal);
});

//New Post Selectors / Functions
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

//Card Template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImgElement = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

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

initialCards.forEach(function (item) {
  const getCard = getCardElement(item);
  cardsList.append(getCard);
});

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

escapeModal(editProfileModal);
escapeModal(newPostModal);
escapeModal(modalPreview);
