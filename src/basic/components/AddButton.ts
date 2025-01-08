import { Product } from 'basic/types/product';

interface AddButtonProps {
  sel: HTMLSelectElement;
  prodList: Product[];
  cartDisp: HTMLElement;
  calcCart: (params: {
    sum: number;
    cartDisp: HTMLElement;
    prodList: Product[];
    stockInfo: any;
  }) => void;
  stockInfo: any;
  state: { lastSel: string };
  sum: number;
}

const AddButton = ({
  sel,
  prodList,
  cartDisp,
  calcCart,
  stockInfo,
  state,
  sum,
}: AddButtonProps) => {
  // 장바구니 아이템 HTML 생성
  const createCartItemHTML = (item: Product) => `
    <span>${item.name} - ${item.price}원 x 1</span>
    <div>
      <button 
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
        data-product-id="${item.id}" 
        data-change="-1"
      >
        -
      </button>
      <button 
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
        data-product-id="${item.id}" 
        data-change="1"
      >
        +
      </button>
      <button 
        class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
        data-product-id="${item.id}"
      >
        삭제
      </button>
    </div>
  `;

  // 기존 장바구니 아이템 수량 업데이트
  const updateExistingCartItem = (item: HTMLElement, itemToAdd: Product): boolean => {
    const quantitySpan = item.querySelector('span');
    if (!quantitySpan?.textContent) return false;

    const currentQuantity = parseInt(quantitySpan.textContent.split('x ')[1], 10);
    if (isNaN(currentQuantity)) return false;

    const newQuantity = currentQuantity + 1;

    if (newQuantity > itemToAdd.quantity) {
      alert('재고가 부족합니다.');
      return false;
    }

    quantitySpan.textContent = `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQuantity}`;
    itemToAdd.quantity--;

    return true;
  };

  // 새 장바구니 아이템 추가
  const addNewCartItem = (itemToAdd: Product) => {
    const newItem = document.createElement('div');
    newItem.id = itemToAdd.id;
    newItem.className = 'flex justify-between items-center mb-2';
    newItem.innerHTML = createCartItemHTML(itemToAdd);
    cartDisp.appendChild(newItem);
    itemToAdd.quantity--;
  };

  // 버튼 생성
  const addBtn = document.createElement('button');
  addBtn.id = 'add-to-cart';
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addBtn.textContent = '추가';

  // 장바구니 추가 이벤트 핸들러
  const handleAddToCart = () => {
    const selectedItem = sel.value;
    const itemToAdd = prodList.find((prod) => prod.id === selectedItem);

    if (!itemToAdd || itemToAdd.quantity <= 0) return;

    const existingItem = document.getElementById(itemToAdd.id);

    if (existingItem) {
      if (!updateExistingCartItem(existingItem, itemToAdd)) return;
    } else {
      addNewCartItem(itemToAdd);
    }

    calcCart({ sum, cartDisp, prodList, stockInfo });
    state.lastSel = selectedItem;
  };

  addBtn.addEventListener('click', handleAddToCart);

  return addBtn;
};

export default AddButton;
