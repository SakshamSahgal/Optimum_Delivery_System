# Optimum_Delivery_System
Please Note , if your Laptop Screen size is small (for yoga laptops), please set the browser zoom to 80% 

This is a Delivery Simulator which calculates the most optimum path for multiple drivers to take simultainously , to complete all the deliveries on a Map , in minimum possible time and distance , this algorithm can be useful for assigning delivery location to drivers in apps like swiggy , zomato , instamart etc. 

The approximation algorithm used is a custom made algorithm , which is a mixture and modification of Floyd Warshal , Job Sequence Scheduling , and travelling salesman and K-means Clustering.


This Project finds the optimum path on a graph , for multiple
drivers to complete multiple deliveries from a single
source simultainously.


#How Does the Approximation Algorithm Works ?

It uses a Custom made Approximation Algorithm - 

Basically the algorithm splits the delivery locations into multiple 
clusters for each driver to deliver to each clusters of delivery locations.

then we find the initial two delivery locations which are farthest apart [O(V^2)]

then we find the rest of the cluster souces which are farthest from all the other initializers O(V^2)

then after we have found all the cluster sources , we populate the custers with the remaining delivery 
locations based on the distance between them and the source. O(v^2)

Overall complexity  - O(V^2)
