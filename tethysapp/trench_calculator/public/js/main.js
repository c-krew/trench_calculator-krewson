
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

init_map_buffer = function(){
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


        var view = new MapView ({
            container: "mapbuffer",
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

    });
};

init_map_slopecalc = function(){
        require([
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Sketch/SketchViewModel",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/tasks/Geoprocessor",
      "esri/tasks/support/FeatureSet",
      "esri/geometry/Point",
      "esri/geometry/Polyline",
      "dojo/domReady!"
    ], function(Map, MapView, SketchViewModel, Graphic, GraphicsLayer, Geoprocessor, FeatureSet, Point, Polyline) {

        var tempGraphicsLayer = new GraphicsLayer();

        var map = new Map({
        basemap: "gray",
        layers: [tempGraphicsLayer],
        });

        var view = new MapView({
        container: "mapslope",
        map: map,
        center: [-111.7,40.25],
        zoom: 13
        });

        var markerSymbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [255, 0, 0],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: .001
          }
        };

        var gpUrl = "http://geoserver2.byu.edu/arcgis/rest/services/PawneeRangers/PawneeRangers_SlopeCalc/GPServer/SlopeCalc2";

        // create a new Geoprocessor
        var gp = new Geoprocessor(gpUrl);
        // define output spatial reference
        gp.outSpatialReference = { // autocasts as new SpatialReference()
              wkid: 4326 //EPSG3857
            };

        view.when(function() {
        // create a new sketch view model
        var sketchViewModel = new SketchViewModel({
          view: view,
          layer: tempGraphicsLayer,
          polylineSymbol: { // symbol used for polylines
            type: "simple-line", // autocasts as new SimpleMarkerSymbol()
            color: "#8A2BE2",
            width: "3",
            style: "solid"
          }
        });

        // ************************************************************
        // Get the completed graphic from the event and add it to view.
        // This event fires when user presses
        //  * "C" key to finish sketching point, polygon or polyline.
        //  * Double-clicks to finish sketching polyline or polygon.
        //  * Clicks to finish sketching a point geometry.
        // ***********************************************************
        sketchViewModel.on("draw-complete", function(evt) {
          document.getElementsByClassName("slopereturn")[0].innerHTML = "Slope = (CALCULATING)";
          tempGraphicsLayer.add(evt.graphic);
          setActiveButton();
          var inputGraphicContainer = [];
          inputGraphicContainer.push(evt.graphic);
          var featureSet = new FeatureSet();
          featureSet.features = inputGraphicContainer;

          // input parameters
          var params = {
            "Input_Features": featureSet,
          };

          gp.submitJob(params).then(completeCallback, errBack, statusCallback);

        });

        function completeCallback(result){

            gp.getResultData(result.jobId, "Line_With_Slope_Output").then(drawResult, drawResultErrBack);

        }

        function drawResult(data){
            var slope = data.value.features[0].attributes.slope;
            document.getElementsByClassName("slopereturn")[0].innerHTML = "Slope = " + slope;
//            var polyline = data.value.features[0]
//
//            var polylineSymbol = {
//              type: "simple-line",  // autocasts as SimpleLineSymbol()
//              color: [226, 119, 40],
//              width: 4
//            };
//
//            var polylineGraphic = new Graphic({
//              geometry: polyline,
//              symbol: polylineSymbol
//           });
//
//            tempGraphicsLayer.add(polylineGraphic);
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

        var drawLineButton = document.getElementById("polylineButton");
        drawLineButton.onclick = function() {
          // set the sketch to create a polyline geometry
          sketchViewModel.create("polyline");
          setActiveButton(this);
        };


        document.getElementById("resetBtn").onclick = function() {
          tempGraphicsLayer.removeAll();
          sketchViewModel.reset();
          setActiveButton();
        };

        function setActiveButton(selectedButton) {
          // focus the view to activate keyboard shortcuts for sketching
          view.focus();
          var elements = document.getElementsByClassName("active");
          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
          }
          if (selectedButton) {
            selectedButton.classList.add("active");
          }
        }
      });
    }

)};

init_map_splitline = function(){
        require([
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Sketch/SketchViewModel",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/tasks/Geoprocessor",
      "esri/tasks/support/FeatureSet",
      "esri/geometry/Point",
      "dojo/domReady!"
    ], function(Map, MapView, SketchViewModel, Graphic, GraphicsLayer, Geoprocessor, FeatureSet, Point) {

        var tempGraphicsLayer = new GraphicsLayer();

        var map = new Map({
        basemap: "gray",
        layers: [tempGraphicsLayer],
        });

        var view = new MapView({
        container: "mapsplitline",
        map: map,
        center: [-111.7,40.25],
        zoom: 13
        });

        var markerSymbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [255, 0, 0],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: .001
          }
        };

        var gpUrl = "http://geoserver2.byu.edu/arcgis/rest/services/PawneeRangers/generateprofile/GPServer/generateprofile";

        // create a new Geoprocessor
        var gp = new Geoprocessor(gpUrl);
        // define output spatial reference
        gp.outSpatialReference = { // autocasts as new SpatialReference()
              wkid: 4326 //EPSG3857
            };

        view.when(function() {
        // create a new sketch view model
        var sketchViewModel = new SketchViewModel({
          view: view,
          layer: tempGraphicsLayer,
          polylineSymbol: { // symbol used for polylines
            type: "simple-line", // autocasts as new SimpleMarkerSymbol()
            color: "#8A2BE2",
            width: "3",
            style: "solid"
          }
        });

        // ************************************************************
        // Get the completed graphic from the event and add it to view.
        // This event fires when user presses
        //  * "C" key to finish sketching point, polygon or polyline.
        //  * Double-clicks to finish sketching polyline or polygon.
        //  * Clicks to finish sketching a point geometry.
        // ***********************************************************
        sketchViewModel.on("draw-complete", function(evt) {
          tempGraphicsLayer.add(evt.graphic);
          setActiveButton();
          var inputGraphicContainer = [];
          inputGraphicContainer.push(evt.graphic);
          var featureSet = new FeatureSet();
          featureSet.features = inputGraphicContainer;
          var splitpercent = $("#percentinput").val();

          // input parameters
          var params = {
            "line": featureSet,
            "Percentage": splitpercent,
          };

          gp.submitJob(params).then(completeCallback, errBack, statusCallback);

        });

        function completeCallback(result){

            gp.getResultData(result.jobId, "ptswithelevations").then(drawResult, drawResultErrBack);

        }

        function drawResult(data){
            var pt_feature = data.value.features;
            var i;
            for (i = 0; i < pt_feature.length; i++) {

                var point = new Point({
                    longitude: longitude= pt_feature[i]['geometry']['longitude'],
                    latitude: latitude= pt_feature[i]['geometry']['latitude']
                });
                var ptGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol
                });
                tempGraphicsLayer.add(ptGraphic);
            }
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

        var drawLineButton = document.getElementById("polylineButton");
        drawLineButton.onclick = function() {
          // set the sketch to create a polyline geometry
          sketchViewModel.create("polyline");
          setActiveButton(this);
        };


        document.getElementById("resetBtn").onclick = function() {
          tempGraphicsLayer.removeAll();
          sketchViewModel.reset();
          setActiveButton();
        };

        function setActiveButton(selectedButton) {
          // focus the view to activate keyboard shortcuts for sketching
          view.focus();
          var elements = document.getElementsByClassName("active");
          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
          }
          if (selectedButton) {
            selectedButton.classList.add("active");
          }
        }
      });
    }

)};

function resultmodal() {
    $("#resultmod").modal('show')
}

function dimensionmodal() {
    $("#dimensionmod").modal('show')
}

function calcmes() {
    $("#slopereturn").html = "Line Slope = (CALCULATING)";
}

$(function() {
    init_map_buffer();
    init_map_splitline();
    init_map_slopecalc();
    init_map();
});