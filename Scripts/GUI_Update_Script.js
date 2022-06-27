function Get_Row_No_of_table_with_Data(data, id) //function searches the table for the data and returns the row number of the table where it finds the data(rows start with 0 , with heading being row 0) 
{
    var table = document.getElementById(id);
    for (var i = 1; i < table.rows.length; i++) {
        var val = table.rows[i].cells[0].innerHTML;
        if (data == val)
            return i;
    }
    return -1;
}

function insert_row_with_data(data, id) //function that inserts a row with passed data
{
    var table = document.getElementById(id);
    var row = table.insertRow(1); //inserting at the first index (since index 0 is heading)
    var cell = row.insertCell(0); //inserting at the 0th col (starting)
    cell.innerHTML = data;
}

function delete_row_with_data(data, id) //this function deletes a row which matched the content of the data passed
{
    var table = document.getElementById(id);
    var index = Get_Row_No_of_table_with_Data(data, id);
    table.deleteRow(index);
}


function Debug_Details(obj) //this function debugs the details of the object that is currently hovered
{
    if (obj != null) {
        document.getElementById("Current_Hovered_Vertex").innerHTML = "Currently Hovered Vertex  = " + obj.id;
        var vertex = (obj.id).substring(5);
        var connected_to_vertex = graph[vertex][0][0];
        document.getElementById("Connected_by").innerHTML = "Connected By Node_" + connected_to_vertex;
    }
    else {
        document.getElementById("Current_Hovered_Vertex").innerHTML = "Currently Hovered Vertex  = NULL";
        document.getElementById("Connected_by").innerHTML = "Connected By = NULL";
    }
    document.getElementById("no_of_Drivers_debug").innerHTML = "Number of Drivers = " + no_of_drivers_selected;
}
function Clicked(obj) { //clicked on any node [selectable]
    if (current_selection_type == "Delivery_location") //for selecting delivery locations
    {
        if (obj.id == Source) //this node is already selected as a source
            alert(obj.id + " is already selected as a Source");
        else {
            if (selected_nodes.has(obj.id)) //if already selected
            {
                selected_nodes.delete(obj.id); //delete it from the set
                obj.classList.remove("select_node"); //remove the css property of selected
                Select_Node_Sound.play(); //Select Node play
                delete_row_with_data(obj.id, "Selected_Nodes_table");
                no_of_delivery_locations_selected--;
                document.getElementById("No_of_Delivery_Locations").innerHTML = no_of_delivery_locations_selected;
            }
            else //if not not already selected
            {
                selected_nodes.add(obj.id); //add it to the list
                obj.classList.add("select_node"); //add the css property of selected
                Select_Node_Sound.play(); //Select Node play
                insert_row_with_data(obj.id, "Selected_Nodes_table");
                no_of_delivery_locations_selected++;
                document.getElementById("No_of_Delivery_Locations").innerHTML = no_of_delivery_locations_selected;
            }
        }
    }
    else //for selecting Source
    {
        if (selected_nodes.has(obj.id))
            alert(obj.id + " is already selected as a delivery location"); //if clicked object is already a delivery location so it cannot be a source
        else {
            if (obj.id == Source) //if we reclicked an already selected source then it should be removed as source
            {
                Source = null; //updating the Source
                document.getElementById("src_selected_img").src = cross_img;
                document.getElementById("Source").innerHTML = "Source : NULL";
                obj.classList.remove("Source_Node");
            }
            else //A new source is selecte
            {
                document.getElementById("src_selected_img").src = Tick_img;
                if (Source != null) //if previously a source was selected
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
    //console.log(obj.id);
    current_selection_type = obj.id; //update the current selection type
}

function slider_update() //this function updates the state of the driver slider 
{
    var driver_slider = document.getElementById("Drivers_slider");
    if (no_of_delivery_locations_selected > 1 && Source != null) //if possible state then enable the sider
    {
        driver_slider.min = 2; //setting slider minimum value
        driver_slider.max = no_of_delivery_locations_selected; //setting slider max value
        driver_slider.disabled = false; //enabling slider
        no_of_drivers_selected = driver_slider.value; //updating no of drivers
    }
    else //if slider needs to be disabled
    {
        driver_slider.min = 0;  //setting slider minimum value
        if(no_of_delivery_locations_selected >= 2)
          driver_slider.max = no_of_delivery_locations_selected; //setting slider max value
        else
            driver_slider.max =0;
        
        driver_slider.disabled = true;   //disabling the slider
        no_of_drivers_selected = 0;
    }
    document.getElementById("slider_min").innerHTML = driver_slider.min; //updating minimum value on control pallet
    document.getElementById("slider_max").innerHTML = driver_slider.max; //updating maximum value on control pallet
    document.getElementById("no_of_drivers").innerHTML = "No of drivers Selected = " + no_of_drivers_selected; //updating no of drivers on display pallet
    document.getElementById("no_of_Drivers_debug").innerHTML = "Number of Drivers = " + no_of_drivers_selected;
}

function on_slider_value_change(obj) {
    no_of_drivers_selected = obj.value;
    document.getElementById("no_of_drivers").innerHTML = "No of drivers Selected = " + obj.value;
    document.getElementById("no_of_Drivers_debug").innerHTML = "Number of Drivers = " + no_of_drivers_selected;
}

function reveal() //function that removes the translucent overlay and reveals the website
{
    document.getElementById("overlay").hidden = true;
}


