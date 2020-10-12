//Styling Functions for Continent View

function plain() {
    d3.selectAll('.continent').attr('fill', 'whitesmoke')
    d3.selectAll('.points').attr('fill', 'whitesmoke')
        .attr('r', '4px')

    document.getElementById('legend').innerHTML = ''
    document.getElementById('legend').style.visibility = 'hidden'
    document.getElementById('circleLegend').style.visibility = 'hidden'
}

function styleContinents(d) {

    var testProp;

    if (!d.properties) {
        testProp = Number(d.tdwg1);
    } else {
        testProp = d.properties.tdwg1
    }


    switch (testProp) {

        case 1:
            return '#fbb4ae'
            break;
        case 2:
            return '#b3cde3'
            break;
        case 3:
            return '#ccebc5'
            break;
        case 4:
            return '#decbe4'
            break;
        case 5:
            return '#fed9a6'
            break;
        case 6:
            return '#ffffcc'
            break;
        case 7:
            return '#fddaec'
            break;
        case 8:
            return '#bc80bd'
            break;
        default:
            return '#e5d8bd'

    }

}


function taxaCountStyle() {

    document.getElementById('circleLegend').style.visibility = 'hidden';


    d3.selectAll('.continent').transition()
        .duration(500).attr('fill', function(d) {

            return colorScheme(d.properties.tnorm)
        })


    if (d3.selectAll('.points')) {
        d3.selectAll('.points').transition()
            .duration(500).attr('fill', function(d) {
                //console.log(d)
                return colorScheme(d.tnorm)
            })
    }

    d3.selectAll('.continent')
        .on("mouseover", function(d) {

            tooltip //.transition()
                //.duration(100)
                .style("opacity", .9);
            tooltip.html("<b>Region Name: </b>" + d.properties.name + "<br>" +
                    "<b>Country: </b>" + d.properties.country + "<br>" +
                    "<b>Taxa Count: </b>" + d.properties.taxCount)
                .style("left", (d3.event.pageX + 50) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            d3.select(this).raise().attr('stroke', 'black').attr('stroke-width', 1)
        })
        .on("mouseout", function(d) {
            //div.transition()
            //.duration(500)
            tooltip.style("opacity", 0);
            d3.select(this).attr('stroke-width', '0.3').attr('stroke', '#ababab')
        })

    d3.selectAll('.points')
        .on("mouseover", function(d) {

            tooltip //.transition()
                //.duration(100)
                .style("opacity", .9);
            tooltip.html("<b>Region Name: </b>" + d.name + "<br>" +
                    "<b>Country: </b>" + d.country + "<br>" +
                    "<b>Taxa Count: </b>" + d.taxCount)
                .style("left", (d3.event.pageX + 50) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            d3.select(this).raise().attr('stroke', 'black').attr('stroke-width', 1)
        })
        .on("mouseout", function(d) {
            //div.transition()
            //.duration(500)
            tooltip.style("opacity", 0);
            d3.select(this).attr('stroke-width', 0)
        })


    //legend configs for each continent

    if (d3.selectAll('.points').classed('aus')) {

        document.getElementById('legend').style.right = '650px';
    } else if (d3.selectAll('.points').classed('pacific')) {

        document.getElementById('legend').style.right = '55px';
        document.getElementById('legend').style.bottom = '455px';

    } else if (d3.selectAll('.points').classed('europe')) {

        document.getElementById('legend').style.right = '920px';

    } else if (d3.selectAll('.points').classed('asiaTrop')) {

        document.getElementById('legend').style.right = '920px';

    } else if (d3.selectAll('.points').classed('asiaT')) {

        document.getElementById('legend').style.right = '50px';

    } else {
        document.getElementById('legend').style.right = '45px';
    }

    document.getElementById('legend').innerHTML = ''
    document.getElementById('legend').style.visibility = 'visible'
    var subscript = "2".sup();

    document.getElementById('legend').innerHTML +=
        '<h2>Normalized Taxa Count Per Area (Km' + subscript + ')</h2>' +
        `<span style="background:#006d2c; margin: 0 10px 0 0"></span>` + '<label>More Taxa Per Area</label>' +
        `<span style="background:#31a354; margin: 0 10px 0 0"></span>` + '<label></label>' +
        `<span style="background:#74c476; margin: 0 10px 0 0"></span>` + '<label></label>' +
        `<span style="background:#bae4b3; margin: 0 10px 0 0"></span>` + '<label></label>' +
        `<span style="background:#edf8e9; margin: 0 10px 0 0"></span>` + '<label>Less Taxa Per Area</label>'

}

function completenessStyle() {

    document.getElementById('circleLegend').style.visibility = 'hidden';

    var completenessName = 'completeness';

    if (d3.selectAll('.points').classed('africa')) {
        completenessName = 'completene';
    }


    d3.selectAll('.continent').transition().duration(500)

        .attr('fill', function(d) {

            //console.log(d);
            switch (d.properties[completenessName]) {
                case 1:
                    return '#fc8d59'
                    break;
                case 2:
                    return '#ffffbf'
                    break;
                default:
                    return '#91cf60'
            }
        })
    var comVar = 'completeness';
    if (d3.selectAll('.points').classed('africa')) {
        comVar = 'completene'
    }
    d3.selectAll('.continent')
        .on("mouseover", function(d) {

            tooltip //.transition()
                //.duration(100)
                .style("opacity", .9);
            tooltip.html("<b>Region Name: </b>" + d.properties.name + "<br>" +
                    "<b>Country: </b>" + d.properties.country + "<br>" +
                    "<b>Completeness: </b>" + d.properties[comVar])
                .style("left", (d3.event.pageX + 50) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            d3.select(this).raise().attr('stroke', 'black').attr('stroke-width', 1)
        })
        .on("mouseout", function(d) {
            //div.transition()
            //.duration(500)
            tooltip.style("opacity", 0);
            d3.select(this).attr('stroke-width', '0.3').attr('stroke', '#ababab')
        })

    d3.selectAll('.points')
        .on("mouseover", function(d) {

            tooltip //.transition()
                //.duration(100)
                .style("opacity", .9);
            tooltip.html("<b>Region Name: </b>" + d.name + "<br>" +
                    "<b>Country: </b>" + d.country + "<br>" +
                    "<b>Completeness: </b>" + d[comVar])
                .style("left", (d3.event.pageX + 50) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            d3.select(this).raise().attr('stroke', 'black').attr('stroke-width', 1)
        })
        .on("mouseout", function(d) {
            //div.transition()
            //.duration(500)
            tooltip.style("opacity", 0);
            d3.select(this).attr('stroke-width', 0)
        })

    if (d3.selectAll('.points')) {
        d3.selectAll('.points').transition()
            .duration(500)

            .attr('fill', function(d) {

                switch (d[completenessName]) {
                    case '1':
                        return '#fc8d59'
                        break;
                    case '2':
                        return '#ffffbf'
                        break;
                    default:
                        return '#91cf60'
                }
            })
            .attr('r', '4px')
    }

    //legend configs for each continent
    if (d3.selectAll('.points').classed('aus')) {

        document.getElementById('legend').style.right = '650px';

    } else if (d3.selectAll('.points').classed('europe')) {

        document.getElementById('legend').style.right = '900px';

    } else if (d3.selectAll('.points').classed('asiaTrop')) {

        document.getElementById('legend').style.right = '920px';

    } else if (d3.selectAll('.points').classed('asiaT')) {

        document.getElementById('legend').style.right = '50px';

    } else {
        document.getElementById('legend').style.right = '45px';
    }

    document.getElementById('legend').innerHTML = ''
    document.getElementById('legend').style.visibility = 'visible'

    document.getElementById('legend').innerHTML +=
        '<h2>Data Completeness</h2>' +
        `<span style="background:#91cf60"></span>` + '<label><b>3</b>: Likely Nearly Complete (>90% naturalized taxa included)</label>' +
        `<span style="background:#ffffbf"></span>` + '<label><b>2</b>: Likely Incomplete (between 50% and 90% of naturalized taxa included)</label>' +
        `<span style="background:#fc8d59"></span>` + '<label><b>1</b>: Likely Very Incomplete(< 50% naturalized taxa included)</label>'


}


function familyStyle(sel) {

    var oneFam = []
    var currentDataset;


    if (d3.selectAll('.points').classed('africa')) { // africa 
        currentDataset = 'africaPoints'
    } else if (d3.selectAll('.points').classed('asiaT')) { //asia temperate
        currentDataset = 'asiaTPoints'
    } else if (d3.selectAll('.points').classed('na')) { // north america
        currentDataset = 'naPoints'
    } else if (d3.selectAll('.points').classed('aus')) { // aus
        currentDataset = 'ausPoints'
    } else if (d3.selectAll('.points').classed('sa')) { // south america
        currentDataset = 'saPoints'
    } else if (d3.selectAll('.points').classed('europe')) { // europe
        currentDataset = 'europePoints'
    } else if (d3.selectAll('.points').classed('asiaTrop')) { // asiaTrop
        currentDataset = 'asiaTropPoints'
    } else if (d3.selectAll('.points').classed('pacific')) { // pacific
        currentDataset = 'pacificPoints'
    }

    if (!worldViewFilesData[currentDataset].hasOwnProperty(sel)) {

        for (var x in worldViewFilesData[currentDataset]) {

            var thisReg = worldViewFilesData[currentDataset][x].region_id;
            var filter = _.filter(worldViewFilesData.taxList, function(o) { return o.region_id == thisReg && o.family_tpl == sel });
            //console.log(filter);
            oneFam.push(filter.length);
            worldViewFilesData[currentDataset][x][sel] = filter.length;
        }

        setNewColor(sel, oneFam);
    } else {
        console.log('else!')
        for (var x in worldViewFilesData[currentDataset].features) {
            oneFam.push(worldViewFilesData[currentDataset].features[x].properties[sel])
        }

        setNewColor(sel, oneFam);
    }


    /* var circles = d3.selectAll('circle')._groups[0];
     console.log(circles.length)
     if(!circles[0].__data__[sel]) {

         for (var x in circles) {

             console.log(circles[x])

            // var thisReg = circles[x].__data__.region_id;
            // console.log(thisReg)

         } 

     } */

}

function setNewColor(selected, oneFam) {

    var valuesToShow;
    d3.select('#thisLegend').remove();

    var domainVals = d3.extent(oneFam);
    console.log(domainVals);
    //console.log(points)

    var linearScale = d3.scaleLinear()
        .domain(domainVals)
        .range([2, 30])


    if (domainVals[1] <= 30) {

    
        d3.selectAll('circle')
            .raise()
            .transition()
            .attr('r', function(d) {
                return d[selected].toString() + 'px'

            })
            .attr('fill', '#b2d8b2')

        valuesToShow = [domainVals[1]]
        console.log(valuesToShow)
    } else {

        d3.selectAll('circle')
            .raise()
            .transition()
            .attr('r', function(d) {

                if (d[selected] == 0) {
                    return '0px'
                } else {
                    return linearScale(d[selected]) + 'px'
                }
            })
            .attr('fill', '#b2d8b2')

        valuesToShow = [Math.round(linearScale(domainVals[1] / 2)), linearScale(domainVals[1])]
        console.log('vals: ' + valuesToShow);
    }

    d3.selectAll('.points')
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("<b>Name: </b>" + d.name + "<br>" +
                    "# of " + selected + ": " + d[selected])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            d3.select(this)
                .attr('stroke-width', 1)
                .attr('stroke', 'black')
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);

            d3.select(this)
                .attr('stroke-width', 0)
        })

    document.getElementById('circleLegend').style.visibility = 'visible';
    document.getElementById('circleLegend').innerHTML = ''
    document.getElementById('circleLegend').innerHTML += '<h2># of ' + selected + ' </h2>'

    var legend = d3.select('#circleLegend')
        .append("svg")
        .attr('id', 'thisLegend')
        .attr("width", 110)
        .attr("height", 110)
        .style('margin', '4px')

    var xCircle = 40
    var xLabel = 80
    var yCircle = 100

    legend
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d) { return yCircle - d })
        .attr("r", function(d) { return d })
        .style("fill", "#b2d8b2")
        .attr('opacity', 0.5)
        .attr("stroke", "#b2d8b2")

    legend
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("line")
        .attr('x1', function(d) { return xCircle + d })
        .attr('x2', xLabel)
        .attr('y1', function(d) { return yCircle - d })
        .attr('y2', function(d) { return yCircle - d })
        .attr('stroke', 'whitesmoke')
        .style('stroke-dasharray', ('2,2'))
        .attr('shape-rendering', 'crispEdges')

    // Add legend: labels
    if (valuesToShow.length == 1) {
        legend
            .selectAll("legend")
            .data(valuesToShow)
            //.data(domainVals)
            .enter()
            .append("text")
            .attr('x', xLabel)
            .attr('y', function(d) { return yCircle - d })
            .data([domainVals[1]])
            .text(function(d) { return d })
            .style("font-size", 15)
            .attr('alignment-baseline', 'middle')
            .attr('shape-rendering', 'crispEdges')

    } else {

        legend
            .selectAll("legend")
            .data(valuesToShow)
            //.data(domainVals)
            .enter()
            .append("text")
            .attr('x', xLabel)
            .attr('y', function(d) { return yCircle - d })
            .data([Math.round(domainVals[1] / 2), domainVals[1]])
            .text(function(d) { return d })
            .style("font-size", 15)
            .attr('alignment-baseline', 'middle')
            .attr('shape-rendering', 'crispEdges')

    }

    spinner.stop()

}

























/* var domainVals = d3.extent(oneFam);

                 if (domainVals[1] > 100) {
                     console.log('over 100');

                     domainVals[1] = 90
                 }
                 console.log(domainVals);
                 //console.log(points)


                 d3.selectAll('.points')
                     .transition()
                     .attr('r', function(d) {
                         return d[selected].toString() + 'px'
                     })
                     .attr('fill', '#b2d8b2')

                 d3.selectAll('.points')
                     .on("mouseover", function(d) {
                         tooltip.transition()
                             .duration(200)
                             .style("opacity", .9);
                         tooltip.html("<b>Name: </b>" + d.name + "<br>" +
                                 "# of " + selected + ": " + d[selected])
                             .style("left", (d3.event.pageX) + "px")
                             .style("top", (d3.event.pageY - 28) + "px");

                         d3.select(this)
                             .attr('stroke-width', 1)
                             .attr('stroke', 'black')
                     })
                     .on("mouseout", function(d) {
                         tooltip.transition()
                             .duration(500)
                             .style("opacity", 0);

                         d3.select(this)
                             .attr('stroke-width', 0)

                     });

            } */