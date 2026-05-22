/* Beach map – interactivity */

document.addEventListener('DOMContentLoaded', () => {

  /* Tooltip descrittivo per ombrelloni */
  const umbrellas = document.querySelectorAll('.umbrella');
  let tooltipEl = null;

  umbrellas.forEach((u, i) => {
    u.addEventListener('mouseenter', (e) => {
      const isGold  = u.classList.contains('gold');
      const isGreen = u.classList.contains('green');
      const row = u.closest('.umbrella-row');
      const col = Array.from(row?.children ?? []).indexOf(u) + 1;
      const rowIdx = (() => {
        const grid = u.closest('.grid-umbrellas, .umbrella-row.first-row');
        if (!grid) return 1;
        const rows = grid.querySelectorAll('.umbrella-row');
        for (let r = 0; r < rows.length; r++) {
          if (rows[r].contains(u)) return r + 1;
        }
        return 1;
      })();

      const tipo = isGold ? 'Prima Fila' : isGreen ? 'Settore Piscina' : 'Standard';
      showTooltip(e, `Ombrellone ${tipo} · Col. ${col}`);
    });

    u.addEventListener('mouseleave', hideTooltip);
    u.addEventListener('click', () => {
      u.classList.toggle('selected');
    });
  });

  function showTooltip(e, text) {
    hideTooltip();
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'js-tooltip';
    tooltipEl.textContent = text;
    Object.assign(tooltipEl.style, {
      position: 'fixed',
      background: 'rgba(10,40,80,0.9)',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '6px',
      fontSize: '0.7rem',
      fontWeight: '700',
      pointerEvents: 'none',
      zIndex: '9999',
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    });
    document.body.appendChild(tooltipEl);
    moveTooltip(e);
  }

  function moveTooltip(e) {
    if (!tooltipEl) return;
    tooltipEl.style.left = (e.clientX + 12) + 'px';
    tooltipEl.style.top  = (e.clientY - 30) + 'px';
  }

  function hideTooltip() {
    if (tooltipEl) { tooltipEl.remove(); tooltipEl = null; }
  }

  document.addEventListener('mousemove', moveTooltip);

  /* Selezione ombrellone – stile */
  const style = document.createElement('style');
  style.textContent = `
    .umbrella.selected {
      outline: 3px solid #ff5a5a;
      outline-offset: 2px;
      animation: pulse-sel 1s ease infinite alternate;
    }
    @keyframes pulse-sel {
      from { box-shadow: 0 0 0 0 rgba(255,90,90,0.4); }
      to   { box-shadow: 0 0 0 8px rgba(255,90,90,0); }
    }
  `;
  document.head.appendChild(style);

  /* Piccolo effetto parallax sul mare */
  const sea = document.querySelector('.sea');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (sea) sea.style.backgroundPositionY = (y * 0.3) + 'px';
  }, { passive: true });

  /* Animazione "onda" sui gabbiani (optional easter egg) */
  spawnSeagulls();
});

function spawnSeagulls() {
  const sea = document.querySelector('.sea');
  if (!sea) return;

  const style = document.createElement('style');
  style.textContent = `
    .gull {
      position: absolute;
      font-size: 1.1rem;
      animation: fly linear infinite;
      opacity: 0.7;
      pointer-events: none;
      z-index: 3;
    }
    @keyframes fly {
      0%   { transform: translateX(-60px) translateY(0px); }
      25%  { transform: translateX(25vw) translateY(-18px); }
      50%  { transform: translateX(50vw) translateY(4px); }
      75%  { transform: translateX(75vw) translateY(-10px); }
      100% { transform: translateX(calc(100vw + 60px)) translateY(0px); }
    }
  `;
  document.head.appendChild(style);

  const gulls = [
    { top: '18%', delay: '0s',  dur: '18s' },
    { top: '38%', delay: '6s',  dur: '22s' },
    { top: '55%', delay: '12s', dur: '16s' },
  ];

  gulls.forEach(g => {
    const el = document.createElement('span');
    el.className = 'gull';
    el.textContent = '🕊';
    el.style.top = g.top;
    el.style.animationDuration = g.dur;
    el.style.animationDelay = g.delay;
    sea.appendChild(el);
  });
}
