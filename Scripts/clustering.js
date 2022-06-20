
class Greedy_Cluster {
    constructor() {
        this.clusters = new Array();
        this.delivery_locations = selected_nodes;
        this.rem_delivery_locations = selected_nodes;
        this.cluster_initializers = new Set();
    }



    calc_cluster_initilizers() //this function finds the initial two cluster initilizers
    {
        var maxx_distance = -10000;
        var a = -1;
        var b = -1;

        for (const i of this.delivery_locations) {
            for (const j of this.delivery_locations) {
                //console.log(" i = " + i + " j = " + j);
                if (i != j) {
                    if (this_graph.all_pair_shortest_distance.get(parseInt(i), parseInt(j)) > maxx_distance) {
                        maxx_distance = this_graph.all_pair_shortest_distance.get(parseInt(i), parseInt(j));
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
        console.log(this.cluster_initializers);
        this.find_rem_cluster_sources();
    }

    find_rem_cluster_sources() //this function finds remaining cluster initilizers
    {
        //console.log(" len  = " + this.cluster_initializers.size );
        while (this.cluster_initializers.size < no_of_drivers_selected) {
            var max_distance = -1;
            var farthest_vertex = -1;

            for (const i of this.delivery_locations) {
                //console.log("i = " + i);
                if (!this.cluster_initializers.has(i)) // this means that this delivery vertex is currently not a cluster vertex
                {
                    var dist = 0;
                    for (const j of this.cluster_initializers) {
                        //console.log("distance of " + i + " from " + j + " is = " + this_graph.all_pair_shortest_distance.get(parseInt(i),parseInt(j)) + " with sqrt = " + Math.sqrt(this_graph.all_pair_shortest_distance.get(parseInt(i),parseInt(j))));
                        dist += Math.sqrt(this_graph.all_pair_shortest_distance.get(parseInt(i), parseInt(j)));
                    }

                    if (dist > max_distance) {
                        max_distance = dist;
                        farthest_vertex = i;
                    }

                    console.log(dist);
                }
            }
            this.cluster_initializers.add(farthest_vertex);
            this.rem_delivery_locations.delete(farthest_vertex);
        }

        console.log("all cluster initializers -> ");
        console.log(this.cluster_initializers);
        this.populate_clusters();
    }

    populate_clusters() //this function assigns a cluster to all remaining delivery locations
    {
        for (const i of this.cluster_initializers) {
            var temp = new Array();
            temp.push(i);
            this.clusters.push(temp);
        }

        while (this.rem_delivery_locations.size) {
            var mini_distane = 10000;
            var closest_source = -1;
            const [first] = this.rem_delivery_locations;
            for (const i of this.cluster_initializers) {

                var dist = this_graph.all_pair_shortest_distance.get(parseInt(i), parseInt(first)); //distance btw ith cluster initilizer and first delivery location in the rem list

                console.log(" distance btw " + i + " and " + first + " is " + dist);

                if (dist < mini_distane) {
                    mini_distane = dist;
                    closest_source = i;
                }
            }

            console.log("best cluster for " + first + " is " + closest_source);
            var temp_array = this.cluster_initializers[closest_source];
            temp_array.push(first);
            this.cluster_initializers[closest_source] = temp_array;
            this.rem_delivery_locations.delete(first);
        }
    }


};


function set_dummy_Data() {
    selected_nodes.add(10);
    selected_nodes.add(20);
    selected_nodes.add(30);
    selected_nodes.add(40);
    Source = "50";
    no_of_drivers_selected = 3;
    no_of_delivery_locations_selected = 4;
}



var Calc_cluster = new Greedy_Cluster();

function find_optimum_paths() {
    set_dummy_Data();
    if (Source != null && no_of_drivers_selected >= 1 && no_of_delivery_locations_selected >= 1) {
        //alert("yes we can go");
        Calc_cluster.calc_cluster_initilizers();
    }
    else
        alert("Please make sure you have selected atleast one delivery location , driver and source");
}

