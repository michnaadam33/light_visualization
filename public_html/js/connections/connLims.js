var lightsCoor = [];


function askLims() {
    return $.ajax({
        url: "http://awing.kis.agh.edu.pl:5000/info",
        type: "GET",
        success: function (data, textStatus, jqXHR)
        {


            for (var i in data) {
               var elem = data[i];
               if(elem.type == "l"){
                    
                    lightsCoor.push({lon : elem.coordinates.lon*1000000-poslon, alt: elem.coordinates.alt, lat: elem.coordinates.lat*1000000-poslat});
               }
            }
            

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR);
        }
    });

}
