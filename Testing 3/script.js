
var Click_audio = new Audio("Click.mp3");

function Highlight(obj)
{
    //console.log("id = " + (obj.id).substring(0, 4));
    Click_audio.play();
    if((obj.id).substring(0, 4) == "Node")
    {
        obj.classList.remove("Nodes_class");
        obj.classList.add("highlight_node");  
    }
    else if((obj.id).substring(0, 4) == "Edge")
    {
        obj.classList.remove("edge_class");
        obj.classList.add("highlight_Edge");   
    }
}

function Un_Highlight(obj)
{
    //console.log("id = " +(obj.id).substring(0, 4));
    if((obj.id).substring(0, 4) == "Node")
    {
        obj.classList.remove("highlight_node");
        obj.classList.add("Nodes_class");  
    }
    else if((obj.id).substring(0, 4) == "Edge")
    {
        obj.classList.remove("highlight_Edge");
        obj.classList.add("edge_class");   
    }
}


