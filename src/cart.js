function addToCart(cart, item, count) {
  if (count === 0 || count > item.stock) {
    throw new RangeError();
  }
  const cartItem = cart.find(({ name }) => name === item.name);
  if (cartItem) {
    const newQuantity = cartItem.quantity + count;
    if (newQuantity > cartItem.stock) return cart;
    cartItem.quantity = newQuantity;
    return cart;
  }

  cart.push({...item, quantity: count });
  return cart;
}

function changeQuantity(cart, id, count) {
  const cartItem = cart.find((item) => item.id === id);
  if (!cartItem) return cart;
  if (count <= 0 || count > cartItem.stock) {
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
