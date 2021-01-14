import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_WALLET, UPDATE_WALLET_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const [state, dispatch] = useStoreContext();

  const { wallet } = state;
  
  const addToWallet = () => {
    const itemInWallet = wallet.find((walletItem) => walletItem._id === _id );
    
    if (itemInWallet) {
      dispatch({
        type: UPDATE_WALLET_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInWallet.purchaseQuantity) + 1
      });
      idbPromise('wallet', 'put', {
        ...itemInWallet,
        purchaseQuantity: parseInt(itemInWallet.purchaseQuantity) + 1
      })
    } else {
      dispatch({
        type: ADD_TO_WALLET,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('wallet', 'put', { ...item, purchaseQuantity: 1});
    }
  };
  
  return (
    <div className="wallet px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToWallet}>Add to wallet</button>
    </div>
  );
}

export default ProductItem;
