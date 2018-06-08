import { $ } from "./bling";
import loadPlaces from "./map";

function setDefaultDesktopQuest(wrapper) {
  const startElement = document.querySelector(".quests__quest-wrapper a");
  const allElement = document.querySelectorAll(".quests__quest-wrapper a");
  let title;
  let img;
  let tags;
  let lng;
  let lat;
  let price;
  let estimatedTime;
  let city;
  let address;
  let description;

  function setTemplateVariables(startElement) {
    title = startElement.dataset.title;
    img = startElement.dataset.img;
    tags = JSON.parse(startElement.dataset.animals);
    lng = startElement.dataset.lng;
    lat = startElement.dataset.lat;
    price = startElement.dataset.price;
    estimatedTime = startElement.dataset.estimatedtime;
    city = startElement.dataset.city;
    address = startElement.dataset.address;
    description = startElement.dataset.description;

    $(".quests__desktop-wrapper").style.backgroundImage = `
    linear-gradient(
      rgba(43, 22, 75, 1), 
      rgba(43, 22, 75, 0.45) 36%, 
      rgb(44, 22, 75) 80%, 
      rgb(43, 22, 75)), 
      url(${img})`;

    allElement.forEach(e => {
      if (e.classList.contains("active")) {
        e.classList.remove("active");
      }
    });

    startElement.classList.add("active");

    let template = `
  <div>
    <img src="${img}"/>
    <h2>${title}</h2>
    <ul class="quests__quick-info">
    
    ${price ? `<li>Ca price: ${price}</li>` : ""}
    ${estimatedTime ? `<li>Ca time: ${estimatedTime}</li>` : ""}
    ${city ? `<li class="full-width">City: ${city}</li>` : ""}
    ${address ? `<li class="full-width">Address: ${address}</li>` : ""}
    </ul>
    <ul class="quests__tags">
    ${tags
      .join(0)
      .split(0)
      .map(
        (tag, i) => `
      <li><a href=/city/${encodeURI(city)}/tags/${encodeURI(
          tag
        )}>${tag}</a></li>
    `
      )
      .join("")}
    </ul>
  
    <p>${description}</p>

    <div id="map" 
      data-lng=${lng} 
      data-lat=${lat}></div>
  </div>
  `;
    wrapper.innerHTML = template;
    loadPlaces();
  }

  allElement.addEventListener("click", e => {
    setTemplateVariables(e.target.closest("a"));
  });

  setTemplateVariables(startElement);
}

export default setDefaultDesktopQuest;
