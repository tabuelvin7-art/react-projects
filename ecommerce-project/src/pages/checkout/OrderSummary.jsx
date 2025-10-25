import dayjs from "dayjs";
import axios from "axios";
import { DeliveryOptions } from "./DeliveryOptions.jsx";  
import { CartItemDetails } from "./CartItemDetails.jsx";


export function OrderSummary({ cart, deliveryOptions, loadCart  }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOptions = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );

           const updateCartItem = async () => {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              quantity: cartItem.quantity
               
            });
           
          }

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOptions.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <CartItemDetails
                cartItem={cartItem}
                loadCart={loadCart}
                updateCartItem={updateCartItem}
              />

               <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
