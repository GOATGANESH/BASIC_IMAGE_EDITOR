let filterContainer = document.querySelector(".filters-section");
let inputImage = document.querySelector("#file-input");
let imageCanvas = document.querySelector("canvas");
let canvasCtx = imageCanvas.getContext("2d");
let image = null;
let initialValue = [];

let filters = [
  {
    id: 1,
    name: "brightness",
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  {
    id: 2,
    name: "contrast",
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  {
    id: 3,
    name: "saturate",
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  {
    id: 4,
    name: "hue-rotate",
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  {
    id: 5,
    name: "blur",
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  {
    id: 6,
    name: "grayscale",
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    id: 7,
    name: "sepia",
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    id: 8,
    name: "opacity",
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    id: 9,
    name: "invert",
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
];

const filterPresets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    brightness: 110,
    contrast: 120,
    saturate: 80,
    "hue-rotate": 0,
    blur: 1,
    grayscale: 10,
    sepia: 30,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 110,
    saturate: 70,
    "hue-rotate": 10,
    blur: 0,
    grayscale: 5,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  film: {
    brightness: 100,
    contrast: 130,
    saturate: 120,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  blackWhite: {
    brightness: 100,
    contrast: 120,
    saturate: 0,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 105,
    contrast: 110,
    saturate: 120,
    "hue-rotate": -10,
    blur: 0,
    grayscale: 0,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 100,
    contrast: 110,
    saturate: 120,
    "hue-rotate": 15,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  faded: {
    brightness: 110,
    contrast: 80,
    saturate: 60,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 10,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  dramatic: {
    brightness: 95,
    contrast: 160,
    saturate: 140,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  glitch: {
    brightness: 100,
    contrast: 140,
    saturate: 200,
    "hue-rotate": 180,
    blur: 1,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
};

filters.forEach((filter) => {
  initialValue.push(filter.value);
});

function createFilter(name, value, min, max, unit = "%") {

  let filterElement = document.createElement("div");
  filterElement.classList.add("filter");

  let titleElement = document.createElement("p");
  titleElement.innerText = name;

  //CREATING RANGE INPUT
  let inputElement = document.createElement("input");
  inputElement.type = "range";
  inputElement.id = name;
  inputElement.value = value;
  inputElement.min = min;
  inputElement.max = max;

  //Adding EVENT LISTENER
  inputElement.addEventListener("input", (e) => {
    filters.forEach((filter) => {
      if (filter.name == name) {
        filter.value = inputElement.value;
        applyFilter();
      }
    });
  });

  filterElement.appendChild(titleElement);
  filterElement.appendChild(inputElement);

  return filterElement;
}

function createStackOfFilters(){
filters.forEach((filter) => {
  let div = createFilter(filter.name, filter.value, filter.min, filter.max);
  filterContainer.appendChild(div);
});
}
createStackOfFilters()


// ADD CANVAS
inputImage.addEventListener("change", (e) => {
  let file = e.target.files[0];
  imageCanvas.style.display = "initial";
  let img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
    document.querySelector(".image-container").style.display = "none";
  };
});

//APPLYING FILTERS
function applyFilter() {
  if(!image) return;
  
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  const filterString = filters
    .map((f) => `${f.name}(${f.value}${f.unit})`)
    .join(" ");
  canvasCtx.filter = filterString;
  canvasCtx.drawImage(image, 0, 0);
}

// RESET FILTER VALUE
function resetFilterValue() {
  document.querySelectorAll(".filter input").forEach((input, i) => {
    input.value = filters[i].value = initialValue[i];
  });
  applyFilter();
}

document.querySelector("#reset-btn").addEventListener("click", (e) => {
  resetFilterValue();
});

//DOWNLOAD IMAGE
document.getElementById("download-btn").addEventListener("click", (e) => {
  let a = document.createElement("a");
  a.download = "Edited-image.png";
  a.href = imageCanvas.toDataURL();
  a.click();
});

// PRESET CREATION
(function createPreset() {
  Object.keys(filterPresets).forEach((key,i) => {
    let btn = document.createElement("button");
    btn.innerText=key;
    btn.classList.add('btn');
    btn.classList.add('preset-btn');
    document.querySelector('.filter-preset').appendChild(btn)
    
    btn.addEventListener("click",()=>{
      let preset = filterPresets[key]
      Object.keys(preset).forEach((filter,i)=>{
        filters[i].value=preset[filter];
        applyFilter()
      
        filterContainer.innerHTML=""
        createStackOfFilters()
       
      })
    })
  });
})();




