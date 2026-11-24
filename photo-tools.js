/* Adaptive image encoding shared by the browser and regression tests. */
((root) => {
  'use strict';
  const INLINE_LIMIT = 900;
  const PROFILE_LIMIT = 24 * 1024;
  function encodeWithin(image, createCanvas, sizes, qualities, limit) {
    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;
    const crop = Math.min(width, height);
    if (!crop || width * height > 40000000) throw new Error('Gunakan gambar dengan resolusi maksimal 40 megapiksel.');
    const canvas = createCanvas();
    for (const size of sizes) {
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#edf3fa';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(image, (width - crop) / 2, (height - crop) / 2, crop, crop, 0, 0, size, size);
      for (const quality of qualities) {
        const encoded = canvas.toDataURL('image/webp', quality);
        if (!encoded.startsWith('data:image/webp;base64,')) throw new Error('Browser belum mendukung optimasi WebP. Gunakan Chrome, Edge, Firefox, atau Safari terbaru.');
        const base64 = encoded.slice(encoded.indexOf(',') + 1);
        const bytes = Math.floor(base64.length * 3 / 4) - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
        if (bytes <= limit) return { encoded, size, bytes };
      }
    }
    return null;
  }
  function preparePhoto(image, createCanvas) {
    const profile = encodeWithin(image, createCanvas, [256, 224, 192, 160, 128, 96, 64, 32], [0.8, 0.65, 0.5, 0.3], PROFILE_LIMIT);
    if (!profile) throw new Error('Browser gagal mengoptimalkan foto. Muat ulang halaman dan coba kembali.');
    const inline = encodeWithin(image, createCanvas, [80, 64, 48, 40, 32, 24, 16, 8], [0.5, 0.3, 0.15, 0.05, 0], INLINE_LIMIT);
    return { profile, inline };
  }
  const api = { preparePhoto, INLINE_LIMIT, PROFILE_LIMIT };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PhotoTools = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
