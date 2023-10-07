
// Modal
const openButtons = document.querySelectorAll("[data-open-modal]")
const closeButtons = document.querySelectorAll("[data-close-modal]")
const modals = document.querySelectorAll("[data-modal]")

openButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].showModal() // For each modal open when clicked
  })
})

closeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].close() // For each button in modal close when clicked
  })
})

modals.forEach(modal => {
  modal.addEventListener("click", e => {
    let dialogDimensions = modal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close() // For each modal close when clicked outside of given dimensions
    }
  })
})

// Clone template function
function cloneTemplate() {
  // Clone html template tag
  const template = document.getElementById("article-template")
  const clone = document.importNode(template.content, true)

  // Append to the "output" id
  const outputElement = document.getElementById("output")
  outputElement.appendChild(clone)

  return clone
}

// Populate with data at index x
function populateTemplateAtIndex(index, clonnedarticle) {
  // If Index is 2nd and every 11th index therafter then add class span2 => 2, 13 , 24, etc
  if ((index === 1) || ((index - 1) % 11 === 0 && index !== 0)) {
    let outerDiv = clonnedarticle.querySelector(".article")
    console.log(outerDiv)
    outerDiv.classList.add("span2")  
  }

  // Add information into the data attributes
  if (clonnedarticle && articlesData[index]) {
    let data = articlesData[index]
    clonnedarticle.querySelector("[data-modal-title]").innerHTML = data["data-modal-title"]
    clonnedarticle.querySelector("[data-modal-author-date]").innerHTML = data["data-modal-author-date"]
    clonnedarticle.querySelector("[data-modal-img]").src = data["data-modal-img"]
    clonnedarticle.querySelector("[data-modal-img-caption]").innerHTML = data["data-modal-img-caption"]
    clonnedarticle.querySelector("[data-modal-content]").innerHTML = data["data-modal-content"]
  }
}

// Get data from .txt | fetch only works on github | Async so order is correct and data is loaded
const articlesData = []

async function fetchData() {
  try {
    let response = await fetch("/Oblig-2-group-1/filesystem.txt")
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    let data = await response.text()
    let lines = data.trim().split("\n")
    let headers = lines[0].trim().split(/\s*\|\s*/) // Splits header by "|" and trims any spaces

    for (let i = 1; i < lines.length; i++) {
      let values = lines[i].trim().split(/\s*\|\s*/) // Splits by "|" and trims any spaces
      let articleData = {}

      // If the current line does not have the expected number of values, skip it
      if (values.length !== headers.length) {
        continue
      }
      for (let j = 0; j < headers.length; j++) {
        let cleanValue = values[j].replace(/(^"|"$)/g, "") // Remove quotes
        articleData[headers[j]] = cleanValue
      }

      articlesData.push(articleData)
      console.log(articleData)
    }

  }catch (error) {
    console.log("Error:", error)
  }
}

document.addEventListener("DOMContentLoaded", function() {
  fetchData().then(() => {
    // For each item in articlesData clone template and populate at that index 
    for (let i = 1; i < articlesData.length; i++) {
      console.log(i)
      let clonnedarticle = cloneTemplate()
      console.log(clonnedarticle)
      populateTemplateAtIndex(i,clonnedarticle)
    }
  })
})



