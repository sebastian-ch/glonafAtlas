function justAfrica() {

    //document.getElementById('mapTitle').style.visibility = 'hidden';
    document.getElementById('form').style.visibility = 'visible'
    document.getElementById('panel').style.visibility = 'visible'
    document.getElementById('mapTitle').style.visibility = 'hidden';
    document.getElementById('circleLegend').style.visibility = 'hidden';
    document.getElementById('legend').style.visibility = 'hidden';


    var div = document.getElementById('map')

    //closeSide();

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    var files = [
        d3.json('../continentView/continent-geojsons/africa/africa3.geojson'),
        d3.csv('../continentView/continent-geojsons/africa/africaislands1.csv'),
        d3.csv('../continentView/continent-geojsons/africa/africaPointsW.csv')

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
            .attr('class', 'continent africa')
            .attr("d", geoPath)
            //.attr('opacity', )
            .attr('fill', '#e6dccc')
            .attr('stroke', '#ababab')
            .attr('stroke-width', 0.3)
            
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
            //.attr('opacity', 0.9)
            .attr('fill', '#e6dccc')
            
            .on('click', function(d) {
                document.getElementById("infoPanel").style.visibility = 'visible'
            })

            d3.selectAll('.africa', '.back')
            .transition()
            .duration(500)
            .attr('opacity', 1.0)


        g.append('path')
            .datum(graticule)
            .attr("class", "graticule1")
            .attr("d", geoPath)
            .style('fill-opacity', 0)
            .style('stroke', 'black')
            .style('stroke-width', 0.2)
            .style('stroke-opacity', 0.5)

        g
            .append('g')
            .selectAll('path')
            .data(worldViewFilesData.backdrop.features)
            .enter()
            .append("path")
            .attr('class', 'back')
            .attr("d", geoPath)
            .attr('fill', 'whitesmoke')

        /* .on('click', function (d) {
             _.find(listData, function (o) {
                 if (o.region_id == d.properties.region_id) {
                     console.log(o)
                 }
             })
         }) */


    }

}