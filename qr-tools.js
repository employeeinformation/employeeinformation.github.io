/* Shared browser/Node helpers. No network, storage, or backend. */
((root) => {
  'use strict';
  function isLocalURL(url) {
    return !['http:', 'https:'].includes(url.protocol) || url.hostname === 'localhost' || url.hostname.endsWith('.localhost') || /^127\./.test(url.hostname) || ['[::1]', '0.0.0.0'].includes(url.hostname);
  }
  function profileFile(fragment) {
    // Deterministic file name for a static snapshot; not an authentication token.
    let hash = 0xcbf29ce484222325n;
    for (const byte of new TextEncoder().encode(fragment)) hash = BigInt.asUintN(64, (hash ^ BigInt(byte)) * 0x100000001b3n);
    const name = `p-${hash.toString(16).padStart(16, '0')}.html`;
    const target = `../template.html#${fragment}`;
    if (fragment.length > 38000 || !/^v[12]\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(fragment)) throw new Error('Format profil tidak valid.');
    const html = `<!doctype html>\n<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0;url=${target}"><title>QR Studio — Profil Digital</title><style>body{font:16px/1.6 system-ui,sans-serif;background:#f3f6fb;color:#173252;margin:0;min-height:100vh;display:grid;place-content:center;padding:24px}main{max-width:420px;background:white;padding:32px;border:1px solid #e1e8f1;border-radius:12px}small{color:#6b829e;letter-spacing:2px}h1{font-size:24px}a{display:block;background:#146cf0;color:white;text-decoration:none;text-align:center;border-radius:7px;padding:12px;margin-top:24px}</style></head><body><main><small>QR STUDIO</small><h1>Membuka profil digital</h1><p>Anda akan diarahkan ke halaman profil. Jika halaman belum terbuka, gunakan tombol di bawah.</p><a href="${target}">Buka profil</a></main></body></html>\n`;
    return { name, html };
  }
  function paintQR(canvas, qr, pixels = 2048) {
    const modules = qr.getModuleCount();
    canvas.width = canvas.height = pixels;
    const ctx = canvas.getContext('2d');
    const unit = Math.floor(pixels / (modules + 8));
    if (unit < 1) throw new Error('Ukuran QR terlalu kecil.');
    const offset = Math.floor((pixels - modules * unit) / 2);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, pixels, pixels);
    ctx.fillStyle = '#000000';
    for (let row = 0; row < modules; row++) for (let col = 0; col < modules; col++) if (qr.isDark(row, col)) ctx.fillRect(offset + col * unit, offset + row * unit, unit, unit);
    return { modules, unit, margin: offset };
  }
  const api = { isLocalURL, profileFile, paintQR };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.QRTools = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
