
init_map = function(){
    require([
        "esri/Map",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/tasks/Geoprocessor",
        "esri/tasks/support/LinearUnit",
        "esri/tasks/support/FeatureSet",
        "esri/layers/FeatureLayer",
        "esri/layers/MapImageLayer",
        "esri/views/MapView",
        "dojo/dom",
        "dojo/on",
        "dojo/domReady!",
    ], function(Map, GraphicsLayer, Graphic, Point, Geoprocessor, LinearUnit, FeatureSet, FeatureLayer, MapImageLayer, MapView, dom, on) {
        var map = new Map ({
            basemap: "streets"
        });

        var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

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

        var markerSymbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [255, 0, 0],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 2
          }
        };

        var fillSymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [226, 119, 40, 0.75],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1
          }
        };

        	// Geoprocessing service url
        var gpUrl = "http://geoserver2.byu.edu/arcgis/rest/services/sherry/BufferPoints/GPServer/Buffer%20Points";

        // create a new Geoprocessor
        var gp = new Geoprocessor(gpUrl);
        // define output spatial reference
        gp.outSpatialReference = { // autocasts as new SpatialReference()
              wkid: 102100 //EPSG3857
            };
        //add map click function
        view.on("click", bufferPoint);

        //main function
        function bufferPoint(event) {

              graphicsLayer.removeAll();
              var point = new Point({
                longitude: event.mapPoint.longitude,
                latitude: event.mapPoint.latitude
              });
              var inputGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
              });
              graphicsLayer.add(inputGraphic);
              var inputGraphicContainer = [];
              inputGraphicContainer.push(inputGraphic);
              var featureSet = new FeatureSet();
              featureSet.features = inputGraphicContainer;
              var bfDistance = new LinearUnit();
              bfDistance.distance = 100;
              bfDistance.units = "miles";

              // input parameters
              var params = {
                "Point": featureSet,
                "Distance": bfDistance
              };
              gp.submitJob(params).then(completeCallback, errBack, statusCallback);
        }

        function completeCallback(result){

            gp.getResultData(result.jobId, "Output_Polygon").then(drawResult, drawResultErrBack);

        }

        function drawResult(data){
            var polygon_feature = data.value.features[0];
            polygon_feature.symbol = fillSymbol;
            graphicsLayer.add(polygon_feature);
        }

        function drawResultErrBack(err) {
            console.log("draw result error: ", err);
        }

        function statusCallback(data) {
            console.log(data.jobStatus);
        }
        function errBack(err) {
            console.log("gp error: ", err);
        }


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