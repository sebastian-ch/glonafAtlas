function plain() {
    d3.selectAll('.continent').attr('fill', 'whitesmoke')
    d3.selectAll('.points').attr('fill', 'whitesmoke')
        .attr('r', '4px')
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

    if (d3.selectAll('.continent').classed('asiaT')) {
        d3.selectAll('.continent').attr('fill', function(d) {
            return colorScheme(d.properties.tnorm)
        })

    } else {

        d3.selectAll('.continent').attr('fill', function(d) {

            console.log(d);
            if (d.properties.completeness == 1) {

                const texture3 = textures.lines()
                    //.orientation("vertical", "horizontal")
                    .size(6)
                    .strokeWidth(0.3)
                    //.stroke(d3.color(colorScheme(d.properties.tnorm)))
                    .background(colorScheme(Number(d.properties.tnorm)));
                svg.call(texture3)

                return texture3.url()

                //return texture2.url()
                //return texture.stroke(d3.color(colorScheme(d.properties.tnorm))).url()
            } else {
                return colorScheme(d.properties.tnorm)
            }
        })
    }

    if (d3.selectAll('.points')) {
        d3.selectAll('.points').attr('fill', function(d) {
            //console.log(d)
            return colorScheme(d.tnorm)
        })
    }





}

function completenessStyle() {
    d3.selectAll('.continent').attr('fill', function(d) {

        //console.log(d);
        switch (d.properties.completeness) {
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

    if (d3.selectAll('.points')) {
        d3.selectAll('.points')
            .attr('fill', function(d) {

                switch (d.completeness) {
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


}


function familyStyle(sel) {

    var oneFam = []
    var currentDataset;


    if (d3.selectAll('.points').classed('africa')) {
        currentDataset = 'africaPoints'
    } else if (d3.selectAll('.points').classed('asiaT')) {
        currentDataset = 'asiaTPoints'
    } else if (d3.selectAll('.points').classed('na')) {
        currentDataset = 'naPoints'
    } else if (d3.selectAll('.points').classed('aus')) {
        currentDataset = 'ausPoints'
    } else if (d3.selectAll('.points').classed('sa')) {
        currentDataset = 'saPoints'
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
    var domainVals = d3.extent(oneFam);

    if (domainVals[1] > 100) {
        console.log('over 100');

        domainVals[1] = 90
    }
    console.log(domainVals);
    //console.log(points)


    var sqrtEx = d3.scaleSqrt()
        .domain(domainVals)
        .range([1, 20])


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

}