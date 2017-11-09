(function(){
    function Movieseat(){
        var maxSeat,minSeat;
        var getMainLayoutFunc = function(_obj){
            maxSeat = _obj.intMaxSeatId;
            minSeat = _obj.intMinSeatId;
            var _html = "<div class='seat-selection'>";
            for(var i=0; i < _obj.objArea.length; i++){
                _html += getAreaLayoutFunc(_obj.objArea[i]);
            }
            _html += "</div>";
            return _html;
        }
        var getAreaLayoutFunc = function(_obj){
            var _html = "<div class='seat-area'>";
            _html += "<div class='seat-area-desc'>"+ _obj.AreaDesc + "</div>";
            for(var i=0; i < _obj.objRow.length; i++){
                _html += getRowLayoutFunc(_obj.objRow[i]);
            }
            _html+= "</div>";
            return _html;
        }
        var getRowLayoutFunc = function(_obj){
            var _html = "<ul class='seat-area-row'>";
            var totalSpace = 0;
            for(var i= 0; i < _obj.objSeat.length; i++){
                if(i== 0){
                    var startSpace = _obj.objSeat[i].GridSeatNum - minSeat - (_obj.objSeat[i].GridSeatNum - _obj.objSeat[i].seatNumber);
                    console.log(startSpace);
                    if(startSpace > 0){
                        for(var k = 0; k < startSpace; k++){
                            _html += getSeatLayoutFunc({},false);
                        }
                    }
                }
                var extraSpace = parseInt(_obj.objSeat[i].GridSeatNum - (_obj.objSeat[i].seatNumber + totalSpace));
                if(extraSpace > 0){
                    totalSpace += extraSpace;
                    for(var j = 0; j < extraSpace; j++){
                        _html += getSeatLayoutFunc({},false);
                    }
                }
                _html += getSeatLayoutFunc(_obj.objSeat[i],true);
            }
            var endSpace =  maxSeat - (_obj.objSeat.length + startSpace + totalSpace)
            if(endSpace > 0 ){
                for(var l = 0; l < endSpace; l++){
                    _html += getSeatLayoutFunc({},false);
                }
            }
            _html+= "</ul>";
            return _html;
        }
        getSeatLayoutFunc = function(_obj,isSeat){
            if(isSeat){
                var classes = "";
                if(_obj && _obj.SeatStatus == "0"){
                    classes += " can-select";
                }
                return "<li class='seat-row-seat seat-yes "+classes+" '><span></span></li>";
            }else{
                return "<li class='seat-row-seat'></li>";
            }
        }
        return{
            getAreaLayout : getAreaLayoutFunc,
            getRowLayout : getRowLayoutFunc,
            getSeatLayout : getSeatLayoutFunc,
            getMainLayout : getMainLayoutFunc
        }
    }
    $.fn.seatLayout = function(_obj) {
        var _default = {
            type:'movie',
            toSelect : 1
        };
        var _el = this;
        var _html = "";
        var seatInstance = new Movieseat();
        _html = seatInstance.getMainLayout(_obj.data.seatLayout.colAreas);
        _el.html(_html);
        _el.find('li').click(_obj.callOnSeatSelect);
        return this;
    }; 

})();
