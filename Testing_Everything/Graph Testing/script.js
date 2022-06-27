var graph = [];


class Shortest_path_finder {

    constructor(graph) {
        this.n = 10; //no of rows in the adj matrix (max vertex number + 1)
        this.graph = graph;
        this.adjacency_matrix = new Array(this.n);
        this.all_pair_shortest_distance = new Array(this.n);
        this.all_pair_shortest_distance_intermediate_vertex = new Array(this.n);
        this.adjacency_list_to_matrix();
        this.Apply_Floyd_Warshal();
    }

    adjacency_list_to_matrix() //this function converts adjacency list to matrix for floyd warshal calculation
    {
    var inf =  -1;
    for (var i = 0; i < this.n; i++)
        this.adjacency_matrix[i] = new Array(this.n); //initializing the 2d array

    for (var i = 0; i < this.n; i++) {
        for (var j = 0; j < this.n; j++)
            (i == j) ? this.adjacency_matrix[i][j] = 0 : this.adjacency_matrix[i][j] = inf; //initializing with default values
    }

    for (var i = 1; i < this.n; i++) {
        for (const v of this.graph[i]) {
            var v1 = i;
            var v2 = v[0];
            var w = v[1];
            console.log(v1 + " connect " + v2 + " with " + w);
            this.adjacency_matrix[v1][v2] = w;
            this.adjacency_matrix[v2][v1] = w;
        }
    }
    console.log("adjacency_matrix -> ");
    console.table(this.adjacency_matrix);
}

 Apply_Floyd_Warshal() {
    var inf = -1;

    this.all_pair_shortest_distance = this.adjacency_matrix;
    console.log("all_pair_shortest_distance before - >");
    console.table(this.all_pair_shortest_distance);

    for (var i = 0; i < this.n; i++)
    this.all_pair_shortest_distance_intermediate_vertex[i] = new Array(this.n); //initializing 

    for (var i = 0; i < this.n; i++)
        for (var j = 0; j < this.n; j++)
        this.all_pair_shortest_distance_intermediate_vertex[i][j] = -1;

    for (var k = 1; k < this.n; k++) {
        for (var i = 1; i < this.n; i++) {
            for (var j = 1; j < this.n; j++) {
                if (this.all_pair_shortest_distance[i][k] != inf && this.all_pair_shortest_distance[k][j] != inf) {
                    if ( this.all_pair_shortest_distance[i][j] == inf || this.all_pair_shortest_distance[i][j] > (this.all_pair_shortest_distance[i][k] + this.all_pair_shortest_distance[k][j])) {
                        this.all_pair_shortest_distance[i][j] = this.all_pair_shortest_distance[i][k] + this.all_pair_shortest_distance[k][j];
                        this.all_pair_shortest_distance[j][i] = this.all_pair_shortest_distance[i][k] + this.all_pair_shortest_distance[k][j];
                        this.all_pair_shortest_distance_intermediate_vertex[i][j] = k;
                        this.all_pair_shortest_distance_intermediate_vertex[j][i] = k;
                    }
                }
            }
        }
    }

    console.log("all_pair_shortest_distance after - >");
    console.table(this.all_pair_shortest_distance);
    console.log("all_pair_shortest_distance intermediate vertex - >");
    console.table(this.all_pair_shortest_distance_intermediate_vertex);

}

 calc_path(v1,v2) //calculates the shorted path between two vertices as a array
{
    if( this.all_pair_shortest_distance_intermediate_vertex[v1][v2] == -1) //if they are not directly connected 
    {
        console.log("yes " + -1 + "btw" + v1 + " " + v2);
        var ep = new Array();
        return ep;
    }
    else
    {
        var mid = this.all_pair_shortest_distance_intermediate_vertex[v1][v2];
        var a = this.calc_path(v1,mid);
        var b = this.calc_path(mid,v2);
        a = a.concat(mid);
        a = a.concat(b);
        return a;
    }
}

 get_path(v1,v2) //this function returns optimal path between two vertices 
{
    var path = new Array();
    path.push(v1);
    var calc = this.calc_path(v1,v2);
    path = path.concat(calc);
    path.push(v2);
    return path;
}

};

function populate_graph() {
    for (var i = 0; i <= 9; i++)
        graph[i] = new Array();

    graph[1].push([2, 5]);
    graph[2].push([1, 5]);

    graph[2].push([5, 3]);
    graph[5].push([2, 3]);

    graph[3].push([5, 3]);
    graph[5].push([3, 3]);

    graph[1].push([3, 9]);
    graph[3].push([1, 9]);

    graph[1].push([4, 11]);
    graph[4].push([1, 11]);

    graph[4].push([3, 4]);
    graph[3].push([4, 4]);

    graph[4].push([6, 14]);
    graph[6].push([4, 14]);

    graph[6].push([5, 7]);
    graph[5].push([6, 7]);

    graph[6].push([7, 2]);
    graph[7].push([6, 2]);
    
    graph[5].push([7, 5]);
    graph[7].push([5, 5]);

    graph[5].push([8, 2]);
    graph[8].push([5, 2]);

    graph[8].push([9, 5]);
    graph[9].push([8, 5]);

    
    console.log("adjacency list -> ");
    console.table(graph);
}

populate_graph();
var this_graph = new Shortest_path_finder(graph);

//this_graph.adjacency_list_to_matrix();
//this_graph.Apply_Floyd_Warshal();
console.log("shortest path = ");
console.table(this_graph.get_path(4,9));
