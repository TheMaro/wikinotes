const xhr = new XMLHttpRequest()
// WHOLE PAGE
// let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Steve+Jobs&prop=text'
// SECTIONS TITLES
//let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Steve+Jobs&prop=sections'
// SPECIFIC SECTION
let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Mike+Tyson&section=10&disableeditsection=true&mobileformat=true&origin=*'

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
    output.innerHTML = html
    
    // Call section printing function
    //printSections(data)
    
    
    // REMOVE LINKS FROM WIKI PAGE
    links = output.getElementsByTagName('a')
    for (let i=0; i<links.length; i++) {
      links[i].removeAttribute('href')
    }
  }
};
xhr.send()

document.getElementById('add-note-btn').addEventListener('click', addNote)

function addNote (e) {
  document.getElementById('notes').innerHTML = document.getElementById('output').innerHTML
}
// FUNCTION FOR OUTPUTING WIKI PAGE SECTIONS FROM JSON OBJECT
// function printSections (sections) {
//   sections.parse.sections.forEach(element => {
//     document.getElementById('output').innerHTML+=`<li>${element.line}</li>`
//   });
// }