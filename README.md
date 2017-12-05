# seatLayout.js (movie-seat-layout)

Print seat layout for movie, flight and seat selection (jQuery plugin)

Demo : https://sachinkurkute.github.io/movie-seat-layout/src/index.html

### Prerequisites
seatLayout.js is jQuery plugin, you need jQuery already installed OR added referense on your page

### Installing

Download code from git https://github.com/SachinKurkute/movie-seat-layout

Add seatlayout.js reference below the jQuery plugin.

```
  <script src="app/lib/jquery.js"></script>
  <script src="bin/seatLayout/seatLayout.min.js"></script>
```

Your installation is done !

## Run and Initialize

Add html element
```
<div class="movieLayoutContainer"></div>
```

### Initialize

```

$('.movieLayoutContainer').seatLayout({
      data: {...},    // Movie seat data 
      showActionButtons:true,
      classes : {     // Add class or classes for the component
          doneBtn : '',
          cancelBtn : '',
          row:'',
          area:'',
          screen:'',
          seat:''
      },
      numberOfSeat: 3  // Nuber of seat want to select
})
```

#### data :
  `data`  (object) This is JavaScript object. It's help to print the seat layout of movie please find the [JOSN file](https://sachinkurkute.github.io/movie-seat-layout/src/app/data/layoutData.json), which is help to understand the structure.

#### numberOfSeat
  `numberOfSeat` (number) Number of seats allow to select
  
#### showActionButtons
  `showActionButtons` (bool) Default is `true`, hide the action button i.e Done and Cancel.
  
#### classes
  `classes` (object) set the component wise classes
  
  ```
  {
        doneBtn : '', // classes for Done button
        cancelBtn : '', // classes for Cancel button
        row:'',   // classes for each row
        area:'', // Classes for each area
        screen:'',  // Classes for screen 
        seat:'' // Classes for each seat
  }
  ```


### Functions

```

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
        
  ```


#### callOnSeatRender
  `callOnSeatRender` (function) called every seat rendering this seat object

```
    callOnSeatRender: function (Obj) {   // Obj (param )is seat object
        //modify seat object if require and return it;
        return Obj;
    }
```

#### callOnSeatSelect

`callOnSeatSelect` (function) Called after selected the seat

```
    callOnSeatSelect: function (_event, _data, _element) {
        console.log(_event);  // Event
        console.log(_data);  // Data of selected seat with total selected seat property
        console.log(_element); // Selected element i.e. $(this)
    }
    
```

#### selectionDone

  `selectionDone` (function) Called after clicked `Done` button with param Array of selected seat

```
selectionDone: function (_array) {
    console.log(_array);   // Selected seat array
},
```

#### cancel

  `cancel` (function) Called after clicked `Cancel` button with param Array of selected seat

```
cancel: function () {
    return false;   // In case preventing the cancel action return false, Otherwise it will null the current object
},

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

