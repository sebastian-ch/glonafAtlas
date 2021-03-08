//Australia Functions
function justAus() {

    //document.getElementById('mapTitle').style.visibility = 'hidden';
    document.getElementById('form').style.visibility = 'visible'
    document.getElementById('mapTitle').style.visibility = 'hidden';
    document.getElementById('panel').style.visibility = 'visible'
    document.getElementById('circleLegend').style.visibility = 'hidden';
    document.getElementById('legend').style.visibility = 'hidden';

    var div = document.getElementById('map')

    //closeSide();

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    var promises = [
        d3.json('../continentView/continent-geojsons/aus/aus1.json'),
        d3.csv('../continentView/continent-geojsons/aus/ausPoints1.csv')
    ]

    if (worldViewFilesData.aus == null) {

        Promise.all(promises).then(function(values) {

            worldViewFilesData.aus = geojsonRewind(values[0], true);
            worldViewFilesData.ausPoints = values[1]
            addToMap(worldViewFilesData.aus, values[1]);
        })

    } else {
        addToMap(worldViewFilesData.aus, worldViewFilesData.ausPoints)
    }

    function addToMap(data, points) {


        var svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        var g = svg.append("g");

        var center = [-36.07, 158.00]

        var projection = d3.geoConicConformal()
            //.rotate([-132, 0])
            .rotate([-140, 6])
            .center([0, -27])
            .parallels([-18, -36])
            .scale(Math.min(height * 1.2, width * 0.8))
            .translate([width / 2, height / 2])
            .precision(0.1);
        //.fitSize([width - 50, height - 50], data)

        var geoPath = d3.geoPath()
            .projection(projection);

        var graticule = d3.geoGraticule().step([10, 10])


        svg.append('g')
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr('class', 'continent aus')
            .attr("d", geoPath)
            .attr('fill', '#e6dccc')
            .attr('stroke', '#ababab')
            .attr('stroke-width', '0.3')

        svg.selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('class', 'points aus')
            .attr('cx', function(d) {
                return projection([d.LON, d.LAT])[0]
            })
            .attr('cy', function(d) {
                return projection([d.LON, d.LAT])[1]
            })
            .attr('r', '4px')
            .attr('opacity', 0)
            .attr('fill', '#e6dccc')
            /*.on('click', function(d) {
                document.getElementById("infoPanel").style.visibility = 'visible'
            }) */

        d3.selectAll('.points')
            .transition()
            .duration(500)
            .attr('opacity', 1.0)

        d3.selectAll('.continent')
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

        d3.selectAll('.back')
            .transition()
            .duration(500)
            .attr('opacity', 1.0)

    }

}