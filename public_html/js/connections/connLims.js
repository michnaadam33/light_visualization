var lightsCoor = [],
lishtsCoorData = null,
    detectedData = [];


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
    var url = "http://awing.kis.agh.edu.pl:5001/"+elem.cid+"/" +elem.did + "/status";
    return $.ajax({
        url: url,
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            var objLightPoint = {
                lon : elem.coordinates.lon * 1000000 - poslon,
                alt: elem.coordinates.alt,
                lat: elem.coordinates.lat * 1000000 - poslat,
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
function askLimsDetStatus() {
    var url = "http://awing.kis.agh.edu.pl:5001/1/1-30/detected"
    return $.ajax({
        url: url,
        type: "GET",
        success: function (response, textStatus, jqXHR) {
            var data = response.data;
            for(i in data){
                if(data[i].params[0].v !== null){
                    detectedData.push(data[i]);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR);
        }
    });
}

