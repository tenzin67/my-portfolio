/**
 * TENZIN PALGYAL — PORTFOLIO APPLICATION
 * Built adhering strictly to landing-page-design & frontend-design specs
 */

(function () {
  'use strict';

  // --- 1. Dharamshala Live Clock (CTA Headquarters, HP, India: UTC+5:30) ---
  function initLiveClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      // Calculate IST (UTC + 5.5 hours) with clean hours and minutes
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = `Dharamshala · ${timeStr} IST`;
    }

    update();
    setInterval(update, 10000); // update every 10s to conserve CPU
  }

  // --- 2. Mandatory B11 Tagline Word Reveal on Scroll ---
  function initTaglineReveal() {
    const container = document.getElementById('tagline-paragraph');
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const words = container.querySelectorAll('.tagline-word');
      words.forEach(w => w.classList.add('revealed'));
      return;
    }

    const words = Array.from(container.querySelectorAll('.tagline-word'));
    let activatedIndex = 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reveal words sequentially with staggered timing
          const interval = setInterval(() => {
            if (activatedIndex < words.length) {
              words[activatedIndex].classList.add('revealed');
              activatedIndex++;
            } else {
              clearInterval(interval);
              observer.unobserve(container);
            }
          }, 35); // 35ms per word for natural cadence
        }
      });
    }, {
      threshold: 0.25
    });

    observer.observe(container);
  }

  // --- 3. Scroll Reveal for Sections per B7 ---
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      revealElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- 4. Web Audio Tactile Acoustic Synthesizer ---
  let audioCtx = null;
  let soundEnabled = true;

  function playKeySound() {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.035);
    } catch (e) {}
  }

  function playChime() {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.08);
        osc.stop(audioCtx.currentTime + i * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  // --- 5. Syllable Linguistic Anatomy Decomposition ---
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;'
    }[ch]));
  }

  function updateLinguisticInspector(text) {
    const chipsContainer = document.getElementById('anatomy-chips');
    if (!chipsContainer) return;

    if (!text || text.trim().length === 0) {
      chipsContainer.innerHTML = '<span class="caption-5 text-muted">Type or load a syllable to view linguistic decomposition (Root Letter, Vowels, Subjoined, Suffixes)...</span>';
      return;
    }

    const syllables = text.split(/[་།\s]+/).filter(Boolean);
    const lastSyllable = syllables.length > 0 ? syllables[syllables.length - 1] : text;

    const vowels = ['ི', 'ུ', 'ེ', 'ོ', 'ཻ'];
    let detectedRoot = '';
    const detectedVowels = [];
    const detectedSubjoined = [];
    const detectedOther = [];

    for (const char of lastSyllable) {
      const code = char.codePointAt(0);
      if (vowels.includes(char)) {
        detectedVowels.push(char);
      } else if (code >= 0x0F90 && code <= 0x0FBC) {
        detectedSubjoined.push(char);
      } else if (!detectedRoot && char >= 'ཀ' && char <= 'ཨ') {
        detectedRoot = char;
      } else {
        detectedOther.push(char);
      }
    }

    let html = `<div class="anatomy-chip">Active Syllable: <span>${escapeHtml(lastSyllable)}</span></div>`;
    if (detectedRoot) {
      html += `<div class="anatomy-chip">Root Letter (མིང་གཞི): <span>${escapeHtml(detectedRoot)}</span></div>`;
    }
    if (detectedVowels.length > 0) {
      html += `<div class="anatomy-chip">Vowel Sign (དབྱངས): <span>${escapeHtml(detectedVowels.join(' '))}</span></div>`;
    }
    if (detectedSubjoined.length > 0) {
      html += `<div class="anatomy-chip">Subjoined (འདོགས་ཅན): <span>${escapeHtml(detectedSubjoined.join(' '))}</span></div>`;
    }
    if (detectedOther.length > 0) {
      html += `<div class="anatomy-chip">Suffix/Other: <span>${escapeHtml(detectedOther.join(' '))}</span></div>`;
    }

    chipsContainer.innerHTML = html;
  }

  // --- 6. Interactive Tibetan Keyboard & Typing Tutor Playground ---
  function initTibetanTutor() {
    const tutorSection = document.getElementById('tutor');
    const displayAreaEl = document.getElementById('tutor-display-area');
    const displayEl = document.getElementById('tutor-display');
    const emptyStateEl = document.getElementById('tutor-empty-state');
    const countEl = document.getElementById('tutor-char-count');
    const matrixEl = document.getElementById('tibetan-keyboard-matrix');
    const sampleBtns = document.querySelectorAll('.sample-btn');
    const clearBtn = document.getElementById('tutor-clear-btn');
    const backspaceBtn = document.getElementById('tutor-backspace-btn');
    const copyBtn = document.getElementById('tutor-copy-btn');
    const audioToggleBtn = document.getElementById('tutor-audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    const audioLabel = document.getElementById('audio-label');

    if (!displayEl || !matrixEl) return;

    // Exact key mapping & 5-row physical layout from Tibetan Keyboard (OS Tibetan map)
    const osTibetanLayout = {
      '`': { normal: '་', shift: '༧' },
      '1': { normal: '༡', shift: '༑' },
      '2': { normal: '༢', shift: '༄༅' },
      '3': { normal: '༣', shift: '༅' },
      '4': { normal: '༤', shift: '༤' },
      '5': { normal: '༥', shift: '༥' },
      '6': { normal: '༦', shift: '༦' },
      '7': { normal: '༧', shift: '༼' },
      '8': { normal: '༨', shift: '༽' },
      '9': { normal: '༩', shift: '༩' },
      '0': { normal: '༠', shift: '༠' },
      '-': { normal: '-', shift: '-' },
      '=': { normal: '=', shift: '+' },

      'q': { normal: 'ཊ', shift: 'ཋ' },
      'w': { normal: 'ཝ', shift: 'ྭ' },
      'e': { normal: 'ེ', shift: 'ཻ' },
      'r': { normal: 'ར', shift: 'ཪ' },
      't': { normal: 'ཏ', shift: 'ཐ' },
      'y': { normal: 'ཡ', shift: 'ཡ' },
      'u': { normal: 'ུ', shift: 'འུ' },
      'i': { normal: 'ི', shift: 'ག' },
      'o': { normal: 'ོ', shift: 'གྷ' },
      'p': { normal: 'པ', shift: 'ཕ' },
      '[': { normal: ';', shift: 'ཿ' },
      ']': { normal: 'ˌ', shift: '"' },
      '\\': { normal: '༔', shift: '༏' },

      'a': { normal: '', shift: 'ཨ' },
      's': { normal: 'ས', shift: 'ཤ' },
      'd': { normal: 'ད', shift: 'ཛ' },
      'f': { normal: 'ང', shift: 'དྷ' },
      'g': { normal: 'ག', shift: 'གྷ' },
      'h': { normal: 'ཧ', shift: 'ཧ' },
      'j': { normal: 'ཇ', shift: 'ཇ' },
      'k': { normal: 'ཀ', shift: 'ཁ' },
      'l': { normal: 'ལ', shift: 'ར' },
      ';': { normal: '་', shift: 'ཌྷ' },
      '\'': { normal: 'འ', shift: '་' },

      'z': { normal: 'ཟ', shift: 'ཞ' },
      'x': { normal: 'ཙ', shift: 'ཚ' },
      'c': { normal: 'ཅ', shift: 'ཆ' },
      'v': { normal: 'ཌ', shift: 'ཎ' },
      'b': { normal: 'བ', shift: 'བྷ' },
      'n': { normal: 'ན', shift: 'ཉ' },
      'm': { normal: 'མ', shift: 'མ' },
      ',': { normal: 'ྱ', shift: 'ྱ' },
      '.': { normal: 'ྲ', shift: 'ལ' },
      '/': { normal: '།', shift: '༑' },

      ' ': { normal: '་', shift: ' ' }
    };

    const subjoinedCharMapping = {
      k: 'ྐ', K: 'ྑ', g: 'ྒ', f: 'ྔ',
      c: 'ྕ', C: 'ྖ', j: 'ྗ', n: 'ྣ', N: 'ྙ',
      t: 'ྟ', T: 'ྠ', d: 'ྡ', p: 'ྤ', P: 'ྥ',
      b: 'ྦ', m: 'ྨ', x: 'ྩ', X: 'ྪ', z: 'ྮ',
      l: 'ླ', s: 'ྶ', S: 'ྴ', h: 'ྷ'
    };

    const keyboardRows = [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
      [' ']
    ];

    let currentText = '';
    let physicalShiftHeld = false;
    let virtualShiftActive = false;
    let capsShiftLocked = false;
    let deadKeyActive = false;

    function isShiftActive() {
      return physicalShiftHeld || virtualShiftActive || capsShiftLocked;
    }

    function isCombiningTibetan(glyph) {
      if (!glyph) return false;
      const cp = glyph.codePointAt(0);
      return cp >= 0x0F71 && cp <= 0x0FBC;
    }

    function formatDisplayGlyph(glyph) {
      if (!glyph) return '';
      return isCombiningTibetan(glyph) ? `◌${glyph}` : glyph;
    }

    function updateStatusCounter() {
      if (!countEl) return;
      const len = Array.from(currentText).length;
      const tags = [];
      if (isShiftActive()) tags.push(capsShiftLocked ? 'CAPS' : 'SHIFT');
      if (deadKeyActive) tags.push('SUBJOIN');
      const badgeHtml = tags.length > 0
        ? `<span class="tutor-layer-pill">${tags.join(' · ')}</span>`
        : '';
      countEl.innerHTML = `${badgeHtml}<span>${len} characters</span>`;
    }

    function updateDisplay() {
      if (currentText.length === 0) {
        displayEl.textContent = '';
        if (emptyStateEl) emptyStateEl.style.display = 'flex';
      } else {
        if (emptyStateEl) emptyStateEl.style.display = 'none';
        displayEl.textContent = currentText;
      }
      updateStatusCounter();
      updateLinguisticInspector(currentText);
    }

    function appendGlyph(glyph) {
      currentText += glyph;
      playKeySound();
      updateDisplay();
    }

    function backspaceChar() {
      const chars = Array.from(currentText);
      if (chars.length === 0) return;
      chars.pop();
      currentText = chars.join('');
      deadKeyActive = false;
      playKeySound();
      updateDisplay();
      syncKeyboardCaps();
    }

    function createSpecialKey(label, specialName, extraClass, onPress) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `t-key special ${extraClass}`;
      btn.setAttribute('data-special', specialName);
      btn.textContent = label;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (displayAreaEl) displayAreaEl.focus({ preventScroll: true });
        flashElement(btn);
        onPress();
      });
      return btn;
    }

    function flashElement(el) {
      if (!el) return;
      el.classList.add('pressed');
      setTimeout(() => el.classList.remove('pressed'), 120);
    }

    function buildKeyboard() {
      matrixEl.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.className = 'keyboard-rows-wrap';

      keyboardRows.forEach((row, rowIndex) => {
        const rowEl = document.createElement('div');
        rowEl.className = 'keyboard-row';

        if (rowIndex === 0) {
          rowEl.appendChild(createSpecialKey('Tab', 'Tab', 'key-tab', () => playKeySound()));
        } else if (rowIndex === 1) {
          rowEl.appendChild(createSpecialKey('Caps', 'Caps', 'key-caps', () => {
            capsShiftLocked = !capsShiftLocked;
            if (!capsShiftLocked) virtualShiftActive = false;
            playKeySound();
            syncKeyboardCaps();
            updateStatusCounter();
          }));
        } else if (rowIndex === 2) {
          rowEl.appendChild(createSpecialKey('Shift', 'Shift', 'key-shift', () => {
            virtualShiftActive = !virtualShiftActive;
            playKeySound();
            syncKeyboardCaps();
            updateStatusCounter();
          }));
        }

        row.forEach(key => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.setAttribute('data-key', key);

          if (key === ' ') {
            btn.className = 't-key key-space';
            btn.title = 'Space (Tsheg ་ / Shift: Space)';
            btn.innerHTML = '<span class="t-latin">SPACE</span><span class="t-glyph">་</span>';
          } else {
            btn.className = 't-key';
            const latinLabel = document.createElement('span');
            latinLabel.className = 't-latin';
            latinLabel.textContent = key.length === 1 && key >= 'a' && key <= 'z' ? key.toUpperCase() : key;

            const glyphLabel = document.createElement('span');
            glyphLabel.className = 't-glyph';

            btn.appendChild(latinLabel);
            btn.appendChild(glyphLabel);
          }

          btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (displayAreaEl) displayAreaEl.focus({ preventScroll: true });
            flashElement(btn);
            handleCharacterInput(key, true);
          });

          rowEl.appendChild(btn);
        });

        if (rowIndex === 0) {
          rowEl.appendChild(createSpecialKey('⌫', 'Backspace', 'key-backspace', backspaceChar));
        } else if (rowIndex === 1) {
          rowEl.appendChild(createSpecialKey('↵', 'Enter', 'key-enter', () => appendGlyph('\n')));
        } else if (rowIndex === 2) {
          rowEl.appendChild(createSpecialKey('Shift', 'Shift', 'key-shift', () => {
            virtualShiftActive = !virtualShiftActive;
            playKeySound();
            syncKeyboardCaps();
            updateStatusCounter();
          }));
        }

        wrap.appendChild(rowEl);
      });

      matrixEl.appendChild(wrap);
      syncKeyboardCaps();
    }

    function syncKeyboardCaps() {
      const shift = isShiftActive();
      const keyButtons = matrixEl.querySelectorAll('.t-key[data-key]');

      keyButtons.forEach(btn => {
        const key = btn.getAttribute('data-key');
        if (key === ' ') {
          const spaceGlyph = btn.querySelector('.t-glyph');
          if (spaceGlyph) spaceGlyph.textContent = shift ? '␣' : '་';
          return;
        }

        const meta = osTibetanLayout[key];
        const glyphEl = btn.querySelector('.t-glyph');
        if (!meta || !glyphEl) return;

        let activeGlyph = shift ? meta.shift : meta.normal;
        let subjoinedMode = false;

        if (deadKeyActive) {
          const lookupKey = shift ? key.toUpperCase() : key.toLowerCase();
          if (subjoinedCharMapping[lookupKey]) {
            activeGlyph = subjoinedCharMapping[lookupKey];
            subjoinedMode = true;
          }
        }

        btn.classList.toggle('dead-key-active', key === 'a' && deadKeyActive && !shift);
        btn.classList.toggle('is-dead-key', key === 'a' && !shift);

        if (key === 'a' && !shift) {
          glyphEl.textContent = '◌྄';
          btn.title = 'Dead Key: press A then consonant to subjoin · Shift+A = ཨ';
          btn.classList.remove('is-combining');
        } else {
          glyphEl.textContent = formatDisplayGlyph(activeGlyph);
          btn.classList.toggle('is-combining', subjoinedMode || isCombiningTibetan(activeGlyph));
          btn.title = `${key.toUpperCase()}: ${meta.normal || 'Subjoin'} (Shift: ${meta.shift})`;
        }
      });

      matrixEl.querySelectorAll('.t-key[data-special="Shift"]').forEach(btn => {
        btn.classList.toggle('shift-active', shift && !capsShiftLocked);
      });
      const capsBtn = matrixEl.querySelector('.t-key[data-special="Caps"]');
      if (capsBtn) capsBtn.classList.toggle('shift-active', capsShiftLocked);
    }

    function handleCharacterInput(key, fromVirtualClick = false) {
      const shift = isShiftActive();
      const lower = key.toLowerCase();
      const meta = osTibetanLayout[lower];
      if (!meta) return;

      if (deadKeyActive) {
        if (lower === 'a' && !shift) {
          deadKeyActive = false;
          playKeySound();
          syncKeyboardCaps();
          updateStatusCounter();
          return;
        }
        const lookupKey = shift ? lower.toUpperCase() : lower;
        deadKeyActive = false;
        if (subjoinedCharMapping[lookupKey]) {
          appendGlyph(subjoinedCharMapping[lookupKey]);
          if (fromVirtualClick && virtualShiftActive && !capsShiftLocked) {
            virtualShiftActive = false;
          }
          syncKeyboardCaps();
          updateStatusCounter();
          return;
        }
      }

      if (lower === 'a' && !shift) {
        deadKeyActive = true;
        playKeySound();
        syncKeyboardCaps();
        updateStatusCounter();
        return;
      }

      const glyph = shift ? meta.shift : meta.normal;
      if (glyph) {
        appendGlyph(glyph);
      }

      if (fromVirtualClick && virtualShiftActive && !capsShiftLocked) {
        virtualShiftActive = false;
      }
      syncKeyboardCaps();
      updateStatusCounter();
    }

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          audioToggleBtn.classList.add('sound-on');
          if (audioIcon) audioIcon.textContent = '🔊';
          if (audioLabel) audioLabel.textContent = 'Sound ON';
          playKeySound();
        } else {
          audioToggleBtn.classList.remove('sound-on');
          if (audioIcon) audioIcon.textContent = '🔇';
          if (audioLabel) audioLabel.textContent = 'Sound OFF';
        }
      });
    }

    sampleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const phrase = btn.getAttribute('data-phrase');
        if (phrase) {
          currentText = phrase;
          deadKeyActive = false;
          playChime();
          updateDisplay();
          syncKeyboardCaps();
          showToast(`Loaded: "${phrase}"`);
        }
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        currentText = '';
        deadKeyActive = false;
        playKeySound();
        updateDisplay();
        syncKeyboardCaps();
      });
    }

    if (backspaceBtn) {
      backspaceBtn.addEventListener('click', backspaceChar);
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!currentText) {
          showToast('Type some Tibetan characters first');
          return;
        }
        navigator.clipboard.writeText(currentText).then(() => {
          showToast('Tibetan text copied to clipboard');
        }).catch(() => {
          showToast('Failed to copy text');
        });
      });
    }

    const shiftedSymbolToBaseKey = {
      '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5',
      '^': '6', '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=',
      '{': '[', '}': ']', '|': '\\', ':': ';', '"': '\'', '<': ',', '>': '.', '?': '/'
    };

    function isTutorVisible() {
      if (!tutorSection) return false;
      const rect = tutorSection.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    window.addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      if (document.querySelector('.project-modal.active') || document.querySelector('.command-palette-overlay.active')) return;

      if (e.key === 'Shift') {
        if (!physicalShiftHeld) {
          physicalShiftHeld = true;
          syncKeyboardCaps();
          updateStatusCounter();
        }
        return;
      }

      const displayFocused = document.activeElement === displayAreaEl;
      const activeIsInteractive = ['BUTTON', 'A'].includes(document.activeElement.tagName);
      const canCapture = displayFocused || (!activeIsInteractive && document.activeElement === document.body && isTutorVisible());
      if (!canCapture) return;

      if (e.key === 'Backspace') {
        if (displayFocused || currentText.length > 0 || window.location.hash === '#tutor') {
          e.preventDefault();
          flashElement(matrixEl.querySelector('.t-key[data-special="Backspace"]'));
          backspaceChar();
        }
        return;
      }

      if (e.key === 'Enter' && displayFocused) {
        e.preventDefault();
        flashElement(matrixEl.querySelector('.t-key[data-special="Enter"]'));
        appendGlyph('\n');
        return;
      }

      if (e.key === ' ') {
        if (displayFocused || currentText.length > 0 || window.location.hash === '#tutor') {
          e.preventDefault();
          flashElement(matrixEl.querySelector('.t-key[data-key=" "]'));
          handleCharacterInput(' ');
        }
        return;
      }

      const mappedKey = shiftedSymbolToBaseKey[e.key] || e.key.toLowerCase();
      if (e.key.length === 1 && osTibetanLayout[mappedKey]) {
        e.preventDefault();
        flashElement(matrixEl.querySelector(`.t-key[data-key="${CSS.escape(mappedKey)}"]`));
        handleCharacterInput(mappedKey);
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift' && physicalShiftHeld) {
        physicalShiftHeld = false;
        syncKeyboardCaps();
        updateStatusCounter();
      }
    });

    window.addEventListener('blur', () => {
      if (physicalShiftHeld) {
        physicalShiftHeld = false;
        syncKeyboardCaps();
        updateStatusCounter();
      }
    });

    buildKeyboard();
    updateDisplay();
  }

  // --- 7. Project Category Filter ---
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('filtered-out');
          } else {
            card.classList.add('filtered-out');
          }
        });
      });
    });
  }

  // --- 8. Project Dossier Modal System with Architecture Blueprints ---
  const projectDossiers = {
    'home-cta': {
      title: 'Central Tibetan Relief Committee (CTRC) Official Portal',
      institution: 'Department of Home, Central Tibetan Administration (CTA)',
      role: 'Lead Full Stack Developer & Systems Engineer',
      liveUrl: 'https://centraltibetanreliefcommittee.net/',
      stack: ['Civic Tech', 'WordPress', 'React', 'PostgreSQL', 'Linux IT'],
      status: 'Live Production System',
      description: 'The primary humanitarian relief and rehabilitation web portal for the Central Tibetan Administration’s Department of Home (CTRC), serving over 40 Tibetan refugee settlements across India, Nepal, and Bhutan.',
      details: [
        'Centralizes settlement rehabilitation, elder sponsorship programs, community loans, and agricultural development into a secure institutional portal.',
        'High security role-based permissions designed to protect sensitive refugee administration records and civil documents.',
        'PostgreSQL schema and custom backend services optimized for multi-settlement population registries, welfare disbursement tracking, and official announcements.',
        'Clean, accessible responsive user interface ensuring elderly welfare officers, donors, and settlement leaders can easily navigate and submit updates.'
      ],
      metrics: '40+ Settlements Connected · Live at centraltibetanreliefcommittee.net · Dual-Tier Security',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="70" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Settlement Clients</text>
          <text x="70" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">40+ Clusters</text>

          <path d="M130 50 H170" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 3"/>
          <polygon points="170,47 176,50 170,53" fill="#38BDF8"/>

          <rect x="176" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="236" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Nginx Gateway</text>
          <text x="236" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">SSL & Rate Limit</text>

          <path d="M296 50 H336" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="336,47 342,50 336,53" fill="#38BDF8"/>

          <rect x="342" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="402" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Laravel REST API</text>
          <text x="402" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Auth & Business Logic</text>

          <path d="M462 50 H502" stroke="#22C55E" stroke-width="2"/>
          <polygon points="502,47 508,50 502,53" fill="#22C55E"/>

          <rect x="508" y="25" width="102" height="50" rx="8" fill="#131209" stroke="#D4AF37"/>
          <text x="559" y="47" fill="#D4AF37" font-size="11" font-family="monospace" text-anchor="middle">PostgreSQL</text>
          <text x="559" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">ACID Relations</text>
        </svg>`
    },
    'ms-project': {
      title: 'MS Project — CTA Institutional Management System',
      institution: 'Department of Home, Central Tibetan Administration',
      role: 'Full Stack Architect & Backend Developer',
      stack: ['Laravel', 'PostgreSQL', 'Livewire', 'Figma', 'Docker'],
      status: 'Core Internal Platform',
      description: 'A comprehensive internal workflow coordination and resource allocation management platform engineered specifically for the administrative machinery of the Department of Home.',
      details: [
        'Streamlines inter-departmental project proposals, budget tracking, milestone approvals, and staff delegation.',
        'Automated document verification pipeline eliminating paper-based delays in settlement rehabilitation grants.',
        'Audited transactional database with strict rollback integrity, preventing data corruption during multi-user write operations.',
        'Custom administrative dashboards built following modular design tokens created in Figma.'
      ],
      metrics: '100% Paperless Workflow Transition · Sub-second Query Latency · Role-Based Access',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="130" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="75" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Officer Permissions</text>
          <text x="75" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">RBAC Enforcement</text>

          <path d="M140 50 H180" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="180,47 186,50 180,53" fill="#38BDF8"/>

          <rect x="186" y="25" width="140" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="256" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Workflow State Machine</text>
          <text x="256" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">Grants & Milestones</text>

          <path d="M326 50 H366" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="366,47 372,50 366,53" fill="#38BDF8"/>

          <rect x="372" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="432" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">PostgreSQL ACID</text>
          <text x="432" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Strict Rollbacks</text>

          <path d="M492 50 H532" stroke="#22C55E" stroke-width="2"/>
          <polygon points="532,47 538,50 532,53" fill="#22C55E"/>

          <rect x="538" y="25" width="72" height="50" rx="8" fill="#131209" stroke="#22C55E"/>
          <text x="574" y="47" fill="#22C55E" font-size="11" font-family="monospace" text-anchor="middle">Audit</text>
          <text x="574" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Ledger</text>
        </svg>`
    },
    'tibetan-keyboard': {
      title: 'Tibetan Keyboard & Interactive Typing Tutor',
      institution: 'Diaspora Education & Digital Literacy Initiative',
      role: 'Creator, UI/UX Designer & Frontend Engineer',
      stack: ['JavaScript (ESM)', 'CSS Grid', 'Unicode Stacking', 'Figma', 'Web Audio'],
      status: 'Public Educational Tool',
      liveUrl: 'https://tibetankeyboard.vercel.app/',
      description: 'A purpose-built digital typing tutor and interactive keyboard simulator created to preserve Tibetan orthography and teach standard typing fluency to young Tibetans in exile and linguistic researchers.',
      details: [
        'Solves the friction of typing complex Tibetan Unicode stacks (root letter, superscripts, subjoined consonants, and vowel signs).',
        'Includes progressive typing drills ranging from isolated 30 consonants to multi-character Classical Tibetan text excerpts.',
        'Zero-dependency standalone architecture that runs seamlessly on low-bandwidth school laptops and mobile browsers.',
        'Visual layout maps intuitive standard QWERTY positions to Sambhota Tibetan keyboard standards.'
      ],
      metrics: '30 Consonants + 4 Vowel Diacritics · Real-time Syllable Parsing · Zero Latency',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="70" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Keyboard Event</text>
          <text x="70" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Physical / Touch</text>

          <path d="M130 50 H170" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="170,47 176,50 170,53" fill="#38BDF8"/>

          <rect x="176" y="25" width="130" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="241" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Sambhota Mapping</text>
          <text x="241" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">QWERTY to Uchen</text>

          <path d="M306 50 H346" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="346,47 352,50 346,53" fill="#38BDF8"/>

          <rect x="352" y="25" width="140" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="422" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Unicode Normalizer</text>
          <text x="422" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">NFC Stack Composition</text>

          <path d="M492 50 H532" stroke="#D4AF37" stroke-width="2"/>
          <polygon points="532,47 538,50 532,53" fill="#D4AF37"/>

          <rect x="538" y="25" width="72" height="50" rx="8" fill="#131209" stroke="#D4AF37"/>
          <text x="574" y="47" fill="#D4AF37" font-size="11" font-family="monospace" text-anchor="middle">DOM</text>
          <text x="574" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Display</text>
        </svg>`
    },
    'digital-archive': {
      title: 'The Tibetan Digital Archive System',
      institution: 'Department of Home / Tibetan Cultural Preservation',
      role: 'Architect & Lead Engineer',
      stack: ['React', 'PostgreSQL', 'Laravel', 'Object Storage', 'Metadata Engine'],
      status: 'Currently in Active Development (2026)',
      description: 'A modern, resilient digital archiving platform designed to preserve decades of fragile diaspora settlement history, land rehabilitation deeds, elder oral histories, and institutional records.',
      details: [
        'Multi-faceted cataloging engine supporting Tibetan language metadata, bilingual search, and historical chronology tagging.',
        'Immutable audit logs guaranteeing document provenance and historical verification for generations to come.',
        'High-density archival viewer supporting high-resolution document scans, optical character recognition (OCR) indexing, and PDF rendering.',
        'Engineered with offline-tolerant synchronization for remote settlement archives with intermittent network connectivity.'
      ],
      metrics: 'Active Build · Long-term Preservation Architecture · Dual-Script Indexing',
      blueprint: `
        <svg viewBox="0 0 620 100" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="25" width="120" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="70" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Document Ingest</text>
          <text x="70" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Historical Records</text>

          <path d="M130 50 H170" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="170,47 176,50 170,53" fill="#38BDF8"/>

          <rect x="176" y="25" width="140" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="246" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">Metadata Classifier</text>
          <text x="246" y="62" fill="#38BDF8" font-size="9" font-family="sans-serif" text-anchor="middle">Tibetan & English Index</text>

          <path d="M316 50 H356" stroke="#38BDF8" stroke-width="2"/>
          <polygon points="356,47 362,50 356,53" fill="#38BDF8"/>

          <rect x="362" y="25" width="130" height="50" rx="8" fill="#1F1F1F" stroke="#313131"/>
          <text x="427" y="47" fill="#FFFFFF" font-size="11" font-family="monospace" text-anchor="middle">PostgreSQL Search</text>
          <text x="427" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">GIN & Full-Text</text>

          <path d="M492 50 H532" stroke="#22C55E" stroke-width="2"/>
          <polygon points="532,47 538,50 532,53" fill="#22C55E"/>

          <rect x="538" y="25" width="72" height="50" rx="8" fill="#131209" stroke="#38BDF8"/>
          <text x="574" y="47" fill="#38BDF8" font-size="11" font-family="monospace" text-anchor="middle">S3 Vault</text>
          <text x="574" y="62" fill="#9B9B9B" font-size="9" font-family="sans-serif" text-anchor="middle">Cold Store</text>
        </svg>`
    }
  };

  function initProjectModal() {
    const overlay = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-project-title');
    const modalInstitution = document.getElementById('modal-project-institution');
    const modalRole = document.getElementById('modal-project-role');
    const modalStack = document.getElementById('modal-project-stack');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalDetails = document.getElementById('modal-project-details');
    const modalMetrics = document.getElementById('modal-project-metrics');
    const modalBlueprint = document.getElementById('modal-project-blueprint');

    if (!overlay) return;

    function openModal(projectId) {
      const data = projectDossiers[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalInstitution.textContent = data.institution;
      modalRole.textContent = data.role;
      modalDesc.textContent = data.description;
      modalMetrics.textContent = data.metrics;

      if (modalBlueprint && data.blueprint) {
        modalBlueprint.innerHTML = data.blueprint;
      }

      // Render stack badges
      let stackHtml = data.stack.map(s => `<span class="project-tag">${s}</span>`).join('');
      if (data.liveUrl) {
        stackHtml += `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-tag" style="background-color:var(--accent-gold); color:var(--bg-canvas); text-decoration:none; font-weight:600;">Launch Live App ↗</a>`;
      }
      modalStack.innerHTML = stackHtml;

      // Render details bullet list
      modalDetails.innerHTML = data.details.map(d => `<li class="stack-point"><strong style="color:var(--accent-gold);margin-right:6px;">✦</strong> ${d}</li>`).join('');

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const id = trigger.getAttribute('data-open-modal');
        openModal(id);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });
  }

  // --- 9. Toast Notification System ---
  let toastTimeout;
  function showToast(message) {
    const toast = document.getElementById('global-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('visible');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }

  // --- 10. Copy Email Handlers ---
  function initCopyEmail() {
    const email = 'tenzin7755@gmail.com';
    const copyTriggers = document.querySelectorAll('[data-copy-email]');

    copyTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          showToast(`${email} copied to clipboard`);
        }).catch(() => {
          showToast(`Contact: ${email}`);
        });
      });
    });
  }

  // --- 11. Command Palette (Cmd+K) Spotlight Modal ---
  function initCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    const searchInput = document.getElementById('cmd-search-input');
    const items = document.querySelectorAll('.cmd-item');
    const triggerBtn = document.getElementById('nav-search-trigger');
    if (!palette) return;

    function openPalette() {
      palette.classList.add('active');
      if (searchInput) {
        searchInput.value = '';
        items.forEach(i => i.style.display = 'flex');
        setTimeout(() => searchInput.focus(), 60);
      }
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', openPalette);
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });
    }

    function closePalette() {
      palette.classList.remove('active');
    }

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (palette.classList.contains('active')) {
          closePalette();
        } else {
          openPalette();
        }
      }
      if (e.key === 'Escape' && palette.classList.contains('active')) {
        closePalette();
      }
    });

    palette.addEventListener('click', (e) => {
      if (e.target === palette) closePalette();
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        closePalette();
        if (action === 'work') document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        else if (action === 'tutor') document.getElementById('tutor')?.scrollIntoView({ behavior: 'smooth' });
        else if (action === 'stack') document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
        else if (action === 'email') {
          navigator.clipboard.writeText('tenzin7755@gmail.com').then(() => {
            showToast('tenzin7755@gmail.com copied to clipboard');
          });
        }
        else if (action === 'github') window.open('https://github.com/tenzin67', '_blank');
        else if (action === 'linkedin') window.open('https://www.linkedin.com/in/tenzin-palgyal/', '_blank');
        else if (action === 'app') window.open('https://tibetankeyboard.vercel.app/', '_blank');
        else if (action === 'ctrc') window.open('https://centraltibetanreliefcommittee.net/', '_blank');
        else if (action === 'nangsi') {
          if (window.openNangsiModal) window.openNangsiModal();
        }
      });
    });
  }

  // --- 12. Keyboard Shortcuts ---
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if ((e.key === 'e' || e.key === 'E') && !e.metaKey && !e.ctrlKey) {
        navigator.clipboard.writeText('tenzin7755@gmail.com').then(() => {
          showToast('Quick key [E]: Email copied to clipboard');
        });
      }
    });
  }

  // --- 13. Nangsi MIS Interactive Operations Simulator ---
  function initNangsiDemo() {
    const modal = document.getElementById('nangsi-modal');
    const launchBtn = document.getElementById('launch-nangsi-demo-btn');
    const closeBtn = document.getElementById('nangsi-modal-close');
    const tableBody = document.getElementById('nangsi-table-body');
    const inspector = document.getElementById('nangsi-project-inspector');
    const searchInput = document.getElementById('nangsi-search');
    const settlementFilter = document.getElementById('nangsi-settlement-filter');
    const statusFilter = document.getElementById('nangsi-status-filter');
    const tabBtns = document.querySelectorAll('.nangsi-tab-btn');
    const viewProjects = document.getElementById('nangsi-view-projects');
    const viewRadar = document.getElementById('nangsi-view-radar');

    if (!modal) return;

    const sampleProjects = [
      {
        code: 'PRJ-2026-0042',
        title: 'Solar Irrigation Deep-well Grid (Camp 4 & 5)',
        sector: 'Agriculture & Green Energy',
        settlement: 'Bylakuppe Lugsung',
        pacInitial: 4200000,
        bargyeKatrol: 650000,
        pacTotal: 4850000,
        disbursed: 3783000,
        status: 'In Progress',
        donor: 'CTRC / Bureau of PRM',
        officer: 'Tenzin Norbu (Desk Officer)',
        handover: '15 Dec 2026',
        beneficiaries: '480 Farmer Households'
      },
      {
        code: 'PRJ-2026-0038',
        title: 'Elder Care Home Solar Heating & Sanitation',
        sector: 'Elder Welfare & Healthcare',
        settlement: 'Mundgod Doeguling',
        pacInitial: 3200000,
        bargyeKatrol: 0,
        pacTotal: 3200000,
        disbursed: 3200000,
        status: 'Completed',
        donor: 'CTA Department of Home Special Grant',
        officer: 'Pema Dolma (Coordinator)',
        handover: 'Completed (Oct 2026)',
        beneficiaries: '124 Elderly Residents'
      },
      {
        code: 'PRJ-2026-0045',
        title: 'High-Altitude Passive Winter Greenhouses',
        sector: 'Sustainable Agriculture',
        settlement: 'Ladakh Sonamling',
        pacInitial: 2500000,
        bargyeKatrol: 280000,
        pacTotal: 2780000,
        disbursed: 1251000,
        status: 'In Progress',
        donor: 'USAID / The Tibet Fund',
        officer: 'Karma Wangchuk (Civil Works)',
        handover: '28 Feb 2027',
        beneficiaries: '85 Agro-Pastoralist Families'
      },
      {
        code: 'PRJ-2026-0051',
        title: 'Community RO Water Filtration & Treatment',
        sector: 'Water, Sanitation & Hygiene (WASH)',
        settlement: 'Clement Town',
        pacInitial: 1920000,
        bargyeKatrol: 0,
        pacTotal: 1920000,
        disbursed: 288000,
        status: 'Approved',
        donor: 'CTRC Welfare Fund',
        officer: 'Lobsang Tashi (Desk Officer)',
        handover: '10 Apr 2027',
        beneficiaries: '1,150 Residents'
      },
      {
        code: 'PRJ-2026-0035',
        title: 'Settlement Internal Arterial Road & Storm Drainage',
        sector: 'Civic Infrastructure',
        settlement: 'Hunsur Rabgyaling',
        pacInitial: 5000000,
        bargyeKatrol: 400000,
        pacTotal: 5400000,
        disbursed: 5400000,
        status: 'Completed',
        donor: 'CTRC Infrastructure Fund',
        officer: 'Sonam Yangzom (Settlement Officer)',
        handover: 'Completed (Aug 2026)',
        beneficiaries: 'Entire Settlement (2,400 People)'
      },
      {
        code: 'PRJ-2026-0058',
        title: 'Community Primary Healthcare Clinic Modernization',
        sector: 'Healthcare & Clinical Care',
        settlement: 'Bir Tibetan Society',
        pacInitial: 2000000,
        bargyeKatrol: 250000,
        pacTotal: 2250000,
        disbursed: 1462500,
        status: 'In Progress',
        donor: 'Direct Community Aid / CTRC',
        officer: 'Dawa Tsering (Admin)',
        handover: '20 Jan 2027',
        beneficiaries: '650 Residents & Monastic Youth'
      }
    ];

    let selectedProject = sampleProjects[0];

    function formatINR(val) {
      return '₹' + Number(val).toLocaleString('en-IN');
    }

    function renderInspector(proj) {
      if (!inspector || !proj) return;
      const unspent = proj.pacTotal - proj.disbursed;
      const pct = Math.round((proj.disbursed / proj.pacTotal) * 100);

      inspector.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
          <div>
            <span class="caption-3" style="color:var(--accent-gold);">${proj.code} · ${proj.settlement}</span>
            <h4 class="title-2" style="margin-top:2px; color:var(--text-primary);">${proj.title}</h4>
            <div class="caption-4 text-secondary">Sector: ${proj.sector} · Target: ${proj.beneficiaries}</div>
          </div>
          <span class="nangsi-status-badge ${proj.status === 'Completed' ? 'nangsi-status-completed' : (proj.status === 'In Progress' ? 'nangsi-status-in-progress' : 'nangsi-status-approved')}">${proj.status}</span>
        </div>

        <div class="nangsi-detail-grid" style="margin-top:var(--space-100);">
          <div style="background:var(--bg-surface-1); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div class="caption-5 text-muted font-mono">FINANCIAL PAC BREAKDOWN</div>
            <div class="body-2 font-mono" style="color:var(--accent-gold); margin-top:4px;">${formatINR(proj.pacTotal)}</div>
            <div class="caption-5 text-secondary" style="margin-top:2px;">Initial: ${formatINR(proj.pacInitial)} ${proj.bargyeKatrol > 0 ? `+ Extension: ${formatINR(proj.bargyeKatrol)}` : '(No Extension)'}</div>
          </div>

          <div style="background:var(--bg-surface-1); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div class="caption-5 text-muted font-mono">DISBURSEMENT PROGRESS (${pct}%)</div>
            <div class="body-2 font-mono" style="color:var(--accent-green); margin-top:4px;">${formatINR(proj.disbursed)}</div>
            <div class="caption-5 text-secondary" style="margin-top:2px;">Unspent Balance: ${formatINR(unspent)}</div>
          </div>

          <div style="background:var(--bg-surface-1); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div class="caption-5 text-muted font-mono">INSTITUTIONAL GOVERNANCE</div>
            <div class="body-4" style="color:var(--text-primary); margin-top:4px;">${proj.officer}</div>
            <div class="caption-5 text-secondary" style="margin-top:2px;">Donor: ${proj.donor} · Handover: ${proj.handover}</div>
          </div>
        </div>
      `;
    }

    function renderTable() {
      if (!tableBody) return;
      const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const setFilter = settlementFilter ? settlementFilter.value : 'all';
      const statFilter = statusFilter ? statusFilter.value : 'all';

      const filtered = sampleProjects.filter(p => {
        const matchQ = !q || p.code.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.settlement.toLowerCase().includes(q) || p.sector.toLowerCase().includes(q);
        const matchSet = setFilter === 'all' || p.settlement.toLowerCase().includes(setFilter.toLowerCase());
        const matchStat = statFilter === 'all' || p.status === statFilter;
        return matchQ && matchSet && matchStat;
      });

      if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--text-muted);">No infrastructure records matched this filter query.</td></tr>`;
        return;
      }

      tableBody.innerHTML = filtered.map(p => {
        const isSel = selectedProject && selectedProject.code === p.code;
        const pct = Math.round((p.disbursed / p.pacTotal) * 100);
        const badgeClass = p.status === 'Completed' ? 'nangsi-status-completed' : (p.status === 'In Progress' ? 'nangsi-status-in-progress' : 'nangsi-status-approved');
        return `
          <tr data-code="${p.code}" class="${isSel ? 'selected' : ''}">
            <td class="font-mono" style="font-weight:600; color:var(--accent-cyan);">${p.code}</td>
            <td>
              <div style="font-weight:500; color:var(--text-primary);">${p.title}</div>
              <div class="caption-5 text-muted">${p.sector}</div>
            </td>
            <td>${p.settlement}</td>
            <td class="font-mono" style="font-weight:600;">${formatINR(p.pacTotal)}</td>
            <td>
              <div class="font-mono">${formatINR(p.disbursed)}</div>
              <div class="caption-5 text-muted">${pct}% disbursed</div>
            </td>
            <td><span class="nangsi-status-badge ${badgeClass}">${p.status}</span></td>
          </tr>
        `;
      }).join('');

      tableBody.querySelectorAll('tr[data-code]').forEach(row => {
        row.addEventListener('click', () => {
          const code = row.getAttribute('data-code');
          const found = sampleProjects.find(x => x.code === code);
          if (found) {
            selectedProject = found;
            renderTable();
            renderInspector(found);
          }
        });
      });
    }

    if (searchInput) searchInput.addEventListener('input', renderTable);
    if (settlementFilter) settlementFilter.addEventListener('change', renderTable);
    if (statusFilter) statusFilter.addEventListener('change', renderTable);

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        if (tab === 'projects') {
          if (viewProjects) viewProjects.style.display = 'block';
          if (viewRadar) viewRadar.style.display = 'none';
        } else {
          if (viewProjects) viewProjects.style.display = 'none';
          if (viewRadar) viewRadar.style.display = 'block';
        }
      });
    });

    function openNangsiModal() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderTable();
      renderInspector(selectedProject);
    }

    function closeNangsiModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (launchBtn) launchBtn.addEventListener('click', openNangsiModal);
    if (closeBtn) closeBtn.addEventListener('click', closeNangsiModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeNangsiModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeNangsiModal();
    });

    window.openNangsiModal = openNangsiModal;
  }

  // --- Initialize All Systems on DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();
    initTaglineReveal();
    initScrollReveals();
    initTibetanTutor();
    initProjectFilters();
    initProjectModal();
    initCommandPalette();
    initCopyEmail();
    initKeyboardShortcuts();
    initNangsiDemo();
  });

})();
