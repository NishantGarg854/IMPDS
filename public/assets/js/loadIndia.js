$(function(){
    //var JsonData = [{"id":"S37","RATIONCARD":[{"name":"ladakh 123","date":"1-1-2022","value":"1.05","amount":"125.20"},{"name":"ladakh 1","date":"1-1-2022","value":"1.05","amount":"125.20"},{"name":"ladakh 1","date":"1-1-2022","value":"1.05","amount":"125.20"}],"FPSSHOP":[{"name":"ladakh 1","date":"1-1-2022","value":"1.05","amount":"125.20"},{"name":"ladakh 1","date":"1-1-2022","value":"1.05","amount":"125.20"},{"name":"ladakh 1","date":"1-1-2022","value":"1.05","amount":"125.20"}],"SALE":[{"name":"ladakh 1","date":"1-1-2022","value":"1.05","amount":"125.20"},{"name":"ladakh 1","date":"1-1-2022","value":"1.05","amount":"125.20"},{"name":"ladakh 1","date":"1-1-2022","value":"1.05","amount":"125.20"}]},{"id":"S38","FPS":[{"name":"Delhi 1","date":"1-1-2022","value":"1.05","amount":"125.20"}]}];
    //const JsonData= require('dummy.json');

    var JsonData = "";

    // fetch("assets/js/pages/dummy.json")
    // .then(response => {
    // return response.json();
    // })
    // .then(jsondata => JsonData = jsondata);

    //console.log("Full JSON :", JsonData);
    var detailType = 'summary';
    var selectedState = '00';
    var selectedDistrict = '00';
    $('.district-live-map').hide();
    $('.live-map').load('assets/map/india.svg', function () {
        $('.live-map').prop("style","width:100%;");
        $('.live-map svg path').dblclick(function (e) {
            e.stopPropagation();
            console.log("Selected: ",e);
            if (detailType === 'summary') {
                $('.live-map').hide();
                let allData = JSON.parse(window.localStorage.getItem("allData"));
                let selectedData = [];
                // console.log("All States : ",statesData);
                selectedState = $(this).attr('id').substring(1);
                selectedDistrict = $(this).attr('id');
                var selectedStateName = $('g[sid=' + selectedDistrict+']').text().trim();
                for(var i=0; i<allData.length; i++){
                    if(allData[i].state_name == selectedStateName){
                        selectedData.push(allData[i]);
                    }
                }
                console.log("Selected Data :", selectedData);
                console.log("Selected Id :", selectedState);
                for(var i=0; i<JsonData.length; i++){
                    if("S"+selectedState == JsonData[i].id){
                        console.log("Selected RATIONCARD Data :", JsonData[i].RATIONCARD);
                        console.log("Selected FPSSHOP Data :", JsonData[i].FPSSHOP);
                        console.log("Selected SALE Data :", JsonData[i].SALE);
                        var tr = "";
                        var tr_1 = "";
                        var tr_2 = "";
                        for(var x=0; x<JsonData[i].SALE.length; x++){
                            tr += '<tr><td style="width: 50px;"><div class="font-size-22 text-success"></div></td><td><div><h5 class="font-size-14 mb-1">'+JsonData[i].SALE[x].name+'</h5><p class="text-muted mb-0 font-size-12">'+JsonData[i].SALE[x].date+'</p></div></td><td><div class="text-end"><h5 class="font-size-14 mb-0">'+JsonData[i].SALE[x].value+'</h5><p class="text-muted mb-0 font-size-12">Value</p></div></td><td><div class="text-end"><h5 class="font-size-14 text-muted mb-0">'+JsonData[i].SALE[x].amount+'</h5><p class="text-muted mb-0 font-size-12">Amount</p></div></td></tr>';
                        }
                        $("#transactions-sell-tab tbody").html(tr);
                        for(var x=0; x<JsonData[i].FPSSHOP.length; x++){
                            tr_1 += '<tr><td style="width: 50px;"><div class="font-size-22 text-success"></div></td><td><div><h5 class="font-size-14 mb-1">'+JsonData[i].FPSSHOP[x].name+'</h5><p class="text-muted mb-0 font-size-12">'+JsonData[i].FPSSHOP[x].date+'</p></div></td><td><div class="text-end"><h5 class="font-size-14 mb-0">'+JsonData[i].FPSSHOP[x].value+'</h5><p class="text-muted mb-0 font-size-12">Value</p></div></td><td><div class="text-end"><h5 class="font-size-14 text-muted mb-0">'+JsonData[i].FPSSHOP[x].amount+'</h5><p class="text-muted mb-0 font-size-12">Amount</p></div></td></tr>';
                        }
                        $("#transactions-buy-tab tbody").html(tr_1);
                        for(var x=0; x<JsonData[i].RATIONCARD.length; x++){
                            tr_2 += '<tr><td style="width: 50px;"><div class="font-size-22 text-success"></div></td><td><div><h5 class="font-size-14 mb-1">'+JsonData[i].RATIONCARD[x].name+'</h5><p class="text-muted mb-0 font-size-12">'+JsonData[i].RATIONCARD[x].date+'</p></div></td><td><div class="text-end"><h5 class="font-size-14 mb-0">'+JsonData[i].RATIONCARD[x].value+'</h5><p class="text-muted mb-0 font-size-12">Value</p></div></td><td><div class="text-end"><h5 class="font-size-14 text-muted mb-0">'+JsonData[i].RATIONCARD[x].amount+'</h5><p class="text-muted mb-0 font-size-12">Amount</p></div></td></tr>';
                        }
                        $("#transactions-all-tab tbody").html(tr_2);
                    }
                }
                //alert(selectedState);
                $('.district-live-map').show();
                $('.district-map').load('assets/map/DS' + selectedState + '.svg', function () {
                    $('.district-live-map').prop("style","width:100%;display:block;");
                    $('.district-map').prop("style","width:100%;");
                    var colorClass = 'S' + selectedState;
                    $('.district-map > svg path')
                        .each(function () {
                            $(this).attr('class', colorClass);
                        })
                        .click(function () {
                            selectedDistrict = $(this).attr('id');
                            alert($('#N' + selectedDistrict).text());
                        });
                });					
            }
        });
    });
    $("body").delegate(".map-link","click",function(e){
        e.stopPropagation();
        $('.district-live-map').hide();
        $('.live-map').show();
        $('.district-map').empty();
    });
});