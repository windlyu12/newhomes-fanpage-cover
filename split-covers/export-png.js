async function inlineImages(root) {
  const toDataURL = (url) => fetch(url)
    .then((r) => r.blob())
    .then((blob) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    }))
    .catch(() => url);

  const jobs = [];
  root.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('data:')) {
      jobs.push(toDataURL(img.src).then((data) => img.setAttribute('src', data)));
    }
  });

  [root, ...root.querySelectorAll('*')].forEach((el) => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let match;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while ((match = re.exec(bg))) {
      const token = match[0];
      const url = match[1];
      if (url.startsWith('data:')) continue;
      jobs.push(toDataURL(new URL(url, location.href).href).then((data) => {
        el.style.backgroundImage = el.style.backgroundImage.split(token).join('url("' + data + '")');
      }));
    }
  });

  await Promise.all(jobs);
}

function cloneWithComputedStyles(source) {
  const clone = source.cloneNode(false);
  if (source.nodeType === 1) {
    const styles = getComputedStyle(source);
    let css = '';
    for (let i = 0; i < styles.length; i += 1) {
      const prop = styles[i];
      css += prop + ':' + styles.getPropertyValue(prop) + ';';
    }
    clone.setAttribute('style', css + 'animation:none;transition:none;');
  }
  for (let child = source.firstChild; child; child = child.nextSibling) {
    if (child.nodeType === 8 || (child.nodeType === 1 && child.tagName === 'SCRIPT')) continue;
    clone.appendChild(child.nodeType === 1 ? cloneWithComputedStyles(child) : child.cloneNode(true));
  }
  return clone;
}

async function downloadCoverPng(scale = 1) {
  const cover = document.querySelector('.fb-cover');
  if (!cover) return;
  try { await document.fonts.ready; } catch {}
  const width = window.COVER_WIDTH || 1247;
  const height = window.COVER_HEIGHT || 466;
  if (window.html2canvas) {
    const canvas = await window.html2canvas(cover, {
      backgroundColor: null,
      width,
      height,
      scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      windowWidth: width,
      windowHeight: height,
    });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      const baseName = document.body.dataset.outputName || 'newhomes-oceanpark-cover';
      link.href = URL.createObjectURL(blob);
      link.download = baseName + (scale === 1 ? '.png' : '@' + scale + 'x.png');
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }, 'image/png');
    return;
  }

  const clone = cloneWithComputedStyles(cover);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  await inlineImages(clone);

  const xml = new XMLSerializer().serializeToString(clone);
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + (width * scale) + '" height="' + (height * scale) + '" viewBox="0 0 ' + width + ' ' + height + '"><foreignObject width="' + width + '" height="' + height + '">' + xml + '</foreignObject></svg>';
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error('Không render được SVG export.'));
    image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });

  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.getContext('2d').drawImage(image, 0, 0);
  canvas.toBlob((blob) => {
    if (!blob) return;
    const link = document.createElement('a');
    const baseName = document.body.dataset.outputName || 'newhomes-oceanpark-cover';
    link.href = URL.createObjectURL(blob);
    link.download = baseName + (scale === 1 ? '.png' : '@' + scale + 'x.png');
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }, 'image/png');
}

window.downloadCoverPng = downloadCoverPng;
