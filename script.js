let filterContainer = document.querySelector(".filters-section");
let inputImage=document.querySelector('#file-input')
let imageCanvas=document.querySelector('canvas')
let canvasCtx=imageCanvas.getContext("2d")

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
    name: "saturation",
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  {
    id: 4,
    name: "hueRotation",
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

function createFilter(name,value,min,max,unit="%"){
    let filterElement=document.createElement('div')
    filterElement.classList.add('filter')

    let titleElement=document.createElement('p')
    titleElement.innerText=name

    let inputElement=document.createElement('input')
    inputElement.type="range"
    inputElement.id=name
    inputElement.value=value
    inputElement.min=min
    inputElement.max=max

    filterElement.appendChild(titleElement)
    filterElement.appendChild(inputElement)

    return filterElement
}

filters.forEach(filter=>{
    let div=createFilter(filter.name,filter.value,filter.min,filter.max)
    filterContainer.appendChild(div)
})

inputImage.addEventListener('change',(e)=>{
    let file = e.target.files[0]
    imageCanvas.style.display="initial"
    let img= new Image();
    img.src=URL.createObjectURL(file)
    
    img.onload=()=>{
        imageCanvas.width=img.width;
        imageCanvas.height=img.height;
        canvasCtx.drawImage(img,0,0);
        document.querySelector('.image-container').style.display="none"
    }
})


