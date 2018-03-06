
init_map = function(){
    require([
        "esri/Map",
        "esri/layers/FeatureLayer",
        "esri/layers/MapImageLayer",
        "esri/views/MapView",
        "dojo/dom",
        "dojo/on",
        "dojo/domReady!",
    ], function(Map, FeatureLayer, MapImageLayer, MapView, dom, on) {
        var map = new Map ({
            basemap: "streets"
        });

        var template = {
            title: "Utah Valley Municipalities",
            content: "<p>{NAME}</p>"
        };

        var municipalities_lyr = new FeatureLayer ({
            url: "http://geoserver2.byu.edu/arcgis/rest/services/PawneeRangers/Municipalities/MapServer",
            outFields: ["*"],
            popupTemplate : template
        });

        var dem_lyr = new MapImageLayer ({
           url: "http://geoserver2.byu.edu/arcgis/rest/services/PawneeRangers/DEM/MapServer"
        });

        map.layers.add(dem_lyr);
        map.layers.add(municipalities_lyr);


        var view = new MapView ({
            container: "map",
            map: map,
            center: [-112.1,40],
            zoom: 8
        });

        var demtoggle = dom.byId("dem");
        on(demtoggle,"change",function(){
            dem_lyr.visible = demtoggle.on;
            if (demtoggle.on) {
                    alert('True')
            }
        });

        var muntoggle = dom.byId("mun");
        on(muntoggle,"change",function(){
            municipalities_lyr.visible = muntoggle.checked;
        });

    });
};

function resultmodal() {
    $("#resultmod").modal('show')
}

function dimensionmodal() {
    $("#dimensionmod").modal('show')
}

$(function() {
    init_map();
});