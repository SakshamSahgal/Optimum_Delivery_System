
function display_clusters_generated(Calc_cluster)
{
    var table = document.getElementById("Clusters_generated_table");
   
    while(table.rows.length > 1) { //clearing any previous results (if any) from the table
        table.deleteRow(1);
      }

    for(const [key,val] of Calc_cluster.clusters)
    {
        console.log("ye insert karenge = " + key);
        if(val.length == 0)
           insert_row_with_data(key,"Clusters_generated_table");
        else
            insert_row_with_data([key,val],"Clusters_generated_table");
    }

    
}

