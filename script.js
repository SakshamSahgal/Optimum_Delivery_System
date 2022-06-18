var graph = []; //variable that contails the weighted graph 
var selected_nodes = new Set(); //this set stores a list of selected nodes
var Click_audio = new Audio("Select_Sound.wav");
var Select_Node_Sound = new Audio("Select_Node_Sound.wav");
var current_selection_type = "Delivery_location"; //this variable stores the current selection type from checkbox (by default it is delivery locations)
var Source = null; //this variable stores the current source
var no_of_delivery_locations_selected = 0; //variable that tells the no of delivery_locations selected
var no_of_drivers_selected = 0;
var adjacency_matrix = new Array(199); //adjacency matrix to store graph and apply floyd warshal

function Get_Row_No_of_table_with_Data(data) //function searches the table for the data and returns the row number of the table where it finds the data(rows start with 0 , with heading being row 0) 
{
    var table = document.getElementById("Selected_Nodes_table");
    for (var i = 1; i < table.rows.length;i++) {
        var val = table.rows[i].cells[0].innerHTML;
        if(data == val)
            return i;
    }
    return -1;
}

function insert_row_with_data(data) //function that inserts a row with passed data
{
    var table = document.getElementById("Selected_Nodes_table");
    var row = table.insertRow(1); //inserting at the first index (since index 0 is heading)
    var cell = row.insertCell(0); //inserting at the 0th col (starting)
    cell.innerHTML = data;
}

function delete_row_with_data(data) //this function deletes a row which matched the content of the data passed
{
    var table = document.getElementById("Selected_Nodes_table");
    var index = Get_Row_No_of_table_with_Data(data);
    table.deleteRow(index);
}


function construct_graph() //this function feeds the graph variable using data from the SVG
{
    const Edges = document.querySelectorAll(`[id^="Edge"]`); //this querry selector extracts all elements with id's starting from Edges
    //console.log(Edges); 

    for(var i=1;i<=198;i++) //initialising empty rows to the array
     graph[i] = new Array();

    for(const edge of Edges)
    {
        const details = (edge.id).split("_"); //splitting the different parts of id into a string array
        //console.log("id  = " + edge.id + "splited details = " + details);
        var vertex_a = details[2];
        var vertex_b = details[3];
        var weight = details[4];
        //console.log(edge.id + " edge joins " + vertex_a + " " + vertex_b + " with weight " + weight);
        graph[vertex_a].push([vertex_b,weight]);
        graph[vertex_b].push([vertex_a,weight]); //feeding the vertices to the undirected weighted graph
    }
    console.table(graph);
}

construct_graph();  

function adjacency_list_to_matrix() //this function converts adjacency list to matrix for floyd warshal calculation
{
    var inf = 1000000000;
    for(var i=0;i<199;i++)
        adjacency_matrix[i] = new Array(199); //initializing the 2d array

        for(var i=0;i<199;i++)
        {
            for(var j=0;j<199;j++)
                (i == j) ? adjacency_matrix[i][j] = 0 : adjacency_matrix[i][j] = inf; //initializing with default values
        }
        
        for(auto i:graph)
        {
            for(auto j:i.second)
            {
                adj_matrix[i.first][j.first] = j.second;
                adj_matrix[j.first][i.first] = j.second;
            }

        }
       

}

function Debug_Details(obj) //this function debugs the details of the object that is currently hovered
{
    if(obj != null)
    {
        document.getElementById("Current_Hovered_Vertex").innerHTML = "Currently Hovered Vertex  = " + obj.id;
        var vertex = (obj.id).substring(5);
        var connected_to_vertex = graph[vertex][0][0];
        document.getElementById("Connected_by").innerHTML = "Connected By Node_" + connected_to_vertex;
    }
    else
    {
        document.getElementById("Current_Hovered_Vertex").innerHTML = "Currently Hovered Vertex  = NULL";
        document.getElementById("Connected_by").innerHTML = "Connected By = NULL";
    }
    document.getElementById("no_of_Drivers_debug").innerHTML = "Number of Drivers = " + no_of_drivers_selected;
}
function Clicked(obj)
{
    if(current_selection_type == "Delivery_location") //for selecting delivery locations
    {
        if(obj.id == Source) //this node is already selected as a source
          alert( obj.id + " is already selected as a Source");
        else
        {
            if(selected_nodes.has(obj.id)) //if already selected
            {
                selected_nodes.delete(obj.id); //delete it from the set
                obj.classList.remove("select_node"); //remove the css property of selected
                Select_Node_Sound.play(); //Select Node play
                delete_row_with_data(obj.id);
                no_of_delivery_locations_selected--;
                document.getElementById("No_of_Delivery_Locations").innerHTML = no_of_delivery_locations_selected;
            }
            else //if not not already selected
            {
                selected_nodes.add(obj.id); //add it to the list
                obj.classList.add("select_node"); //add the css property of selected
                Select_Node_Sound.play(); //Select Node play
                insert_row_with_data(obj.id);
                no_of_delivery_locations_selected++;
                document.getElementById("No_of_Delivery_Locations").innerHTML = no_of_delivery_locations_selected;
            }
        }
    }
    else //for selecting Source
    {
        if(selected_nodes.has(obj.id))
                alert( obj.id + " is already selected as a delivery location"); //if clicked object is already a delivery location so it cannot be a source
        else
        {
            if(obj.id == Source) //if we reclicked an already selected source then it should be removed as source
            {
                Source = null; //updating the Source
                document.getElementById("src_selected_img").src = "Cross.png";
                document.getElementById("Source").innerHTML = "Source : NULL";
                obj.classList.remove("Source_Node");
            }
            else //A new source is selected
            {
                document.getElementById("src_selected_img").src = "Tick.png";
                if(Source != null) //if previously a source was selected
                    document.getElementById(Source).classList.remove("Source_Node"); //then remove it's source node CSS property
                
                Source = obj.id; //updating the Source
                document.getElementById("Source").innerHTML = "Source : " + obj.id;
                obj.classList.add("Source_Node");
            }
        }
             
    }
    slider_update();
}

function Highlight(obj) //function that is called when mouse enters over from a selectable node
{
    Click_audio.play(); //plays click sound on highlighting a node
    //console.log("highlighted = " + obj.id); 
    obj.classList.add("highlight_node");    //add the highlight_node css property to the obj
    Debug_Details(obj);
}

function Un_Highlight(obj) //function that is called when mouse leaves over from a selectable node
{
    //console.log("unhighlighted = " + obj.id);
    obj.classList.remove("highlight_node");  //removes the highlight_node css property to the obj
    Debug_Details(null);
}


function on_selection_type_change(obj) //function called when selection type radio button changes value
{
    console.log(obj.id);
    current_selection_type = obj.id; //update the current selection type
}

function slider_update() //this function updates the state of the driver slider 
{
    var driver_slider = document.getElementById("Drivers_slider"); 
    if(no_of_delivery_locations_selected > 0 && Source != null) //if possible state then enable the sider
        {
            driver_slider.min = 1; //setting slider minimum value
            driver_slider.max = no_of_delivery_locations_selected; //setting slider max value
            driver_slider.disabled = false; //enabling slider
            no_of_drivers_selected = driver_slider.value; //updating no of drivers
        }
    else //if slider needs to be disabled
    {
            driver_slider.min = 0;  //setting slider minimum value
            driver_slider.max = no_of_delivery_locations_selected; //setting slider max value
            driver_slider.disabled = true;   //disabling the slider
            no_of_drivers_selected = 0;
    }
    document.getElementById("slider_min").innerHTML = driver_slider.min; //updating minimum value on control pallet
    document.getElementById("slider_max").innerHTML = driver_slider.max; //updating maximum value on control pallet
    document.getElementById("no_of_drivers").innerHTML = "No of drivers Selected = " + no_of_drivers_selected; //updating no of drivers on display pallet
    document.getElementById("no_of_Drivers_debug").innerHTML = "Number of Drivers = " + no_of_drivers_selected;
}

function on_slider_value_change(obj)
{
    no_of_drivers_selected = obj.value;
    document.getElementById("no_of_drivers").innerHTML = "No of drivers Selected = " + obj.value;
    document.getElementById("no_of_Drivers_debug").innerHTML = "Number of Drivers = " + no_of_drivers_selected;
}

function reveal() //function that removes the translucent overlay and reveals the website
{
    document.getElementById("overlay").hidden = true;
}