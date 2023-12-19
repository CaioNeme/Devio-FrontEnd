import React, { useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';
import { Order, PropsPanelList } from '../../utils/protocols';

export default function PanelList(props: PropsPanelList): React.ReactElement {
  const { orderList } = useContext(OrderContext);
  const { type } = props;

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
