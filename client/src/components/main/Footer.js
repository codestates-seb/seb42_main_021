import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  FaQuestionCircle,
  FaApple,
  FaGooglePlay,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';
import subLogo from '../../img/subLogo.svg';

const FooterLayout = styled.footer`
  width: 530px;
  height: 100%;
  padding: 0 16px;
  margin-top: 100px;
`;

const LogoContainer = styled.div`
  margin-bottom: 16px;
`;

const ContentContainer = styled.div`
  border-top: 3px solid var(--border);
  border-bottom: 3px solid var(--border);
  margin-bottom: 16px;
  padding-bottom: 7px;
  p {
    color: var(--gray);
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const IconCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: ${(props) => (props.special ? '90px' : '28px')};
  border: 1px solid var(--border);
  border-radius: ${(props) => (props.special ? '20px' : '50%')};
  margin-right: ${(props) => (props.special ? '10px' : '0')};
  margin-left: ${(props) => (props.special ? '0' : '10px')};
  span {
    font-size: x-small;
    margin-left: 5px;
  }
`;

const WarningContainer = styled.div`
  p {
    color: var(--midgray);
  }
`;

const Footer = () => {
  return (
    <FooterLayout>
      <LogoContainer>
        <Link to="/">
          <img alt="다함께 차차박" src={subLogo} />
        </Link>
      </LogoContainer>
      <ContentContainer>
        <IconBox>
          <IconCell special>
            <FaQuestionCircle color="#4e4e4e" />
            <span>자주 묻는 질문</span>
          </IconCell>
          <IconCell>
            <FaApple color="#4e4e4e" />
          </IconCell>
          <IconCell>
            <FaGooglePlay color="#4e4e4e" />
          </IconCell>
          <IconCell>
            <FaYoutube color="#4e4e4e" />
          </IconCell>
          <IconCell>
            <FaInstagram color="#4e4e4e" />
          </IconCell>
        </IconBox>
        <p>
          FE 강민규 김영임 이은지 <br />
          BE 김대현 김병무 조주연
        </p>
      </ContentContainer>
      <WarningContainer>
        <p>
          본 사이트는 실제 서비스를 제공하지 않습니다.
          <br />
          따라서 상품의 구매 및 환불 등과 관련한 책임을 지지 않습니다.
        </p>
      </WarningContainer>
    </FooterLayout>
  );
};

export default Footer;
