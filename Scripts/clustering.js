
class Greedy_Cluster
{
    constructor()
    {
        this.delivery_locations = selected_nodes;
    }

    calc_cluster_initilizers() //this function finds the initial two cluster initilizers
    {
        var maxx_distance = -1000;
        var a=-1;
        var b=-1;
        rem_delivery_locations = delivery_locations;

        for(auto i:delivery_locations)
        {
            for(auto j:delivery_locations)
            {
                if(i != j)
                {
                    if( g1.all_pair_shortest_distance[i][j] > maxx_distance )
                    {
                        maxx_distance = g1.all_pair_shortest_distance[i][j];
                        a = i;
                        b = j;
                    }
                }
            }
        }
        //cout<<"farthest points = "<<a<<" "<<b<<" \n";
        cluster_initializers.push_back(a);
        cluster_initializers.push_back(b);
        rem_delivery_locations.erase(find(rem_delivery_locations.begin(),rem_delivery_locations.end(),a));
        rem_delivery_locations.erase(find(rem_delivery_locations.begin(),rem_delivery_locations.end(),b));
        find_rem_cluster_sources();
    }

}