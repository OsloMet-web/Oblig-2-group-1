
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
}


// Get data from .txt | fetch only works on github
const articlesData = []
fetch("../filesystem.txt")
    .then(response => response.text())
    .then(data => {
        let lines = data.split("\n")
        let headers = lines[0].split(" | ")

        for (let i = 1; i < lines.length; i++) {
            let values = lines[i].split(" | ")
            let articleData = {}

            for (let j = 0; j < headers.length; j++) {
                articleData[headers[j]] = values[j].replace(/(^"|"$)/g, "")  // Remove quotes
            }

            articlesData.push(articleData)

            // For each item in articlesData clone template and populate at that index | Fetch is asynchronous 
            cloneTemplate()
            populateTemplateAtIndex(i - 1)

            console.log(articlesData)
        }
    })
    .catch(error => {
        console.log("Error:", error)
    })

// Populate with data at index x
function populateTemplateAtIndex(index) {
  let article = document.querySelectorAll(".article")[index]
  
  // If Index is 2nd and every 11th index therafter then add class span2 => 2, 13 , 24, etc
  if ((index === 1) || ((index - 1) % 11 === 0 && index !== 0)) {
    article.classList.add("span2")  
  }

  // Add information into the data attributes
  if (article && articlesData[index]) {
      let data = articlesData[index]
      article.querySelector("[data-modal-title]").innerHTML = data["data-modal-title"]
      article.querySelector("[data-modal-author-date]").innerHTML = data["data-modal-author-date"]
      article.querySelector("[data-modal-img]").src = data["data-modal-img"]
      article.querySelector("[data-modal-img-caption]").innerHTML = data["data-modal-img-caption"]
      article.querySelector("[data-modal-content]").innerHTML = data["data-modal-content"]
  }
}
