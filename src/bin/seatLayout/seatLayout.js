/*!
* Seat Layout Library v0.01
* Copyright (c) 2017 Sachin Kurkute
* MIT License : https://github.com/SachinKurkute/movie-seat-layout/blob/master/LICENSE
*/
(function () {
    function Movieseat(_paramObject) {
        var maxSeat, minSeat;
        var getMainLayoutFunc = function (_obj) {
            maxSeat = _obj.intMaxSeatId;
            minSeat = _obj.intMinSeatId;
            var _html = "<div class='seat-selection' style='width:" + (maxSeat + 1) * 25.5 + "px'>";
            for (var i = 0; i < _obj.objArea.length; i++) {
                _html += getAreaLayoutFunc(_obj.objArea[i]);
            }
            _html += "<div class='movie-screen'>-- Screen --</div><div class='seat-proccess-panel'> <button class='layout-action-btn layout-btn-cancel'> Cancel </button> <button class='layout-action-btn layout-btn-done'> Done </button> </div></div>";
            return _html;
        }
        var getAreaLayoutFunc = function (_obj) {
            var _html = "<div class='seat-area'>";
            _html += "<div class='seat-area-desc'>" + _obj.AreaDesc + "</div>";
            for (var i = 0; i < _obj.objRow.length; i++) {
                _html += getRowLayoutFunc(_obj.objRow[i], _obj);
            }
            _html += "</div>";
            return _html;
        }
        var getRowLayoutFunc = function (_obj, _area) {
            var _html = "<ul class='seat-area-row'> <li class='seat-row-seat row-indicator'>" + _obj.PhyRowId + "</li>";
            var totalSpace = 0;
            for (var i = 0; i < _obj.objSeat.length; i++) {
                if (i == 0) {
                    var startSpace = _obj.objSeat[i].GridSeatNum - minSeat - (_obj.objSeat[i].GridSeatNum - _obj.objSeat[i].seatNumber);
                    if (startSpace > 0) {
                        for (var k = 0; k < startSpace; k++) {
                            _html += getSeatLayoutFunc({}, false, _obj, _area);
                        }
                    }
                }
                var extraSpace = parseInt(_obj.objSeat[i].GridSeatNum - (_obj.objSeat[i].seatNumber + totalSpace));
                if (extraSpace > 0) {
                    totalSpace += extraSpace;
                    for (var j = 0; j < extraSpace; j++) {
                        _html += getSeatLayoutFunc({}, false, _obj, _area);
                    }
                }
                _html += getSeatLayoutFunc(_obj.objSeat[i], true, _obj, _area);
            }
            var endSpace = maxSeat - (_obj.objSeat.length + startSpace + totalSpace)
            if (endSpace > 0) {
                for (var l = 0; l < endSpace; l++) {
                    _html += getSeatLayoutFunc({}, false, _obj, _area);
                }
            }
            _html += "</ul>";
            return _html;
        }
        getSeatLayoutFunc = function (_obj, isSeat, _row, _area) {
            _obj.GridRowId = _row.GridRowId;
            _obj.PhyRowId = _row.PhyRowId;
            _obj.AreaNum = _area.AreaNum;
            _obj.AreaCode = _area.AreaCode;
            _obj.AreaDesc = _area.AreaDesc;
            _obj = _paramObject.callSeatRender(_obj);
            if (_obj) {
                var dataString = JSON.stringify(_obj);
                if (isSeat) {
                    var classes = "";
                    if (_obj && _obj.SeatStatus == "0") {
                        classes += " can-select";
                    }
                    return "<li data-seatdefination='" + dataString + "' class='seat-row-seat seat-yes " + classes + " '><span></span></li>";
                } else {
                    return "<li class='seat-row-seat'></li>";
                }
            }
        }
        return {
            getAreaLayout: getAreaLayoutFunc,
            getRowLayout: getRowLayoutFunc,
            getSeatLayout: getSeatLayoutFunc,
            getMainLayout: getMainLayoutFunc
        }
    }
    $.fn.seatLayout = function (_obj) {
        var _default = {
            type: 'movie',
            toSelect: 1
        };
        var selectedSeats = [];
        var nuberOfSeat = _obj.numberOfSeat;
        var tempSelected = 0;
        var _el = this;
        var _html = "";
        var seatInstance = new Movieseat({
            callSeatRender: function (_seatObj) {
                if (_obj.callOnSeatRender) {
                    return _obj.callOnSeatRender(_seatObj);
                }
                return _seatObj;
            }
        });
        _html = seatInstance.getMainLayout(_obj.data.seatLayout.colAreas);
        _el.html(_html);
        function getObjData(_ele) {
            return _ele.data('seatdefination');
        }
        _el.find('li').click(function (e) {
            if ($(this).hasClass('can-select')) {
                var seatData = getObjData($(this))
                var nextAll = $(this).nextAll().andSelf();
                if (selectedSeats.length == nuberOfSeat) {
                    tempSelected = 0;
                    selectedSeats = [];
                    _el.find('li.current-selected').removeClass('current-selected');
                }
                var count = tempSelected;
                for (var i = 0; i < nuberOfSeat - tempSelected; i++) {
                    if (nextAll[i] && $(nextAll[i]).hasClass('can-select') && !$(nextAll[i]).hasClass('current-selected')) {
                        selectedSeats.push(getObjData($(nextAll[i])));
                        $(nextAll[i]).addClass('current-selected');
                        count++;
                    } else {
                        break;
                    }
                }
                tempSelected = count;
                _el.find('.layout-btn-done').prop('disabled', !(nuberOfSeat == selectedSeats.length));
                var dataToPass = getObjData($(this));
                dataToPass.selected = selectedSeats;
                _obj.callOnSeatSelect(e, dataToPass, this);
            }
        });

        _el.find('.layout-btn-done').prop('disabled', true);
        _el.find('.layout-btn-done').click(function (e) {
            if (_obj.selectionDone) {
                _obj.selectionDone({ "selected": selectedSeats });
            }
        });
        _el.find('.layout-btn-cancel').click(function (e) {
            returnFlag = true;
            if (_obj.cancel) {
                returnFlag = _obj.cancel(e) == false ? false : true;
            }
            if (returnFlag) {
                $(_el).remove();
                seatInstance = null;
                _obj = null;
            }
        });
        return this;
    };
})();
