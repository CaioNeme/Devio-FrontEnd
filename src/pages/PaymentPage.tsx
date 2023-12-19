import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import styled from 'styled-components';
import card from '../assets/images/card.svg';
import money from '../assets/images/cash.svg';
import wallet from '../assets/images/wallet.svg';
import Header from '../components/Header';
import { OrderContext } from '../context/OrderContext';
import { ItemSimple, ItensIds } from '../utils/protocols';

export default function PaymentPage(): React.ReactElement {
  const { state } = useLocation();
  const { orderList } = useContext(OrderContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const [total, setTotal] = useState(0);
  const [creditCard, setCreditCard] = useState(false);
  const [debitCard, setDebitCard] = useState(false);
  const [cash, setCash] = useState(false);
  const [payment, setPayment] = useState('');

  useEffect(() => {
    if (!state.itensIds) {
      navigate('/');
    }
    console.log(state.itensIds);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  function handleCreditCard() {
    setCreditCard(true);
    setDebitCard(false);
    setCash(false);
    setPayment('CREDIT');
  }

  function handleDebitCard() {
    setCreditCard(false);
    setDebitCard(true);
    setCash(false);
    setPayment('DEBIT');
  }

  function handleCash() {
    setCreditCard(false);
    setDebitCard(false);
    setCash(true);
    setPayment('CASH');
  }

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleTotal(event: React.ChangeEvent<HTMLInputElement>) {
    setTotal(Number(event.target.value));
  }

  function finishPayment() {
    if (!name) {
      alert('Insira o nome do cliente');
      return;
    }

    if (!payment) {
      alert('Selecione o método de pagamento');
      return;
    }

    const itens = state.itensIds.map((item: ItensIds) => item.id);

    const order = {
      clientName: name,
      paymentMethod: payment,
      itensId: itens,
    };

    handlePrint();

    axios
      .post(`${import.meta.env.VITE_API_URL}/orders`, order)
      .then(res => {
        console.log(res);
        navigate('/kitchen');
      })
      .catch(error => {
        console.log(error);
      });
  }

  function cancelOrder() {
    navigate('/home');
  }

  /* eslint-disable */
  return (
    <>
      <Header />
      <Container>
        <div>
          <Head>
            <img src={wallet} alt="walleticon" />
            <h1>Pagamento</h1>
          </Head>
          <Resume ref={ref}>
            <h2>Resumo da compra</h2>
            <div>
              {state.itens.map((item: ItemSimple) => (
                <Itens key={item.id}>
                  <p>{item.quantity}x {item.name}</p>
                  <p>R$ {(item.paidPrice/100).toFixed(2).replace('.', ',')} </p>
                </Itens>
              ))}
              <Price>
                <p>Total do pedido:</p>
                <p>R$ {(state.priceTotal/100).toFixed(2).replace('.', ',')}</p>
              </Price>
            </div>
          </Resume>
          <ClientInfo>
            <div>
              <p>Nome do cliente</p>
              <input onChange={handleName} placeholder="Primeiro nome" type="text" />
            </div>
            <div>
              <p>Código</p>
              <span>{orderList[orderList.length - 1].id + 1}</span>
            </div>
          </ClientInfo>
        </div>
        <div>
          <Payment>
            <h1>Selecione a forma de pagamento:</h1>
            <div>
              <div>
                <img src={card} alt="debitcard" />
                <p>Debito</p>
                <Button style={ debitCard ? { color: '#125c13' } : { backgroundColor: '#FFF'}} onClick={handleDebitCard}>•</Button>
              </div>
              <div>
                <img src={card} alt="creditcard" />
                <p>Crédito</p>
                <Button style={ creditCard ? { color: '#125c13' } : { backgroundColor: '#FFF'}} onClick={handleCreditCard}>•</Button>
              </div>
              <div>
                <img src={money} alt="money" />
                <p>Dinheiro</p>
                <Button style={ cash ? { color: '#125c13' } : { backgroundColor: '#FFF'}} onClick={handleCash}>•</Button>
              </div>
            </div>
          </Payment>
          <Change style={payment === 'CASH' ? { display: 'flex' } : { display: 'none' }}>
            <div>
              <p>Valor entregue</p>
              <input onChange={handleTotal} placeholder="R$ 0,00" type="number" min="0" />
            </div>
            <div>
              <p>Troco</p>
              <span>R$ {((total*100 - Number(state.priceTotal))/100).toFixed(2).replace('.', ',')}</span>
            </div>
          </Change>
          <Buttons>
          <button
              type="button"
              style={{ backgroundColor: '#ffffff', color: '#125c13' }}
              onClick={cancelOrder}
              onKeyDown={(e) => e.key === 'Enter' && cancelOrder()}
            >
              Cancelar
            </button>
            <button
              type="button"
              style={{ backgroundColor: '#125c13', color: '#ffffff' }}
              onClick={finishPayment}
              onKeyDown={(e) => e.key === 'Enter' && finishPayment()}
            >
              Finalizar Pedido
            </button>
          </Buttons>
        </div>
      </Container>
    </>
  );
}
/* eslint-enable */

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Head = styled.div`
  margin: 50px 20px 0px 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #000000;
    line-height: 29px;
    text-align: center;
    letter-spacing: 0.1em;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const Resume = styled.div`
  margin-left: 50px;
  margin-top: 20px;

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #000000;
  }

  div {
    border: 1px solid #000000;
    padding: 30px;
    width: 450px;
    margin-top: 20px;
  }
`;

const Itens = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    color: #000000;
    margin: 10px;
    line-height: 17px;
  }
`;

const Price = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-top: 1px dashed #000000;
  padding-top: 10px;

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    color: #000000;
    margin: 10px;
    line-height: 17px;
    margin-bottom: 20px;
  }

  p:last-child {
    font-weight: 700;
    font-size: 24px;
  }
`;

const ClientInfo = styled.div`
  margin-left: 50px;
  margin-top: 20px;
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 20px;

    p {
      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: #000000;
      margin-bottom: 5px;
      line-height: 17px;
      font-weight: 700;
    }

    input {
      border: none;
      background-color: #f4f4f4;
      width: 400px;

      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: #000;
      padding: 5px;
      border-radius: 5px;
      box-sizing: border-box;
    }

    input:focus,
    select:focus {
      box-shadow: 0 0 0 0;
      border: 0 none;
      outline: 0;
    }

    span {
      border: none;
      background-color: #f4f4f4;
      width: 80px;

      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: #000;
      padding: 5px;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
`;

const Payment = styled.div`
  margin: 50px 50px 0px 20px;
  padding: 30px;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #000000;
    line-height: 29px;
    text-align: start;
    margin-bottom: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 450px;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      border: 1px solid #000000;
      border-radius: 5px;
      margin-bottom: 20px;
      padding: 30px;
      box-sizing: border-box;
      position: relative;

      p {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #000000;
        line-height: 17px;
        margin: 10px;
        font-weight: 700;
      }
    }

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #125c13;
  cursor: pointer;
  color: #fff;
  font-size: 50px;
  margin-left: 10px;
`;

const Change = styled.div`
  margin-left: 50px;
  margin-top: 20px;
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 20px;

    p {
      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: #000000;
      margin-bottom: 5px;
      line-height: 17px;
      font-weight: 700;
    }

    input {
      border: none;
      background-color: #f4f4f4;
      width: 300px;

      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: #000;
      padding: 5px;
      border-radius: 5px;
      box-sizing: border-box;
    }

    input:focus,
    select:focus {
      box-shadow: 0 0 0 0;
      border: 0 none;
      outline: 0;
    }

    span {
      border: none;
      background-color: #f4f4f4;
      width: 110px;

      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: #000;
      padding: 5px;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;

  width: 100%;

  padding-right: 100px;
  margin-top: 60px;
  margin-bottom: 50px;

  button {
    margin-left: 20px;
    width: 200px;
    height: 50px;

    border-radius: 8px;

    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;

    outline: none;
    border: 1px solid #9f9f9f;

    cursor: pointer;
  }
`;
