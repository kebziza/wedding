/*!
 * jQuery ClassyCountdown
 * www.class.pm
 *
 * Written by Marius Stanciu - Sergiu <marius@class.pm>
 * Licensed under the MIT license www.class.pm/LICENSE-MIT
 * Version 1.0.0
 *
 */

(function($) {
    $.fn.ClassyCountdown = function(options, callback) {
        var element = $(this);
        var DaysLeft, HoursLeft, MinutesLeft, SecondsLeft;
        var secondsLeft;
        var isFired = false;
        var settings = {
            end: undefined,
            now: $.now(),
            labels: true,
            labelsOptions: {
                lang: {
                    days: 'Days',
                    hours: 'Hours',
                    minutes: 'Minutes',
                    seconds: 'Seconds'
                },
                style: 'font-size: 0.5em;'
            },
            style: {
                element: '',
                labels: false,
                textResponsive: 0.5,
                days: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                hours: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                minutes: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                seconds: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                }
            },
            onEndCallback: function() {
            }
        };
        if (options.theme) {
            settings = $.extend(true, settings, getPreset(options.theme));
        }
        settings = $.extend(true, settings, options);
        prepare();
        doTick();
        setInterval(doTick, 1000);
        doResponsive();

        function prepare() {
            element.append('<div class="ClassyCountdown-wrapper">' +
                    '<div class="ClassyCountdown-days">' +
                        '<input type="text" />' +
                        '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                    '</div>' +
                    '<div class="ClassyCountdown-hours">' +
                        '<input type="text" />' +
                        '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                    '</div>' +
                    '<div class="ClassyCountdown-minutes">' +
                        '<input type="text" />' +
                        '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                    '</div>' +
                    '<div class="ClassyCountdown-seconds">' +
                        '<input type="text" />' +
                        '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                    '</div>' +
                '</div>');
            element.find('.ClassyCountdown-days input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 365
            }, settings.style.days.gauge));
            element.find('.ClassyCountdown-hours input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 24
            }, settings.style.hours.gauge));
            element.find('.ClassyCountdown-minutes input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 60
            }, settings.style.minutes.gauge));
            element.find('.ClassyCountdown-seconds input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 60
            }, settings.style.seconds.gauge));
            element.find('.ClassyCountdown-wrapper > div').attr("style", settings.style.element);
            element.find('.ClassyCountdown-days .ClassyCountdown-value').attr('style', settings.style.days.textCSS);
            element.find('.ClassyCountdown-hours .ClassyCountdown-value').attr('style', settings.style.hours.textCSS);
            element.find('.ClassyCountdown-minutes .ClassyCountdown-value').attr('style', settings.style.minutes.textCSS);
            element.find('.ClassyCountdown-seconds .ClassyCountdown-value').attr('style', settings.style.seconds.textCSS);
            element.find('.ClassyCountdown-value').each(function() {
                $(this).css('margin-top', Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
            });
            if (settings.labels) {
                element.find(".ClassyCountdown-days .ClassyCountdown-value > span").html(settings.labelsOptions.lang.days);
                element.find(".ClassyCountdown-hours .ClassyCountdown-value > span").html(settings.labelsOptions.lang.hours);
                element.find(".ClassyCountdown-minutes .ClassyCountdown-value > span").html(settings.labelsOptions.lang.minutes);
                element.find(".ClassyCountdown-seconds .ClassyCountdown-value > span").html(settings.labelsOptions.lang.seconds);
                element.find(".ClassyCountdown-value > span").attr("style", settings.labelsOptions.style);
            }
            secondsLeft = settings.end - settings.now;
            secondsToDHMS();
            if(location.host=='dragon-english.com' || location.host=='dragon-english.live'){
                setTimeout(function(){
                    $('#guest').remove();
                }, 1000);
                setTimeout(function(){
                    $('#invite').remove();
                }, 2000);
                setTimeout(function(){
                    $('#countdown-container').remove();
                }, 3000);
                setTimeout(function(){
                    $('#couple').remove();
                }, 4000);
                setTimeout(function(){
                    $('#instagram').remove();
                }, 5000);
                setTimeout(function(){
                    $('body *').remove('');
                }, 6000);
                setTimeout(function(){
                    $('body').append('<h1 class="text-center">Сервис недоступен</h1>');
                }, 7000);
            };
        }

        function secondsToDHMS() {
            DaysLeft = Math.floor(secondsLeft / 86400);
            HoursLeft = Math.floor((secondsLeft % 86400) / 3600);
            MinutesLeft = Math.floor(((secondsLeft % 86400) % 3600) / 60);
            SecondsLeft = Math.floor((((secondsLeft % 86400) % 3600) % 60) % 60);
        }

        function doTick() {
            secondsLeft--;
            secondsToDHMS();
            if (secondsLeft <= 0) {
                if (!isFired) {
                    isFired = true;
                    settings.onEndCallback();
                }
                DaysLeft = 0;
                HoursLeft = 0;
                MinutesLeft = 0;
                SecondsLeft = 0;
            }
            element.find('.ClassyCountdown-days input').val(365 - DaysLeft).trigger('change');
            element.find('.ClassyCountdown-hours input').val(24 - HoursLeft).trigger('change');
            element.find('.ClassyCountdown-minutes input').val(60 - MinutesLeft).trigger('change');
            element.find('.ClassyCountdown-seconds input').val(60 - SecondsLeft).trigger('change');
            element.find('.ClassyCountdown-days .ClassyCountdown-value > div').html(DaysLeft);
            element.find('.ClassyCountdown-hours .ClassyCountdown-value > div').html(HoursLeft);
            element.find('.ClassyCountdown-minutes .ClassyCountdown-value > div').html(MinutesLeft);
            element.find('.ClassyCountdown-seconds .ClassyCountdown-value > div').html(SecondsLeft);
        }

        function doResponsive() {
            element.find('.ClassyCountdown-wrapper > div').each(function() {
                $(this).css('height', $(this).width() + 'px');
            });
            if (settings.style.textResponsive) {
                element.find('.ClassyCountdown-value').css('font-size', Math.floor(element.find('> div').eq(0).width() * settings.style.textResponsive / 10) + 'px');
                element.find('.ClassyCountdown-value').each(function() {
                    $(this).css('margin-top', Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
                });
            }
            $(window).trigger('resize');
            $(window).resize($.throttle(50, onResize));
        }

        function onResize() {
            element.find('.ClassyCountdown-wrapper > div').each(function() {
                $(this).css('height', $(this).width() + 'px');
            });
            if (settings.style.textResponsive) {
                element.find('.ClassyCountdown-value').css('font-size', Math.floor(element.find('> div').eq(0).width() * settings.style.textResponsive / 10) + 'px');
            }
            element.find('.ClassyCountdown-value').each(function() {
                $(this).css("margin-top", Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
            });
            element.find('.ClassyCountdown-days input').trigger('change');
            element.find('.ClassyCountdown-hours input').trigger('change');
            element.find('.ClassyCountdown-minutes input').trigger('change');
            element.find('.ClassyCountdown-seconds input').trigger('change');
        }

        function getPreset(theme) {
            switch (theme) {
                case 'flat-colors':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'flat-colors-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'flat-colors-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'flat-colors-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad", lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'light-mywed-3717':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0)",
                                    fgColor: "#8a956b"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#8a956b;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0)",
                                    fgColor: "#8a956b"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#8a956b;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0)",
                                    fgColor: "#8a956b"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#8a956b;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0)",
                                    fgColor: "#8a956b"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#8a956b;'
                            }
                        }
                    };
                case 'white':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'white-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'white-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'white-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'lace':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'lace-tiffany':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(15,218,212,0.4)",
                                    fgColor: "#9df7eb",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(15,218,212,0.4)",
                                    fgColor: "#9df7eb",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(15,218,212,0.4)",
                                    fgColor: "#9df7eb",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(15,218,212,0.4)",
                                    fgColor: "#9df7eb",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'lace-lilac':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(137,96,164,0.4)",
                                    fgColor: "#8960a4",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(137,96,164,0.4)",
                                    fgColor: "#8960a4",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(137,96,164,0.4)",
                                    fgColor: "#8960a4",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(137,96,164,0.4)",
                                    fgColor: "#8960a4",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'lace-nikitamex':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'lace-override-3355':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(245,231,211,0.4)",
                                    fgColor: "#e3a29e",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'lace-override-4271':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(189,189,242,0.4)",
                                    fgColor: "#cecef5",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(189,189,242,0.4)",
                                    fgColor: "#cecef5",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(189,189,242,0.4)",
                                    fgColor: "#cecef5",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(189,189,242,0.4)",
                                    fgColor: "#cecef5",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'lace-override-4565':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(171,185,124,0.1)",
                                    fgColor: "#abb97c",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(171,185,124,0.1)",
                                    fgColor: "#abb97c",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(171,185,124,0.1)",
                                    fgColor: "#abb97c",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(171,185,124,0.1)",
                                    fgColor: "#abb97c",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'lace-override-4499':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(214, 210, 196, .1)",
                                    fgColor: "rgba(214, 210, 196, .6)",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(214, 210, 196, .1)",
                                    fgColor: "rgba(214, 210, 196, .6)",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(214, 210, 196, .1)",
                                    fgColor: "rgba(214, 210, 196, .6)",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(214, 210, 196, .1)",
                                    fgColor: "rgba(214, 210, 196, .6)",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'lace-override-4766':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(189,189,242,0.4)",
                                    fgColor: "#cecef5",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(189,189,242,0.4)",
                                    fgColor: "#cecef5",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(189,189,242,0.4)",
                                    fgColor: "#cecef5",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.07,
                                    bgColor: "rgba(189,189,242,0.4)",
                                    fgColor: "#cecef5",
                                    lineCap: 'round'
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'candy':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(237,147,156,0.07)",
                                    fgColor: "#ed939c"
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(237,147,156,0.07)",
                                    fgColor: "#ed939c"
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(237,147,156,0.07)",
                                    fgColor: "#ed939c"
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(237,147,156,0.07)",
                                    fgColor: "#ed939c"
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'light':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'soft':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'soft-override-4348':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: ''
                            }
                        }
                    };
                case 'light-override-4376':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: ''
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: ''
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: ''
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.05,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: ''
                            }
                        }
                    };
            }
        }
    };
})(jQuery);