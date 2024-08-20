document.addEventListener("DOMContentLoaded", function () {
  const scenes = document.querySelectorAll(".sidebar-scene");
  let currentScene = 0;

  function showNextScene() {
    scenes[currentScene].classList.remove("active"); // 현재 장면에서 active 클래스를 제거
    currentScene = (currentScene + 1) % scenes.length;
    scenes[currentScene].classList.add("active"); // 다음 장면에 active 클래스를 추가
  }

  // 처음 장면에 active 클래스를 추가
  scenes[currentScene].classList.add("active");

  // 3초마다 장면을 변경
  setInterval(showNextScene, 3000);
});
