import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PropsModalComponent } from '../../utils/protocols';
/* eslint-disable */


export default function ModalComponent(props:PropsModalComponent):React.ReactElement {
  const { product, extras, itens, setItens, itensIds, setItensIds, closeModal, setProductsIds, productsIds } = props
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const [extrasList, setExtrasList] = useState({
    extrasId: 0,
    price: 0
  });

  async function addItens() {
    const newItensIds = {
      quantity: quantity,
      paidPrice: totalPrice,
      productId: product.id,
    }

    const newItens = {
      name: product.name,
      note: notes,
      quantity: quantity,
      paidPrice: totalPrice,
      productId: product.id,
      extraId: extrasList.extrasId,
    }

    setItens([...itens,newItens])

    if(extrasList.extrasId !== 0) {
      newItensIds['extraId'] = extrasList.extrasId
    }

    if(notes !== '') {
      newItensIds['note'] = notes
    }
    
    axios.post(`${import.meta.env.VITE_API_URL}/item`, newItensIds)
    .then( async res => {
      setItensIds([...itensIds, res.data])
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  async function continueBuy() {
    setProductsIds([...productsIds, product.id])
    await addItens()
    closeModal()
  }

  function handleNotes(event:React.ChangeEvent<HTMLTextAreaElement>) {
    setNotes(event.target.value)
  }

  useEffect(() => {
    const total = (extrasList.price + (product.price)) * quantity
    setTotalPrice(total)
  }, [extrasList, quantity])
  
  return (
    <Container>   
      <h2>Revise seu pedido!</h2>
        <ProductInfo>
          <div>
            <div style={product.productType	=== 'BURGUER' ? { backgroundColor: '#f96666' }: product.productType === 'DRINK' ? { backgroundColor: '#125c13'} : { backgroundColor: '#ffeb70'}}>
              <img src={product.image} alt={product.name} />
              <div/>
            </div>
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Quantity>
                <p onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)}>-</p>
                <h1>{quantity}</h1>
                <p onClick={() => setQuantity(quantity + 1)}>+</p>
              </Quantity>
            </div>
          </div>
          <h4>R$ {(product.price/100).toFixed(2).replace('.', ',')}</h4>
        </ProductInfo>
        <ExtraList>
          <h2>Adicionais</h2>
          <p>Selecione os ingredientes que você deseja adicionar a mais no seu pedido</p>
          {extras?.map((extra) => (
            extra.productType === product.productType && (
              <div key={extra.id}>
                <div>
                  <img src={extra.image} alt={extra.name} />
                  <ExtraInfo>
                    <div>
                      <h1>{extra.name}</h1>
                      <p>{extra.description}</p>
                    </div>
                    <div>
                      <h3>R$ {(extra.price/100).toFixed(2).replace('.', ',')}</h3>
                      <Button onKeyDown={() => setExtrasList({extrasId: extra.id, price: extra.price})} type="button" style={extrasList.extrasId === extra.id ? { color: '#125c13' } : { backgroundColor: '#FFF'}} disabled={extrasList.extrasId === extra.id} onClick={() => setExtrasList({extrasId: extra.id, price: extra.price})}>•</Button>
                    </div>
                  </ExtraInfo>
                </div>
              </div>
            )
          ))}
        </ExtraList>
        <Notes>
          <h2>Observações</h2>
          <textarea onChange={handleNotes} placeholder="Adicione uma observação ao pedido" />
        </Notes>
        <Resume>
          <div>
            <h1>{quantity}x {product.name}</h1>
            <h1>R$ {(totalPrice/100).toFixed(2).replace('.', ',')}</h1>
          </div>
          <span>
            <p>Total do pedido</p>
            <h1>R$ {(totalPrice/100).toFixed(2).replace('.', ',')}</h1>
          </span>
        </Resume>
        <Buttons>
          <button type="button" style={{ backgroundColor: '#FFF', color: '#125c13', border: '1px solid #125c13' }} onClick={continueBuy}>Continuar adicionando</button>
          <button type="button" style={{ backgroundColor: '#125c13', color: '#ffffff' }} onClick={continueBuy} >Adicionar ao pedido</button>
        </Buttons>
    </Container>
  )
}
// eslint-enable
const Container = styled.div`
  padding: 20px;
  width: 800px;
  max-height: 80vh;

  h2 {
    margin-bottom: 20px;
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    color: #000;
    font-weight: bold;
  }

  overflow-y: auto;
`;

const ProductInfo = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div:first-child{
    display: flex;
    align-items: center;
    justify-content: center;

    div:first-child {
      margin-bottom: 20px;
      width: 200px;
      height: 120px;
      border-radius: 10px;
      box-shadow: 0px 0px 5px #000;

      background-image: url(/src/assets/images/background.svg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      position: relative;

      div{
        position: absolute;
        bottom: -1px;
        background-color: #FFF;
        width:200px;
        height: 45%;
        border: 1px solid #FFF;
        border-radius: 10px 10px 10px 10px;
        box-shadow:none;
      }

      img {
        width: 100px;
        height: 100px;
        z-index: 1;
      }
    }
  }

  div:last-child{
    display: flex;
    flex-direction: column;

    h3{
      font-family: 'Poppins', sans-serif;
      font-size: 20px;
      color: #000;
      font-weight: bold;
      margin-left: 20px;
    }

    p{
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      color: #757575;
      margin-left: 20px;
      margin-top: 5px;
      margin-bottom: 20px;
    }

    div{
      display: flex;
      flex-direction:row;
      position: relative;

      p:first-child {
        position: absolute;
        top: 0px;
        left: 15px;
        z-index: 1;

        cursor: pointer;
        width: 31px;
        height: 31px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid #125c13;
        margin: 0 5px;
        color: #FFF;
        text-align: center;
        background-color: #125c13;
        font-family: 'Poppins', sans-serif;
        font-size: 30px;
      }

      p:last-child {
        position: absolute;
        left: 66px;
        z-index: 1;

        cursor: pointer;
        width: 31px;
        height: 31px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid #125c13;
        margin: 0 5px;
        color: #FFF;
        text-align: center;
        background-color: #125c13;
        font-family: 'Poppins', sans-serif;
        font-size: 30px;
      }

      h1 {
        position: absolute;
        left: 30px; ;

        margin: 0 5px;
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #125c13;
        font-weight: 700;
        text-align: center;
        line-height: 30px;
        width: 55px;
        height: 30px;
        border-top: 2px solid #125c13;
        border-bottom: 2px solid #125c13;
        border-radius: 4px;
        background-color: #FFF;
      }
    }
  }

  h4{
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    color: #000;
    font-weight: bold;
    margin-left: 20px;
  }
`;

const Quantity = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ExtraList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    color: #000;
    font-weight: bold;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #000;
    margin-bottom: 10px;
  }

  div{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;

    img{
      width: 50px;
      height: 50px;
      box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

const ExtraInfo = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 20px;
  
  div{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    
    h1{
      padding-top: 5px;
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      color: #000;
      font-weight: bold;
      margin-bottom: 5px;
    }
  }

  div:last-child {
    display: flex;
    flex-direction: row;
    align-items: center;

    h3{
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      color: #a8a8a8;
      font-weight: bold;
      margin-right: 5px;
      margin-left: 5px;
      text-align: center;
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #FFF;
  border-radius: 50%;  
  border: 2px solid #125c13;
  cursor: pointer;
  color: #FFF;
  font-size: 50px;
  margin-left: 10px;
`;

const Notes = styled.div`
  h2{
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    color: #000;
    font-weight: bold;
    margin-left: 20px;
    margin-top: 20px;
  }

  textarea{
    width: 100%;
    height: 150px;
    background-color: #f4f4f4;
    border: none;
    font-family: 'Poppins', sans-serif;
    padding: 10px;
  }
`;

const Resume = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 45px;
  margin-top: 20px;
  width: 90%;
  height: auto;
  border: 1px solid #e2e2e2;

  div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1{
      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: #000;
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 20px;
    }
  }

  span{
    font-family: 'Poppins', sans-serif;
    margin-top: 20px;
    font-size: 18px;
    color: #000;
    margin-left: 20px;
    margin-right: 20px;
    border-top: 2px dashed #000;
    padding-top: 20px;

    h1{
      font-weight: bold;
      font-size: 30px;
      margin-top: 20px;
      margin-bottom: 20px;
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
    width: 230px;
    height: 50px;

    border-radius: 8px;

    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;

    outline: none;
    border: 1px solid #9f9f9f;

    cursor: pointer;
  }
`;
