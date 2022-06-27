
function selection_type(obj)
{
    if(obj.checked == true)
        console.log(obj.id);
    
}

var myset = new Set();

myset.add("abc");
console.log(myset.has("abc"));
myset.delete("abc");
console.log(myset.has("abc"));