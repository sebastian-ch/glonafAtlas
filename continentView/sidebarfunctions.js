function openPage(url) {
    window.open(url)
}

function openSide() {
    document.getElementById('sidebar').style.width = '250px';
    document.getElementById('openbtn').style.visibility = 'hidden';
    //document.getElementById('map').style.marginLeft = '250px';


}

function closeSide() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById('openbtn').style.visibility = 'visible';

    // document.getElementById("map").style.marginLeft = "0";
}

function infoCloseSide() {
    document.getElementById("infoPanel").style.visibility= "hidden";
    

    // document.getElementById("map").style.marginLeft = "0";
}


function setFamilySearch() {


    const selectMenu = document.getElementById('fam');

    for (var x in familylist) {
        var el = document.createElement("option");
        el.textContent = familylist[x];
        el.value = familylist[x];
        selectMenu.appendChild(el);
    }


}