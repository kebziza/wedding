//////////////////////////
//Показ карты в событиях//
//////////////////////////

  var mapProgram = null;
  var mapProgramEvent = null;
  var mapProgramCenter = {
    coords: '37.62209300,55.75399400',
    center: [37.62209300,55.75399400],
    lat: 55.75399400,
    lng: 37.62209300,
  };
  var mapProgramBallonContent = null;
  var $mapProgramModal = $('#program-map');
  var $mapProgramSelect = $mapProgramModal.find('#program-map-event-id');

  function showMapProgram(){

    console.log('showMapProgram');

    mapProgram = new GMaps({
      el: '#program-map-wrapper',
      lat: mapProgramEvent != null ? mapProgramEvent.lat : mapProgramCenter.lat,
      lng: mapProgramEvent != null ? mapProgramEvent.lng : mapProgramCenter.lng,
      scrollwheel: false,
      zoom: 16,
      zoomControl: true,
      panControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      overviewMapControl: false,
      clickable: true,
    });

    if(mapProgramEvent != null){

      renderMarker();

    } else {

      var bounds = [];

      $mapProgramSelect.find('option').each(function(idx, item){
        var $option = $(item);

        if($option.val()){
          mapProgramEvent = getMapProgramEvent($option);

          renderMarker();

          bounds.push(new google.maps.LatLng(mapProgramEvent.lat, mapProgramEvent.lng));
        }
      });

      mapProgram.fitLatLngBounds(bounds);

    }

  }

  function renderMarker() {
    mapProgramBallonContent = getBallonContent(mapProgramEvent);

    mapProgram.addMarker({
      lat: mapProgramEvent.lat,
      lng: mapProgramEvent.lng,
      infoWindow: { content: mapProgramBallonContent }
    });
  }

  function getBallonContent(mapProgramEvent) {
    var content = '\
      <p style="font-size: 14px; margin: 0; padding: 0; line-height: 1.5; color: #363838; font-weight: bold;">' + mapProgramEvent.name + '</p>\
      <p style="font-size: 12px; margin: 0; padding: 0; line-height: 1.5; color: #84898c; font-weight: bold;">' + mapProgramEvent.dateWhen + ' / ' + mapProgramEvent.timeWhen + '</p>\
      <p style="font-size: 12px; margin: 0; padding: 0; line-height: 1.5; color: #84898c; margin-bottom: 8px;">' + mapProgramEvent.addr + '</p>\
      <p style="font-size: 12px; margin: 0; padding: 0; line-height: 1.5; color: #363838;">' + mapProgramEvent.desc + '</p>\
    ';

    return content;
  }

  function onMapProgramSelectChange(e) {
    var $option = $mapProgramSelect.find('option:selected');

    if($option.val())
      mapProgramEvent = getMapProgramEvent($option);
    else
      resetMapProgramEvent();

    showMapProgram();
  }

  function resetMapProgramEvent() {
    console.log('resetMapProgramEvent')
    mapProgramEvent = null;
  }

  function getMapProgramEvent($relatedTarget) {
    mapProgramEvent = {
      addr: $relatedTarget.data('addr'),
      coords: $relatedTarget.data('coords'),
      dateWhen: $relatedTarget.data('dateWhen'),
      id: $relatedTarget.data('id'),
      name: $relatedTarget.data('name'),
      desc: $relatedTarget.data('desc'),
      timeWhen: $relatedTarget.data('timeWhen'),
    };

    if(mapProgramEvent.coords){
      mapProgramEvent.center = mapProgramEvent.coords.split(',');
      mapProgramEvent.lat = mapProgramEvent.center[1];
      mapProgramEvent.lng = mapProgramEvent.center[0];
    } else {
      mapProgramEvent.center = mapProgramCenter.center;
      mapProgramEvent.lat = mapProgramCenter.lat;
      mapProgramEvent.lng = mapProgramCenter.lng;
    }

    return mapProgramEvent;
  }

  //Открытие карты
  $('#program-map').on('show.bs.modal', function(e){
    // console.log('show mapProgram');
    $btn = $(e.relatedTarget);
    $mapProgramSelect.val($btn.data('id'));
    mapProgramEvent = getMapProgramEvent($btn);
  });

  //Окно открылось
  $('#program-map').on('shown.bs.modal', function(e){
    // console.log('shown mapProgram');
    showMapProgram();
  });

  //Закрытие карты
  $('#program-map').on('hidden.bs.modal', function(e){
    // console.log('hidden mapProgram');
  });

  //Выбоа адреса в списке
  $mapProgramSelect.on('change', onMapProgramSelectChange);

//////////////////////////////////////
//Показ карты в событиях - окончание//
//////////////////////////////////////