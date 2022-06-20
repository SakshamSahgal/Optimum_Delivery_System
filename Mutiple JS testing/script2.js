var b = 1;
console.log("hi this is script 2 speaking");

var mem_test = new Array(600);

for(var i=0;i<600;i++)
    mem_test[i] = new Array(200);


    for(var i=0;i<600;i++)
    {
        for(j=0;j<200;j++)
            mem_test[i][j] = "inf";
    }

   


    for(var i=0;i<600;i++)
    {
        for(var j=0;j<200;j++)
        {
            for(var k=0;k<200;k++)
            {
                mem_test[i][j] = i+j+k;
            }
        }
    }

    console.table(mem_test);