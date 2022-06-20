
class Typed_Array
{
    constructor (size,default_val)
    {
        this.size = size;
        this.a = new Int16Array(size).fill(default_val);
    }

    get(i)
    {
        return (this.a[i]);
    }

    set(val,i)
    {
        this.a[i] = val;
    }

    abc()
    {
        a[0] = 1;
        a[1] = 2;
        for(var i=0;i<this.size;i++)
            console.log(a[i]);
    }
};

var a = new Typed_Array(10,6);

a.set(10,0);
console.log(a.get(6));



class Typed_2D_Array
{
    constructor (row,col,default_val)
    {
        this.size = row*col;
        this.row = row;
        this.col = col;
        this.a = new Int16Array(row*col).fill(default_val);;
    }

    get(i,j)
    {
        return (this.a[(i*(this.col) + j)]);
    }

    set(val,i,j)
    {
        this.a[(i*(this.col) + j)] = val;
    }

    printer()
    {
        for(var i=0;i<this.row;i++)
        {
            var str = "";
            for(var j=0;j<this.col;j++)
                str += (this.a[(i*(this.col) + j)]) + " ";
            
            console.log(str);
        }
    }
};


var arr = new Typed_2D_Array(3,4,0);

for(var i=0;i<3;i++)
{
    for(var j=0;j<4;j++)
        arr.set(i+j,i,j);
}

arr.printer();

console.log(arr.get(0,3));