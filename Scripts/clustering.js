
class Greedy_Cluster {
    constructor() {
        this.clusters = new Map(); //this is a map of array that has key as cluster initializer
        this.delivery_locations = new Set();
        this.rem_delivery_locations = new Set();
        this.cluster_initializers = new Set(); //set of cluster initializer
        this.cluster_groups = new Array(); //variable that stores the clusters in a array of array
        this.path = new Array(); //array of array to store path
        this.src = (Source.split("_"))[1];
        console.log("SRC = " + this.src);
    }



    calc_cluster_initilizers() //this function finds the initial two cluster initilizers
    {
        for(const i of selected_nodes)
        this.delivery_locations.add( i.split("_")[1] ); //converting Node_x to x and pushing it to delivery_locations

       this.rem_delivery_locations = this.delivery_locations;
    
        var maxx_distance = -10000;
        var a = -1;
        var b = -1;

        for(const i of this.delivery_locations)
            console.log(i);
        console.log("\n");

        for (var i of this.delivery_locations) {
            for (var j of this.delivery_locations) {
                if (i != j) {
                    //console.log(" i = " + i + " j = " + j + " distance = " + this_graph.all_pair_shortest_distance.get(i,j) );    
                    if (this_graph.all_pair_shortest_distance.get(i,j) > maxx_distance) {
                        maxx_distance = this_graph.all_pair_shortest_distance.get(i,j);
                        a = i;
                        b = j;
                    }
                }
            }
        }

        //console.log("farthest points = " + a + " " + b);
        this.cluster_initializers.add(a);
        this.cluster_initializers.add(b);
        this.rem_delivery_locations.delete(a);
        this.rem_delivery_locations.delete(b);
       //console.log(this.cluster_initializers);
        this.find_rem_cluster_sources();
    }

    find_rem_cluster_sources() //this function finds remaining cluster initilizers
    {
        //console.log(" len  = " + this.cluster_initializers.size );
        while (this.cluster_initializers.size < no_of_drivers_selected) {
            var max_distance = -1;
            var farthest_vertex = -1;

            for (const i of this.rem_delivery_locations) {
                    var dist = 0;
                    for (const j of this.cluster_initializers) {
                        //console.log("distance of " + i + " from " + j + " is = " + this_graph.all_pair_shortest_distance.get(parseInt(i),parseInt(j)) + " with sqrt = " + Math.sqrt(this_graph.all_pair_shortest_distance.get(parseInt(i),parseInt(j))));
                        dist += Math.sqrt(this_graph.all_pair_shortest_distance.get(i,j));
                    }

                    if (dist > max_distance) {
                        max_distance = dist;
                        farthest_vertex = i;
                    }
            }
            this.cluster_initializers.add(farthest_vertex);
            this.rem_delivery_locations.delete(farthest_vertex);
        }

        //console.log("all cluster initializers -> ");
        //console.log(this.cluster_initializers);
        
       this.populate_clusters();
    }

    populate_clusters() //this function assigns a cluster to all remaining delivery locations
    {
        for(const i of this.cluster_initializers)
             this.clusters.set(i , new Array());

        while (this.rem_delivery_locations.size) {
            var mini_distane = 10000;
            var closest_source = -1;
            const [first] = this.rem_delivery_locations;

            for (const i of this.cluster_initializers) {

                var dist = this_graph.all_pair_shortest_distance.get(i,first); //distance btw ith cluster initilizer and first delivery location in the rem list

                //console.log(" distance btw " + i + " and " + first + " is " + dist);

                if (dist < mini_distane) {
                    mini_distane = dist;
                    closest_source = i;
                }
            }
            //console.log("best cluster for " + first + " is " + closest_source);
            var temp_arr = this.clusters.get(closest_source);
            temp_arr.push(first);
            this.clusters.set(closest_source,temp_arr);
            this.rem_delivery_locations.delete(first);
        }
        
        // console.log("Before -> ");
        // for(const [initializer,other] of this.clusters)
        //     console.log(initializer,other);
        
        for(const [key,val] of this.clusters)
        {
            var temp = new Array();
            temp.push(key);
            for(const j of val)
                temp.push(j);
            this.cluster_groups.push(temp);
        }
        
        // console.log("cluster_groups = ");

        // for(const i of this.cluster_groups)
        //     console.log(i);
        
        this.Sort_Clusters();
        // console.log("After -> ");
        // for(const i of this.cluster_groups)
        //    console.log(i);
        
        this.generate_path_from_cluster();
    }

    Sort_Clusters() //this function sorts the cluster groups (in accending order) on the basis of distance from source
    {
        for(var val of this.cluster_groups)
            val.sort(function(a, b){   //using comparator function to sort vertexes of the clusters on the basis of distances from source so the nearest one is visited first
                var src = (Source.split("_"))[1]; //since we cant use a global variable in comparator function (so i have to make a copy)
                var da = this_graph.all_pair_shortest_distance.get(a,src);
                var db = this_graph.all_pair_shortest_distance.get(b,src);
                //console.log(da + " " + db);
                return da-db});
    }

    generate_path_from_cluster() //this function generates a path vertex from cluster
    {
        for(var i=0;i<this.cluster_groups.length;i++)
        {
            var temp = new Array();
            temp.push(this.src);
            for(var j=0;j<(this.cluster_groups[i]).length;j++)
            {
                if(j == 0)
                    temp = temp.concat(this_graph.calc_path(this.src,this.cluster_groups[i][j]));
                else
                {
                    temp.push(this.cluster_groups[i][j-1]);
                    temp = temp.concat(this_graph.calc_path(this.cluster_groups[i][j-1],this.cluster_groups[i][j]));
                }
            }
            temp.push(this.cluster_groups[i][(this.cluster_groups[i]).length-1]);
            this.path.push(temp);
        }

        console.log("path generated = ");
        for(var i=0;i<this.path.length;i++)
           console.log(this.path[i]);  
    } 
};


class Driver
{
    constructor(name,path,cluster)
    {
        this.name = name;
        this.path = path;
        this.cluster = cluster;
    }

    calc_minimum_time()
    {
        for(var i=0;i < this.path.length - 1 ;i++)
        {

        }
    }

};


// function set_dummy_Data() {  //used dummy data for testing puroposes
//     selected_nodes.add(10);
//     selected_nodes.add(20);
//     selected_nodes.add(30);
//     selected_nodes.add(40);
//     Source = "50";
//     no_of_drivers_selected = 3;
//     no_of_delivery_locations_selected = 4;
// }

function find_optimum_paths()  //this function is called when we click on generate optimum path 
{
    //set_dummy_Data();
    if (Source != null && no_of_drivers_selected >= 2 && no_of_delivery_locations_selected >= 2) {
        //alert("yes we can go");

        Overlay.show_please_note(); //showing please note overlay
        var Calc_cluster = new Greedy_Cluster(); //calculating clusters 
        Calc_cluster.calc_cluster_initilizers(); 
        var drivers_map = new Map(); //creating a map of drivers (key-> name val-> driver class object)

        for(var i=0;i<no_of_drivers_selected;i++)
        {
            var driver_name = "Driver_" + (i+1);
            var driver_path = Calc_cluster.path[i];
            var driver_cluster = Calc_cluster.cluster_groups[i];
            var this_driver = new Driver(driver_name,driver_path,driver_cluster);
            drivers_map.set(driver_name,this_driver);
        }
        
        debug_driver_Map(drivers_map);

        document.getElementById("Minimum_time").innerHTML = "Mini_Time_possible = ";
        document.getElementById("Clusters_generated_table").hidden = false;  //unhiding the Clusters_generated_table table 
        document.getElementById("Drivers_path").hidden = false;   //unhiding the Drivers_path table 
        
        display_clusters_generated(Calc_cluster); //display the clusters generated , in the table
        display_Drivers(Calc_cluster,drivers_map); //display the drivers generated , in the table
    }
    else
        alert("Please make sure you have selected - \n> Atleast two delivery locations \n> Atleast two drivers \n> A source");
}


function debug_driver_Map(driver_Map)
{
    for(const [key,val] of driver_Map)
    {
        console.log([key,val]);
    }
}