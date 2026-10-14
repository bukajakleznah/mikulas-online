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

  // síň slávy: karty s pódiem + kompletní výsledky v okně
  var fmtT = function (s) { var m = Math.floor(s / 60), r = s - m * 60; return (m ? m + ':' : '') + (r < 10 && m ? '0' : '') + r.toFixed(2).replace('.', ','); };
  var fmtG = function (s) { return s ? '+' + fmtT(s) : ''; };
  var hall = $('#hall');
  hall.innerHTML = D.hall.map(function (h) {
    if (h.cancelled) {
      return '<article class="card card--off rv"><div class="card__body"><span class="card__yearsm">' + h.year + '</span><h3>Mikuláš Rally Online ' + h.year + '</h3><p class="card__note">Tento ročník se bohužel nejel.</p></div></article>';
    }
    return '<article class="card rv" data-year="' + h.year + '"><div class="card__img" style="background-image:url(' + esc(h.img) + ')"><span class="card__year">' + h.year + '</span></div>' +
      '<div class="card__body"><h3>Mikuláš Rally Online ' + h.year + '</h3>' +
      (h.note ? '<p class="card__note">' + esc(h.note) + '</p>' : '') +
      '<ol class="podium" data-podium></ol><p class="card__stat" data-stat></p>' +
      '<button class="card__link" type="button" data-results="' + h.year + '">Kompletní výsledky →</button></div></article>';
  }).join('');

  var idx = null;
  fetch('data/results-index.json').then(function (r) { return r.json(); }).then(function (data) {
    idx = data;
    $$('.card[data-year]').forEach(function (c) {
      var x = data[c.getAttribute('data-year')]; if (!x) return;
      $('[data-podium]', c).innerHTML = x.podium.map(function (p) {
        return '<li class="podium__' + p.pos + '"><span class="podium__pos">' + p.pos + '</span><span class="podium__who"><b>' + esc(p.name) + '</b><i>' + esc(p.car) + '</i></span><span class="podium__t">' + fmtT(p.total) + '</span></li>';
      }).join('');
      $('[data-stat]', c).textContent = x.drivers + ' jezdců · ' + x.finished + ' v cíli';
    });
  }).catch(function () {});

  var rm;
  var openResults = function (year) {
    if (!rm) {
      rm = document.createElement('div'); rm.className = 'rm';
      rm.innerHTML = '<div class="rm__panel" role="dialog" aria-modal="true"><div class="rm__head"><div><h3 class="rm__title"></h3><p class="rm__sub"></p></div>' +
        '<input class="rm__q" type="search" placeholder="Hledat jezdce nebo vůz…" aria-label="Hledat"><button class="rm__x" aria-label="Zavřít">×</button></div><div class="rm__body"></div></div>';
      document.body.appendChild(rm);
      var close = function () { rm.classList.remove('is-open'); document.body.style.overflow = ''; };
      rm.addEventListener('click', function (e) { if (e.target === rm || e.target.className === 'rm__x') close(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }
    $('.rm__title', rm).textContent = 'Mikuláš Rally Online ' + year + ' – výsledky';
    $('.rm__sub', rm).textContent = 'Načítám…'; $('.rm__body', rm).innerHTML = ''; $('.rm__q', rm).value = '';
    rm.classList.add('is-open'); document.body.style.overflow = 'hidden';
    fetch('data/results-' + year + '.json').then(function (r) { return r.json(); }).then(function (R) {
      $('.rm__sub', rm).textContent = R.drivers + ' jezdců · ' + R.finished + ' v cíli · ' + R.stages.length + ' RZ · časy včetně případných penalizací';
      var lead = R.fin[0].total;
      var head = '<tr><th>#</th><th>Jezdec</th><th class="car">Vůz</th>' + R.stages.map(function (s, i) { return '<th class="n st" title="' + esc(s) + '">RZ ' + (i + 1) + '</th>'; }).join('') + '<th class="n">Celkem</th><th class="n">Ztráta</th></tr>';
      var body = R.fin.map(function (x) {
        return '<tr class="' + (x.pos <= 3 ? 'top top' + x.pos : '') + '"><td class="pos">' + x.pos + '</td><td class="who"><b>' + esc(x.name) + '</b> <span class="cc">' + esc(x.cc) + '</span></td><td class="car">' + esc(x.car) + '</td>' +
          x.st.map(function (t) { return '<td class="n st">' + fmtT(t) + '</td>'; }).join('') +
          '<td class="n tot">' + fmtT(x.total) + (x.pen ? ' <small title="v čase je zahrnuta penalizace">pen. ' + x.pen + ' s</small>' : '') + '</td><td class="n gap">' + fmtG(x.total - lead) + '</td></tr>';
      }).join('');
      var dnf = R.dnf.length ? '<h4 class="rm__h">Nedokončili (' + R.dnf.length + ')</h4><table class="rm__t rm__t--dnf"><tbody>' + R.dnf.map(function (x) {
        return '<tr><td class="who"><b>' + esc(x.name) + '</b> <span class="cc">' + esc(x.cc) + '</span></td><td class="car">' + esc(x.car) + '</td><td class="n">dojeto RZ: ' + x.done + ' / ' + R.stages.length + '</td></tr>';
      }).join('') + '</tbody></table>' : '';
      $('.rm__body', rm).innerHTML = '<div class="rm__scroll"><table class="rm__t"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>' + dnf;
    }).catch(function () { $('.rm__sub', rm).textContent = 'Výsledky se nepodařilo načíst.'; });
    $('.rm__q', rm).oninput = function () {
      var q = this.value.trim().toLowerCase();
      $$('.rm__t tbody tr', rm).forEach(function (tr) { tr.hidden = q && tr.textContent.toLowerCase().indexOf(q) < 0; });
    };
  };
  hall.addEventListener('click', function (e) {
    var b = e.target.closest('[data-results]'); if (b) openResults(b.getAttribute('data-results'));
  });

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
  $$('.stage, .edition__main, .edition__photo, .tech, .story, .doc, .gallery img, .video').forEach(function (e) { e.classList.add('rv'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } });
    }, { threshold: .12 });
    $$('.rv').forEach(function (e) { io.observe(e); });
  } else { $$('.rv').forEach(function (e) { e.classList.add('is-in'); }); }

  // --- intro video: vlastní soubor video/intro.mp4, jinak záloha přes YouTube; samo se spustí bez zvuku ---
  var media = $('#introMedia'), hv = $('#heroVideo');
  var saveData = navigator.connection && navigator.connection.saveData;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (media && !saveData && !reduce) {
    var player = null, started = false;
    var shown = function () { hv.classList.add('is-on'); };
    var initYT = function () {
      var vid = media.getAttribute('data-yt');
      var fr = document.createElement('iframe');
      fr.src = 'https://www.youtube-nocookie.com/embed/' + vid + '?autoplay=1&mute=1&start=13&controls=0&loop=1&playlist=' + vid +
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
        play: function () { cmd('playVideo'); }, pause: function () { cmd('pauseVideo'); }
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
        play: function () { v.play().catch(function () {}); }, pause: function () { v.pause(); }
      };
    };
    var start = function () {
      if (started) return; started = true;
      fetch(media.getAttribute('data-src'), { method: 'HEAD' }).then(function (r) {
        var ct = r.headers.get('content-type') || '';
        (r.ok && ct.indexOf('video') === 0) ? initFile() : initYT();
      }).catch(initYT);
    };
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
