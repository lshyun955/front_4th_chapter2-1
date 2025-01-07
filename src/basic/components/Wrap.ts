const Wrap = () => {
  const wrap = document.createElement('div');
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  let hTxt = document.createElement('h1');
  hTxt.className = 'text-2xl font-bold mb-4';
  hTxt.textContent = '장바구니';
  wrap.appendChild(hTxt);
  wrap.appendChild(CartList());
  wrap.appendChild(Sum());
  wrap.appendChild(SelectList());
  wrap.appendChild(AddButton());
  wrap.appendChild(StockInfo());

  return wrap;
};

export default Wrap;
