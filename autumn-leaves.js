(() => {
    const layer = document.createElement('div');
    layer.className = 'autumn-leaves';
    layer.setAttribute('aria-hidden', 'true');

    // Each character is one square pixel: shade, leaf, highlight, or stem.
    const pixels = [
        '....ss....',
        '...soos...',
        '.s.sooos..',
        '.sooohoos.',
        '..sohhoos.',
        '.soohoos..',
        '..sotos...',
        '...st.....',
        '....t.....',
        '.....t....'
    ];
    const palettes = [
        { s: '#944126', o: '#d97732', h: '#f6b855', t: '#805133' },
        { s: '#995b24', o: '#d5a038', h: '#f2cd6b', t: '#805133' },
        { s: '#79342c', o: '#b95337', h: '#e38a4a', t: '#805133' }
    ];
    const sprites = palettes.map(palette => {
        let squares = '';
        pixels.forEach((row, y) => [...row].forEach((pixel, x) => {
            if (palette[pixel]) squares += `<rect x="${x}" y="${y}" width="1" height="1" fill="${palette[pixel]}"/>`;
        }));
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" shape-rendering="crispEdges">${squares}</svg>`;
        return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    });

    for (let i = 0; i < 22; i++) {
        const leaf = document.createElement('span');
        leaf.className = 'autumn-leaf';
        const properties = {
            '--left': `${(i * 47.3) % 100}%`,
            '--size': `${[16, 21, 26][i % 3]}px`,
            '--opacity': `${0.38 + (i % 4) * 0.08}`,
            '--duration': `${24 + (i % 7) * 3}s`,
            '--delay': `${-i * 3.7}s`,
            '--drift': `${(i % 2 ? 1 : -1) * (24 + (i % 5) * 12)}px`,
            '--sway': `${3 + (i % 4)}s`,
            '--sprite': sprites[i % sprites.length]
        };
        Object.entries(properties).forEach(([name, value]) => leaf.style.setProperty(name, value));
        layer.appendChild(leaf);
    }
    document.body.prepend(layer);
    const updateVisibility = () => layer.classList.toggle('is-paused', document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    updateVisibility();
})();
