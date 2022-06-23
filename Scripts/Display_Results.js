
function Highlight_Clusters(obj)
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

function Un_Highlight_Clusters(obj)
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



function display_clusters_generated(Calc_cluster) //display the clusters generated in the table
{
    var table = document.getElementById("Clusters_generated_table");
   
    while(table.rows.length > 1) { //clearing any previous results (if any) from the table
        table.deleteRow(1);
      }

    for(const [key,val] of Calc_cluster.clusters)
    {
        console.log("ye insert karenge = " + key);
        if(val.length == 0)
           insert_row_with_data(key,"Clusters_generated_table"); //inserting elements into the table
        else
            insert_row_with_data([key,val],"Clusters_generated_table");
    }
    
    for(var i=1;i<table.rows.length;i++)
    {
         var this_row = table.rows[i];   
         this_row.id = (table.rows[i].cells[0].innerHTML);
         this_row.setAttribute("onmouseover","Highlight_Clusters(this)"); //setting onclick event handler dynamically on each rows
         this_row.setAttribute("onmouseleave","Un_Highlight_Clusters(this)"); //setting onclick event handler dynamically on each rows
        
    }

}

