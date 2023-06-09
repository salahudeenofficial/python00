let args = process.argv.slice(2);
function extractStringBeforeLastSlash(inputString) {
  const lastIndex = inputString.lastIndexOf('/');
  
  if (lastIndex === -1) {
    // No "/" symbol found
    return inputString;
  }
  
  const extractedString = inputString.substring(0, lastIndex);
  return extractedString;
}

// Example usage

const result = extractStringBeforeLastSlash(args);




//  hippos foot formulae is used length in ft and gridth in inches
function hippos(g,l) {
    g = g/12
    let vol = Math.pow(g/4, 2)
    vol = vol * l
    return vol.toFixed(1)
  }
  
 



  
//     function to read file 

function read(path) {
// Requiring the module
const reader = require('xlsx')

// Reading our test file
const file = reader.readFile(path)

let data = []

const sheets = file.SheetNames

for(let i = 0; i < sheets.length; i++)
{
const temp = reader.utils.sheet_to_json(
		file.Sheets[file.SheetNames[i]])

temp.forEach((res) => {
	data.push(res)
})

}
return data

}




// adding volume property data
function addvol(x) {


let  newdata = []

for(let i=0;i<x.length;i++){
    let log = x[i]
    let volume = hippos(log.gridth,log.length)
    let newlog = {
        'gridth':log.gridth,
        'length':log.length,
        'volume': volume
    }
    newdata.push(newlog)

}

return newdata
}






function printpdf(jsonData){
    const fs = require('fs');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

// JSON data representing the table content




// Create a new jsPDF instance
const doc = new jsPDF();

// Set up the content of the PDF document
doc.setFontSize(12);
doc.text('Table Content:', 10, 10);

// Set up table headers
const headers = ['gridth', 'length', 'volume'];

// Set up table rows
const rows = jsonData.map(item => Object.values(item));

// Generate the table using jspdf-autotable plugin
doc.autoTable({
  head: [headers],
  body: rows,
  startY: 20
});
// Save the PDF document to a file
const filePath = `${result}\output.pdf`;
fs.writeFileSync(filePath, doc.output());

console.log('PDF created successfully!');
//return 'PDF created successfully!'
}





let x = read(`${args}`)
const jsonData = addvol(x)
printpdf(jsonData)



