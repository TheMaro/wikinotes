const xhr = new XMLHttpRequest()
// WHOLE PAGE
// let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Steve+Jobs&prop=text'
// SECTIONS TITLES
//let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Steve+Jobs&prop=sections'
// SPECIFIC SECTION
let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Steve+Jobs&section=1&disableeditsection=true&mobileformat=true'
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
    //printSections(data)
    
    
    // REMOVE LINKS FROM WIKI PAGE
    links = output.getElementsByTagName('a')
    for (let i=0; i<links.length; i++) {
      //links[i].removeAttribute('href')
      //links[i].outerHTML = links[i].childNodes[0].outerHTML
    }

    console.log(links[1].children[0])
    console.log(links[1].childNodes[0].outerHTML)
    links[0] = links[0].children[0]
    links[1].outerHTML = links[1].children[0].outerHTML
    console.log(links[1])
  }
};
xhr.send()

// function printSections (sections) {
//   sections.parse.sections.forEach(element => {
//     document.getElementById('output').innerHTML+=`<li>${element.line}</li>`
//   });
// }