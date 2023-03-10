import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaSearch,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
} from 'react-icons/fa';

const NavigationLayout = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: 100%;
  max-width: 530px;
  height: 80px;
  background-color: var(--whitegray);
  position: fixed;
  bottom: 0;
  border: none;
  border-radius: var(--bd-rd);
  padding: 16px;
`;

const NavigationMenu = styled.ul`
  display: flex;
  width: 100%;
  > li {
    margin: 0 auto;
  }
`;

const Navigation = () => {
  const location = useLocation();

  return (
    <NavigationLayout>
      <NavigationMenu>
        <li>
          <Link to="/">
            {location.pathname === '/' ? (
              <FaHome size="50px" color="#61a0ff" />
            ) : (
              <FaHome size="50px" color="#4E4E4E" />
            )}
          </Link>
        </li>
        <li>
          <Link to="/product">
            <FaSearch size="50px" color="#4E4E4E" />
          </Link>
        </li>
        <li>
          <Link to="/product">
            {location.pathname === '/product' ? (
              <FaShoppingBag size="50px" color="#61a0ff" />
            ) : (
              <FaShoppingBag size="50px" color="#4E4E4E" />
            )}
          </Link>
        </li>
        <li>
          <Link to="/shoppingcart/:id">
            {location.pathname === '/shoppingcart/:id' ? (
              <FaShoppingCart size="50px" color="#61a0ff" />
            ) : (
              <FaShoppingCart size="50px" color="#4E4E4E" />
            )}
          </Link>
        </li>
        <li>
          <Link to="/mypage/:id">
            {location.pathname === '/mypage/:id' ? (
              <FaUser size="50px" color="#61a0ff" />
            ) : (
              <FaUser size="50px" color="#4E4E4E" />
            )}
          </Link>
        </li>
      </NavigationMenu>
    </NavigationLayout>
  );
};

export default Navigation;
