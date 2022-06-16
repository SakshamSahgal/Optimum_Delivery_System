
const selected = new Set();

selected.add("abc");
selected.add("bcd");
selected.add("abc");
selected.add("bcd");
selected.delete("abc");

for(const ele of selected)
    console.log(ele);


if(selected.has("abd"))
console.log("hai");

var val1 = 'ad';

// document.getElementById("mytable").innerHTML += "<tr> val1 <tr>";
// document.getElementById("mytable").innerHTML += "<tr> sd <tr>";
// document.getElementById("mytable").innerHTML += "<tr> assdd <tr>";

var table = document.getElementById("mytable");

for(var i=0;i<5;i++)
{
// Create an empty <tr> element and add it to the 1st position of the table:
var row = table.insertRow(i+1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(0);

// Add some text to the new cells:
cell1.innerHTML = i+1;
}

table.deleteRow(3);
table.deleteRow(3);


console.log("rows length = " + table.rows.length);


for (var i = 1; i < table.rows.length;i++) {
    var data = table.rows[i].cells[0].innerHTML;
    console.log(data);     
}

