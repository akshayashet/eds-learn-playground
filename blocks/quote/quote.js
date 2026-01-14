export default function decorate(block) {
  const [quoteWrapper] = block.children;

  const blockQuote = document.createElement('blockquote');
  blockQuote.className = 'quote-blockquote';
  blockQuote.textContent = quoteWrapper.textContent.trim();
  quoteWrapper.replaceChildren(blockQuote);
}
