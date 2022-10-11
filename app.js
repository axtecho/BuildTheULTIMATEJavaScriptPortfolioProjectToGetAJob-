const videosContainer = document.querySelector("#videosContainer");
const videoIdInput = document.querySelector("#videoId");
const popup = document.querySelector("#popup");
const videoEl = document.querySelector("#popup > iframe");
let youTubeVideoIds = [];

const loadVideos = () => {
  youTubeVideoIds = JSON.parse(localStorage.getItem("youTubeVideoIds")) || [];
  console.log(youTubeVideoIds);
  /* youTubeVideoIds = ["yqeuS43-69E", "JuXrhlAWHRI"]; */
};

const displayVideos = () => {
  const videosHTMLStrings = youTubeVideoIds
    .map(
      (id) => `
<li onclick="clickVideo(event, '${id}')">
<img class="thumbnail" src="https://i3.ytimg.com/vi/${id}/sddefault.jpg" alt="Cover image for YoTube video with id ${id}">
<button class="delete-btn"> &times;</button>
</li>
`
    )
    .join("");
  videosContainer.innerHTML = videosHTMLStrings;
};
const clickVideo = (event, id) => {
  console.log(event, id);
  if (event.target.classList.contains("delete-btn")) {
    youTubeVideoIds = youTubeVideoIds.filter((i) => i !== id);
    console.log();
    localStorage.setItem("youTubeVideoIds", JSON.stringify(youTubeVideoIds));
    displayVideos(youTubeVideoIds);
  } else {
    videoEl.src = `https://www.youtube.com/embed/${id}`;
    popup.classList.add("open");
    popup.classList.remove("closed");
  }
};
const handlePopupClick = () => {
  popup.classList.add("closed");
  popup.classList.remove("open");
};
const saveVideo = (e) => {
  e.preventDefault();
  const videoId = videoIdInput.value;
  youTubeVideoIds.unshift(videoId);
  videoIdInput.value = "";
  localStorage.setItem("youTubeVideoIds", JSON.stringify(youTubeVideoIds));
  displayVideos();
};
loadVideos();
displayVideos();
