import React, { useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';

type Props = {
  type: string;
};

export default function PanelList(props: Props): React.ReactElement {
  const { orderList } = useContext(OrderContext);
  const { type } = props;

  type Itens = {
    id: number;
    note: string;
    quantity: number;
    paidPrice: number;
    status: string;
    productId: number;
    productImage: string;
    productName: string;
    extraId: number;
  };
  type Order = {
    id: number;
    clientName: string;
    orderStatus: string;
    paymentMethod: string;
    itens: Itens[];
  };

  return (
    <div>
      {orderList.map((order: Order) =>
        order.orderStatus === type ? (
          <div key={order.id}>
            <h3
              style={
                type === 'READY' ? { color: '#125c13' } : { color: '#9f9f9f' }
              }
            >
              {order.clientName}
            </h3>
          </div>
        ) : null,
      )}
    </div>
  );
}
