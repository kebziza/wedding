//Смена ширины экрана
$(window).resize(function(){

  resizeVideo();

});

var $btn;
var $modal;
var $form;

//Готовность документа
$(document).ready(function(){

  resizeVideo();

  //Инициализация эмоджи
  $('.js-emoji-included').Emoji({
    path:  '/vendor/jqueryemoji/img/apple40/',
    class: 'emoji',
    ext:   'png',
  });

  /////////
  //Гость//
  /////////

    //Подтверждение
    $('#guest').on('click', '.btn-modal', function(e){
      $btn = $(this);
      $modal = $('#modal-guest-' + $btn.data('mode'));

      $modal.modal('show');
    });

    //Отправка формы
    $('.modal .btn-send').on('click', function(e){
      e.preventDefault();
      $btn = $(this);
      $form = $btn.closest('form');
      $sectionGuest = $('#guest .section-body');
      $modalChange = $('#modal-guest-change');

      doPost($form.attr('action'), $form.serialize(), function(response){
        if(response.btn_wrapper != undefined){
          $sectionGuest.find('.btn-wrapper').replaceWith(response.btn_wrapper.html);
        }
        if(response.accept_note != undefined){
          $sectionGuest.find('.accept-note').replaceWith(response.accept_note.html);
        }
        if(response.tablenum != undefined){
          $sectionGuest.find('.accept-note').after(response.tablenum.html);
        }

        if(response.mode == 'accept'){
          $modalChange.find('select[name="guest[count]"]').val(response.item.count);
          $modalChange.find('textarea[name="guest[comment]"]').val(response.item.comment);
          $modalChange.find('input[name="guest[email]"]').val(response.item.email);
        }

        $modal.modal('hide');
      });
    });

  ////////////
  // . Гость//
  ////////////


  //Опросник
  $('#pool .btn-send').on('click', function(e){
    e.preventDefault();

    $btn = $(this);
    $form = $btn.closest('form');

    doPost($form.attr('action'), $form.serialize(), function(response){

    });

    // //Блокировка кнопки
    // $btn.attr('disabled', true).text($btn.data('btn-loading'));

    // //Делаем запрос
    // $.ajax({
    //   type: "POST",
    //   dataType: "JSON",
    //   url: "/main/acceptpool",
    //   data: $form.serialize(),
    //   error: function(){
    //     $btn.text($btn.data('btn-error'));
    //   },
    //   success: function(response){
    //     //Успех
    //     if( response && response.status ){
    //       $btn.text($btn.data('btn-thanks'));
    //       setTimeout(function(){
    //         $btn.attr('disabled', false).text($btn.data('btn-title'));
    //       }, 5000);
    //     }
    //     //Ошибка
    //     else if( response && !response.status ) {
    //       $btn.text(response.reason);
    //       setTimeout(function(){
    //         $btn.attr('disabled', false).text($btn.data('btn-title'));
    //       }, 5000);
    //     }
    //     //Ошибка
    //     else {
    //       $btn.text($btn.data('btn-error'));
    //     }
    //   }
    // });

  });

  //Навигация
  $('.nav li a').on('click', function(event){
    event.preventDefault();
    var $btn = $(this);
    var section_id = $btn.attr('href');
    var delta = 40;
    var to = $(section_id).offset().top + delta;
    var rollback = (to - delta) < 0 ? 0 : to - delta;
    $('body, html').animate({scrollTop: to}, 300).animate({scrollTop: rollback}, 600);
  });

  //Наверх
  $('#totop .arrow').on('click', function(event){
    $('body, html').animate({scrollTop: 0}, 500);
  });

  //Настройки тостера
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "100",
    "hideDuration": "1000",
    "timeOut": "10000",
    "extendedTimeOut": "500",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
  }

  //Вызов оповещения для молодоженов
  if (location.pathname.indexOf('preview') != -1) {
    toastr.info($('#preview-alarm').val());
  };

});

//Размер видео-роликов
function resizeVideo(){
  if($('.greeting').length){
    var total_width = $('.greeting').width();
    var video_width = 0;
    var video_height = 0;
    if($('.greeting iframe').length){
      if(total_width <= 1200){
        video_width = total_width;
        video_height = Math.floor(video_width * (360/640));
        if(video_width > 640){
          video_width = 640;
          video_height = 360;
        }
        $('.greeting iframe').attr('width', video_width);
        $('.greeting iframe').attr('height', video_height);
      }
    }
  }
}

//Отправка POST-запроса
function doPost(url, data, callback){
  doRequest('POST', url, data, callback);
}

//Отправка GET-запроса
function doGet(url, data, callback){
  doRequest('GET', url, data, callback);
}

//Отправка запроса
function doRequest(method, url, data, callback) {
  $.ajax({
    type: method,
    dataType: 'JSON',
    url: url,
    data: data,
    beforeSend: function(){
      $btn.attr('disabled', true);
    },
    error: function(){
      showError();
    },
    success: function(response){
      if(response && response.status){
        toastr.info(response.reason);

        if(callback != null)
          callback(response);
      } else if(response && !response.status) {
        showError( response.reason != undefined ? response.reason : false );
      }
    },
    complete: function(){
      $btn.attr('disabled', false);
    },
  });
}

//Показать ошибку
function showError(error) {
  if(error != null)
    toastr.error(error);
  else
    toastr.error('Возника ошибка, попробуйте позже');
}