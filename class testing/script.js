
class person
{
    constructor(life) //construction
    {
        this.life = life;
        this.rand = 0;
    }

    print_details()
    {
        console.log(this.life);
    }

    kill_person()
    {
        this.life = 0;
    }

};

let p = new person(10);

p.print_details();
p.kill_person();
p.print_details();


    var testing = new Array();
    
    testing.push(10);

    function rec()
    {
        var abc = new Array();
        abc.push(10);
        abc.push(12);
        return abc;
    }

    testing = testing.concat(rec());
    testing.push(20);
    console.log(testing);
