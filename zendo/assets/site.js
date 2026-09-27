const preview = document.querySelector('.image-preview');
if (preview) {
  const image = preview.querySelector('#preview-image');
  const title = preview.querySelector('#preview-title');
  const scroll = preview.querySelector('.preview-scroll');
  document.querySelectorAll('[data-preview]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      title.textContent = link.closest('figure').querySelector('figcaption strong').textContent;
      preview.showModal();
      scroll.scrollTo(0, 0);
    });
  });
  preview.querySelector('.preview-close').addEventListener('click', () => preview.close());
  preview.addEventListener('click', event => {
    if (event.target !== preview) return;
    const bounds = preview.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) preview.close();
  });
}
