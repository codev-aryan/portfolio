document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Nav ────────────────────────────────────────────────────────────
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks  = document.querySelector('.nav-links');
    const links     = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ── Sticky Header ─────────────────────────────────────────────────────────
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── Typing Effect ─────────────────────────────────────────────────────────
    const typingTarget = document.querySelector('.typing-effect');
    if (typingTarget) {
        const textToType = "Competitive Programmer | 500+ Problems Solved";
        let charIndex = 0;
        function type() {
            if (charIndex < textToType.length) {
                typingTarget.textContent += textToType.charAt(charIndex++);
                setTimeout(type, 70);
            }
        }
        type();
    }

    // ── Fade-in on Scroll ─────────────────────────────────────────────────────
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    // ── Count-Up Animation ────────────────────────────────────────────────────
    function runCountUp(target) {
        const targetValue = +target.getAttribute('data-target');
        let current       = 0;
        const steps       = 2000 / 50;
        const increment   = targetValue / steps;

        const counter = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                target.textContent = Math.floor(targetValue);
                clearInterval(counter);
            } else {
                target.textContent = Math.floor(current);
            }
        }, 50);
    }

    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCountUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.rating-number').forEach(el => countUpObserver.observe(el));

    // ── Active Nav Highlighting ───────────────────────────────────────────────
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));


    // =========================================================================
    // Real-time Ratings
    // =========================================================================

    // Hardcoded fallbacks — shown instantly, replaced only on successful fetch
    const FALLBACK = {
        codechef:   { rating: 1615, stars: 3 },
        codeforces: { rating: 1243, rank: 'Pupil', color: '#008000' },
    };

    // ── Helpers ───────────────────────────────────────────────────────────────

    // Re-runs count-up if element was already animated before fetch returned
    function updateRating(el, newValue) {
        const alreadyAnimated = el.textContent !== '0';
        el.setAttribute('data-target', newValue);
        if (alreadyAnimated) runCountUp(el);
    }

    function starsToEmoji(count) {
        return '⭐'.repeat(count);
    }

    // ── CodeChef — star tier from rating ─────────────────────────────────────
    function getCodechefStars(rating) {
        if      (rating >= 2500) return 7;
        else if (rating >= 2200) return 6;
        else if (rating >= 2000) return 5;
        else if (rating >= 1800) return 4;
        else if (rating >= 1600) return 3;
        else if (rating >= 1400) return 2;
        else                     return 1;
    }

    // ── Codeforces — rank title and official color ────────────────────────────
    const CF_RANK_COLORS = {
        'newbie':                    '#808080',
        'pupil':                     '#008000',
        'specialist':                '#03A89E',
        'expert':                    '#0000FF',
        'candidate master':          '#AA00AA',
        'master':                    '#FF8C00',
        'international master':      '#FF8C00',
        'grandmaster':               '#FF0000',
        'international grandmaster': '#FF0000',
        'legendary grandmaster':     '#FF0000',
    };

    function cfRankColor(rank) {
        return CF_RANK_COLORS[rank.toLowerCase()] ?? '#e0e0e0';
    }

    function cfRankTitle(rank) {
        // Capitalise each word: "candidate master" → "Candidate Master"
        return rank.replace(/\b\w/g, c => c.toUpperCase());
    }

    // ── Fetch CodeChef ────────────────────────────────────────────────────────
    // Tries the primary endpoint first; falls back to an allorigins CORS proxy
    // if the direct request is blocked (common on GitHub Pages / localhost).
    async function fetchCodechef() {
        const handle   = 'codev_aryan';
        const primary  = `https://codechef-api.vercel.app/${handle}`;
        const proxied  = `https://api.allorigins.win/raw?url=${encodeURIComponent(primary)}`;

        for (const url of [primary, proxied]) {
            try {
                const res = await fetch(url, { cache: 'no-store' });
                if (!res.ok) continue;

                const data = await res.json();

                // API field names vary by version — check all known keys
                const rating =
                    data.currentRating  ??
                    data.highestRating  ??
                    data.rating         ??
                    null;

                if (!rating) continue;                  // empty response, try next

                const stars = getCodechefStars(rating);

                updateRating(document.getElementById('codechef-rating'), rating);
                document.getElementById('codechef-stars').textContent = starsToEmoji(stars);

                console.log(`CodeChef live: ${rating} (${stars}★) via ${url}`);
                return;                                  // success — stop trying

            } catch (err) {
                console.warn(`CodeChef endpoint failed (${url}):`, err.message);
            }
        }

        // Both endpoints failed — hardcoded HTML values stay visible
        console.warn('CodeChef: all endpoints failed, showing fallback.');
    }

    // ── Fetch Codeforces ──────────────────────────────────────────────────────
    // Official Codeforces API supports CORS natively — no proxy needed.
    async function fetchCodeforces() {
        try {
            const res = await fetch(
                'https://codeforces.com/api/user.info?handles=codev.aryan',
                { cache: 'no-store' }
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            if (data.status !== 'OK') throw new Error('Codeforces API returned non-OK status');

            const user   = data.result[0];
            const rating = user.maxRating ?? FALLBACK.codeforces.rating;
            const rank   = user.maxRank   ?? FALLBACK.codeforces.rank;

            updateRating(document.getElementById('codeforces-rating'), rating);

            const rankEl   = document.getElementById('codeforces-rank');
            rankEl.textContent = cfRankTitle(rank);
            rankEl.style.color = cfRankColor(rank);

            console.log(`Codeforces live: ${rating} — ${rank}`);

        } catch (err) {
            console.warn('Codeforces fetch failed, showing fallback.', err.message);
        }
    }

    // Fire both in parallel — neither blocks the other or the page
    fetchCodechef();
    fetchCodeforces();

});
