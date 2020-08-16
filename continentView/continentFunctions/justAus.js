function justAus() {

    //document.getElementById('mapTitle').style.visibility = 'hidden';
    document.getElementById('familySearch').style.visibility = 'visible'
    document.getElementById('mapTitle').style.visibility = 'hidden';
    document.getElementById('panel').style.visibility = 'visible'

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
            .rotate([-140,6])
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
            .attr('class', 'continent')
            .attr("d", geoPath)
            .attr('fill', function(d) {
                if (d.properties.completeness === 2) {

                    const texture3 = textures.lines()
                        //.size(5)
                        .stroke('black')
                        //.thinner()
                        .strokeWidth(0.8)
                        .background('#EDE1D1');
                    svg.call(texture3)

                    return texture3.url()
                } else {
                    return '#EDE1D1'
                }
            })
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
            .attr('class', 'points aus')
            .attr('cx', function(d) {
                return projection([d.LON, d.LAT])[0]
            })
            .attr('cy', function(d) {
                return projection([d.LON, d.LAT])[1]
            })
            .attr('r', '4px')
            .attr('opacity', 0.8)
            .attr('fill', '#EDE1D1')
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