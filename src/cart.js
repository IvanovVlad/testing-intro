function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, item, count) {
  if (count === 0 || count > item.stock) {
    throw new RangeError();
  }
  const cartItem = cart.find(({ name }) => name === item.name);
  if (cartItem) {
    cartItem.quantity += count;
    return cart;
  }

  cart.push({...item, quantity: count });
  return cart;
}

function changeQuantity(cart, id, count) {
  const cartItem = cart.find(({id}) => id === id);
  if (!cartItem) return cart;
  if (count <= 0 || (cartItem.stock - cartItem.quantity) < count) {
    throw new RangeError();
  }
  cartItem.quantity = count;
  return cart;
}

function removeFromCart(cart, removeId) {
  return cart.filter(({id}) => id !== removeId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
}

const promos = new Map([["SAVE10", 10]]);

function calculateOrderTotal(cart, code) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  if (subtotal >= 20000) {
    const discountPercent = promos.get(code) || 0;
    discount = subtotal * discountPercent / 100;
  }
  const delivery = subtotal >= 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  }
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
