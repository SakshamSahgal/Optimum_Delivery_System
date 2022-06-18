
var adj_mat = new Array(5);

for(var i=0;i<5;i++)
        adj_mat[i] = new Array(5);

        for(var i=0;i<5;i++)
            for(var j=0;j<5;j++)
                adj_mat[i][j] = i+j;


 //console.table(adj_mat);


 var graph = [];

 for(var i=0;i<=5;i++)
    graph[i] = new Array();

graph[0].push([1,2]);
graph[0].push([2,8]);
graph[0].push([3,6]);
graph[0].push([4,5]);

graph[1].push([4,2]);
graph[1].push([3,8]);

graph[2].push([5,6]);
graph[2].push([7,5]);
graph[2].push([7,8]);


console.table(graph);

for(var i=0;i<=5;i++)
{
    for(const v2 of graph[i])
        console.log(i + " connect " + v2[0] + " with " + v2[1]);
}
