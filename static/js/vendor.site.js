(function($) {
   var o = $( {} );

    $.each({
        trigger:    'publish',
        on:         'subscribe',
        off:        'unsubscribe'
    }, function( key, val ) {
        jQuery[val] = function() {
            o[key].apply( o, arguments );
        };
    });

})( jQuery );
var C= {};
C.loanForm = $('#loanCalculator');
var H = {};

/*
 * Returns and int with commas for currency
 */
H.numberWithCommas = function(x) {
    // Beautiful seperator explanation
    // http://stackoverflow.com/questions/2901102/how-to-print-number-with-commas-as-thousands-separators-in-javascript
    x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return x;
};

/*
 * Used to change the inventory to Grid view
 */
H.onSortGridClick = function(){
    $.cookie('grid', 'grid');
    $('.vehicles-box-list').animate({opacity:0},function(){
        // Toggle button change
        $('#sortList').removeClass('vehicles-list-active');
        $('#sortGrid').addClass('vehicles-grid-active');
        // Removes the active state from the other button
        $('.vehicles-box-list').attr('class', 'vehicles-box');
        $('.vehicles-box').stop().animate({opacity:1});
    });
};


/*
 * Used to change the inventory to List view
 */
H.onSortListClick = function(){
    $.cookie('grid', 'list');
    $('.vehicles-box').animate({opacity:0},function(){
        // Toggle button change
        $('.vehicles-grid').removeClass('vehicles-grid-active');
        $('.vehicles-list').addClass('vehicles-list-active');
        // Removes the active state from the other button
        $('.vehicles-box').attr('class', 'vehicles-box-list');
        $('.vehicles-box-list').stop().animate({opacity:1});
    });
};

/*
 * On page load toggles the inventory between list and grid view
 */
H.onSortInit = function() {
    if( $.cookie('grid') === 'list' )
    {
        H.onSortListClick();
        $('.vehicles-box-list').stop().animate({opacity:1});
    } else {
        H.onSortGridClick();
        $('.vehicles-box').stop().animate({opacity:1});
    }
};

/*
 * Returns True or False an elemtn exists in the document.
 */
H.element = function(thing) {
    if($(thing).length){
        return true;
    } else {
        return false;
    }
};

/*
 * Returns True or False if a variable or object has a value.
 */
H.isSet = function(value) {
    if (typeof value === 'undefined') return false;
    return true;
};

/*
 * Returns True or False if an element is visible.
 */
H.isVisible = function(element) {
    return $(element).is(':visible');
};

/*
 * Scrolls to an ID On the page.
 */
H.scrollTo = function(target){
    $('html, body').animate({
        scrollTop: $("#"+target).offset().top
    }, 500);
}

H.showTarget = function (element) {    
    $(element).css('display', 'block');
};


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
H.getRandomArbitrary = function(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
H.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var calculator = {

    saveFormPaymentCookies: function() {

        var goauto_downpayment_id = $("#cash_down").val();
        var goauto_rate_id = $("#loan_rate").val();
        var goauto_term_id = $("#loan_term").val();
        var goauto_payment_frequency_id = $("#loan_frequency").val();
        var goauto_tax_amt_id = $("#tax_amt").val();

        if (goauto_downpayment_id !== "") {
            $.cookie('goauto_downpayment', goauto_downpayment_id, {expires: 7, path: '/'});
        }
        if (goauto_rate_id !== "") {
            $.cookie('goauto_rate', goauto_rate_id, {expires: 7, path: '/'});
        }
        if (goauto_term_id !== "") {
            $.cookie('goauto_term', goauto_term_id, {expires: 7, path: '/'});
        }
        if (goauto_payment_frequency_id !== "") {
            $.cookie('goauto_payment_frequency', goauto_payment_frequency_id, {expires: 7, path: '/'});
        }
        if (goauto_tax_amt_id !== "") {
            $.cookie('goauto_tax_amt', goauto_tax_amt_id, {expires: 7, path: '/'});
        }
    },

    processPayment: function() {
        var origamt = Number($("#loan_amount").val()); //vehicle price if using input box commented out
        var amt = Number($("#loan_amount").val()); //vehicle price if using input box commented out
        var cash = Number($("#cash_down").val()); //downpayment
        var tax = 1 + (Number($("#tax_amt").val()) / 100); //tax coefficient
        var r = Number($("#loan_rate").val()) / 100; //anual interest rate
        var m = Number($("#loan_term").val()); //loan term in months
        var f = Number($("#loan_frequency").val()); //frequency

        amt = origamt * tax - cash; //prinicpal owing after tax and downpayment
        var c = 12; //compounding periods per year
        var p = f; //payments made per year, bi-weekly is just straight 26
        var n = p * (m / 12); //total number of payments to be made
        var i = Math.pow(1 + (r / c), (c / p)) - 1; //periodic interest rate
        var a = amt * (i + (i / (Math.pow(1 + i, n) - 1))); //periodic payment amount
        a = Math.round(a);

        var finala = H.numberWithCommas(a);

        if (cash > origamt) {
            finala = 0
        }

        $('body').trigger('calculator.click');

        finale = "$" + finala;
        $("#loan_payment").html("$" + finala); // fills in box
        return finale;
    },

    init: function(event) {
        event.preventDefault();

        calculator.processPayment(event);
        //calculator.saveFormPaymentCookies();
    }
}
var GoogleMapsConstants = {
    latitude:       $("#google-maps").data('latitude'),
    longitude:      $("#google-maps").data('longitude'),
    zoom:           $("#google-maps").data('zoom'),
    address:        $("#google-maps").data('address'),
    storeName:      $("#google-maps").data('storename'),
    website:        $("#google-maps").data('website'),
    icon:           $("#google-maps").data('icon'),
    mapStyles:      [{"featureType": "water","elementType": "geometry.fill","stylers": [{"color": "#d3d3d3"}]},{"featureType": "transit","stylers": [{"color": "#808080"},{"visibility": "off"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"color": "#b3b3b3"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#ffffff"}]},{"featureType": "road.local","elementType": "geometry.fill","stylers": [{"visibility": "on"},{"color": "#ffffff"},{"weight": 1.8}]},{"featureType": "road.local","elementType": "geometry.stroke","stylers": [{"color": "#d7d7d7"}]},{"featureType": "poi","elementType": "geometry.fill","stylers": [{"visibility": "on"},{"color": "#ebebeb"}]},{"featureType": "administrative","elementType": "geometry","stylers": [{"color": "#a7a7a7"}]},{"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#ffffff"}]},{"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#ffffff"}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"visibility": "on"},{"color": "#efefef"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#696969"}]},{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"color": "#737373"}]},{"featureType": "poi","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "road.arterial","elementType": "geometry.stroke","stylers": [{"color": "#d6d6d6"}]},{"featureType": "road","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{},{"featureType": "poi","elementType": "geometry.fill","stylers": [{"color": "#dadada"}]}]
}

var GoogleMaps = {

    init: function() {
        var infowindow;

        google.maps.Map.prototype.markers = new Array();

        google.maps.Map.prototype.addMarker = function (marker) {
            this.markers[this.markers.length] = marker;
        };

        google.maps.Map.prototype.getMarkers = function () {
            return this.markers
        };

        google.maps.Map.prototype.clearMarkers = function () {
            if (infowindow) {
                infowindow.close();
            }

            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].set_map(null);
            }
        };

        //google.maps.event.addDomListener(document.body, 'hash.location', initMap);
        initMap();

        var map;

        function initMap() {

            var locations = [
                [GoogleMapsConstants.storeName, GoogleMapsConstants.address, 'undefined', 'undefined', 'http://' + GoogleMapsConstants.website, GoogleMapsConstants.latitude, GoogleMapsConstants.longitude]
            ]

            if (typeof externalSettings === 'undefined') {
                // Uses single maps
            } else {
                // Undefined uses external settings
                GoogleMapsConstants.mapStyles = externalSettings.mapStyles;
                locations = externalSettings.locations;
            }

            var mapOptions = {
                center: new google.maps.LatLng(GoogleMapsConstants.latitude, GoogleMapsConstants.longitude),
                zoom: GoogleMapsConstants.zoom,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                disableDoubleClickZoom: true,
                mapTypeControl: false,
                scaleControl: false,
                scrollwheel: true,
                panControl: false,
                streetViewControl: false,
                draggable: true,
                overviewMapControl: false,
                overviewMapControlOptions: {
                    opened: false
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: GoogleMapsConstants.mapStyles
            }
            var mapElement = document.getElementById('google-maps');
            var map = new google.maps.Map(mapElement, mapOptions);

            function createMarker(title, desc, telephone, email, web, latlng) {
                var marker = new google.maps.Marker({position: latlng, map: map, icon: GoogleMapsConstants.icon,});
                if (web.substring(0, 7) != "http://") {
                    link = "http://" + web;
                } else {
                    link = web;
                }

                google.maps.event.addListener(marker, "click", function () {
                    if (infowindow) infowindow.close();
                    var html = "<div style='color:#000;background-color:#fff;padding:5px;width:230px;'>" +
                        "<h4>" + title + "</h4>" +
                        "<p>" + desc + "<p>" +
                        "<p>" + telephone + "<p>" +
                        "<a href='" + link + "'' target='_blank' >" + web + "<a>" +
                        "</div>";
                    infowindow = new google.maps.InfoWindow({content: html});
                    infowindow.open(map, marker);
                });
                return marker;
            }

            for (var i = 0; i < locations.length; i++) {

                if (locations[i][0] == 'undefined') {
                    title = '';
                } else {
                    title = locations[i][0];
                }
                if (locations[i][1] == 'undefined') {
                    description = '';
                } else {
                    description = locations[i][1];
                }
                if (locations[i][2] == 'undefined') {
                    telephone = '';
                } else {
                    telephone = locations[i][2];
                }
                if (locations[i][3] == 'undefined') {
                    email = '';
                } else {
                    email = locations[i][3];
                }
                if (locations[i][4] == 'undefined') {
                    web = '';
                } else {
                    web = locations[i][4];
                }

                var latlng = new google.maps.LatLng(locations[i][5], locations[i][6]);
                map.addMarker(createMarker(title, description, telephone, email, web, latlng));
            }

        }
    }
}
var FormValidation = {};

FormValidation.init = function() {
    FormValidation.serviceBooking();
    FormValidation.creditApplication();
    FormValidation.orderPartsAccessories();
    FormValidation.bookTestDrive();
    FormValidation.inventoryTestDrive();
}

FormValidation.serviceBooking = function() {
    $('#serviceBookAppointment').isHappy({
        fields: {
            '#id_firstname': {
                required: true,
                message: 'Please provide your first name.'
            },
            '#id_phonenumber': {
                required: true,
                message: 'Please enter a valid phone number.',
                test: happy.USPhone
            },
            '#id_email': {
                required: true,
                message: 'An email address is required.',
                test: happy.email // this can be *any* function that returns true or false
            },
            '#id_make_other': {
                required: true,
                message: 'Please provide your vehicles make.'
            },
            '#id_model_other': {
                required: true,
                message: 'Please provide your vehicles model.'
            },
            '#id_year_other': {
                required: true,
                message: 'Please provide your vehicles year.'
            },
            '#id_preferred_date_month': {
                required: true,
                message: 'Please select a date that works best for you.'
            }
        },
        unHappy: function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    });
}

FormValidation.creditApplication = function() {
    $('#creditApplicationForm').isHappy({
        fields: {
            '#id_firstname': {
                required: true,
                message: 'Please provide your first name.'
            },
            '#id_phonenumber': {
                required: true,
                message: 'Please enter a valid phone number.',
                test: happy.USPhone
            },
            '#id_email': {
                required: true,
                message: 'An email address is required.',
                test: happy.email // this can be *any* function that returns true or false
            },
            '#id_address': {
                required: true,
                message: 'Please provide an address'
            },
            '#id_city': {
                required: true,
                message: 'Please provide your city'
            },
            '#id_province': {
                required: true,
                message: 'Please provide your province'
            },
            '#id_postal_code': {
                required: true,
                message: 'Please provide a postal code'
            }
        },
        unHappy: function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    });
}

FormValidation.orderPartsAccessories = function () {
    $('#orderPartsAccessories').isHappy({
        fields: {
            '#id_firstname': {
                required: true,
                message: 'Please provide your first name.'
            },
            '#id_phonenumber': {
                required: true,
                message: 'Please enter a valid phone number.',
                test: happy.USPhone
            },
            '#id_email': {
                required: true,
                message: 'An email address is required.',
                test: happy.email // this can be *any* function that returns true or false
            },
            '#id_make_other': {
                required: true,
                message: 'Please your vehicle make'
            },
            '#id_model_other': {
                required: true,
                message: 'Please your vehicle model'
            },
            '#id_year_other': {
                required: true,
                message: 'Please the year of your vehicle'
            }
        },
        unHappy: function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    });
}

FormValidation.bookTestDrive = function () {
    $('#bookTestDrive').isHappy({
        fields: {
            '#id_firstname': {
                required: true,
                message: 'Please provide your first name.'
            },
            '#id_phonenumber': {
                required: true,
                message: 'Please enter a valid phone number.',
                test: happy.USPhone
            },
            '#id_email': {
                required: true,
                message: 'An email address is required.',
                test: happy.email // this can be *any* function that returns true or false
            },
            '#id_preferred_date_month': {
                required: true,
                message: 'Please select a date that works best for you.'
            }
        },
        unHappy: function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    });
}

FormValidation.inventoryTestDrive = function() {
    $('#inventoryTestDrive').isHappy({
        fields: {
            '#id_firstname': {
                required: true,
                message: 'Please provide your first name.'
            },
            '#id_phonenumber': {
                required: true,
                message: 'Please enter a valid phone number.',
                test: happy.USPhone
            },
            '#id_email': {
                required: true,
                message: 'An email address is required.',
                test: happy.email // this can be *any* function that returns true or false
            },
            '#id_preferred_date_month': {
                required: true,
                message: 'Please select a date that works best for you.'
            }
        },
        unHappy: function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    });
}

FormValidation.tradeInYourCar = function(event) {
    event.preventDefault();
    $('#trade_form').isHappy({
        fields: {
            '#trade_first_name': {
                required: true,
                message: 'Please provide your first name.'
            },
            '#trade_phone': {
                required: true,
                message: 'Please enter a valid phone number.',
                test: happy.USPhone
            },
            '#trade_email': {
                required: true,
                message: 'An email address is required.',
                test: happy.email // this can be *any* function that returns true or false
            }
        },
        unHappy: function() {
            $('#contact').animate({ scrollTop: 0 }, 'fast');
        }
    });
}

var Whybuy = {};

Whybuy.init = function () {
    var loadedImages = 0, // Counter for loaded images
        handler = $('#blocks li'); // Get a reference to your grid items.

    // Prepare layout options.
    var options = {
        autoResize: true, // This will auto-update the layout when the browser window is resized.
        container: $('.blocks'), // Optional, used for some extra CSS styling
        offset: 30, // Optional, the distance between grid items
        outerOffset: 0, // Optional, the distance to the containers border
        itemWidth: 315 // Optional, the width of a grid item
    };

    $('#tiles').imagesLoaded(function() {
        // Call the layout function.
        handler.wookmark(options);

    }).progress(function(instance, image) {
        // Update progress bar after each image load
        loadedImages++;
        if (loadedImages == handler.length)
            $('.progress-bar').hide();
        else
            $('.progress-bar').width((loadedImages / handler.length * 100) + '%');
    });
};
/*jshunt unused:true */

var makesModelsAll = {},
    makesModelsNew = {},
    makesModelsUsed = {},
    bodyStylesAll = {},
    bodyStylesNew = {},
    bodyStylesUsed = {},
    updatedVehicleOutput = {},
    currentMakesModels = {},
    redirectURL;

var GoAutoQuickSearch = {

    // Initialize the Quick Search
    init: function() {
        // Load makes select box and prepares internal representation of makes to
        // models.
        if($('input[name="dealer_city__in"]')){
            var dealer_city__in = $('input[name="dealer_city__in"]').val();
            $.ajax({
                type: "POST",
                url: "/inventory/quicksearch/load-makes-models/",
                data: { 'dealer_city__in': dealer_city__in },
                success: GoAutoQuickSearch.loadMakesModelsSuccess,
                dataType: 'json'
            });

            // Load and store new vehicles separately.
            $.ajax({
                type: "POST",
                url: "/inventory/quicksearch/load-makes-models/",
                data: { 'stock_type': 'NEW', 'dealer_city__in': dealer_city__in },
                success: GoAutoQuickSearch.storeNewMakesModels,
                dataType: 'json'
            });

            // Load and store used vehicles separately.
            $.ajax({
                type: "POST",
                url: "/inventory/quicksearch/load-makes-models/",
                data: { 'stock_type': 'NEW', 'dealer_city__in': dealer_city__in },
                success: GoAutoQuickSearch.storeUsedMakesModels,
                dataType: 'json'
            });
        } else {
            $.ajax({
                type: "POST",
                url: "/inventory/quicksearch/load-makes-models/",
                success: GoAutoQuickSearch.loadMakesModelsSuccess,
                dataType: 'json'
            });

            // Load and store new vehicles separately.
            $.ajax({
                type: "POST",
                url: "/inventory/quicksearch/load-makes-models/",
                data: { 'stock_type': 'NEW' },
                success: GoAutoQuickSearch.storeNewMakesModels,
                dataType: 'json'
            });

            // Load and store used vehicles separately.
            $.ajax({
                type: "POST",
                url: "/inventory/quicksearch/load-makes-models/",
                data: { 'stock_type': 'USED' },
                success: GoAutoQuickSearch.storeUsedMakesModels,
                dataType: 'json'
            });
        }
    
        this.bindEvents();
    },
    bindEvents: function(event) {
        $("#make_name").change(function() {
            GoAutoQuickSearch.makeChanged($(this).val());
        });

        $("select[name=stock_type]").change(function() {
            GoAutoQuickSearch.stockTypeChanged($(this).val());
        });
        $("select[name=body_type_name]").change(function() {
            GoAutoQuickSearch.bodyStyleChanged($(this).val());
        });
      
        $("#quicksearch_form").submit(function (event) {
            redirectUrl = '/inventory/search?';

            // Cycle through each input and select element and build URL
            // dynamically. This allows a designer to build a form based on any
            // filter.
            filters = '';
            $.each($("#quicksearch_form input, #quicksearch_form select"), function() {
                if ($(this).is(':radio') || $(this).is(':checkbox')) {
                    if ($(this).is(':checked')) {
                        filters = filters + $(this).attr('name') + "=" + $(this).val() + "&";
                    }
                } else {
                    if ($(this).val() !== '') {
                        filters = filters + $(this).attr('name') + "="+$(this).val() + "&";
                    }
                }
            });

            redirectUrl = redirectUrl + filters;
            window.location.href = redirectUrl;

            return false;
        });
    },
    /*
     * Called after a successful AJAX call to 
     * /inventory/quicksearch/load-makes-models/ when the quick search first
     * loads. As a result it expects the returned jsonified data obtained from the
     * the helpers.get_makes_models function to include all 
     * stock types and should consist of models and counts keyed off by make names. 
     * Example data set:
     *
     * {
     *  AM General: [["HUMMER", "2"]],
     *  Audi: [["A3", "1"],[["A4", "5"],["R8","4"], ...],
     *  ...
     * }
     *
     * Using this data, it creates the Makes select box of the quick search. It will
     * automatically calculate the total number of models for a make using the
     * model counts from the provided makesModelsData data set.
     */
    loadMakesModelsSuccess: function(makesModelsData, textStatus, jqXHR) {
        GoAutoQuickSearch.changeBodyStyleOptions(makesModelsData.body_styles);
        GoAutoQuickSearch.changeMakesOptions(makesModelsData.makes_models);
        makesModelsAll = makesModelsData.makes_models;
        bodyStylesAll = makesModelsData.body_styles;
        currentMakesModels = makesModelsAll;
    },
    /*
     * Called after a successful AJAX call to 
     * /inventory/quicksearch/load-makes-models/?stock_type=NEW. As a result it 
     * expects the returned jsonified data obtained from the
     * the helpers.get_makes_models function to include only NEW 
     * stock types and should consist of models and counts keyed off by make names. 
     * Example data set:
     *
     * {
     *  AM General: [["HUMMER", "2"]],
     *  Audi: [["A3", "1"],[["A4", "5"],["R8","4"], ...],
     *  ...
     * }
     *
     * It stores it for use if someone changes the stock type radio button.
     */
    storeNewMakesModels: function (makesModelsData, textStatus, jqXHR) {
        makesModelsNew = makesModelsData.makes_models;
        bodyStylesNew = makesModelsData.body_styles;
    },
    /*
     * Called after a successful AJAX call to 
     * /inventory/quicksearch/load-makes-models/?stock_type=USED. As a result it 
     * expects the returned jsonified data obtained from the
     * the helpers.get_makes_models function to include only USED 
     * stock types and should consist of models and counts keyed off by make names. 
     * Example data set:
     *
     * {
     *  AM General: [["HUMMER", "2"]],
     *  Audi: [["A3", "1"],[["A4", "5"],["R8","4"], ...],
     *  ...
     * }
     *
     * It stores it for use if someone changes the stock type radio button.
     */
    storeUsedMakesModels: function (makesModelsData, textStatus, jqXHR) {
        makesModelsUsed = makesModelsData.makes_models;
        bodyStylesUsed = makesModelsData.body_styles;
    },
    bodyStyleOutput: function (makesModelsData, textStatus, jqXHR) {
        var makesSelect = document.getElementById('make_name');
        makesSelect.disabled = false;
        newMakesModels = makesModelsData.makes_models;
        GoAutoQuickSearch.changeMakesOptions(newMakesModels);
        GoAutoQuickSearch.makeChanged(null);
    },   
    /*
     * Called whenever a user chooses a new make from the quicksearch makes select
     * box. It looks to a it's internal variable representing the makes to model
     * relations and change the models select box accordingly. If there are none
     * (implying they have not chosen a make), the models select box is disabled.
     */
    makeChanged: function (make) {
        // change the models
        var newModels = currentMakesModels[make],
            modelsSelect = document.getElementById('model_name');
            bodyStyleSelected = $('#body_type_name').val();
        modelsSelect.options.length = 1; // clear out existing data (except default)
        if (newModels) {
            if(bodyStyleSelected){

                for (var i = 0; i < newModels.length; i++) {
                    // Array now includes counts.
                    var model = newModels[i][0],
                        model_count = newModels[i][1],
                        body_type = newModels[i][2];
                        
                    if(bodyStyleSelected == body_type){
                        modelsSelect.options.add(new Option(model + " (" + model_count + ")", model));
                    }
                }

            }else{

                for (var i = 0; i < newModels.length; i++) {
                    // Array now includes counts.
                    var model = newModels[i][0],
                        model_count = newModels[i][1],
                        body_type = newModels[i][2];

                        modelsSelect.options.add(new Option(model + " (" + model_count + ")", model));
                }
            }
        }

        // disable if no models (will typically only happen if there is no make
        // chosen)
        if (modelsSelect.options.length <= 1) {
            modelsSelect.disabled = true;
        }
        else {
            modelsSelect.disabled = false;
        }
    },
    /*
     * Called whenever a stock type radio box is clicked. It checks what was chosen
     * (should be "NEW" or "USED"), sets the internal variable representing the
     * currently chosen list of makes/models/counts, changes the makes select
     * box accordingly, and then disables the models select box.
     */
    stockTypeChanged: function(stockType) {

        var newMakesModels,
            makesSelect = document.getElementById('make_name');
            bodySelect = document.getElementById('body_type_name');

        if (stockType.toLowerCase() === "new") {
            newMakesModels = makesModelsNew;
            newBodyStyles = bodyStylesNew;
        }
        else if (stockType.toLowerCase() === "used") {
            newMakesModels = makesModelsUsed;
            newBodyStyles = bodyStylesUsed;
        }
        else if (stockType.toLowerCase() === "") {
            newMakesModels = makesModelsAll;
            newBodyStyles = bodyStylesAll;
        }

        makesSelect.options.length = 1;
        bodySelect.options.length = 1;
        GoAutoQuickSearch.changeMakesOptions(newMakesModels);
        GoAutoQuickSearch.changeBodyStyleOptions(newBodyStyles);

        currentMakesModels = newMakesModels;
        GoAutoQuickSearch.makeChanged(null);
    },
    bodyStyleChanged: function() {

        var newMakesModels,
            makesSelect = document.getElementById('make_name');
            getStockType = $('#stock_type').val(),
            getStockBodyStyle = $('#body_type_name').val();

        makesSelect.options.length = 1;
        GoAutoQuickSearch.refreshMakeModel(getStockType, getStockBodyStyle);
    },
    /*
     * This helper refreshes the Make & Model if a Body type is selected
     */
    refreshMakeModel: function (stock_type, body_type) {
        // Load and store new vehicles separately.
        var makesSelect = document.getElementById('make_name');
        if (makesSelect.options.length <= 1) {
            makesSelect.disabled = true;
        }
        else {
            makesSelect.disabled = false;
        }
        makesSelect.options.length = 1;
        if($('input[name="dealer_city__in"]')){
            var dealer_city__in = $('input[name="dealer_city__in"]').val();
            $.ajax({
                type: "POST",
                url: "/inventory/quicksearch/load-makes-models/",
                data: { 'stock_type': stock_type, 'body_type_name': body_type, 'dealer_city__in': dealer_city__in },
                success: GoAutoQuickSearch.bodyStyleOutput,
                dataType: 'json'
            });
        } else {
            $.ajax({
                type: "POST",
                url: "/inventory/quicksearch/load-makes-models/",
                data: { 'stock_type': stock_type, 'body_type_name': body_type, 'dealer_city__in': dealer_city__in },
                success: GoAutoQuickSearch.bodyStyleOutput,
                dataType: 'json'
            });
        }
    },
    /*
     * This is a helper function used whenever someone changes the stock type on 
     * the quick search. It takes a new list of makes/models/counts data and
     * changes the currently displayed makes select box to represent it
     * accordingly.
     */
    changeMakesOptions: function(makes) {
        var makesSelect = document.getElementById('make_name');
        for (var make in makes) {
            var total_models = 0;
            for (var i = 0; i < makes[make].length; i++) {
                total_models += parseInt(makes[make][i][1]);
            }
            makesSelect.options.add(new Option(make + " (" + total_models + ")", make));
        }
    },
    changeBodyStyleOptions: function(body_styles) {
        var bodySelect = document.getElementById('body_type_name');
        for (var style in body_styles) {
            if(style != 'null') {
                var total_styles = 0;
                for (var i = 0; i < body_styles[style].length; i++) {
                    total_styles += parseInt(body_styles[style][i]);
                }
                bodySelect.options.add(new Option(style + " (" + total_styles + ")", style));
            }
        }
    }
}
var GoAutoBlackBook = {
    init: function(event){
        this.loadData('years');
        this.bindEvents();
    },
    initSlider: function(){
        $("#kmslider").slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 300000,
            step: 10000,
            change: function(event, ui) {
                $("#txtKilometers").val(ui.value=='0'?1:ui.value);
                var kmwithcommas = H.numberWithCommas(ui.value);
                $("#kmDisplay").html(kmwithcommas+" KM");
                GoAutoBlackBook.loadData('price');
            }
        });
        $("#txtKilometers").val(10);
        $("#kmDisplay").html("10 KM");
    },
    bindEvents: function() {
            // Year Change
            $("#lstYears").change(function() {
                GoAutoBlackBook.yearChange($(this).val());
            });

            $("#lstMakes").change(function() {
                GoAutoBlackBook.makeChange($(this).val());
            });

            $("#lstModels").change(function() {
                GoAutoBlackBook.modelChange($(this).val());
            });

            $("#lstTrims").change(function() {
                GoAutoBlackBook.trimChange($(this).val());
            });

            $("#lstStyles").change(function() {
                GoAutoBlackBook.styleChange($(this).val());
            });

        $('#btnSubmit').click(function(event) {
            event.preventDefault();
            GoAutoBlackBook.submitForm();
        });
    },
    loadData: function(action) {
        GoAutoBlackBook.showLoading();
        var methods = {
            'years' : function (){
                $.getJSON("/blackbook_api/years/", function(data) {
                    GoAutoBlackBook.hideLoading();
                    opts="<option>-- Select Year --</option>";
                    for (var i=0; i<data.length; i++) {
                        opts+="<option>"+data[i]+"</option>";
                    }
                    $("#lstYears").html(opts);
                    $("#lstYears").prop("disabled", false);
                 
                });
            },
            'makes' : function (){
                $.getJSON("/blackbook_api/makes/?year="+$("#lstYears").val(), function(data) {
                    GoAutoBlackBook.hideLoading();
                    opts="<option>-- Select Make --</option>";
                    for (var i=0; i<data.length; i++) {
                        opts+="<option>"+data[i]+"</option>";
                    }
                    $("#lstMakes").html(opts);
                    $("#lstMakes").removeAttr("disabled");
                });
            },
            'models' : function (){
                $.getJSON("/blackbook_api/models/?year="+$("#lstYears").val()+"&make="+$("#lstMakes").val(), function(data) {
                    GoAutoBlackBook.hideLoading();
                    opts="<option>-- Select Model --</option>";
                    for (var i=0; i<data.length; i++) {
                        opts+="<option>"+data[i]+"</option>";
                    }
                    
                    $("#lstModels").html(opts);
                    $("#lstModels").removeAttr("disabled");
                });
            },
            'trims' : function (){
                var url="/blackbook_api/trims/";
                    url+="?year="+$("#lstYears").val(),
                    url+="&make="+$("#lstMakes").val(),
                    url+="&model="+$("#lstModels").val();

                $.getJSON(url, function(data) {
                    GoAutoBlackBook.hideLoading();
                    opts="<option value=''>-- Select Trim --</option>";

                    if (data.length>0) {
                        for (var i=0; i<data.length; i++) {
                            opts+="<option>"+data[i]+"</option>";
                        }
                        $("#lstTrims").html(opts);
                        $("#lstTrims").removeAttr("disabled");                    
                    } else {
                        alert("This option is not available right now. Please either choose a different model above or call us to get your trade in value.");
                        $("#lstTrims").html(opts);
                        $("#lstTrims").change();
                    }
                });
            },
            'styles' : function (){
                var url="/blackbook_api/styles/";
                    url+="?year="+$("#lstYears").val(),
                    url+="&make="+$("#lstMakes").val(),
                    url+="&model="+$("#lstModels").val(),   
                    url+="&trim="+$("#lstTrims").val();

                $.getJSON(url, function(data) {
                    GoAutoBlackBook.hideLoading();
                    opts="<option>-- Select Style --</option>";
                    for (var i=0; i<data.length; i++) {
                        opts+="<option>"+data[i]+"</option>";
                    }
                    
                    $("#lstStyles").html(opts);
                    $("#lstStyles").removeAttr("disabled");
                });
            },
            'options' : function (){
                var url="/blackbook_api/vehicle/";
                    url+="?year="+$("#lstYears").val(),
                    url+="&make="+$("#lstMakes").val(),
                    url+="&model="+$("#lstModels").val(),
                    url+="&trim="+$("#lstTrims").val(),
                    url+="&style="+$("#lstStyles").val();

                $.getJSON(url, function(data) {
                    GoAutoBlackBook.hideLoading();
                    opts="";
                    var vehicle=data.response.vehicles.vehicle;
                    if (typeof vehicle.options != "undefined" && vehicle.options.text =="undefined") {
                        for (var i=0; i<vehicle.options.option.length; i++) {
                            opts+="<input type='checkbox' name='selectedOptions' value='"+vehicle.options.option[i].optionCode+"' class='checkbox' data-text='"+vehicle.options.option[i].description.text+"'>";
                            opts+=" "+vehicle.options.option[i].description.text+"<br>";
                        }
                        $("#options_row").slideDown();
                    }
                    $("#extra_options").html(opts);
                     $("#btnSubmit").removeAttr('disabled');

                });
            },
            'price' : function() {
                var url="/blackbook_api/price/",
                    selectedOptions = "";
                    url+="?year="+$("#lstYears").val(),
                    url+="&make="+$("#lstMakes").val(),
                    url+="&model="+$("#lstModels").val(),
                    url+="&trim="+$("#lstTrims").val(),
                    url+="&style="+$("#lstStyles").val(),
                    url+="&kilometers="+$("#txtKilometers").val(),
                        
                    //$("input:checked").each(function () {
                    //    var value = $(this).val();
                    //    selectedOptions=selectedOptions+"&selectedOptions="+value
                    //});

                    //url+=selectedOptions;

                    $.getJSON(url, function(data) {
                        GoAutoBlackBook.hideLoading();
                        opts="";
                        var vehicle=data.response.vehicles.vehicle;                
                        $("#estimateLow").val(String(vehicle.values.tradeInLow.text));
                        $("#estimateHigh").val(String(vehicle.values.tradeInHigh.text));
                    });
            }
        }
        return methods[action]();
    },
    yearChange: function(year) {
        if(year !== ""){
            GoAutoBlackBook.loadData('makes');
            $("#make_row").slideDown();
        }
        else{
            $("#make_row").slideUp();
            $("#model_row").slideUp();
            $("#trim_row").slideUp();
            $("#style_row").slideUp();
            $("#kilometers_row").slideUp();
            $("#options_row").slideUp();
            $("#personal").slideUp();
        }
    },
    makeChange: function(make) {
        if(make !== ""){
            GoAutoBlackBook.loadData('models');
            $("#model_row").slideDown();
        }
        else{
            $("#model_row").slideUp();
            $("#trim_row").slideUp();
            $("#style_row").slideUp();
            $("#kilometers_row").slideUp();
            $("#options_row").slideUp();
            $("#personal").slideUp();
        }
    },
    modelChange: function(model){
        if(model !== ""){
            GoAutoBlackBook.loadData('trims');
            $("#trim_row").slideDown();
        }
        else{
            $("#trim_row").slideUp();
            $("#style_row").slideUp();
            $("#kilometers_row").slideUp();
            $("#options_row").slideUp();
            $("#personal").slideUp();
        }
    },
    trimChange: function(trim){
        if(trim !== ""){ /*Wierd - check for blank, not select -- */
            GoAutoBlackBook.loadData('styles');
            $("#style_row").slideDown();
        }
        else{
            $("#style_row").slideUp();
            $("#kilometers_row").slideUp();
            $("#options_row").slideUp();
            $("#personal").slideUp();
        }
    },
    styleChange: function(style){
        if(style !== "-- Select Style --"){
            GoAutoBlackBook.loadData('options');
            $("#kilometers_row").slideDown();
            $("#personal").slideDown();
            GoAutoBlackBook.initSlider();
        }
        else{
            $("#kilometers_row").slideUp();
            $("#options_row").slideUp();
            $("#personal").slideUp();
        }
    },
    submitForm: function() {
        var year = $("#lstYears").val(),
            make = $("#lstMakes").val(),
            model = $("#lstModels").val(),
            trim = $("#lstTrims").val(),
            style = $("#lstStyles").val(),
            kilometers = $("#txtKilometers").val(),
            next = $('#trade_next').val(),
            selectedOptions = ""
            selectedTradeOptions = "",
            dealerId = $("#id_dealer_id").val(),
            estimateLow = $("#estimateLow").val(),
            estimateHigh = $("#estimateHigh").val();

        //$("input:checked").each(function () {
        //    var value = $(this).val();
        //    selectedOptions=selectedOptions+"&selectedOptions="+value;
        //    selectedTradeOptions=selectedTradeOptions+$(this).attr('data-text')+', ';
        //});

        //$("input[name=tradein_options]").val(selectedTradeOptions);

        $.post("/leads/strathcom/", $("#trade_form").serialize()).done(function(data) {
            window.location.href = $('#trade_next').val()+"?year="+year+"&make="+make+"&model="+model+"&trim="+trim+"&style="+style+"&kilometers="+kilometers+"&tradein_options="+selectedTradeOptions+"&tradein_estimate_low="+estimateLow+"&tradein_estimate_high="+estimateHigh+"&d_id="+dealerId;
        });
    },
    showLoading: function() {
        $('#loading_row').show();
    },
    hideLoading: function() {
        $('#loading_row').hide();
    }
}