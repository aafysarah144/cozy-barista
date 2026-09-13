/* ==========================================================================
   COZY BARISTA ☕ - SCRIPT
   Interactive Logic, Web Audio Synthesizer, & LocalStorage Persistence
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Audio Synthesizer (Native Web Audio API - Zero External Files) ---
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Liquid Pour Sound: Filtered soft noise sweep
  function playPourSound() {
    if (!state.soundEnabled) return;
    initAudio();

    const bufferSize = audioCtx.sampleRate * 0.5; // 0.5 seconds
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // White noise
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    // Filter to sound like liquid rushing into a glass
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.45);
    filter.Q.value = 3.0;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.48);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start();
  }

  // Topping Drop Sound: Playful pitch-bend plop
  function playDropSound(freq = 420) {
    if (!state.soundEnabled) return;
    initAudio();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  }

  // Sip Sound: Gentle soft pop/bubble sound
  function playSipSound() {
    if (!state.soundEnabled) return;
    initAudio();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(580, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.18);
  }

  // Cozy Musical Chime: Soft arpeggio when a quote/drink is ready
  function playChimeSound() {
    if (!state.soundEnabled) return;
    initAudio();

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = audioCtx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.52);
    });
  }

  // Easter Egg Magic Chime: Sparkly ascending glissando
  function playMagicSound() {
    if (!state.soundEnabled) return;
    initAudio();

    const magicNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    magicNotes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = audioCtx.currentTime + idx * 0.09;
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  }

  // --- Peaceful Lo-Fi Music Box Background Song ---
  let isMusicPlaying = false;
  let musicTimer = null;
  let musicGainNode = null;

  // Soothing 4-bar cozy cafe progression (frequencies in Hz)
  // Cmaj7 -> Am7 -> Fmaj7 -> G7
  const LOFI_SONG_PATTERN = [
    // Bar 1: Cmaj7 warmth
    { note: 261.63, time: 0.0, dur: 0.45 },   // C4
    { note: 329.63, time: 0.5, dur: 0.45 },   // E4
    { note: 392.00, time: 1.0, dur: 0.45 },   // G4
    { note: 523.25, time: 1.5, dur: 0.60 },   // C5
    { note: 493.88, time: 2.25, dur: 0.45 },  // B4
    { note: 392.00, time: 2.75, dur: 0.55 },  // G4

    // Bar 2: Am7 cozy
    { note: 220.00, time: 3.5, dur: 0.45 },   // A3
    { note: 329.63, time: 4.0, dur: 0.45 },   // E4
    { note: 440.00, time: 4.5, dur: 0.45 },   // A4
    { note: 587.33, time: 5.0, dur: 0.55 },   // D5
    { note: 523.25, time: 5.75, dur: 0.45 },  // C5
    { note: 440.00, time: 6.25, dur: 0.50 },  // A4

    // Bar 3: Fmaj7 sweetness
    { note: 174.61, time: 7.0, dur: 0.45 },   // F3
    { note: 261.63, time: 7.5, dur: 0.45 },   // C4
    { note: 329.63, time: 8.0, dur: 0.45 },   // E4
    { note: 440.00, time: 8.5, dur: 0.55 },   // A4
    { note: 659.25, time: 9.25, dur: 0.70 },  // E5
    { note: 523.25, time: 10.0, dur: 0.50 },  // C5

    // Bar 4: G gentle resolution
    { note: 196.00, time: 10.75, dur: 0.45 }, // G3
    { note: 246.94, time: 11.25, dur: 0.45 }, // B3
    { note: 293.66, time: 11.75, dur: 0.45 }, // D4
    { note: 392.00, time: 12.25, dur: 0.55 }, // G4
    { note: 493.88, time: 13.0, dur: 0.65 },  // B4
    { note: 392.00, time: 13.75, dur: 0.50 }  // G4
  ];
  const LOOP_DURATION = 14.5; // seconds per loop

  function playMusicNote(freq, startTime, duration) {
    if (!audioCtx || !musicGainNode) return;

    const osc = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, startTime); // warm, mellow tone

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(musicGainNode);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  function scheduleMusicLoop() {
    if (!isMusicPlaying || !audioCtx) return;

    const startAudioTime = audioCtx.currentTime + 0.05;
    LOFI_SONG_PATTERN.forEach(item => {
      playMusicNote(item.note, startAudioTime + item.time, item.dur);
    });

    musicTimer = setTimeout(() => {
      if (isMusicPlaying) {
        scheduleMusicLoop();
      }
    }, (LOOP_DURATION - 0.1) * 1000);
  }

  function toggleMusic() {
    initAudio();
    isMusicPlaying = !isMusicPlaying;

    const btnMusic = document.getElementById('btnMusic');
    const icon = btnMusic.querySelector('.btn-icon');
    const text = btnMusic.querySelector('.btn-text');

    if (isMusicPlaying) {
      if (!musicGainNode) {
        musicGainNode = audioCtx.createGain();
        musicGainNode.gain.setValueAtTime(0.35, audioCtx.currentTime);
        musicGainNode.connect(audioCtx.destination);
      } else {
        musicGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        musicGainNode.gain.setValueAtTime(0.35, audioCtx.currentTime);
      }

      btnMusic.classList.add('playing');
      icon.textContent = '🎶';
      text.textContent = 'Music: ON';
      scheduleMusicLoop();
    } else {
      if (musicTimer) clearTimeout(musicTimer);
      if (musicGainNode) {
        musicGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      }
      btnMusic.classList.remove('playing');
      icon.textContent = '🎵';
      text.textContent = 'Music: OFF';
    }
  }

  // --- 2. App State & LocalStorage ---
  const state = {
    currentBase: null,
    baseColor: '#4a2c11',
    baseName: '',
    liquidLevel: 0, // 0 to 100%
    toppings: new Set(),
    drinksCrafted: 0,
    sipsTaken: 0,
    easterEggUnlocked: false,
    theme: 'day',
    soundEnabled: true
  };

  // Load Saved LocalStorage Data
  function loadPersistedData() {
    try {
      const saved = localStorage.getItem('cozy_barista_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        state.drinksCrafted = parsed.drinksCrafted || 0;
        state.sipsTaken = parsed.sipsTaken || 0;
        state.easterEggUnlocked = parsed.easterEggUnlocked || false;
        state.theme = parsed.theme || 'day';
        state.soundEnabled = parsed.soundEnabled !== undefined ? parsed.soundEnabled : true;
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or disabled', e);
    }
  }

  // Save to LocalStorage
  function savePersistedData() {
    try {
      const payload = {
        drinksCrafted: state.drinksCrafted,
        sipsTaken: state.sipsTaken,
        easterEggUnlocked: state.easterEggUnlocked,
        theme: state.theme,
        soundEnabled: state.soundEnabled
      };
      localStorage.setItem('cozy_barista_data', JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }

  // --- 4. DOM Element References ---
  const body = document.body;
  const btnMusic = document.getElementById('btnMusic');
  const btnSound = document.getElementById('btnSound');
  const btnTheme = document.getElementById('btnTheme');
  const btnStats = document.getElementById('btnStats');
  const celestialBody = document.getElementById('celestialBody');
  const rainContainer = document.getElementById('rainContainer');

  const cupWrapper = document.getElementById('cupWrapper');
  const steamContainer = document.getElementById('steamContainer');
  const liquid = document.getElementById('liquid');
  const bobaContainer = document.getElementById('bobaContainer');
  const iceCubes = document.getElementById('iceCubes');
  const whippedCream = document.getElementById('whippedCream');
  const sprinklesLayer = document.getElementById('sprinklesLayer');
  const statusText = document.getElementById('statusText');
  const statusIndicator = document.querySelector('.status-indicator');

  const easterEggBanner = document.getElementById('easterEggBanner');

  const baseButtons = document.querySelectorAll('.base-btn');
  const toppingButtons = document.querySelectorAll('.topping-btn');
  const btnSip = document.getElementById('btnSip');
  const btnRefill = document.getElementById('btnRefill');
  const btnClean = document.getElementById('btnClean');

  const statsModal = document.getElementById('statsModal');
  const modalClose = document.getElementById('modalClose');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnResetStats = document.getElementById('btnResetStats');
  const statDrinks = document.getElementById('statDrinks');
  const statSips = document.getElementById('statSips');
  const easterEggIcon = document.getElementById('easterEggIcon');
  const easterEggStatus = document.getElementById('easterEggStatus');
  const easterEggDetail = document.getElementById('easterEggDetail');

  // --- 5. Raindrop Generator for Rainy Night Theme ---
  function buildRainDrops() {
    rainContainer.innerHTML = '';
    const numDrops = 28;
    for (let i = 0; i < numDrops; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.6 + Math.random() * 0.4}s`;
      drop.style.animationDelay = `${Math.random() * 1.5}s`;
      rainContainer.appendChild(drop);
    }
  }

  // --- 6. Core Interaction Logic ---

  // Interaction 1: Choose Drink Base
  function selectBase(baseKey, color, name) {
    state.currentBase = baseKey;
    state.baseColor = color;
    state.baseName = name;
    state.liquidLevel = 100;

    // Reset galaxy effect if previously active
    liquid.classList.remove('galaxy-mode');
    easterEggBanner.classList.remove('visible');

    // Update Visuals
    liquid.style.backgroundColor = color;
    liquid.style.height = '100%';
    steamContainer.classList.add('steaming');

    // Button states
    baseButtons.forEach(btn => {
      if (btn.dataset.base === baseKey) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Update Status
    statusIndicator.classList.add('ready');
    statusText.textContent = `Brewed: ${name}! Ready to enjoy.`;

    // Stats
    state.drinksCrafted++;
    savePersistedData();
    updateStatsUI();

    // Sound
    playPourSound();

    // Re-check Easter egg in case all toppings were already on
    checkEasterEgg();
  }

  // Interaction 2: Add or Remove Custom Topping
  function toggleTopping(toppingKey) {
    const isAdding = !state.toppings.has(toppingKey);

    if (isAdding) {
      state.toppings.add(toppingKey);
      playDropSound(toppingKey === 'boba' ? 220 : 540);
    } else {
      state.toppings.delete(toppingKey);
      playDropSound(300);
    }

    // Toggle button UI
    const targetBtn = document.querySelector(`.topping-btn[data-topping="${toppingKey}"]`);
    if (targetBtn) {
      targetBtn.classList.toggle('selected', isAdding);
    }

    // Toggle Cup Visuals
    if (toppingKey === 'boba') bobaContainer.classList.toggle('visible', isAdding);
    if (toppingKey === 'ice') iceCubes.classList.toggle('visible', isAdding);
    if (toppingKey === 'cream') whippedCream.classList.toggle('visible', isAdding);
    if (toppingKey === 'sprinkles') sprinklesLayer.classList.toggle('visible', isAdding);

    // Update Status Text
    const count = state.toppings.size;
    if (state.currentBase) {
      statusText.textContent = `${state.baseName} with ${count} topping${count !== 1 ? 's' : ''}`;
    }

    checkEasterEgg();
  }

  // Interaction 3: "Take a Sip"
  function takeSip() {
    if (state.liquidLevel <= 0) {
      statusText.textContent = "Your cup is empty! Pick a base or tap 'Top Up'.";
      playDropSound(180);
      return;
    }

    // Lower the liquid
    state.liquidLevel = Math.max(0, state.liquidLevel - 34);
    liquid.style.height = `${state.liquidLevel}%`;

    // Tactile squish animation on cup
    cupWrapper.style.transform = 'scale(0.95)';
    setTimeout(() => {
      cupWrapper.style.transform = '';
    }, 200);

    // Sfx
    playSipSound();

    // Increase sip count
    state.sipsTaken++;
    savePersistedData();
    updateStatsUI();

    if (state.liquidLevel === 0) {
      steamContainer.classList.remove('steaming');
      statusIndicator.classList.remove('ready');
      statusText.textContent = "Ahhh, delicious to the last drop! ☕";
    } else {
      statusText.textContent = `Sipping... (${state.liquidLevel}% remaining)`;
    }
  }

  // Top Up Current Drink
  function refillDrink() {
    if (!state.currentBase) {
      statusText.textContent = "Choose a drink base first to pour!";
      playDropSound(180);
      return;
    }
    state.liquidLevel = 100;
    liquid.style.height = '100%';
    steamContainer.classList.add('steaming');
    statusIndicator.classList.add('ready');
    statusText.textContent = `Topped up your ${state.baseName}!`;
    playPourSound();
  }

  // Fresh Cup / Reset
  function freshCup() {
    state.currentBase = null;
    state.liquidLevel = 0;
    state.toppings.clear();

    liquid.style.height = '0%';
    liquid.classList.remove('galaxy-mode');
    steamContainer.classList.remove('steaming');
    bobaContainer.classList.remove('visible');
    iceCubes.classList.remove('visible');
    whippedCream.classList.remove('visible');
    sprinklesLayer.classList.remove('visible');
    easterEggBanner.classList.remove('visible');

    baseButtons.forEach(btn => btn.classList.remove('selected'));
    toppingButtons.forEach(btn => btn.classList.remove('selected'));

    statusIndicator.classList.remove('ready');
    statusText.textContent = "Clean cup ready! Pick a base below.";

    playDropSound(450);
  }

  // --- 7. Bonus: Secret Easter Egg Trigger ---
  function checkEasterEgg() {
    // All 4 toppings added to a valid drink base unlocks Cafe Cozy Special Brew
    const allToppings = ['boba', 'ice', 'cream', 'sprinkles'];
    const hasAll = allToppings.every(t => state.toppings.has(t));

    if (hasAll && state.currentBase && state.liquidLevel > 0) {
      if (!liquid.classList.contains('galaxy-mode')) {
        liquid.classList.add('galaxy-mode');
        easterEggBanner.classList.add('visible');
        statusText.textContent = "☕✨ Secret Unlocked: Barista's Secret Brew!";
        playMagicSound();

        state.easterEggUnlocked = true;
        savePersistedData();
        updateStatsUI();
      }
    } else {
      liquid.classList.remove('galaxy-mode');
      easterEggBanner.classList.remove('visible');
    }
  }

  // --- 9. Theme & Sound Toggles ---
  function applyTheme(theme) {
    state.theme = theme;
    if (theme === 'night') {
      body.classList.remove('theme-day');
      body.classList.add('theme-night');
      celestialBody.textContent = '🌙';
      btnTheme.querySelector('.btn-icon').textContent = '🌧️';
      btnTheme.querySelector('.btn-text').textContent = 'Rainy Night';
      buildRainDrops();
    } else {
      body.classList.remove('theme-night');
      body.classList.add('theme-day');
      celestialBody.textContent = '☀️';
      btnTheme.querySelector('.btn-icon').textContent = '☀️';
      btnTheme.querySelector('.btn-text').textContent = 'Sunny Cafe';
      rainContainer.innerHTML = '';
    }
    savePersistedData();
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'day' ? 'night' : 'day';
    applyTheme(nextTheme);
    playDropSound(500);
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    const btnIcon = btnSound.querySelector('.btn-icon');
    const btnText = btnSound.querySelector('.btn-text');

    if (state.soundEnabled) {
      btnIcon.textContent = '🔊';
      btnText.textContent = 'Sound: ON';
      playDropSound(600);
    } else {
      btnIcon.textContent = '🔇';
      btnText.textContent = 'Sound: MUTED';
    }
    savePersistedData();
  }

  // --- 10. Barista Stats Modal ---
  function updateStatsUI() {
    statDrinks.textContent = state.drinksCrafted;
    statSips.textContent = state.sipsTaken;
    if (state.easterEggUnlocked) {
      easterEggIcon.textContent = '☕';
      easterEggStatus.textContent = 'Unlocked!';
      easterEggDetail.textContent = "Barista's Secret Brew";
    } else {
      easterEggIcon.textContent = '🔒';
      easterEggStatus.textContent = 'Secret Brew';
      easterEggDetail.textContent = 'Find the 4-topping combo!';
    }
  }

  function openModal() {
    updateStatsUI();
    statsModal.classList.add('open');
    playDropSound(450);
  }

  function closeModal() {
    statsModal.classList.remove('open');
    playDropSound(350);
  }

  function resetStats() {
    if (confirm("Reset your barista stats to zero?")) {
      state.drinksCrafted = 0;
      state.sipsTaken = 0;
      state.easterEggUnlocked = false;
      savePersistedData();
      updateStatsUI();
      playDropSound(200);
    }
  }

  // --- 11. Event Listeners ---

  // Base Drink Selection
  baseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const baseKey = btn.dataset.base;
      const color = btn.dataset.color;
      const name = btn.dataset.name;
      selectBase(baseKey, color, name);
    });
  });

  // Topping Selection
  toppingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const toppingKey = btn.dataset.topping;
      toggleTopping(toppingKey);
    });
  });

  // Action Buttons
  btnSip.addEventListener('click', takeSip);
  cupWrapper.addEventListener('click', takeSip); // Direct tap on cup also sips!
  btnRefill.addEventListener('click', refillDrink);
  btnClean.addEventListener('click', freshCup);

  // Header Buttons
  btnMusic.addEventListener('click', toggleMusic);
  btnTheme.addEventListener('click', toggleTheme);
  btnSound.addEventListener('click', toggleSound);
  btnStats.addEventListener('click', openModal);

  // Modal Buttons
  modalClose.addEventListener('click', closeModal);
  btnCloseModal.addEventListener('click', closeModal);
  btnResetStats.addEventListener('click', resetStats);

  // Click outside modal content to close
  statsModal.addEventListener('click', (e) => {
    if (e.target === statsModal) {
      closeModal();
    }
  });

  // Keyboard shortcut: Spacebar takes a sip!
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.activeElement.tagName !== 'BUTTON') {
      e.preventDefault();
      takeSip();
    }
  });

  // --- Initialize App ---
  loadPersistedData();
  applyTheme(state.theme);
  if (!state.soundEnabled) {
    btnSound.querySelector('.btn-icon').textContent = '🔇';
    btnSound.querySelector('.btn-text').textContent = 'Sound: MUTED';
  }
  updateStatsUI();
});
