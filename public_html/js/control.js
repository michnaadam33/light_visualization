$.when(askLimsDetStatus()).done(function () {
    var controlBtnCont = $('#lv-control-btn');
    for(i in detectedData){
        var addBtn = $(
        '<button type="button"'
        + 'data-cid="'
        + detectedData[i].cid
        +'" data-did="'
        + detectedData[i].did
        + '" class="lv-btn-control btn btn-default btn-sm">'
        +'did='
        + detectedData[i].did
        + ' cid='
        + detectedData[i].cid
        +'</button>');
        if(detectedData[i].params[0].v === "true"){
            addBtn.addClass("active");
        }
        controlBtnCont.append(addBtn);
    }

    $('.lv-btn-control').click(function () {
        var did = $(this).data().did;
        var cid = $(this).data().cid;


        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            lvControlSet(did, cid, false);
        } else {
            $(this).addClass("active");
            lvControlSet(did, cid, true);
        }

    })
});

function lvControlSet(did, cid, value) {
    var url = "http://awing.kis.agh.edu.pl:5001";
    var data = '{"data":[{"cid":' + cid + ', "did": ' + did + ', "params":[ { "k":"detected", "v":"' + value + '"}]}]}';
    $.ajax({
        url: url,
        type: "PUT",
        data: data,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            placeLights(scene);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}