


function construct_graph() //this function feeds the graph variable using data from the SVG
{
    const Edges = document.querySelectorAll(`[id^="Edge"]`); //this querry selector extracts all elements with id's starting from Edges
    //console.log(Edges); 

    for (var i = 0; i <= 198; i++) //initialising empty rows to the array
        graph[i] = new Array();

    for (const edge of Edges) {
        const details = (edge.id).split("_"); //splitting the different parts of id into a string array
        //console.log("id  = " + edge.id + "splited details = " + details);
        var Edge_no = parseInt(details[1]);
        var vertex_a = details[2];
        var vertex_b = details[3];
        var weight = details[4];
        
        //console.log(Edge_no + " edge joins " + vertex_a + " " + vertex_b + " with weight " + weight);
        
        Edge_List.set(Edge_no,parseInt(vertex_a),parseInt(vertex_b));
        Edge_List.set(Edge_no,parseInt(vertex_b),parseInt(vertex_a));
        
        // var setteda = toString(Edge_List.get(vertex_a,vertex_b));
        // var settedb = toString(Edge_List.get(vertex_b,vertex_a));
        // console.log("Edgelist[" + vertex_a + "][" + vertex_b + "] = " + setteda);
        // console.log("Edgelist[" + vertex_b + "][" + vertex_a + "] = " + settedb);
        
        graph[vertex_a].push([vertex_b, weight,Edge_no]);
        graph[vertex_b].push([vertex_a, weight,Edge_no]); //feeding the vertices to the undirected weighted graph
    }
    console.table(graph);
}

construct_graph();


class Shortest_path_finder {

    constructor(graph) {
        this.n = 199; //no of rows in the adj matrix (max vertex number + 1)
        this.adjacency_matrix = new Typed_2D_Array(this.n,this.n,0);
        this.all_pair_shortest_distance = new Typed_2D_Array(this.n,this.n,0);
        this.all_pair_shortest_distance_intermediate_vertex = new Typed_2D_Array(this.n,this.n,-1);
        this.adjacency_list_to_matrix();
        this.Apply_Floyd_Warshal();
    }

    adjacency_list_to_matrix() //this function converts adjacency list to matrix for floyd warshal calculation
    {
        var inf = -1;

        for (var i = 0; i < this.n; i++) {
            for (var j = 0; j < this.n; j++)
                (i == j) ? this.adjacency_matrix.set(0,i,j) : this.adjacency_matrix.set(inf,i,j); //initializing with default values
        }

        for (var i = 1; i < this.n; i++) {
            for (const v of graph[i]) {
                var v1 = i;
                var v2 = v[0];
                var w = v[1];
                //console.log(v1 + " connect " + v2 + " with " + w);
                this.adjacency_matrix.set(w,v1,v2);
                this.adjacency_matrix.set(w,v2,v1);
            }
        }
    }

    Apply_Floyd_Warshal() {
        var inf = -1;
        this.all_pair_shortest_distance = this.adjacency_matrix;
        var counter = 0;
        for (var k = 1; k < this.n; k++) {
            for (var i = 1; i < this.n; i++) {
                for (var j = 1; j < this.n; j++) {
                    counter++;
                     if (this.all_pair_shortest_distance.get(i,k) != inf && this.all_pair_shortest_distance.get(k,j) != inf) {
                         if (this.all_pair_shortest_distance.get(i,j) == inf || this.all_pair_shortest_distance.get(i,j) > (this.all_pair_shortest_distance.get(i,k) + this.all_pair_shortest_distance.get(k,j))) {
                               this.all_pair_shortest_distance.set((this.all_pair_shortest_distance.get(i,k) + this.all_pair_shortest_distance.get(k,j)),i,j);
                               this.all_pair_shortest_distance.set((this.all_pair_shortest_distance.get(i,k) + this.all_pair_shortest_distance.get(k,j)),j,i);
                               this.all_pair_shortest_distance_intermediate_vertex.set(k,i,j);
                               this.all_pair_shortest_distance_intermediate_vertex.set(k,j,i);
                         }
                     }
                }
            }
            
        }
        console.log(counter);
    }

    calc_path(v1, v2) //calculates the shorted path between two vertices as a array
    {
        if (this.all_pair_shortest_distance_intermediate_vertex.get(v1,v2) == -1) //if they are not directly connected 
        {
           // console.log("yes " + -1 + "btw" + v1 + " " + v2);
            var ep = new Array();
            return ep;
        }
        else {
            var mid = this.all_pair_shortest_distance_intermediate_vertex.get(v1,v2);
            var a = this.calc_path(v1, mid);
            var b = this.calc_path(mid, v2);
            a = a.concat(mid);
            a = a.concat(b);
            return a;
        }
    }

    get_path(v1, v2) //this function returns optimal path between two vertices 
    {
        var path = new Array();
        path.push(v1);
        var calc = this.calc_path(v1, v2);
        path = path.concat(calc);
        path.push(v2);
        return path;
    }

};

var this_graph = new Shortest_path_finder(graph);

console.log(this_graph.get_path(2,6));