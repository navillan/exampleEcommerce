# Example Ecommerce (React)

Demo ecommerce site built with React and deployed to GitHub Pages. It includes a home/landing page, product listing, cart, and basic informational pages.

- Live: https://navillan.github.io/exampleEcommerce/
- Stack: React 19, React Router 7, Create React App (react-scripts 5), jQuery (small utility), react-slick/slick-carousel, gh-pages

## Features

- Home (landing) page with featured products
- Products page with a list/grid of items
- Add to Cart with quantity tracking (persisted in localStorage)
- Discount support in cart (via `discountValue`)
- About Us and Contact pages
- Responsive layout; basic carousel via `react-slick`

## Project Structure

```
ecommerce-site/
	public/
		index.html
		404.html                # SPA fallback for GitHub Pages deep links
	src/
		components/
			App.js               # Routes and layout (Header, Navbar, Footer)
			home.js              # Landing page (rendered at '/')
			content.js           # Products page
			myCart.js            # Cart page (uses localStorage)
			aboutUs.js, contact.js, header.js, navbar.js, footer.js
		hooks/
			useGetProducts.js    # Fetches and exposes products
		index.js               # BrowserRouter with basename from PUBLIC_URL
		index.css
	package.json             # homepage set to GitHub Pages URL
```

## Getting Started

Prerequisites: Node.js 18+ and npm.

Install dependencies:

```bash
npm install
```

Run locally (development):

```bash
npm start
```

Open http://localhost:3000. The Home component renders at `/`.

## Routing and Deployment (GitHub Pages)

This app uses `BrowserRouter`. The `basename` is derived from `PUBLIC_URL` (set by Create React App from `package.json` "homepage").

- Development (`npm start`): `PUBLIC_URL` is empty → `basename` becomes `/`.
- Production (`npm run build`): `PUBLIC_URL` is taken from `homepage` → `basename` becomes `/exampleEcommerce`.

Deep-link refreshes on GitHub Pages are handled by `public/404.html` which redirects to the SPA entry.

Make sure `package.json` contains:

```json
{
	"homepage": "https://navillan.github.io/exampleEcommerce/"
}
```

## Build and Deploy

Build optimized production assets:

```bash
npm run build
```

Deploy to GitHub Pages (via `gh-pages`):

```bash
npm run deploy
```

Notes:
- Ensure the repository is published via GitHub Pages (Settings → Pages → Deploy from `gh-pages` branch).
- After changing `homepage`, rebuild before deploying.

## Environment Variables

Using Create React App:
- `PUBLIC_URL` is automatically set in production from `homepage`.
- You typically don’t need `.env` files, but you can optionally add:
	- `.env.development` → `PUBLIC_URL=/`
	- `.env.production` → `PUBLIC_URL=https://navillan.github.io/exampleEcommerce`

## Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first to discuss what you’d like to change.

---

## Örnek E‑Ticaret (React)

React ile geliştirilmiş ve GitHub Pages’e deploy edilen basit bir e‑ticaret demosu. Ana sayfa, ürün listesi, sepet ve bilgi sayfaları içerir.

- Canlı: https://navillan.github.io/exampleEcommerce/
- Teknolojiler: React 19, React Router 7, Create React App (react-scripts 5), jQuery (küçük yardımcı), react-slick/slick-carousel, gh-pages

### Özellikler

- Ana sayfa (landing) ve öne çıkan ürünler
- Ürünler sayfası (liste/grid)
- Sepete ekleme ve adet takibi (localStorage ile kalıcı)
- Sepette indirim desteği (`discountValue`)
- Hakkımızda ve İletişim sayfaları
- Duyarlı (responsive) tasarım; `react-slick` ile basit slider

### Proje Yapısı

```
public/
	index.html
	404.html            # GitHub Pages için SPA yönlendirmesi
src/
	components/
		App.js            # Rotalar ve layout
		home.js           # Ana sayfa ('/')
		content.js        # Ürünler sayfası
		myCart.js         # Sepet sayfası
		aboutUs.js, contact.js, header.js, navbar.js, footer.js
	hooks/
		useGetProducts.js # Ürün verilerini çeker
	index.js            # PUBLIC_URL'den türetilen basename ile BrowserRouter
	index.css
```

### Başlangıç

Gereksinimler: Node.js 18+ ve npm.

Kurulum:

```bash
npm install
```

Geliştirme modunda çalıştırma:

```bash
npm start
```

Tarayıcıda http://localhost:3000 adresini açın. Ana sayfa `/` rotasında çalışır.

### Yönlendirme ve Yayınlama (GitHub Pages)

Uygulama `BrowserRouter` kullanır. `basename`, `PUBLIC_URL` değerinden türetilir (CRA, `package.json` içindeki `homepage` alanından alır).

- Geliştirme: `PUBLIC_URL` boş → `basename` `/` olur.
- Canlı (build): `PUBLIC_URL` = `/exampleEcommerce` yolu → canlıda doğru çalışır.

GitHub Pages’te sayfayı yenilerken 404 sorunu yaşamamak için `public/404.html` dosyası yönlendirme yapar.

`package.json` içinde aşağıdaki satır olduğundan emin olun:

```json
{
	"homepage": "https://navillan.github.io/exampleEcommerce/"
}
```

### Build ve Deploy

Prod build almak:

```bash
npm run build
```

GitHub Pages’e deploy etmek:

```bash
npm run deploy
```

Notlar:
- GitHub üzerinde repo ayarlarından Pages → `gh-pages` branch seçili olmalı.
- `homepage` değiştiyse, deploy’dan önce mutlaka yeniden build alın.

### Ortam Değişkenleri

Create React App kullanıldığı için:
- Prod’da `PUBLIC_URL`, `homepage` alanından otomatik gelir.
- İsteğe bağlı olarak `.env.development` ve `.env.production` dosyaları ekleyebilirsiniz.

---

Ek: Bu projede sepet sayacı gibi küçük DOM güncellemeleri için `jQuery` yer yer kullanılmaktadır. Uzun vadede bunları React state yönetimine taşımak önerilir.
