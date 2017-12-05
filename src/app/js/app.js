$(document).ready(function () {

    function loadGrid() {
        var seatData = $('.inputBox').val();
        var nuberOfSeat = $('.nuberOfSeat').val();
        seatData = JSON.parse(seatData);

        $('.selectMove').seatLayout({
            data: seatData,
            showActionButtons:true,
            classes : {
                doneBtn : '',
                cancelBtn : '',
                row:'',
                area:'',
                screen:'',
                seat:''
            },
            numberOfSeat: nuberOfSeat,
            callOnSeatRender: function (Obj) {
                //modify seat object if require and return it;
                return Obj;
            },
            callOnSeatSelect: function (_event, _data, _selected, _element) {
                console.log(_event);
                console.log(_data);
                console.log(_selected);
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
