
(function () {
    var width =1600,
        height=900;



    var svg = d3.select('#chart')
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id","canvasEl")
            .append("g")
            .attr("transform","translate(0,0)");

    var defs = svg.append("defs");

    defs.append("pattern")
        .attr("id","rat")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("width",1)
        .attr("height",1)
        .attr("preserveAspectRatio","none")
        .attr(" xlink:href","photo/rat.png");


        //如何让圆圈的大小和其他变量相关呢 如文章的点击率越大 圆圈越大
    var radiusScale = d3.scaleSqrt().domain([1,300]).range([10,100]);

    //using d3.force to push all the bubbles
//the simulation is the power of force, avout where we want our circles to go and how we want our circle to go
//d3.forceCollide()是每个circle之间推开多远的距离
    // 当d3.forceCollide的数值和圆圈半径相等时，没有任何overlap


    var forceX = d3.forceX(function (d) {
        if(d.publisher ==='NYT'){
            return 600
        }
        if(d.publisher ==='WST'){

            return 1200
        }
        if(d.publisher ==='fivethirtyeight'){

            return 100
        }
        if(d.publisher ==='The Guardian'){

            return 100
        }

       if(d.publisher ==='Bloomberg'){
            return 100
        }else{
           return  1200 }
        return width/2
    }).strength(0.1);

    var forceY = d3.forceY(function(d){
        if(d.publisher ==='NYT'){
            return 400
        }
        if(d.publisher ==='WST'){

            return 200
        }
        if(d.publisher ==='fivethirtyeight'){

            return 400
        }
        if(d.publisher ==='The Guardian'){

            return 100
        }

        if(d.publisher==="Bloomberg"){
          return  750
        }
        else{
            return 600
        }
            return height/2
    }).strength(0.1);

    // var forcecollide = d3.forceCollide(function (d){
    //   return 40;
    //
    // })

    var forcecollide = d3.forceCollide(6).radius(36);

    var simulation =d3.forceSimulation()
        .force("x",forceX)
        .force("y",forceY)
        .force("collide",forcecollide)
        .alpha(0.9)
        .restart();

    d3.queue()
        .defer(d3.csv,"stuffweliked.csv")
        .await(ready);

    function ready(error,data) {
        defs.selectAll(".article_pattern")
            .data(data)
            .enter().append("pattern")
            .attr("class","article_pattern")
            .attr("id",function (d) {
                return d.name

            })
            .attr("height","100%")
            .attr("width","100%")
            .attr("patternContentUnits","objectBoundingBox")
            .append("image")
            .attr("width",1)
            .attr("height",1)
            .attr("preserveAspectRatio","none")
            .attr(" xlink:href",function (d) {
                return d.image_path

            });

        var circles = svg.selectAll(".article")
            .data(data)
            .enter().append("circle")
            .attr("class","article")
            .attr("r",function(d){
                return radiusScale(d.sales);
            })
            .attr("fill",function (d) {
                return "url(#"+d.name+")"

            })
            .on('click',function (d) {
                console.log(d)
            })


        d3.select("#split").on('click',function () {
            simulation
                .force("X", forceX)
                .force("Y", forceY)
                .alpha(0.5)
                .restart();
            text_publisher(svg);
            d3.selectAll(".bytype").remove();
            d3.selectAll(".bycontent").remove();



        })


        d3.select("#combine").on('click',function () {
            simulation
                .force("X", d3.forceX(width/2).strength(0.2))
                .force("Y", d3.forceY(height/2).strength(0.2))
                .alpha(0.5)
                .restart();
            d3.selectAll(".bypublisher").remove();
            d3.selectAll(".bytype").remove();
            d3.selectAll(".bycontent").remove();
        })

       var button= d3.select("#type").on('click',function () {
            simulation
                .force("X", d3.forceX(function(d){
                    if(d.Analysis ==="x"){
                        return 200
                    }
                    if(d.Feature ==="x"){
                        return 800
                    }
                    if(d.Sports ==="x"){
                        return 1300
                    }else{
                        return 2000
                    }
                }).strength(0.8))
                .force("Y", d3.forceY(height/2).strength(0.8))
                .alpha(0.9)
                .restart();
           d3.selectAll(".bypublisher").remove();
           text_story_Type(svg);
           d3.selectAll(".bycontent").remove();


        })

        d3.select("#content").on('click',function () {
            simulation
                .force("X", d3.forceX(function(d){
                    if(d["Video/Audio"] ==="x"){
                        return 50
                    }
                    if(d["Photo"] ==="x"){
                        return 50
                    }
                    if(d["Interactive"] ==="x"){
                        return 500
                    }
                    if(d["Illustration"]==="x"){
                        return 1000

                    }
                    if(d["Text"] ==="x"){
                        return 900
                        }
                    else{
                        return 2000
                    }
                }).strength(0.8))
                .force("Y", d3.forceY(function (d) {
                    if(d["Video/Audio"] ==="x"){
                        return 50
                    }
                    if(d["Photo"] ==="x"){
                        return 400
                    }
                    if(d["Interactive"] ==="x"){
                        return 400
                    }
                    if(d["Illustration"]==="x"){
                        return 50

                    }
                    if(d["Text"] ==="x"){
                        return 600
                    }
                    else{
                        return 2000
                    }


                }).strength(0.4))
            // }).strength(0.15))
            .alpha(0.5)
            .restart();
            text_story_content(svg);
            d3.selectAll(".bypublisher").remove();
            d3.selectAll(".bytype").remove();
        })



        simulation.nodes(data)
            .on('tick',ticked)
        //node is one of the circles

        function ticked(){
            circles
                .attr("cx",function(d){
                    return d.x
                })
                .attr("cy",function(d){
                    return d.y
                })

        }


        function text_publisher(svg) {
            svg.append("text")
                .attr("x",420)
                .attr("y",630)
                .attr("font-size","20")
                .attr("class","bypublisher")
                .text("The New York Times");

            svg.append("text")
                .attr("x",1250)
                .attr("y",300)
                .attr("font-size","20")
                .attr("class","bypublisher")
                .text("The Washington Post");

            svg.append("text")
                .attr("x",120)
                .attr("y",500)
                .attr("class","bypublisher")
                .attr("font-size","20")
                .text("fivethirtyeight");


            svg.append("text")
                .attr("x",120)
                .attr("y",120)
                .attr("class","bypublisher")
                .attr("font-size","20")
                .text("The Guardian");

            svg.append("text")
                .attr("x",120)
                .attr("y",800)
                .attr("class","bypublisher")
                .attr("font-size","20")
                .text("Bloomberg");

            svg.append("text")
                .attr("x",1200)
                .attr("y",700)
                .attr("class","bypublisher")
                .attr("font-size","20")
                .text("The Pudding")

        }

        text_publisher(svg);//页面一开始显示的的东西



        function text_story_Type(svg) {
            svg.append("text")
                .attr("x",200)
                .attr("y",300)
                .attr("font-size","20")
                .attr("class","bytype")
                .text("sport");

            svg.append("text")
                .attr("x",800)
                .attr("y",300)
                .attr("font-size","20")
                .attr("class","bytype")
                .text("Analysis");

            svg.append("text")
                .attr("x",1300)
                .attr("y",300)
                .attr("font-size","20")
                .attr("class","bytype")
                .text("feauture");

        }
        function text_story_content(svg) {
            svg.append("text")
                .attr("x",40)
                .attr("y",40)
                .attr("font-size","30")
                .attr("class","bycontent")
                .text("Video/Audio");

            svg.append("text")
                .attr("x",50)
                .attr("y",500)
                .attr("font-size","30")
                .attr("class","bycontent")
                .text("Photo");

            svg.append("text")
                .attr("x",500)
                .attr("y",250)
                .attr("font-size","30")
                .attr("class","bycontent")
                .text("Interactive");

            svg.append("text")
                .attr("x",1000)
                .attr("y",45)
                .attr("font-size","30")
                .attr("class","bycontent")
                .text("Illustration");

            svg.append("text")
                .attr("x",900)
                .attr("y",700)
                .attr("font-size","30")
                .attr("class","bycontent")
                .text("Text");



        }
    }

}



)();




