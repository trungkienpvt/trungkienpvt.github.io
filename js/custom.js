var customModule = (function () {
    var module = {};


    module.users = {
        'init': function () {


        },
        
        'google_map': {

            addMarker: function (lat, lng, info, draggable) {
                var pt = new google.maps.LatLng(lat, lng);
                bounds.extend(pt);
                var marker = new google.maps.Marker({
                    draggable: draggable,
                    animation: google.maps.Animation.DROP,
                    position: pt,
                    icon: icon,
                    map: map
                });
                var popup = new google.maps.InfoWindow({
                    content: info,
                    maxWidth: 300
                });
                if (currentPopup != null) {
                    currentPopup.close();
                    currentPopup = null;
                }
                popup.open(map, marker);
                currentPopup = popup;
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }

                google.maps.event.addListener(marker, "dragend", function () {

                    var lat = marker.getPosition().lat();
                    var lng = marker.getPosition().lng();

                    var url = 'http://maps.google.com/maps/api/geocode/json?latlng=' + lat + ',' + lng;
                    $.ajax({
                        method: "GET",
                        url: url,
                        data: {},
                        success: function (data) {
                            // var result = JSON.parse(data);



                            var lat = marker.getPosition().lat();
                            var lng = marker.getPosition().lng();
                            var info = data.results[0].formatted_address;
                            var user_id = $('#user_id').val();
                            var url = window.base_url + '/front.php/users/change_location'
                            bootbox.confirm({
                                message: "Do you want to change your address?",
                                buttons: {
                                    confirm: {
                                        label: 'Yes',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },
                                callback: function (result) {
                                    if(result){
                                        $.ajax({
                                            method: "POST",
                                            url: url,
                                            data: {map_lat: lat, map_lng: lng, map_info: info, user_id: user_id},
                                            success: function (data) {
                                                bootbox.alert("Update address successfull");

                                            }

                                        });

                                    }

                                }
                            });

                            if (currentPopup != null) {
                                currentPopup.close();
                                // currentPopup = null;
                                var popup = new google.maps.InfoWindow({
                                    content: data.results[0].formatted_address,
                                    maxWidth: 300
                                });
                                currentPopup = popup;

                            }
                            currentPopup.open(map, marker);
                        }

                    });

                });
                google.maps.event.addListener(popup, "closeclick", function () {
                    map.panTo(center);
                    // currentPopup = null;
                });

            },
            initMap: function (draggable) {

                map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(0, 0),
                    // zoom: -10,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                    },
                    navigationControl: true,
                    navigationControlOptions: {
                        style: google.maps.NavigationControlStyle.ZOOM_PAN
                    }
                });

                var map_lat = '10.896983';
                var map_lng = '106.688629';
                var map_info = 'Bui Cong Trung, 12 District, Ho Chi Minh city, Vietnam';
                
				module.users.google_map.addMarker(map_lat, map_lng, map_info, draggable);
                


                //
                center = bounds.getCenter();
                map.fitBounds(bounds);
                var listener = google.maps.event.addListener(map, "idle", function () {
                    if (map.getZoom() > 16) map.setZoom(16);
                    google.maps.event.removeListener(listener);
                });

                // $('#map2').empty().html($('#map').html());
                // $('#map').remove();

            }


        }
        

    }

    module.init = function () {

        module.users.init();
    };
    return module;
})();

jQuery(function ($) {
    customModule.init();
    

});
