var lightsCoor = [],
lishtsCoorData = null;


function askLims() {
    return $.ajax({
        url: "http://awing.kis.agh.edu.pl:5000/info",
        type: "GET",
        success: function (data, textStatus, jqXHR)
        {
            lightsCoorData = data;


        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            $('#container').html("<h1>Error servera lims</h1>");
            console.log(jqXHR);
        }
    });

}

function askLimsDet(elem){
    var url = "http://awing.kis.agh.edu.pl:5001/1/" +elem.did + "/status";
    return $.ajax({
        url: url,
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            var objLightPoint = {
                lon : elem.coordinates.lon*1000000-poslon,
                alt: elem.coordinates.alt,
                lat: elem.coordinates.lat*1000000-poslat,
                params: data.data[0].params[0].v
            }
            window.lightsCoor.push(objLightPoint);

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR);
        }
    });
}

