

class boxes
{

    constructor(v1,v2)
    {
       this.v1 = v1;
       this.v2 = v2;
    }

}

const boxx = [];

const elements1 = document.querySelectorAll(`[id^="Box"]`);
console.log(elements1); 

for(const ele of elements1)
{
    console.log(ele.id);
    var id = ele.id;
    boxx.push(new boxes((ele.id).substring(4, 5),(ele.id).substring(6,7)));
}


console.log(boxx);

