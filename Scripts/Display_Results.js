
var cur_driver_no = -1;

function Highlight_Clusters(obj) //this function is called when we hover over a cell in the table and highlights both the cluster and cell row
{
    if(document.getElementById(obj.id).classList.contains("table_cell_highlight") == false)
       document.getElementById(obj.id).classList.add("table_cell_highlight");

    var to_highlight = (obj.id).split(","); //variable that holds current cluster to be highlighted
    for(const i of to_highlight)
    {
        var id = "Node_" + i;
        if( document.getElementById(id).classList.contains("cluster_Highlight") == false)
           document.getElementById(id).classList.add("cluster_Highlight");
    }
}

function Un_Highlight_Clusters(obj) //this function is called when we leave from hover over a cell in the table and un_highlights both the cluster and cell row
{
    if(document.getElementById(obj.id).classList.contains("table_cell_highlight") == true)
        document.getElementById(obj.id).classList.remove("table_cell_highlight");
    
    var to_highlight = (obj.id).split(","); //variable that holds current cluster to be highlighted
    for(const i of to_highlight)
    {
        var id = "Node_" + i;
        if( document.getElementById(id).classList.contains("cluster_Highlight") == true)
           document.getElementById(id).classList.remove("cluster_Highlight");
    }
}


function display_clusters_generated(Calc_cluster) //display the clusters generated , in the table
{
    var table = document.getElementById("Clusters_generated_table");
   
    while(table.rows.length > 1) { //clearing any previous results (if any) from the table
        table.deleteRow(1);
      }

    for(const grp of Calc_cluster.cluster_groups)  //inserting the array into table row
        insert_row_with_data(grp,"Clusters_generated_table");
    
    for(var i=1;i<table.rows.length;i++)
    {
         var this_row = table.rows[i];   
         this_row.id = (table.rows[i].cells[0].innerHTML);
         this_row.setAttribute("onmouseover","Highlight_Clusters(this)"); //setting onmouseover event handler dynamically on each rows
         this_row.setAttribute("onmouseleave","Un_Highlight_Clusters(this)"); //setting onmouseleave event handler dynamically on each rows   
    }
}

function Highlight_path(this_path)
{
    document.getElementById("Driver_Details_Card").style = "";
    var driver_no = (this_path.innerHTML).substring(11,(this_path.innerHTML).length - 5); //extracting the driver no from the table data
    //console.log(driver_no);
    document.getElementById("Driver_Name").innerHTML = "Driver Name = " + "Driver " + driver_no;
    var his_cluster_table = document.getElementById("Clusters_generated_table");
    var his_clusters = his_cluster_table.rows[driver_no].cells[0].innerHTML;
    document.getElementById("Delivery_location").innerHTML = "Deliver_Locations = " + his_clusters;
    if(document.getElementById(this_path.id).classList.contains("table_cell_highlight") == false)
       document.getElementById(this_path.id).classList.add("table_cell_highlight");
    //console.log(this_path.id);
    var path = this_path.id.split(",");
    vis.show_path(path);
}

function Un_Highlight_path(this_path)
{
   document.getElementById("Driver_Details_Card").style ="display: none;";
   if(document.getElementById(this_path.id).classList.contains("table_cell_highlight") == true)
   document.getElementById(this_path.id).classList.remove("table_cell_highlight");
   var path = (this_path.id).split(",");
   vis.un_highlight_path(path);
   
}
function display_paths(Calc_cluster) //display the paths generated , in the table
{
    var table = document.getElementById("Drivers_path"); 
    while(table.rows.length > 1) { //clearing any previous results (if any) from the table [not deleting the first row because it is heading]
        table.deleteRow(1); 
      }
    
      for(var i=1 ; i <= Calc_cluster.path.length ; i++)  //inserting the data into table row
        insert_row_with_data(("Driver " + i),"Drivers_path");
              
        for(var i=1;i<table.rows.length;i++)
        {
             var this_row = table.rows[i];   
             this_row.id = Calc_cluster.path[i-1];
             this_row.setAttribute("onmouseover","Highlight_path(this)"); //setting onclick event handler dynamically on each rows
             this_row.setAttribute("onmouseleave","Un_Highlight_path(this)"); //setting onclick event handler dynamically on each rows   
        }
}

function Update_Driver_Card(driver) //this function is called when we hover over a driver name
{
    //var index = driver
    document.getElementById("Driver_Details_Card").hidden = false;
    document.getElementById("Delivery_location").innerHTML = "Delivery_location = "; 
}