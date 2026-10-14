(function () {
  var D = window.MRO;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // rok + registrace
  $$('[data-year]').forEach(function (e) { e.textContent = D.year; });
  $$('[data-reg]').forEach(function (a) {
    if (a.getAttribute('href') === '#registrace' && a.closest('.nav, .hero')) { return; }
    a.href = D.registrationUrl; a.target = '_blank'; a.rel = 'noopener';
  });
  var st = $('#edStatus'); st.textContent = D.statusText[D.status]; if (D.status === 'open') st.classList.add('is-open');

  // harmonogram
  $('#schedule').innerHTML = D.schedule.map(function (s) {
    return '<li><b>' + esc(s.when) + '</b><span>' + esc(s.what) + '</span></li>';
  }).join('');

  // dokumenty
  $('#docs').innerHTML = D.docs.map(function (d) {
    return d.url
      ? '<a class="doc" href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.title) + '<span>PDF ↓</span></a>'
      : '<div class="doc is-off">' + esc(d.title) + '<span>Připravujeme</span></div>';
  }).join('');

  // timeline
  $('#timeline').innerHTML = D.timeline.map(function (t) {
    return '<li class="rv"><b>' + esc(t[0]) + '</b><span>' + esc(t[1]) + '</span></li>';
  }).join('');

  // síň slávy (nejnovější první)
  $('#hall').innerHTML = D.hall.slice().sort(function (a, b) { return b.year - a.year; }).map(function (h) {
    return '<article class="card rv"><div class="card__img" style="background-image:url(' + esc(h.img) + ')"><span class="card__year">' + h.year + '</span></div>' +
      '<div class="card__body"><h3>' + esc(h.title) + '</h3>' +
      (h.winner ? '<p class="card__winner">Vítěz: <b>' + esc(h.winner) + '</b></p>' : '') +
      (h.note ? '<p class="card__note">' + esc(h.note) + '</p>' : '') +
      (h.results ? '<a class="card__link" href="' + esc(h.results) + '" target="_blank" rel="noopener">Výsledky →</a>' : '<span class="card__link is-off">Výsledky doplníme</span>') +
      '</div></article>';
  }).join('');

  // YouTube – načte se až po kliknutí (rychlost + soukromí)
  $$('[data-yt]').forEach(function (el) {
    var id = el.getAttribute('data-yt');
    el.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)';
    el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0');
    var play = function () {
      el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Video"></iframe>';
      el.style.cursor = 'default'; el.classList.add('is-playing'); el.style.setProperty('--x', 0);
    };
    el.addEventListener('click', play, { once: true });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
  });

  // nav
  var nav = $('#nav'), burger = $('#burger'), links = $('#links');
  var onScroll = function () { nav.classList.toggle('is-solid', window.scrollY > 40); };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  burger.addEventListener('click', function () {
    var o = links.classList.toggle('is-open'); burger.setAttribute('aria-expanded', o);
  });
  $$('a', links).forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }); });

  // reveal
  $$('.stage, .edition__main, .edition__photo, .tech, .story, .doc, .gallery img, .video, .schedule li').forEach(function (e) { e.classList.add('rv'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } });
    }, { threshold: .12 });
    $$('.rv').forEach(function (e) { io.observe(e); });
  } else { $$('.rv').forEach(function (e) { e.classList.add('is-in'); }); }

  // --- intro video: vlastní soubor video/intro.mp4, jinak záloha přes YouTube; samo se spustí bez zvuku ---
  var media = $('#introMedia'), hv = $('#heroVideo'), snd = $('#heroSound');
  var saveData = navigator.connection && navigator.connection.saveData;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (media && !saveData && !reduce) {
    var player = null, started = false, muted = true;
    var shown = function () { hv.classList.add('is-on'); snd.hidden = false; };
    var initYT = function () {
      var vid = media.getAttribute('data-yt');
      var fr = document.createElement('iframe');
      fr.src = 'https://www.youtube-nocookie.com/embed/' + vid + '?autoplay=1&mute=1&controls=0&loop=1&playlist=' + vid +
        '&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1&origin=' + encodeURIComponent(location.origin);
      fr.allow = 'autoplay; encrypted-media'; fr.tabIndex = -1; fr.title = 'Intro';
      var cmd = function (f, a) { try { fr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: f, args: a || [] }), '*'); } catch (e) {} };
      window.addEventListener('message', function (e) {
        if (e.source !== fr.contentWindow) return;
        var d; try { d = JSON.parse(e.data); } catch (x) { return; }
        var st = d && d.info && typeof d.info === 'object' ? d.info.playerState : (d && d.event === 'onStateChange' ? d.info : undefined);
        if (st === 1) shown();
      });
      fr.addEventListener('load', function () {
        try { fr.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), '*'); } catch (e) {}
        cmd('playVideo');
      });
      hv.appendChild(fr);
      player = {
        play: function () { cmd('playVideo'); }, pause: function () { cmd('pauseVideo'); },
        mute: function (m) { cmd(m ? 'mute' : 'unMute'); if (!m) cmd('setVolume', [80]); cmd('playVideo'); }
      };
    };
    var initFile = function () {
      var v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'auto';
      v.src = media.getAttribute('data-src');
      v.addEventListener('playing', shown);
      v.addEventListener('error', function () { hv.removeChild(v); initYT(); }, { once: true });
      hv.appendChild(v);
      v.play().catch(function () {});
      player = {
        play: function () { v.play().catch(function () {}); }, pause: function () { v.pause(); },
        mute: function (m) { v.muted = !m ? false : true; v.play().catch(function () {}); }
      };
    };
    var start = function () {
      if (started) return; started = true;
      fetch(media.getAttribute('data-src'), { method: 'HEAD' }).then(function (r) {
        var ct = r.headers.get('content-type') || '';
        (r.ok && ct.indexOf('video') === 0) ? initFile() : initYT();
      }).catch(initYT);
    };
    snd.addEventListener('click', function () {
      muted = !muted; if (player) player.mute(muted);
      snd.classList.toggle('is-on', !muted); snd.querySelector('.lbl').textContent = muted ? 'Zapnout zvuk' : 'Vypnout zvuk';
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { start(); if (player) player.play(); } else if (player) { player.pause(); }
      }, { threshold: .3, rootMargin: '0px 0px 200px 0px' }).observe(media.parentNode);
    } else { start(); }
  }

  // --- lightbox pro "Reálná podoba" ---
  var lb;
  $$('[data-video]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!lb) {
        lb = document.createElement('div'); lb.className = 'lb'; lb.innerHTML = '<button class="lb__x" aria-label="Zavřít">×</button><div class="lb__box"></div>';
        document.body.appendChild(lb);
        var close = function () { lb.classList.remove('is-open'); lb.querySelector('.lb__box').innerHTML = ''; };
        lb.addEventListener('click', function (e) { if (e.target === lb || e.target.className === 'lb__x') close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
      }
      lb.querySelector('.lb__box').innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-video') + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Video"></iframe>';
      lb.classList.add('is-open');
    });
  });
})();
