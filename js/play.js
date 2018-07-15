jwplayer['key'] = 'r/viHfrthMvlepAj1LfUPgiRYNSo17HhByHoAIZ4D0s=';
var loc = window['location'];
var temp = loc['pathname']['split']('/');
temp = temp[2]['split']('-');
var mid = temp[temp['length'] - 1];
mid = mid['split']('.')[0];
var player = jwplayer('media-player');
var first_load = true,
    player_ready = false,
    setup_error = false,
    auto_next = true,
    ad_is_shown = false,
    sv, playlist, eid, sv_error = [],
    sv_default = 8,
    eb_default = 14,
    rl_cnt = 0,
    seeked = false;

function get_episodes() {
    $['ajax']({
        url: '/ajax/movie_episodes/' + mid,
        method: 'GET',
        dataType: 'json',
        async: false,
        success: function(_0x2e89x13) {
            $('#list-eps')['html'](_0x2e89x13['html'])
        }
    })
}

function load_server() {
    if ($('#sv-' + sv_default)['length'] > 0) {
        sv = sv_default
        $('#sv-' + sv_default)['click']()
    } else {
        $('.server-item')['each'](function(_0x2e89x15) {
            if (_0x2e89x15 === 0) {
                sv = $(this)['attr']('data-id');
                $(this)['click']()
            }
        })
    };
    $('#episodes-sv-' + sv + ' .sli-name a')['first']()['click']()
    $('ul.nav li a[id="'+ sv +'"]').parent().addClass('active');
}

function player_error() {
    if (sv_error['indexOf'](sv) < 0) {
        sv_error['push'](sv)
    };
    var _0x2e89x17 = false;
    $('.server-item.vip')['each'](function(_0x2e89x15) {
        if (sv_error['indexOf']($(this)['attr']('data-id')) < 0) {
            sv = $(this)['attr']('data-id');
            _0x2e89x17 = true;
            $('#sv-' + sv + ' .ep-item[data-index=' + get_ep_index() + ']')['click']();
            return false
        }
    });
    if (!_0x2e89x17) {
        load_embed()
    }
}

function load_embed() {
    if ($('#sv-' + eb_default)['length'] > 0) {
        sv = eb_default
    } else {
        $('.server-item.embed')['each'](function(_0x2e89x15) {
            if (_0x2e89x15 == 0) {
                sv = $(this)['attr']('data-id');
                return false
            }
        })
    };
    $('#sv-' + sv + ' .ep-item[data-index=' + get_ep_index() + ']')['click']()
}

function change_url() {
    var _0x2e89x1a = loc['protocol'] + '//' + loc['hostname'] + loc['pathname'] + '?ep=' + eid;
    history['pushState']({}, '', _0x2e89x1a)
}

function get_sources() {
    if (player_ready) {
        player_ready = false;
        player['stop']()
    };
    first_load = true;
    $['getScript']('/ajax/movie_token?eid=' + eid + '&mid=' + mid, function() {
        $['ajax']({
            url: '/ajax/movie_sources/' + eid + '?x=' + _x + '&y=' + _y,
            method: 'GET',
            dataType: 'json',
            success: function(_0x2e89x13) {
                if (_0x2e89x13['embed']) {
                    $('#content-embed')['show']();
                    $('#media-player')['hide']();
                    player['stop']();
                    $('#iframe-embed')['attr']('src', _0x2e89x13['src'])
                } else {
                    $('#iframe-embed')['attr']('src', '');
                    playlist = _0x2e89x13['playlist'];
                    if (player_ready && !setup_error) {
                        player['load'](playlist)
                    } else {
                        setup_player()
                    }
                }
            },
            error: function() {
                $('#pop-error')['modal']('show')
            }
        })
    })
}

function get_embed() {
    $['ajax']({
        url: '/ajax/movie_embed/' + eid,
        method: 'GET',
        dataType: 'json',
        success: function(_0x2e89x13) {
            $('#iframe-embed')['attr']('src', _0x2e89x13['src'])
        }
    })
}

function get_ep_index() {
    return parseInt($('#ep-' + eid)['attr']('data-index'))
}

function setup_player() {
    player_ready = true;
    var _0x2e89x1f = {
        playlist: playlist,
        allowfullscreen: true,
        width: '100%',
        aspectratio: '16:9',
        autostart: true,
        cast: {},
        captions: {
            color: '#f3f378',
            fontSize: 16,
            backgroundOpacity: 0,
            fontfamily: 'Helvetica',
            edgeStyle: 'raised'
        },
        skin: {
            name: 'five',
            active: '#50afcb',
            inactive: '#ccc',
            background: '#141414'
        }
    };
    player['setup'](_0x2e89x1f);
    player['on']('setupError', function(_0x2e89x20) {
        player_error();
        setup_error = true
    });
    player['on']('ready', function() {
        setup_error = false;
        var _0x2e89x21 = onetwothree['mobileChecker']();
        if (!_0x2e89x21) {
            $('#media-player')['prepend']('<div id="overlay-goplugin-main" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"></div>')
        }
    });
    player['on']('complete', function() {
        if ($('#sv-' + sv + ' .ep-item')['length'] > 1 && auto_next) {
            var _0x2e89x22 = get_ep_index();
            _0x2e89x22 += 1;
            $('#sv-' + sv + ' .ep-item[data-index=' + _0x2e89x22 + ']')['click']()
        }
    });
    player['on']('play', function() {
        sv_error = []
    });
    player['on']('levels', function() {
        var _0x2e89x23 = player['getQualityLevels']()[0];
        if (_0x2e89x23['label'] === 'Auto') {
            player['setCurrentQuality'](0)
        }
    });
    player['on']('seek', function(_0x2e89x20) {
        sv_error = [];
        seeked = true;
        localStorage['setItem'](eid, _0x2e89x20['offset'])
    });
    player['on']('firstFrame', function() {
        if (first_load && localStorage['getItem'](eid) && localStorage['getItem'](eid) > 30) {
            if (seeked) {
                player['seek'](localStorage['getItem'](eid));
                seeked = false
            } else {
                player['pause']();
                $('#time-resume')['text'](convert_time(localStorage['getItem'](eid)));
                $('#pop-resume')['modal']('show')
            };
            first_load = false
        }
    });
    player['on']('time', function() {
        var _0x2e89x21 = onetwothree['mobileChecker']();
        if (!_0x2e89x21) {
            var _0x2e89x24 = onetwothree['adTime']();
            if (parseInt(player['getPosition']()) === _0x2e89x24['start'] && !ad_is_shown) {
                onetwothree['addTag']();
                ad_is_shown = true
            };
            if (parseInt(player['getPosition']()) === _0x2e89x24['end'] && ad_is_shown) {
                onetwothree['removeTag']()
            }
        }
    });
    player['on']('error', function(_0x2e89x20) {
        setup_error = true;
        if (seeked) {
            get_sources()
        } else {
            if (parseInt(sv) === 5 && rl_cnt < 3) {
                player['load'](playlist);
                rl_cnt += 1
            } else {
                player_error()
            }
        }
    })
}

function convert_time(_0x2e89x26) {
    var _0x2e89x27 = new Date(0, 0, 0);
    _0x2e89x27['setSeconds'](+_0x2e89x26);
    var _0x2e89x28 = _0x2e89x27['getHours']();
    var _0x2e89x29 = _0x2e89x27['getMinutes']();
    var _0x2e89x2a = _0x2e89x27['getSeconds']();
    return (_0x2e89x28 < 10 ? ('0' + _0x2e89x28) : _0x2e89x28) + ':' + (_0x2e89x29 < 10 ? ('0' + _0x2e89x29) : _0x2e89x29) + ':' + (_0x2e89x2a < 10 ? ('0' + _0x2e89x2a) : _0x2e89x2a)
}
$('#yes-resume')['click'](function() {
    $('#pop-resume')['modal']('hide');
    player['seek'](localStorage['getItem'](eid))
});
$('#no-resume')['click'](function() {
    $('#pop-resume')['modal']('hide');
    player['play']()
});
$('.bp-btn-autonext')['click'](function() {
    if (auto_next) {
        auto_next = false;
        $('#state-auto-next')['text']('OFF')
    } else {
        auto_next = true;
        $('#state-auto-next')['text']('ON')
    }
});
$(document)['on']('click', '.ep-item', function() {
    eid = $(this)['attr']('data-id');
    sv = $(this)['attr']('data-server');
    $('.ep-item')['removeClass']('active');
    $('#ep-' + eid)['addClass']('active');
    if ($('#sv-' + sv)['hasClass']('embed')) {
        $('#content-embed')['show']();
        $('#media-player')['hide']();
        player['stop']();
        get_embed()
    } else {
        $('#media-player')['show']();
        $('#content-embed')['hide']();
        get_sources()
    };
    change_url()
});
$(document)['ready'](function() {
    get_episodes();
    if (loc['search'] !== '') {
        eid = loc['search']['split']('=');
        eid = eid[1];
        if ($('#ep-' + eid)['length'] > 0) {
            sv = $('#ep-' + eid)['attr']('data-server');
            $('#sv-' + sv)['click']();
            $('#ep-' + eid)['click']()
        } else {
            window['location']['href'] = loc['protocol'] + '//' + loc['hostname'] + loc['pathname']
        }
    } else {
        load_server()
    };
    setTimeout(function() {
        if (!$['cookie']('view-' + mid)) {
            $['ajax']({
                url: '/ajax/movie_view',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: mid
                },
                success: function(_0x2e89x13) {
                    var _0x2e89x2b = new Date();
                    var _0x2e89x29 = 10;
                    _0x2e89x2b['setTime'](_0x2e89x2b['getTime']() + (_0x2e89x29 * 60 * 1000));
                    $['cookie']('view-' + mid, true, {
                        expires: _0x2e89x2b,
                        path: loc['pathname']
                    })
                }
            })
        }
    }, 5000);
    $('#report-form')['submit'](function(_0x2e89x20) {
        $('#report-error')['hide']();
        if (($('#report-form input[name*=\'issue\']:checked')['length']) <= 0) {
            $('#report-error')['show']()
        } else {
            if (!$['cookie']('report-' + eid)) {
                $('#report-submit')['prop']('disabled', true);
                $('#report-loading')['show']();
                var _0x2e89x2c = $(this)['serializeArray']();
                _0x2e89x2c['push']({
                    "\x6E\x61\x6D\x65": 'movie_id',
                    "\x76\x61\x6C\x75\x65": mid
                });
                _0x2e89x2c['push']({
                    "\x6E\x61\x6D\x65": 'episode_id',
                    "\x76\x61\x6C\x75\x65": eid
                });
                $['ajax']({
                    url: '/ajax/movie_report',
                    type: 'POST',
                    data: _0x2e89x2c,
                    dataType: 'json',
                    success: function(_0x2e89x13) {
                        _0x2e89x2d()
                    }
                })
            } else {
                _0x2e89x2d()
            }
        };
        _0x2e89x20['preventDefault']()
    });

    function _0x2e89x2d() {
        $('#report-alert')['show']();
        setTimeout(function() {
            $('#report-alert')['hide']()
        }, 5000);
        $('#report-submit')['removeAttr']('disabled');
        $('#report-loading')['hide']();
        $('.bp-btn-report')['remove']();
        $['cookie']('report-' + movie['id'], true, {
            path: '/',
            expires: 1
        });
        document['getElementById']('report-form')['reset']();
        $('#pop-report')['modal']('hide')
    }
})