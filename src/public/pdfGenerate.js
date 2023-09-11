function printPrescription (event) {   
    event.preventDefault();

    const getTable = foundTable();
    //var patient = document.getElementById('namePatient').value
    const doc = new jsPDF();
    doc.text(getTable, 10, 40)
    doc.save('medicamentos de ' + document.getElementById('namePatient').value + '.pdf');
   

}  

function foundTable () {
    let str = '';
    const table = document.getElementById('medicine');

    for (let i = 1; i <= table.rows.length - 1; i++) {
        str += '\n' // salto de linea
         for (let j = 0; j <= table.rows[i].cells.length - 1; j++) {
           if(j == 0) {
              str += '- '
           } else {
              let col = table.rows[i].cells[j-1].innerText;
              str += ` ${col}`
           }
         }
    }
    return str;
}