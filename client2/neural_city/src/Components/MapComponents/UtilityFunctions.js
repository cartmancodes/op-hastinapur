export const isMarkerInsidePolygon = function(marker, poly){    
    let polyPoints = poly[0][0];
    var x = marker[1], y = marker[0];
    console.log("Marker =" + marker);
    var inside = false;
    console.log(polyPoints);
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        var xi = polyPoints[i][1], yi = polyPoints[i][0];
        var xj = polyPoints[j][1], yj = polyPoints[j][0];
        console.log(xi + " " + xj);

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        console.log(intersect);
        if (intersect) inside = true;
    }

    return inside;
};