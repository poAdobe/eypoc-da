export default function decorate(block) {
  [...block.children].forEach((item) => {
    const [media, content] = item.children;
    if (!media || !content) return;

    item.classList.add('featured-highlights-item');
    media.classList.add('featured-highlights-media');
    content.classList.add('featured-highlights-content');
  });
}
