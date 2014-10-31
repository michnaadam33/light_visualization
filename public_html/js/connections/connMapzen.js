
var routeCoor = [];

function askMapzenRoads(p1,p2) {
    return $.ajax({
        url: 'http://vector.mapzen.com/osm/roads/20/'+p1+'/'+p2+'.json',
        type: "GET",
        success: function (data, textStatus, jqXHR)
        {
            
            var features = data['features'];
            
               
            for (var j in features) {
                var coordinate = features[j]['geometry']['coordinates'];
                arryRouts = [];
                for (var i in coordinate) {
                    var elem = coordinate[i];
                    arryRouts.push({lon: (elem[0]) * 1000000 - poslon, alt: 0, lat: (elem[1]) * 1000000 - poslat});
                }
                routeCoor.push(arryRouts);
            }
             console.log(routeCoor);
            
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR);
        }
    }
    );
}