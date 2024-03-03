import L from "leaflet"

(function(L) {
   "use strict";
   /**
    * Checks if a single point is contained in a polyline or polygon (L.Polygon extends L.Polyline).
    * <p>
    * Note that L.Polygon, L.GeodesicPolygons, and L.GeodesicCircles are types of L.Polygon.
    * @member external:L.Polyline.contains
    * @param {L.LatLng} p A geographical point with a latitude and longitude.
    * @returns {boolean} True if the point is contained in the polygon or polyline; otherwise, 
    * @see {@link https://github.com/Fragger/Leaflet.Geodesic Leaflet.Geodesc} for information about Leaflet.Geodesc by Fragger.
    */
   L.Polyline.prototype.contains = function (p) {
       //"use strict";
       var rectangularBounds = this.getBounds();  // It appears that this is O(1): the LatLngBounds is updated as points are added to the polygon when it is created.
       var wn;
       if (rectangularBounds.contains(p)) {
           wn = this.getWindingNumber(p);
           return (wn !== 0);
       } else {
           return false;
       }
   };

   /**
    * Tests if a point is left|on|right of an infinite line.
    * <br><br>
    * This is a JavaScript and Leaflet port of the `isLeft()` C++ function by Dan Sunday.
    * @member external:L.LatLng.isLeft
    * @param {LatLng} p1 Point The reference line is defined by `this` LatLng to p1.
    * @param {LatLng} p2 The point in question.
    * @returns {Number} >0 for p2 left of the line through this point and p1,
    *          =0 for p2 on the line,
    *          <0 for p2 right of the line through this point an p1.
    * @see {@link http://geomalgorithms.com/a03-_inclusion.html Inclusion of a Point in a Polygon} by Dan Sunday.
    */
   L.LatLng.prototype.isLeft = function (p1, p2) {
       return ((p1.lng - this.lng) * (p2.lat - this.lat) -
               (p2.lng - this.lng) * (p1.lat - this.lat));
   };

   /**
    * Test for a point in a polygon or on the bounding lines of the polygon.  The
    * coordinates (L.LatLngs) for a GeodesicPolygon are set to follow the earth's
    * curvature when the GeodesicPolygon object is created.  Since L.Polygon
    * extends L.Polyline we can use the same method for both.  Although, for
    * L.Polyline, we only get points on the line even if a collection of lines
    * appear to make a polygon.
    * <br><br>
    * This is a JavaScript and Leaflet port of the `wn_PnPoly()` C++ function by Dan Sunday.
    * Unlike the C++ version, this implementation does include points on the line and vertices.
    *
    * @member external:L.Polyline.getWindingNumber
    * @param p {L.LatLng} A point.
    * @returns {Number} The winding number (=0 only when the point is outside)
    *
    * @see {@link http://geomalgorithms.com/a03-_inclusion.html Inclusion of a Point in a Polygon} by Dan Sunday.
    * @see {@link https://github.com/Fragger/Leaflet.Geodesic Leaflet.Geodesc} for information about Leaflet.Geodesc by Fragger.
    */
   L.Polyline.prototype.getWindingNumber = function (p) { // Note that L.Polygon extends L.Polyline
       var i,
           isLeftTest,
           n,
           vertices,
           wn; // the winding number counter
       function flatten(a) {
           var flat;
           flat = ((Array.isArray ? Array.isArray(a) : L.Util.isArray(a)) ? a.reduce(function (accumulator, v, i, array) {
                   return accumulator.concat(Array.isArray(v) ? flatten(v) : v);
               }, [])
               : a);
           return flat;
       }

       vertices = this.getLatLngs();
       vertices = flatten(vertices); // Flatten array of LatLngs since multi-polylines return nested array.
       // Filter out duplicate vertices.  
       vertices = vertices.filter(function (v, i, array) { // remove adjacent duplicates
           if (i > 0 && v.lat === array[i-1].lat && v.lng === array[i-1].lng) {
               return false;
           } else {
               return true;
           }
       });
       n = vertices.length;
       // Note that per the algorithm, the vertices (V) must be "a vertex points of a polygon V[n+1] with V[n]=V[0]"
       if (n > 0 && !(vertices[n-1].lat === vertices[0].lat && vertices[n-1].lng === vertices[0].lng)) {
           vertices.push(vertices[0]);
       }
       n = vertices.length - 1;
       wn = 0;
       for (i=0; i < n; i++) {
           isLeftTest = vertices[i].isLeft(vertices[i+1], p);
           if (isLeftTest === 0) { // If the point is on a line, we are done.
               wn = 1;
               break;
           } else {
               if (isLeftTest !== 0) { // If not a vertex or on line (the C++ version does not check for this)
                   if (vertices[i].lat <= p.lat) {
                       if (vertices[i+1].lat > p.lat) { // An upward crossing
                           if (isLeftTest > 0) { // P left of edge
                               wn++; // have a valid up intersect
                           }
                       }
                   } else {
                       if (vertices[i+1].lat <= p.lat) {// A downward crossing
                           if (isLeftTest < 0) { // P right of edge
                               wn--; // have a valid down intersect
                           }
                       }
                   }
               } else {
                   wn++;
               }
           }
       }
       return wn;
   };
})(L); //L is set to Leaflet's L


// Function to chack waether Marker lie inside the Boundary or not
export const isMarkerInsidePolygon = function (marker, poly) {
    var x = marker[1], y = marker[0];
    var polygonFormed = L.polygon(poly);
    var marker = L.marker([y,x])
    let isContains = polygonFormed.contains(marker.getLatLng());
    console.log(isContains);
    return isContains;
};

// Calculating the Average of all The Data
export const calculateAverage = function (geojson) {
    let scoreSum = 0;
    let totalCount = 0;
    geojson.map((sc) => {
        scoreSum += sc.score;
        totalCount++;
    });
    let avg = (scoreSum * 1.0 / totalCount);
    return avg;
}

// Getting The Representation of the Colors on Map
export const getColRep = function (avg) {
    console.log(avg);
    if(avg === null) {
        return '#ebf2fa';
    }
    let colRep = avg < 50 ? '#ef476f' : avg < 75 && avg >= 50 ? '#ffd166' : '#06d6a0';
    return colRep;
}

// filtered Geo JSON Exluding the Negative Values and Which lies inside ward Boundary
export const getFilteredGeoJSON = function (geojson, currWard, selectedWardBoundary) {
    let max = -1;
    let min = 1;
    let filteredgeoJson = geojson.filter((json) => json.score > 0);
    const newgeojson = [];
    for (let i = 0; i < filteredgeoJson.length; i++) {
        let json = filteredgeoJson[i];
        max = Math.max(max, json.score);
        min = Math.min(min, json.score);
        newgeojson.push(json);
    }
    let markerjson = newgeojson;
    if (currWard !== "any") {
        markerjson = markerjson.filter((dat) => {
            var polygonFormed = L.polygon(selectedWardBoundary);
            var marker = L.marker([dat.longitude, dat.latitude])
            let isContains = polygonFormed.contains(marker.getLatLng());
            let isTrue = isMarkerInsidePolygon([dat.longitude, dat.latitude], [selectedWardBoundary]);
            return isContains;
        });
    }
    return markerjson;
}

// Getting the Boundaries which are selected
export const getSelectedWardBoundary = (wardValue, wardDivision) => {
    let selectedWardBoundary = [];
    // console.log(wardDivision);
    if (wardValue === "any") {
        wardDivision.map((ward) => {
            let boundary = [];
            console.log(ward);
            ward.geometry.map((point) => {
                boundary.push([point[1], point[0]]);
            });
            selectedWardBoundary.push({boundary:boundary,scores:{...ward.scores}});
        });
    } else {
        wardDivision.map((ward) => {
            if (wardValue === ward["Ward Numbe"]) {
                let boundary = [];
                ward.geometry.map((point) => {
                    boundary.push([point[1], point[0]]);
                });
                selectedWardBoundary.push({boundary:boundary,scores:{...ward.scores}});
            }
        });
    }
    return selectedWardBoundary;
}

// Getting The wards With Their Name
export const getWardsWithName = (wardDivision) => {
    let wards = [];

    wardDivision.map((ward) => {
        wards.push({ "ward_name": ward["Ward Name"], "ward_number": ward["Ward Numbe"] })
    });
    return wards;
}

// Masking For the Map To Only Show The City in Map
export const getMaskedBoundary = (wardDivision) => {
    let allBoundary = [
        [
            [90, -180],
            [90, 180],
            [-90, 180],
            [-90, -180]
        ]
    ]
    wardDivision.map((ward) => {
        let boundary1 = [];
        ward.geometry.map((point) => {
            boundary1.push([point[1], point[0]]);
        });
        allBoundary.push(boundary1);
    });

    return allBoundary;
}

// Function to calculate the appropriate zoom level for a given area and map dimensions
export const calculateZoom = function (areaInSqKm, mapWidth, mapHeight) {
    const earthRadius = 6371; // Earth's radius in kilometers
    // Calculate the aspect ratio of the map viewport
    const aspectRatio = mapWidth / mapHeight;

    // Convert area to an equivalent geographical extent in degrees
    const extentInDegrees = Math.sqrt(areaInSqKm) / earthRadius * (180 / Math.PI);

    // Determine the scale of the map at zoom level 0 (pixels per degree)
    const scale = Math.pow(2, 0) / 360;

    // Adjust extent for aspect ratio
    const extentX = extentInDegrees * aspectRatio;
    const extentY = extentInDegrees / aspectRatio;

    // Calculate the zoom level based on the adjusted size of the extent relative to the map's viewport
    const zoomX = Math.log(mapWidth / (extentX * scale)) / Math.LN2;
    const zoomY = Math.log(mapHeight / (extentY * scale)) / Math.LN2;

    // Use the smaller of the two zoom levels to ensure that the entire area fits within the viewport
    return Math.min(zoomX, zoomY);
}

//function to return city bounds 
export const getCityBoundary = function(wardDivision) {
    const allBoundary = [];
    wardDivision.map((ward) => {
        let boundary1 = [];
        ward.geometry.map((point) => {
            boundary1.push([point[1], point[0]]);
        });
        allBoundary.push(boundary1);
    });
    const polygon = L.polygon(allBoundary);
	const bounds = polygon.getBounds();
    return bounds;
}

