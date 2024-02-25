import L from "leaflet"

// Function to chack waether Marker lie inside the Boundary or not
export const isMarkerInsidePolygon = function (marker, poly) {
    var x = marker[1], y = marker[0];
    var polygonFormed = L.polygon(poly[0][0]);
    var marker = L.marker([y,x])
    let isContains = polygonFormed.contains(marker.getLatLng());
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
    let colRep = avg < 50 ? 'red' : avg < 75 && avg >= 50 ? 'blue' : 'green';
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
    if (wardValue === "any") {
        wardDivision.features.map((ward) => {
            let boundary = [];
            ward.geometry.coordinates[0][0].map((point) => {
                boundary.push([point[1], point[0]]);
            });
            selectedWardBoundary.push(boundary);
        });
    } else {
        wardDivision.features.map((ward) => {
            if (wardValue === ward.properties["Ward Numbe"]) {
                let boundary = [];
                ward.geometry.coordinates[0][0].map((point) => {
                    boundary.push([point[1], point[0]]);
                });
                selectedWardBoundary.push(boundary);
            }
        });
    }
    return selectedWardBoundary;
}

// Getting The wards With Their Name
export const getWardsWithName = (wardDivision) => {
    let wards = [];

    wardDivision.features.map((ward) => {
        wards.push({ "ward_name": ward.properties["Ward Name"], "ward_number": ward.properties["Ward Numbe"] })
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
    wardDivision.features.map((ward) => {
        let boundary1 = [];
        ward.geometry.coordinates[0][0].map((point) => {
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