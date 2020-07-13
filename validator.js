const form = document.getElementById('form')
const result = document.getElementById('result')

const processForm = (e) => {
  e.preventDefault()
  const inputValue = form['validator'].value

  const tagsArray = inputValue.match(/<\/?[a-zA-Z]+(>|.*?[^?]>)/gi)

  const validationArray = []
  let isValid = true

  tagsArray.map((tag) => {
    if (!tag.search(/<[a-zA-Z]+(>|.*?[^?]>)/gi) && tag.search(/<[a-zA-Z]+(.*?[^?]\/>)/gi)) {
      validationArray.unshift(tag)
    }

    if (tag.search(/<[a-zA-Z]+(>|.*?[^?]>)/gi)) {
      const openTag = validationArray[0].match(/<([a-zA-Z0-9]+)/)
      const closeTag = tag.match(/<\/([a-zA-Z0-9]+)/)

      if (openTag[1].toLowerCase() === closeTag[1].toLowerCase()) {
        validationArray.shift()
      } else {
        isValid = false
      }
    }
  })

  if(validationArray.length !== 0){
    isValid = false
  }

  result.innerHTML = (isValid) ? 'HTML is valid' : 'HTML is invalid'
  result.className = (isValid) ? 'alert alert-success' : 'alert alert-danger'
}

form.addEventListener('submit', processForm)

