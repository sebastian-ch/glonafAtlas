function justAsiaT() {

    document.getElementById('familySearch').style.visibility = 'visible'
    document.getElementById('mapTitle').style.visibility = 'hidden';

    var div = document.getElementById('map')

    //closeSide();

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    var promises = [
        d3.json('../continentView/continent-geojsons/asia-temperate/asiaT1.geojson'),
        d3.csv('../continentView/continent-geojsons/asia-temperate/asiaTPoints1.csv')
    ]

    if (worldViewFilesData.asiaT == null) {

        Promise.all(promises).then(function(values) {

            worldViewFilesData.asiaT = values[0];
            worldViewFilesData.asiaTPoints = values[1]
            addToMap(values[0], values[1]);
        })

    } else {
        addToMap(worldViewFilesData.asiaT, worldViewFilesData.asiaTPoints)
    }

    function addToMap(data, points) {


        var svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        var g = svg.append("g");

        var projection = d3.geoCylindricalEqualArea() 
        .fitSize([width - 50, height - 50], data)

        var geoPath = d3.geoPath()
            .projection(projection);

        var graticule = d3.geoGraticule().step([10, 10])


        svg.append('g')
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr('class', 'continent asiaT')
            .attr("d", geoPath)
            .attr('fill', 'whitesmoke')
            .attr('stroke', '#ababab')
            .attr('stroke-width', '0.3')
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
        svg.selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('class', 'points asiaT')
            .attr('cx', function(d) {
                return projection([d.LON, d.LAT])[0]
            })
            .attr('cy', function(d) {
                return projection([d.LON, d.LAT])[1]
            })
            .attr('r', '4px')
            .attr('opacity', 0.8)
            .attr('fill', 'whitesmoke')
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