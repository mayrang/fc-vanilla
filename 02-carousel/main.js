const iconNext = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path color="white" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
`;
const iconPrev = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path color="white" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
`;

const app = createElement({
  tagName: "div",
  parent: document.body,
});

app.style.cssText = `

width: 700px;
height: 250px;
background-color: rgb(100, 100, 100);
`;

const wrapper = createElement({
  tagName: "div",
  parent: app,
});

wrapper.style.cssText = `
width: 100%;
height: 100%;
position: relative;
display: flex;
`;

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

const container = createElement({
  tagName: "div",
  parent: wrapper,
});

container.style.cssText = `
  width: 700px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const image = createElement({
  tagName: "img",
  parent: container,
  properties: { src: "./images/01.jpg" },
});

const caption = createElement({
  tagName: "span",
  properties: { innerText: "Caption Text" },
  parent: container,
});

caption.style.css = `
color: white;
font-weight: bold;
position: absolute;
filter: drop-shadow(3px 3px 3px rgb(0 0 0 / 0.5));
`;

function createElement({ tagName, properties, parent, children, count = 1 }) {
  const create = () => {
    const element = document.createElement(tagName);
    Object.assign(element, properties);
    parent.appendChild(element);
    children?.map((child) => {
      console.log("child", child);
      child.parent = element;
      createElement(element);
    });
    return element;
  };

  if (count > 1) {
    const result = [];
    for (i = 0; i < count; i++) {
      result.push(create());
    }
    return result;
  } else {
    return create();
  }
}
