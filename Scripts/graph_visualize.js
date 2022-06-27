
class Visualize
{
    highlight_edge(edge_no,v1,v2,w) //this function highlight a edge whose edgeno v1 v2 and weight is passed into it
    {
        var id1 = "Edge_" + edge_no + "_" + v1 + "_" + v2 + "_" + w; 
        var id2 = "Edge_" + edge_no + "_" + v2 + "_" + v1 + "_" + w; 
        var this_Edge1 = document.getElementById(id1);
        var this_Edge2 = document.getElementById(id2);
        if(this_Edge1 != null)
            this_Edge1.classList.add("visit_edge");
        if(this_Edge2 != null)
        this_Edge2.classList.add("visit_edge");
    }

    Un_highlight_edge(edge_no,v1,v2,w) //this function highlight a edge whose edge-no v1 v2 and weight is passed into it
    {
        var id1 = "Edge_" + edge_no + "_" + v1 + "_" + v2 + "_" + w; 
        var id2 = "Edge_" + edge_no + "_" + v2 + "_" + v1 + "_" + w; 
        var this_Edge1 = document.getElementById(id1);
        var this_Edge2 = document.getElementById(id2);
        if(this_Edge1 != null)
            this_Edge1.classList.remove("visit_edge");
        if(this_Edge2 != null)
        this_Edge2.classList.remove("visit_edge");
    }
    
    highlight_node(node_id) //this function highlight a vertex whose id is passed into it
    {
        var id = "Node_" + node_id;
        var node = document.getElementById(id);
        node.classList.add("visit_Node");
    }
    
    unhighlight_node(node_id)
    {
        var id = "Node_" + node_id;
        var node = document.getElementById(id);
        if(node.classList.contains("visit_Node"));
          node.classList.remove("visit_Node");
    }

    show_path(path) //this function highlights a path passed to it (as an array)
    {
       for(var i=0;i<path.length-1;i++)
       {
            if(i != 0)
             this.highlight_node(path[i]);
            var v1 = path[i];
            var v2 = path[i+1];
            var edge_no = Edge_List.get(v1,v2); //finds the edge between vertex v1 and v2 
            var w = this_graph.adjacency_matrix.get(v1,v2);
           // console.log("path btw " + v1 + " and " + v2 + " connected by " + edge_no + " with weight " + w);
           this.highlight_edge(edge_no,v1,v2,w);
       }
        this.highlight_node(path[path.length-1]);
    }    

    un_highlight_path(path)
    {
       for(var i=0;i<path.length-1;i++)
       {
            if(i != 0)
            this.unhighlight_node(path[i]);
            var v1 = path[i];
            var v2 = path[i+1];
            var edge_no = Edge_List.get(v1,v2); //finds the edge between vertex v1 and v2 
            var w = this_graph.adjacency_matrix.get(v1,v2);
           // console.log("path btw " + v1 + " and " + v2 + " connected by " + edge_no + " with weight " + w);
           this.Un_highlight_edge(edge_no,v1,v2,w);
       }
       this.unhighlight_node(path[path.length-1]);
    }
};

var vis = new Visualize();
//vis.show_path(this_graph.get_path(2,35));






