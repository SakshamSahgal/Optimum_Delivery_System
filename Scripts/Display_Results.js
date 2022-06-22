
function test(obj)
{
    alert(obj.id);
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
         this_row.setAttribute("onclick","test(this)"); //setting onclick event handler dynamically on each rows
    }

}

