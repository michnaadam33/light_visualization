
var routeCoor = [];
var placesCoor = [];

function askMapzenRoads(p1, p2) {
    return $.ajax({
        url: 'http://vector.mapzen.com/osm/all/20/' + p1 + '/' + p2 + '.json',
        type: "GET",
        success: function (data, textStatus, jqXHR)
        {
            saveRoutes(data['roads']['features']);
            savePlaces(data['buildings']['features']);


        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            $('#container').html("<h1>Error servera mapzen</h1>");
            console.log(jqXHR);
        }
    }
    );
}

function saveRoutes(features) {
    for (var j in features) {
        var coordinate = features[j]['geometry']['coordinates'];
        arryRouts = [];
        for (var i in coordinate) {
            var elem = coordinate[i];
            arryRouts.push({lon: (elem[0]) * 1000000 - poslon, alt: 0, lat: (elem[1]) * 1000000 - poslat});
        }
        routeCoor.push(arryRouts);
    }

}
function savePlaces(features) {
    for (var j in features) {
        var coordinate = features[j]['geometry']['coordinates'];
        arryRouts = [];
        for (var i in coordinate) {
            var elems = coordinate[i];
            for (var k in elems) {
                var elem = elems[k];
                arryRouts.push({lon: (elem[0]) * 1000000 - poslon, alt: 0, lat: (elem[1]) * 1000000 - poslat});
            }
        }
        placesCoor.push(arryRouts);
    }
}
