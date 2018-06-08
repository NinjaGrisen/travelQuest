import { $, $$ } from "./bling";

function moveDesktopQuests(arrows, questItems) {
  //the size and margin of one element;
  const size = 230;
  let containerWidth = $(".quests__quest-wrapper").getBoundingClientRect()
    .width;
  let moveLength;
  let currentMovePos = 0;
  let displayAmount;

  if (containerWidth >= size * 5) {
    moveLength = 4 * size;
    displayAmount = 4;
  } else if (containerWidth >= size * 4) {
    moveLength = 3 * size;
    displayAmount = 3;
  } else if (containerWidth >= size * 3) {
    moveLength = 2 * size;
    displayAmount = 3;
  } else if (containerWidth >= size * 2) {
    moveLength = 1 * size;
    displayAmount = 4;
  } else {
    moveLength = size;
    displayAmount = 5;
  }

  arrows.forEach(element => {
    element.addEventListener("click", e => {
      if (e.target.classList.contains("quests__quest-wrapper__move--right")) {
        moveQuestItems("right");
      } else {
        moveQuestItems("left");
      }
    });
  });

  function moveQuestItems(direction) {
    if (direction === "right") {
      if (currentMovePos < size * displayAmount) {
        currentMovePos += moveLength;
      }
    }
    if (direction === "left") {
      if (currentMovePos != 0) {
        currentMovePos -= moveLength;
      }
    }
    checkButtonVisability();

    questItems.forEach(element => {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
      element.style.transform = `translateX(-${currentMovePos}px)`;
    });
  }

  function checkButtonVisability() {
    if (currentMovePos > 0) {
      document
        .querySelector(".quests__quest-wrapper__move--left")
        .classList.remove("hidden");
    } else if (currentMovePos === 0) {
      document
        .querySelector(".quests__quest-wrapper__move--left")
        .classList.add("hidden");
    }

    if (currentMovePos >= size * displayAmount) {
      document
        .querySelector(".quests__quest-wrapper__move--right")
        .classList.add("hidden");
    } else {
      document
        .querySelector(".quests__quest-wrapper__move--right")
        .classList.remove("hidden");
    }
  }
}

export default moveDesktopQuests;
