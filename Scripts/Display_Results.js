
function display_clusters_generated()
{
    for(const [key,val] of Calc_cluster.clusters)
      insert_row_with_data(key,"Clusters_generated_table")
}

display_clusters_generated();