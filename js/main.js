AOS.init({
    duration: 680,
    once: true,
    offset: 55
});

/* NAVBAR SCROLL & ACTIVE LINK */
window.addEventListener('scroll', function() {
    var nav = document.getElementById('nav');
    var btt = document.getElementById('btt');
    if(nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    if(btt) btt.classList.toggle('show', window.scrollY > 300);
    
    document.querySelectorAll('section[id]').forEach(function(sec) {
        var top = sec.offsetTop - 110,
            bot = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bot) {
            document.querySelectorAll('.nav-link').forEach(function(l) {
                l.classList.remove('active');
            });
            var lnk = document.querySelector('.nav-link[href="#' + sec.id + '"]');
            if (lnk) lnk.classList.add('active');
        }
    });
});

/* SMOOTH SCROLL + MOBILE NAV CLOSE */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var t = document.querySelector(href);
        if (t) {
            e.preventDefault();
            var navCollapse = document.getElementById('navmenu');
            if (navCollapse && navCollapse.classList.contains('show')) {
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                    else navCollapse.classList.remove('show');
                } else {
                    navCollapse.classList.remove('show');
                }
            }
            setTimeout(function() {
                window.scrollTo({
                    top: t.offsetTop - 78,
                    behavior: 'smooth'
                });
            }, 50);
        }
    });
});

/* SEARCH OVERLAY CONTROL */
var searchOv = document.getElementById('searchOv');
var navSearchBtn = document.getElementById('navSearchBtn');
var searchClose = document.getElementById('searchClose');

if(navSearchBtn) {
    navSearchBtn.addEventListener('click', function() {
        if(searchOv) {
            searchOv.classList.add('open');
            document.body.style.overflow = 'hidden';
            setTimeout(function() {
                var sInput = document.getElementById('searchInput');
                if(sInput) sInput.focus();
            }, 220);
        }
    });
}

if(searchClose) {
    searchClose.addEventListener('click', closeSearch);
}

if(searchOv) {
    searchOv.addEventListener('click', function(e) {
        if (e.target === searchOv) closeSearch();
    });
}

function closeSearch() {
    if(searchOv) {
        searchOv.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* ============================================================
   MASTER FILTER LOGIC (100% FIXED FOR SCREW HUB)
   ============================================================ */
function filterMenu(cat) {
    var targetCat = cat ? cat.toLowerCase().trim() : 'all';

    // A) सिंक फ़िल्टर बटन्स (.filtbtn)
    document.querySelectorAll('.filtbtn').forEach(function(b) {
        var btnFilter = b.getAttribute('data-f');
        var currentBtnCat = btnFilter ? btnFilter.toLowerCase().trim() : '';
        b.classList.toggle('active', currentBtnCat === targetCat);
    });
    
    // B) सिंक सर्च बॉक्स केटेगरी बटन्स (.sovcat)
    document.querySelectorAll('.sovcat').forEach(function(b) {
        var boxFilter = b.getAttribute('data-cat');
        var currentBoxCat = boxFilter ? boxFilter.toLowerCase().trim() : '';
        b.classList.toggle('active', currentBoxCat === targetCat);
    });

    // C) सिंक ऊपर वाले केटेगरी कार्ड्स (.catcard)
    document.querySelectorAll('.catcard').forEach(function(c) {
        var cardFilter = c.getAttribute('data-filter');
        var currentCardCat = cardFilter ? cardFilter.toLowerCase().trim() : '';
        c.classList.toggle('active', currentCardCat === targetCat);
    });
    
    // D) प्रोडक्ट्स को दिखाना या छुपाना
    document.querySelectorAll('.mwrap').forEach(function(w) {
        var c = w.getAttribute('data-c');
        var currentProductCat = c ? c.toLowerCase().trim() : '';
        
        if (targetCat === 'all' || currentProductCat === targetCat) {
            w.style.setProperty('display', 'block', 'important'); 
            w.classList.remove('gone');
            w.style.opacity = '1';
            w.style.transform = 'translateY(0)';
        } else {
            w.style.setProperty('display', 'none', 'important'); 
            w.classList.add('gone');
        }
    });
}

// 1. नीचे वाले फ़िल्टर बटनों (.filtbtn) के लिए क्लिक इवेंट
document.querySelectorAll('.filtbtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        filterMenu(this.getAttribute('data-f'));
    });
});

// 2. ऊपर सर्च बॉक्स के बटनों (.sovcat) के लिए क्लिक इवेंट
document.querySelectorAll('.sovcat').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var f = this.getAttribute('data-cat');
        closeSearch();
        setTimeout(function() {
            filterMenu(f);
            var menuSec = document.getElementById('menu');
            if (menuSec) {
                window.scrollTo({
                    top: menuSec.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }, 300);
    });
});

// 3. ऊपर वाले Category section cards (.catcard) के लिए क्लिक इवेंट
document.querySelectorAll('.catcard').forEach(function(card) {
    card.addEventListener('click', function() {
        var f = this.getAttribute('data-filter');
        var menuSec = document.getElementById('menu');
        if (menuSec) {
            window.scrollTo({
                top: menuSec.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            filterMenu(f);
        }, 480);
    });
});

// Trending tags को सर्च इनपुट में भरना
document.querySelectorAll('.sovtrend .ttag').forEach(function(t) {
    t.addEventListener('click', function() {
        var sInput = document.getElementById('searchInput');
        if(sInput) {
            sInput.value = this.textContent.trim();
            sInput.focus();
        }
    });
});

/* MAGNIFIC POPUP SETUP */
$(document).ready(function() {
    if (typeof $.fn.magnificPopup !== 'undefined') {
        $('.magnific_popup').magnificPopup({
            disableOn: 300,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        }); 
    }
});

/* ESC key से सब बंद करना */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
        if (typeof $.magnificPopup !== 'undefined') $.magnificPopup.close();
    }
});

/* SWIPER FEEDBACK SETUP */
if (typeof Swiper !== 'undefined') {
    new Swiper('.tesSwiper', {
        slidesPerView: 1,
        spaceBetween: 22,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
}
