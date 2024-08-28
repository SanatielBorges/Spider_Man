function toggleVideo() {
  const trailer = document.querySelector(".trailer");
  const video = document.querySelector("video");
  trailer.classList.toggle("active");

  if (trailer.classList.contains("active")) {
    video.play();
  } else {
    video.pause();
  }
}
