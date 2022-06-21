
//-------------------array---------------------//

console.group("array");
var arr = new Array();
arr[0] = 123;  //O(1) if key does not exist [uses hashtable]
arr[1] = "saksham"; //O(1) if key does not exist [uses hashtable]
arr[3] = "abcd";  //O(1) if key does not exist [uses hashtable]
arr[4] = 12.23;  //O(1) if key does not exist [uses hashtable]

for(const i of arr)  //O(1) access and O(n) iteration
    console.log(i);

arr[2] = "beech";

console.log("\n");

for(const i of arr)  //O(1) access and O(n) iteration
    console.log(i);


console.log("\n");

console.log(arr.includes("abcd")); //(O(N) searching in array (linear))
console.log(arr.includes("3"));

delete arr[2]; //removes the element from the index but doesnt reindex the array

console.log("\n");

for(const i of arr)  //O(1) access and O(n) iteration
    console.log(i);

arr.splice(2,1); // delete from 2th index and do till 1 length (O(n))
//splice rearranges the array and changes size
console.log("\n");

for(const i of arr)  //O(1) access and O(n) iteration
    console.log(i);

console.log("length  = " + (arr.length));

console.groupEnd("array");


//-------------------set---------------------//

console.group("set");
var my_set = new Set(); //set doesnt keep sorted

my_set.add(10); //O(1) avg [ O(N) worst case (Astronomically rare) ] 
my_set.add(5); //O(1) avg [ O(N) worst case (Astronomically rare) ] 
my_set.add(6); //O(1) avg [ O(N) worst case (Astronomically rare) ] 
my_set.add(3); //O(1) avg [ O(N) worst case (Astronomically rare) ] 
my_set.add("saksham"); //O(1) avg [ O(N) worst case (Astronomically rare) ] 

//sets cannot contain dublicate items


for(const i of my_set)
    console.log(i);

console.log("\n");
console.log(my_set.has(10)); //O(1) because uses hash_tables


my_set.delete(3); //O(1) average

console.log("\n");

for(const i of my_set)
    console.log(i);

console.groupEnd("set");

