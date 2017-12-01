$(document).ready(function () {

    function loadGrid() {
        var seatData = $('.inputBox').val(); //
        seatData = JSON.parse(seatData);

        $('.selectMove').seatLayout({
            data: seatData,
            numberOfSeat: 3,
            callOnSeatRender: function (Obj) {
                //modify seat object and return it if require;
                return Obj;
            },
            callOnSeatSelect: function (_event, _data, _element) {
                console.log(_event);
                console.log(_data);
                console.log(_element);
            },
            selectionDone: function (_array) {
                console.log(_array);
            },
            cancel: function () {
                return false;
            }
        });
    }
    loadGrid();

    $('.call-load-function').click(function(){
        loadGrid();
    });
});