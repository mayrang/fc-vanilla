export default function makeCarousel(itemList, visibleCount = 1, slideCount = 1, captionPosition = "center middle") {
  const iconNext = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path color="white" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
  `;
  const iconPrev = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path color="white" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
  `;

  const itemWidth = Math.trunc(700 / visibleCount);

  const wrapper = createElement({
    tagName: "div",
  });

  wrapper.style.cssText = `
width: 100%;
height: 100%;
position: relative;
display: flex;
overflow: hidden;
`;

  const itemContainer = createElement({
    tagName: "div",
    parent: wrapper,
  });

  itemContainer.style.cssText = `
display: flex;
transform: translateX(0px);
`;

  addButton();
  if (itemList) {
    // itemList = [...itemList.splice(-1), ...itemList];
    itemList.forEach((item) => {
      addImageItem(itemContainer, item);
    });
  } else {
    addImageItem(itemContainer, "./images/01.jpg");
    addImageItem(itemContainer, "./images/02.jpg");
    addImageItem(itemContainer, "./images/03.jpg");
    addImageItem(itemContainer, "./images/04.jpg");
    addImageItem(itemContainer, "./images/05.jpg");
  }

  function handleSlide(next = true) {
    for (let i = 0; i < slideCount; i++) {
      const index = i & itemContainer.children.length;
      if (next) {
        itemContainer.appendChild(itemContainer.children[index].cloneNode(true));
      } else {
        itemContainer.prepend(itemContainer.children[itemContainer.children.length - index - 1].cloneNode(true));
      }
    }

    next || (itemContainer.style.transform = `translateX(${-itemWidth * slideCount}px)`);

    setTimeout(() => {
      itemContainer.style.transitionDuration = "0.5s";
      itemContainer.style.transform = `translateX(${next ? -itemWidth * slideCount : 0}px)`;

      itemContainer.ontransitionend = (event) => {
        itemContainer.style.removeProperty("transition-duration");
        for (let i = 0; i < slideCount; i++) {
          next ? itemContainer.firstChild.remove() : itemContainer.lastChild.remove();
        }

        itemContainer.style.transform = `translateX(0px)`;
      };
    }, 0);
  }

  function addButton() {
    const [prevButton, nextButton] = createElement({
      tagName: "button",
      parent: wrapper,
      count: 2,
    });

    prevButton.style.cssText = `
  position: absolute;
  z-index: 1;
  border: 0;
  top: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.3) 100%);
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.7));
  `;

    nextButton.style.cssText = prevButton.style.cssText;
    nextButton.style.background =
      "background: linear-gradient(270deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.3) 100%);";

    prevButton.style.left = "0px";
    nextButton.style.right = "0px";

    prevButton.innerHTML = iconPrev;
    nextButton.innerHTML = iconNext;

    prevButton.addEventListener("click", () => {
      handleSlide(false);
    });

    nextButton.addEventListener("click", () => {
      handleSlide();
    });
  }

  function addImageItem(parent, src) {
    const container = createElement({
      tagName: "div",
      parent: parent,
    });

    container.style.cssText = `
    width: ${itemWidth}px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: #000;
  `;
    const image = createElement({
      tagName: "img",
      parent: container,
      properties: { src: src },
    });

    image.style.cssText = `height: 100%`;

    const caption = createElement({
      tagName: "span",
      properties: { innerText: "Caption Text" },
      parent: container,
    });

    caption.style.cssText = `
color: white;
font-weight: bold;
position: absolute;
filter: drop-shadow(3px 3px 3px rgb(0 0 0 / 0.5));
`;

    if (captionPosition.includes("left")) {
      caption.style.left = "10%";
    } else if (captionPosition.includes("right")) {
      caption.style.right = "10%";
    }
    if (captionPosition.includes("top")) {
      caption.style.top = "10%";
    } else if (captionPosition.includes("bottom")) {
      caption.style.bottom = "10%";
    }
  }

  return wrapper;
}

export function createElement({ tagName, properties, parent, children, count = 1 }) {
  const create = () => {
    const element = document.createElement(tagName);
    Object.assign(element, properties);
    console.log(element);
    parent?.appendChild(element);
    children?.map((child) => {
      console.log("child", child);
      child.parent = element;
      createElement(element);
    });
    return element;
  };

  if (count > 1) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(create());
    }
    return result;
  } else {
    return create();
  }
}
