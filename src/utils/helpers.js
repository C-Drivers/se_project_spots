export function setBtnText(
  btn,
  isLoading,
  defaultText = "Save",
  loadText = "Saving..."){
    isLoading ? btn.textContent = loadText : btn.textContent = defaultText;
}