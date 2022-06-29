class Typed_2D_Array //a class for creating a typed 2d array (this array only stores integers and is stored contigously in memory just like in c++)
{
    constructor (row,col,default_val)
    {
        this.size = row*col;
        this.row = row;
        this.col = col;
        this.a = new Int16Array(row*col).fill(default_val);
        this.i;
        this.j;
    }

    get(i,j)
    {
        this.i = parseInt(i);
        this.j = parseInt(j);
        //console.log("distance btw = " + this.i + " and " + this.j + "is = " + ( this.a[ ( (this.i)*(this.col) + (this.j) ) ] ));
        return ( this.a[ ( (this.i)*(this.col) + (this.j) ) ] );
    }

    set(val,i,j)
    {
        this.i = parseInt(i);
        this.j = parseInt(j);
        this.a[ ( (this.i)*(this.col) + (this.j) ) ] = val;
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

class Overlay_decide
{
    constructor() 
    {
        document.getElementById("overlay").hidden = false;
        this.board = document.getElementById("Board");
    }

    show_entry_overlay()
    {
        document.getElementById("overlay").hidden = false;
        this.board.src = welcome_img; 
    }

    show_please_note()
    {
        document.getElementById("overlay").hidden = false;
        this.board.src = Please_note;
    }
}


var welcome_img = "GUI_Resources/Welcome_Board.png";
var Please_note = "GUI_Resources/Please_Note.png";
var graph = []; //variable that contails the weighted graph 
var selected_nodes = new Set(); //this set stores a list of selected nodes
var Click_audio = new Audio("Select_Sound.wav");
var Select_Node_Sound = new Audio("Select_Node_Sound.wav");
var current_selection_type = "Delivery_location"; //this variable stores the current selection type from checkbox (by default it is delivery locations)
var Source = null; //this variable stores the current source
var no_of_delivery_locations_selected = 0; //variable that tells the no of delivery_locations selected
var no_of_drivers_selected = 0;
var cross_img = "GUI_Resources/Cross.png";
var Tick_img = "GUI_Resources/Tick.png";
var Edge_List = new Typed_2D_Array(199,199,0); //stores the edge no between v1 and v2 (used to highlight and unhighlight edges)

var Overlay = new Overlay_decide();
Overlay.show_entry_overlay();