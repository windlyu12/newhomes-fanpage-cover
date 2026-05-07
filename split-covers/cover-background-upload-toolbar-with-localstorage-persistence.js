/* Cover background upload toolbar with localStorage persistence.
   - Injects "Upload background" + "Clear background" buttons into .split-toolbar.
   - Reads selected image as data URL, applies to .cover-original via --cover-bg-image.
   - Persists last upload per cover (keyed by document.body.dataset.outputName) in localStorage,
     so background survives page reload until user clicks Clear. */

(function () {
  const STORAGE_PREFIX = 'cover-bg:';

  // Embed mode: when this page is loaded inside an iframe (e.g. index thumbnails)
  // with ?embed=1 query, hide the export toolbar + chrome so the preview is clean.
  if (location.search.includes('embed')) {
    document.body.dataset.embed = '1';
  }

  function getKey() {
    return STORAGE_PREFIX + (document.body.dataset.outputName || 'default');
  }

  function applyBg(cover, dataUrl) {
    cover.classList.add('has-bg');
    cover.style.setProperty('--cover-bg-image', `url("${dataUrl}")`);
  }

  function clearBg(cover) {
    cover.classList.remove('has-bg');
    cover.style.removeProperty('--cover-bg-image');
  }

  function setup() {
    const cover = document.querySelector('.cover-original');
    const toolbar = document.querySelector('.split-toolbar');
    if (!cover || !toolbar) {
      return setTimeout(setup, 60);
    }
    if (toolbar.dataset.uploadReady === '1') return;
    toolbar.dataset.uploadReady = '1';

    const key = getKey();

    // Restore saved bg AFTER inline-default has run (2 RAFs).
    requestAnimationFrame(() => requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) applyBg(cover, saved);
      } catch {}
    }));

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        applyBg(cover, dataUrl);
        try { localStorage.setItem(key, dataUrl); } catch (e) {
          console.warn('Background quá lớn, không lưu được vào localStorage:', e);
        }
      };
      reader.readAsDataURL(file);
      input.value = '';
    });

    const uploadBtn = document.createElement('button');
    uploadBtn.type = 'button';
    uploadBtn.textContent = 'Upload background';
    uploadBtn.addEventListener('click', () => input.click());

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.textContent = 'Clear background';
    clearBtn.addEventListener('click', () => {
      clearBg(cover);
      try { localStorage.removeItem(key); } catch {}
    });

    toolbar.prepend(uploadBtn, clearBtn, input);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
