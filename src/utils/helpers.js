export function setBtnText(
  btn,
  isLoading,
  defaultText = "Save",
  loadText = "Saving..."){

    if (isLoading) {
    btn.textContent = loadText;
  } else {
    btn.textContent = defaultText;
    console.log(`Save button is now ${isLoading}`);
  };
}
