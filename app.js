const xhr = new XMLHttpRequest()
// WHOLE PAGE
let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Mike+Tyson&prop=text&disableeditsection=true&origin=*'
// SECTIONS TITLES
//let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Steve+Jobs&prop=sections'
// SPECIFIC SECTION
//let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Steve+Jobs&section=1&disableeditsection=true&mobileformat=true&origin=*'

xhr.open('GET', url, true)
console.log('OPENED', xhr.status);

xhr.onprogress = function () {
  document.body.output = '<p>Loading resource...</p>'
};

var test =''
xhr.onload = function () {
  console.log('Success!',this.status)
  if (this.status === 200) {
    var data = JSON.parse(this.responseText)
    test = data
    var html = data.parse.text['*']
    var output = document.getElementById('output')
    
    // Clean HTML from styles and extra tags
    
    output.innerHTML = html
    cleanUp(output)
    // Call section printing function
    //printSections(data)
    output.addEventListener('mouseup', getHighlight)

    
  }
};
xhr.send()

document.getElementById('add-note-btn').addEventListener('click', addNote)

function addNote (e) {
  var note = `
        <div class="card text-white bg-dark mb-3">
          <div class="card-body">
            <h5 class="card-title">Article: ${test.parse.displaytitle}</h5>
            <p class="card-text" id="notes">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <button id="delete-note">delete</button>
          </div>
        </div>
  `
  document.getElementById('notes').innerHTML += note

  // Add close btn event
  
  
  
  
}
document.getElementById('notes').addEventListener('click',deleteNote)
// Note delete button event function
function deleteNote (e) {
  if (e.target.id === 'delete-note') {
    console.log('delete event')
    e.target.parentElement.parentElement.remove()
  }
}

// Text highlighter first click
function getHighlight (e) {
  text = window.getSelection();
  if (text != '')  {
      document.getElementById('notes').innerHTML += `
      <div class="card text-white bg-dark mb-3">
          <div class="card-body">
            <h5 class="card-title">Article: ${test.parse.title}</h5>
            <p class="card-text" id="notes">${text}</p>
            <button id="delete-note">delete</button>
          </div>
        </div>
      `
    }
  text.empty()
}


// FUNCTION FOR OUTPUTING WIKI PAGE SECTIONS FROM JSON OBJECT
// function printSections (sections) {
//   sections.parse.sections.forEach(element => {
//     document.getElementById('output').innerHTML+=`<li>${element.line}</li>`
//   });
// }

// Clean Wiki from all styles and extra HTML
function cleanUp (html) {
  Array.from(html.querySelectorAll('.reference,.mw-references-wrap,.hatnote')).forEach(item => item.remove())
  Array.from(html.querySelectorAll('span,a,b')).forEach(item => item.outerHTML = item.innerHTML)
}