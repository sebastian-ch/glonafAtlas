function justAfrica() {

    //document.getElementById('mapTitle').style.visibility = 'hidden';
    document.getElementById('familySearch').style.visibility = 'visible'


    var div = document.getElementById('map')

    //closeSide();

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    var files = [
        d3.json('../continentView/continent-geojsons/africa/africa2.geojson'),
        d3.csv('../continentView/continent-geojsons/africa/africaislands1.csv'),
        d3.csv('../continentView/continent-geojsons/africa/africaPointsJoined1.csv')

    ]

    if (worldViewFilesData.africa == null) {

        Promise.all(files).then(function(values) {
            worldViewFilesData.africa = values[0];
            worldViewFilesData.africaislands = values[1];
            worldViewFilesData.africaPoints = values[2]

            addToMap(values[0], values[1], values[2])
        })

    } else {
        addToMap(worldViewFilesData.africa, worldViewFilesData.africaislands, worldViewFilesData.africaPoints)
    }

    function addToMap(polys, islands, points) {
        //console.log(polys)


        svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr('class', 'africaMap')

        var g = svg.append("g");

        var projection = d3.geoMercator()
            .fitSize([width - 50, height - 50], polys)

        var geoPath = d3.geoPath()
            .projection(projection);

        var graticule = d3.geoGraticule().step([10, 10])

        svg.append('g')
            .selectAll("path")
            .data(polys.features)
            .enter()
            .append("path")
            .attr('class', 'continent')
            .attr("d", geoPath)
            .attr('fill', function(d) {
                if (d.properties.completeness === 1) {

                    const texture3 = textures.lines()
                        .orientation('6/8')
                        .stroke('#fc8d59')
                        //.size(4)
                        .thicker()
                        .strokeWidth(0.8)
                        .background('#f1f1f1');
                    svg.call(texture3)

                    return texture3.url()
                } else if (d.properties.completeness === 2) {

                    const texture3 = textures.lines()
                        //.size(5)
                        .stroke('#cccc00')
                        //.thinner()
                        .strokeWidth(0.8)
                        .background('#f1f1f1');
                    svg.call(texture3)

                    return texture3.url()
                } else {
                    return '#f1f1f1'
                }
            })
            .attr('stroke', '#ababab')
            .attr('stroke-width', '0.3')
            .on("mouseover", function(d) {
                tooltip.transition()
                    //.duration(200)
                    .style("opacity", .9);
                tooltip.html("<b>Region Name: </b>" + d.properties.name + "<br>" +
                        "<b>Country: </b>" + d.properties.completeness)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                d3.select(this).style('stroke', 'yellow')

            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                d3.select(this).style('stroke', '#ababab')
            });

        /*.on('mouseover', function(d){
            d3.select(this).attr('stroke', 'yellow')
            console.log(d.properties.country)
        }) */
        /*   .on('click', function (d) {

               var clickedReg = d.properties.region_id;

               var clicked = []
               var naturalized = [];
               var alien = [];
               _.find(tax_csv, function (o) {
                   if (o.region_id == clickedReg)
                       clicked.push(o)

               })
               console.log(clicked);
               for (var x in clicked) {
                   if (clicked[x].status == 'naturalized') {
                       naturalized.push(clicked[x])
                   }
               }

               console.log(naturalized);

           }) */

        /*svg.selectAll('circle')
            .data(islands)
            .enter()
            .append('circle')
            .attr('class', 'islands')
            .attr('cx', function(d) {
                return projection([d.LON, d.LAT])[0]
            })
            .attr('cy', function(d) {
                return projection([d.LON, d.LAT])[1]
            })
            .attr('r', '6px')
            .attr('opacity', 0.7)
            .attr('fill', function(d) {
                return 'whitesmoke'
            })
            .on("mouseover", function(d) {
                tooltip.transition()
                    //.duration(200)
                    .style("opacity", .9);
                tooltip.html("<b>Name: </br>" + d.name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    //.duration(500)
                    .style("opacity", 0);
            }); */



          svg.selectAll('circle')
               .data(points)
               .enter()
               .append('circle')
               .attr('class', 'points africa')
               .attr('cx', function(d) {
                   return projection([d.LON, d.LAT])[0]
               })
               .attr('cy', function(d) {
                   return projection([d.LON, d.LAT])[1]
               })
               .attr('r', '4px')
               .attr('opacity', 0.7)
               .attr('fill', function(d) {

                   if (d.completeness === '1') {

                       const texture3 = textures.lines()
                           .stroke('black')
                           .size(3)
                           .thinner()
                           .strokeWidth(0.3)
                           .background('whitesmoke');
                       svg.call(texture3)

                       return texture3.url()
                   } else if (d.completeness === '2') {

                       const texture3 = textures.lines()
                           .stroke('black')
                           .size(5.5)
                           .thinner()
                           .strokeWidth(0.3)
                           .background('whitesmoke');
                       svg.call(texture3)

                       return texture3.url()
                   } else {
                       return 'whitesmoke'
                   }




               })
               .on("mouseover", function(d) {
                   tooltip.transition()
                       //.duration(200)
                       .style("opacity", .9);
                   tooltip.html("<b>Name: </b>" + d.name + "<br>" + d.completeness)
                       .style("left", (d3.event.pageX) + "px")
                       .style("top", (d3.event.pageY - 28) + "px");
               })
               .on("mouseout", function(d) {
                   tooltip.transition()
                       //.duration(500)
                       .style("opacity", 0);
               })
               .on('click', function(d) {
                   document.getElementById("infoPanel").style.visibility = 'visible'
               })


        g.append('path')
            .datum(graticule)
            .attr("class", "graticule1")
            .attr("d", geoPath)
            .style('fill-opacity', 0)
            .style('stroke', 'black')
            .style('stroke-width', 0.2)
            .style('stroke-opacity', 0.5)

        /* .on('click', function (d) {
             _.find(listData, function (o) {
                 if (o.region_id == d.properties.region_id) {
                     console.log(o)
                 }
             })
         }) */


    }

}