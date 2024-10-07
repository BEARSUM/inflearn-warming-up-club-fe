async function getFoodData() {
  const response = await fetch("./food-list.json");
  return await response.json();
}

function clearFoodList() {
  const foodListEl = document.querySelector("#food-list");
  foodListEl.innerHTML = "";
}

function createItem(props) {
  const { id, name, description, imageURL, price } = props;

  const foodItem = document.createElement("li");
  foodItem.className = "food-item";
  foodItem.setAttribute("data-id", id);

  const foodImage = document.createElement("img");
  foodImage.className = "food-image";
  foodImage.setAttribute("src", imageURL);

  const imgWrap = document.createElement("div");
  imgWrap.classList = "image-wrap";
  imgWrap.append(foodImage);

  const foodName = document.createElement("div");
  foodName.className = "food-name";
  foodName.textContent = name;

  const foodPrice = document.createElement("div");
  foodPrice.className = "food-price";
  foodPrice.textContent = price;

  const namePriceDiv = document.createElement("div");
  namePriceDiv.className = "name-price";
  namePriceDiv.append(foodName, foodPrice);

  const foodDescription = document.createElement("p");
  foodDescription.className = "food-description";
  foodDescription.textContent = description;

  const foodInfo = document.createElement("div");
  foodInfo.className = "food-info";
  foodInfo.append(namePriceDiv, foodDescription);

  foodItem.append(imgWrap, foodInfo);

  return foodItem;
}

async function renderList(type) {
  clearFoodList();

  let foodListData = await getFoodData();

  if (type !== "all") {
    foodListData = foodListData.filter((item) => item.type === type);
  }

  const foodListEl = document.querySelector("#food-list");

  foodListData.forEach((item) => {
    const foodItem = createItem(item);
    foodListEl.appendChild(foodItem);
  });
}

const buttons = document.querySelectorAll("[data-type]");
console.log(buttons);
buttons.forEach((button) => {
  button.addEventListener("click", () => renderList(button.dataset.type));
});

renderList("all");
