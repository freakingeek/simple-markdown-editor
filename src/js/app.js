const editorBox = document.querySelector(".editor-box");
const previewBox = document.querySelector(".preview-box");
const convertButton = document.querySelector(".convert-button");

editorBox.addEventListener("input", (e) => {
  previewBox.innerHTML = marked(e.target.value);
});

convertButton.addEventListener("click", (e) => {
  if (!navigator || !navigator.clipboard) return
  
  e.target.textContent = "COPIED!"
  
  editorBox.select();
  editorBox.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(JSON.stringify(editorBox.value));
  
  setTimeout(() => {
    e.target.textContent = "CONVERT TO JSON"
  }, 3000)
})

// back-up
window.addEventListener("beforeunload", () => {
  const currentValueOnEditorBox = editorBox.value;
  localStorage.setItem("text", JSON.stringify(currentValueOnEditorBox));
});

window.addEventListener("load", () => {
  const oldText = localStorage.getItem("text");
  if (oldText) {
    editorBox.innerHTML = JSON.parse(oldText);
    previewBox.innerHTML = marked(JSON.parse(oldText));
  }

  if (!navigator || !navigator.clipboard) {
    convertButton.textContent = "NOT AVAILABLE"
    convertButton.classList.add("disable")
  }
});
