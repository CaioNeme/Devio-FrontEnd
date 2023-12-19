import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header(): React.ReactElement {
  const navigate = useNavigate();
  const [home, setHome] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [panel, setPanel] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  function handleClick() {
    if (pathname === 'home') {
      setHome(true);
      setKitchen(false);
      setPanel(false);
    } else if (pathname === 'kitchen') {
      setHome(false);
      setKitchen(true);
      setPanel(false);
    } else if (pathname === 'panel') {
      setHome(false);
      setKitchen(false);
      setPanel(true);
    } else {
      setHome(false);
      setKitchen(false);
      setPanel(false);
    }
  }

  useEffect(() => {
    handleClick();
  }, [location]);

  return (
    <Conteiner>
      <Logo>
        <div>
          <img src="/src/assets/images/hamburguerLogo.png" alt="logo" />
        </div>
        <div>fastfood</div>
      </Logo>

      <Menu>
        <div
          role="presentation"
          style={{ backgroundColor: home ? '#0c400d' : '#125c13' }}
          onClick={() => navigate('/home')}
          onKeyDown={() => navigate('/home')}
        >
          Pedido
        </div>
        <div
          role="presentation"
          style={{ backgroundColor: kitchen ? '#0c400d' : '#125c13' }}
          onClick={() => navigate('/kitchen')}
          onKeyDown={() => navigate('/kitchen')}
        >
          Cozinha
        </div>
        <div
          role="presentation"
          style={{ backgroundColor: panel ? '#0c400d' : '#125c13' }}
          onClick={() => navigate('/panel')}
          onKeyDown={() => navigate('/panel')}
        >
          Retirada
        </div>
      </Menu>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #125c13;
  padding: 10px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (max-width: 444px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:first-child {
    background-color: #fff;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      box-sizing: border-box;
      width: 15px;
      height: 15px;
      background-color: #125c13;
      border-radius: 50%;
    }
    margin: 5px;
  }

  div:last-child {
    color: #fff;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
  }

  @media (max-width: 444px) {
    justify-content: center;
    align-items: center;
    div:first-child {
      margin: 10px;
    }
    div:last-child {
      font-size: 20px;
    }
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #fff;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 30px;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  @media (max-width: 444px) {
    justify-content: center;
    align-items: center;
  }
`;
