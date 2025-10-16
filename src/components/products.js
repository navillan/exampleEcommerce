$(function () {
  const content = $('.content-wrapper');
  const cartBtn = $('#my-cart-button');

  function getCart() {
    try { return JSON.parse(localStorage.getItem('cart')) || []; }
    catch { return []; }
  }
  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  function updateCartText() {
    const count = getCart().length;
    if (cartBtn.length) cartBtn.text(`Cart (${count})`);
  }

  // Ensure container exists
  if (!content.length) {
    $('body').append('<div class="content-wrapper"></div>');
  }

  
  $.getJSON('https://dummyjson.com/products')
    .done(function (resp) {
      const items = Array.isArray(resp) ? resp : (resp.products || []);
      if (!items.length) {
        content.html('<p>No products found.</p>');
        return;
      }
      const grid = $('<div class="products-grid"></div>');
      items.forEach(function (item) {
        const card = $(
          '<div class="product-card">\
            <h2></h2>\
            <img />\
            <p class="desc"></p>\
            <p class="price"></p>\
            <button class="add-to-cart">Add to Cart</button>\
          </div>'
        );
        card.find('h2').text(item.title);
        card.find('img').attr({ src: item.thumbnail, alt: item.title });
        card.find('.desc').text(item.description);
        card.find('.price').text(`Price: $${item.price}`);
        card.find('.add-to-cart').attr({
          'data-id': item.id,
          'data-title': item.title,
          'data-price': item.price
        });
        grid.append(card);
      });
      content.empty().append(grid);
      updateCartText();
    })
    .fail(function (jqXHR, textStatus) {
      console.error('Error loading products:', textStatus);
      content.append('<div style="color:crimson;padding:1rem">Failed to load products. Please try again later.</div>');
    });

  // Delegate add-to-cart clicks
  $(document).on('click', '.add-to-cart', function () {
    const $btn = $(this);
    const id = Number($btn.data('id'));
    const title = String($btn.data('title') || '');
    const price = Number($btn.data('price') || 0);
    const cart = getCart();
    cart.push({ id, title, price, qty: 1 });
    setCart(cart);
    updateCartText();
  });
});