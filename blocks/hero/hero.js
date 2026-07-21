/**
 * Expected authoring rows (in order, image row optional):
 * 1. picture (optional, used as background)
 * 2. eyebrow text
 * 3. heading text
 * 4. description text
 * 5. CTA link
 */
export default function decorate(block) {
  const rows = [...block.children];
  const validHref = (value) => /^(https?:\/\/|\/|\.\/|\.\.\/|#|mailto:|tel:)/i.test(value || '');
  const cellOf = (row) => row?.querySelector(':scope > div') || row;

  const heroImage = block.querySelector('picture img');
  if (heroImage) {
    const backgroundSrc = heroImage.currentSrc || heroImage.src;
    if (backgroundSrc) block.style.setProperty('--hero-background-image', `url("${backgroundSrc}")`);
    heroImage.loading = 'eager';
    heroImage.fetchPriority = 'high';
  }
  const imageRow = rows.find((row) => heroImage && row.contains(heroImage));
  const [eyebrowRow, headingRow, descriptionRow, ctaRow] = rows.filter((row) => row !== imageRow);

  const content = document.createElement('div');
  content.className = 'hero-content';

  const eyebrowText = eyebrowRow?.textContent.trim();
  if (eyebrowText) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'hero-eyebrow';
    eyebrow.textContent = eyebrowText;
    content.append(eyebrow);
  }

  const headingSource = headingRow?.querySelector('h1, h2, h3, h4, h5, h6');
  const headingText = headingRow?.textContent.trim();
  if (headingSource) {
    headingSource.classList.add('hero-title');
    content.append(headingSource);
  } else if (headingText) {
    const title = document.createElement('h1');
    title.className = 'hero-title';
    title.textContent = headingText;
    content.append(title);
  }

  if (descriptionRow?.textContent.trim()) {
    const description = document.createElement('div');
    description.className = 'hero-description';
    description.innerHTML = cellOf(descriptionRow).innerHTML;
    content.append(description);
  }

  const ctaLink = ctaRow?.querySelector('a[href]');
  if (ctaLink && validHref(ctaLink.getAttribute('href'))) {
    ctaLink.classList.add('hero-cta');
    try {
      if (new URL(ctaLink.href, window.location.href).origin !== window.location.origin) {
        ctaLink.target = '_blank';
        ctaLink.rel = 'noopener noreferrer';
      }
    } catch {
      // ignore invalid authored urls
    }
    content.append(ctaLink);
  }

  if (heroImage) heroImage.setAttribute('alt', headingText || eyebrowText || '');

  block.replaceChildren(content);
}
