var graph = []; //variable that contails the weighted graph 
var selected_nodes = new Set(); //this set stores a list of selected nodes
var Click_audio = new Audio("Select_Sound.wav");
var Select_Node_Sound = new Audio("Select_Node_Sound.wav");
var current_selection_type = "Delivery_location"; //this variable stores the current selection type from checkbox (by default it is delivery locations)
var Source = null; //this variable stores the current source

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
            }
            else //if not not already selected
            {
                selected_nodes.add(obj.id); //add it to the list
                obj.classList.add("select_node"); //add the css property of selected
                Select_Node_Sound.play(); //Select Node play
                insert_row_with_data(obj.id);
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
                document.getElementById("Source").innerHTML = "Source : NULL";
                obj.classList.remove("Source_Node");
            }
            else //A new source is selected
            {
                if(Source != null) //if previously a source was selected
                    document.getElementById(Source).classList.remove("Source_Node"); //then remove it's source node CSS property
                
                Source = obj.id; //updating the Source
                document.getElementById("Source").innerHTML = "Source : " + obj.id;
                obj.classList.add("Source_Node");
            }
        }
             
    }
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