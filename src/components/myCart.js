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
		const count = getCart().reduce((sum, i) => sum + (Number(i.qty) || 1), 0);
		if (cartBtn.length) cartBtn.text(`Cart (${count})`);
	}

	function renderCart() {
		const cart = getCart();
		if (!cart.length) {
			content.html('<h1>My Cart</h1><p>Your cart is empty.</p>');
			updateCartText();
			return;
		}
		let total = 0;
		const list = $('<div class="cart-list"></div>');
		cart.forEach((item, idx) => {
			const qty = Number(item.qty) || 1;
			const price = Number(item.price) || 0;
			const line = qty * price;
			total += line;
			const row = $(
				'<div class="cart-row">\
					<span class="title"></span>\
					<span class="price"></span>\
					<input class="qty" type="number" min="1" />\
					<span class="line"></span>\
					<button class="remove">Remove</button>\
				</div>'
			);
			row.attr('data-index', idx);
			row.find('.title').text(item.title || `#${item.id}`);
			row.find('.price').text(`$${price.toFixed(2)}`);
			row.find('.qty').val(qty);
			row.find('.line').text(`$${line.toFixed(2)}`);
			list.append(row);
		});

		const summary = $(`
			<div class="cart-summary">
				<strong>Total: $${total.toFixed(2)}</strong>
				<div style="margin-top:8px">
					<button class="clear-cart">Clear Cart</button>
					<button class="checkout">Checkout</button>
				</div>
			</div>
		`);

		content.html('<h1>My Cart</h1>');
		content.append(list, summary);
		updateCartText();
	}

	// Expose for manual refresh/debug
	window.renderCart = renderCart;

	// Handlers
	$(document).on('change', '.cart-row .qty', function () {
		const idx = Number($(this).closest('.cart-row').data('index'));
		const val = Math.max(1, Number($(this).val()) || 1);
		const cart = getCart();
		if (cart[idx]) {
			cart[idx].qty = val;
			setCart(cart);
			renderCart();
		}
	});

	$(document).on('click', '.cart-row .remove', function () {
		const idx = Number($(this).closest('.cart-row').data('index'));
		const cart = getCart();
		cart.splice(idx, 1);
		setCart(cart);
		renderCart();
	});

	$(document).on('click', '.clear-cart', function () {
		setCart([]);
		renderCart();
	});

	$(document).on('click', '.checkout', function () {
		alert('Checkout is not implemented in this demo.');
	});

	// Initial render
	renderCart();
});

