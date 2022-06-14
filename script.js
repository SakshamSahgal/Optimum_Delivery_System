var graph = []; //variable that contails the weighted graph 
var Click_audio = new Audio("Select_Sound.wav");

function construct_graph()
{
    const Edges = document.querySelectorAll(`[id^="Edge"]`); //this querry selector extracts all elements with id's starting from Edges
    //console.log(Edges); 

    for(var i=1;i<=198;i++) //initialising empty rows to the array
     graph[i] = new Array();

    for(const edge of Edges)
    {
        const details = (edge.id).split("_"); //splitting the different parts of id into a string array
        //console.log("id  = " + edge.id + "splited details = " + details);
        var vertex_a = details[2];
        var vertex_b = details[3];
        var weight = details[4];
        //console.log(edge.id + " edge joins " + vertex_a + " " + vertex_b + " with weight " + weight);
        graph[vertex_a].push([vertex_b,weight]);
        graph[vertex_b].push([vertex_a,weight]); //feeding the vertices to the undirected weighted graph
    }
    console.table(graph);
}

construct_graph();  


function Highlight(obj)
{
    Click_audio.play();
    console.log("highlighted = " + obj.id);
    obj.classList.add("highlight_node");  
}

function Un_Highlight(obj)
{
    console.log("unhighlighted = " + obj.id);
    obj.classList.remove("highlight_node");  
}