function justEurope() {

    document.getElementById('form').style.visibility = 'visible'
    document.getElementById('panel').style.visibility = 'visible'
    document.getElementById('mapTitle').style.visibility = 'hidden';
    document.getElementById('circleLegend').style.visibility = 'hidden';
    document.getElementById('legend').style.visibility = 'hidden';

    var div = document.getElementById('map')

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    var promises = [
        d3.json('../continentView/continent-geojsons/europe/europe1.json'),
        d3.csv('../continentView/continent-geojsons/europe/points.csv'),

    ]

    if (worldViewFilesData.europe == null) {

        Promise.all(promises).then(function(values) {

            worldViewFilesData.europe = values[0];
            worldViewFilesData.europePoints = values[1]
            addToMap(geojsonRewind(values[0], true), values[1]);
        })

    } else {
        addToMap(worldViewFilesData.europe, worldViewFilesData.europePoints)
    }


    function addToMap(data, points) {

        var svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        var g = svg.append("g");

        //console.log(worldViewFilesData.backdrop);

        var projection = d3.geoConicConformal()
        //projection.fitSize([width,height], data)
        projection.fitExtent([
            [50, 50],
            [width, height]
        ], data)

        var geoPath = d3.geoPath()
            .projection(projection);

        var graticule = d3.geoGraticule().step([10, 10])

        svg.append('g')
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr('class', 'continent europe')
            .attr("d", geoPath)
            .attr('fill', '#e6dccc')
            .attr('stroke', '#ababab')
            .attr('stroke-width', '0.3')

        svg.selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('class', 'points europe')
            .attr('cx', function(d) {
                return projection([d.LON, d.LAT])[0]
            })
            .attr('cy', function(d) {
                return projection([d.LON, d.LAT])[1]
            })
            .attr('r', '4px')
            //.attr('opacity', 0.8)
            .attr('fill', '#e6dccc')
            .on('click', function(d) {
                document.getElementById("infoPanel").style.visibility = 'visible'
            })

        d3.selectAll('.europe')
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
        //.style('opacity', 0.5);


    }






}