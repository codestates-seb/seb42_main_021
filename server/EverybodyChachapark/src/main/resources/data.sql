---- INSERT문 예시 --
----INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_score, product_status, product_view, subtitle, thumbnail_imageurl)
----VALUES (NOW(), NOW(), 1000, 'NO_CATEGORY','상품 설명입니다', '제일싼 도구',5,'PRODUCT_FOR_SALE',0,'부제목입니다!','http://localhost:8080/images/not-found');

-- ServerURL: localhost:8080
--INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
--VALUES (NOW(), NOW(), 30400, 'CHAIR',
-- '<p>&quot;폴더 스탠바이&quot;는 캠핑, 야외 활동, 해변 등 다양한 장소에서 사용할 수 있는 이동식 의자입니다.</p><p>이 의자는 접이식으로 디자인되어 있어 휴대성이 뛰어나며, 간편하게 휴식을 취할 수 있습니다.</p><p><br></p><img src="http://localhost:8080/images/curating1-1-1.jpg"><p><br></p><p>가벼우면서도 내구성이 높아 휴대와 보관이 간편합니다.</p><p><br></p><p>또한, 적당한 크기와 무게로 인해 캠핑용품으로 적합합니다.</p><p><br></p><p>폴더 스탠바이는 사용자의 몸무게를 지탱할 수 있는 최대 하중을 갖추고 있어 안전한 사용이 가능합니다.</p><p><br></p><p>또한, 접이식으로 설계되어 있어 휴대하기 쉽고 보관하기 용이합니다.</p><p><br></p><img src="http://localhost:8080/images/curating1-1-2.jpg"><p><br></p><p>캠핑, 야외 활동, 해변 등에서 편안하게 쉬기 위한 이동식 의자로 폴더 스탠바이를 추천합니다.</p>',
-- '폴더 스탠바이 캠핑의자', 'PRODUCT_FOR_SALE',0,'캠핑밸류','http://localhost:8080/images/curating1-1-0.png');
--
--INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
--VALUES (NOW(), NOW(), 34000, 'TABLE',
-- '<p>무게가 가볍워 쉽게 운반하고 보관할 수 있는 테이블을 소개합니다!</p><p><br></p><img src="http://localhost:8080/images/curating1-2-1.jpg"><p><br></p><p>접이식으로 설치 및 보관이 가능합니다.</p><p>따라서 운반 시 차량의 공간을 크게 차지하지 않아 캠핑용품들과 함께 쉽게 운반이 가능합니다!</p><p><br></p><p>쉽게 조립이 가능하며, 설치 후 안정적으로 사용할 수 있도록 다리 부분은 논슬립 처리가 되어 있습니다!</p><p><br></p><img src="http://localhost:8080/images/curating1-2-2.jpg"><p><br></p><p>내구성이 좋으며, 녹이나 부식으로 인한 오염에도 강합니다.</p><p>습기나 물에 강한 소재로 제작되어 있어 캠핑 시 비가 와도 걱정 없습니다!</p>',
-- '폴딩 우드 테이블', 'PRODUCT_FOR_SALE',0,'캠스니어','http://localhost:8080/images/curating1-2-0.png');
--
--INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
--VALUES (NOW(), NOW(), 21500, 'CHAIR',
-- '<p>높은 등받이의 와이드 체어</p><p><br></p><img src="http://localhost:8080/images/curating2-1-1.jpg"><p><br></p><p>안정감 있는 포지션으로 편안한 사용 가능합니다</p><p><br></p><p>실내/실외 어디서나 어울리는 감성 있는 색의 체어를 느껴보세요!</p><p><br></p><img src="http://localhost:8080/images/curating2-1-2.jpg"><p><br></p><p>사용자의 몸무게를 지탱할 수 있는 최대 하중을 갖추고 있어 안전한 사용이 가능합니다.</p><p><br></p><p>또한, 접이식으로 설계되어 있어 휴대하기 쉽고 보관하기 용이합니다.</p>',
-- '경량 와이드 캠핑의자', 'PRODUCT_FOR_SALE',0,'캠스니어','http://localhost:8080/images/curating2-1-0.jpg');
--
--INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
--VALUES (NOW(), NOW(), 23500, 'LIGHT',
-- '<p>가볍지만 내구성이 좋은, 간편하게 사용 가능한 조명을 소개합니다!</p><p>언제, 어디서나 따뜻한 분위기로 캠핑장을 변화시킬 레트로 캠핑 라이트</p><p><br></p><img src="http://localhost:8080/images/curating2-2-1.jpg"><p><br></p><p>조명 하나로 캠핑장 분위기를 바꿔보세요!</p><p>안전하게 24시간 사용이 가능한 캠핑 라이트입니다</p><p><br></p><p>견고한 내구성을 기반으로 가볍지만 깨질 위험없이 사용 가능합니다!</p><p><br></p><img src="http://localhost:8080/images/curating2-2-2.jpg"><p><br></p><p>간편한 사용방법으로 캠핑, 차박 등 야외활동뿐만 아닌 실내에서도 다양하게 활용이 가능해 인테리어 포인트도 좋아요!</p><p>조명 하나로 모든 공간이 감성 가득한 포토존으로 바뀌는 경험을 해보세요!</p>',
-- '레트로 캠핑 라이트', 'PRODUCT_FOR_SALE',0,'캠핑이어','http://localhost:8080/images/curating2-2-0.jpg');
--
--INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
--VALUES (NOW(), NOW(), 115000, 'TENT',
-- '<p>차박캠핑도 하고싶고 일반캠핑도 하고싶어요</p><p>캠핑 초보자 혼자서 쉽게 설치할 수 있을까? 고민하시던 분들</p><p><br></p><p>몬베이지 그린 텐트는 차박텐트/일반텐트 모두 가능한</p><p>실속있는 캠핑텐트입니다.</p><p><br></p><img src="http://localhost:8080/images/curating3-1-1.jpg"><p><br></p><p>완벽한 멀티형 몬베이지 그린 텐트</p><p>어떤 용도로도 어색함 없는 디자인!</p><p><br></p><img src="http://localhost:8080/images/curating3-1-2.jpg"><p><br></p><p>차박캠핑의 필수품인 커넥터는 물론 업라이트 폴대, TPU월 까지!</p><p><br></p><img src="http://localhost:8080/images/curating3-1-3.jpg"><p><br></p><p>텐트 하나 세우는데 5분이면 충분합니다!</p><p>스킨에 달려있는 폴대를 펴주기만 하면 끝!!</p>',
-- '몬베이지 그린 텐트', 'PRODUCT_FOR_SALE',0,'고우캠핑','http://localhost:8080/images/curating3-1-0.jpg');
--
--INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
--VALUES (NOW(), NOW(), 29500, 'TABLE',
--'<p>코어 이지스 테이블은 800g의 초경량 테이블로 가볍게 휴대하며</p><p>야외 활동시 유용하게 사용할 수 있는 캠핑 테이블입니다</p><p><br></p><img src="http://localhost:8080/images/curating4-1-1.jpg"><p><br></p><p>간편한 설치방법으로 빠르게 설치하세요!</p><p>프레임을 펼쳐 연결하고 테이블 커버를 씌워주면</p><p>설치가 끝나는 방식으로 누구나 빠르게 설치가 가능합니다!!!</p><p><br></p><img src="http://localhost:8080/images/curating4-1-2.jpg"><p><br></p><p>생활방수와 얼룩에 강하고 마모방지에 뛰어나며</p><p>야외활동시 휴대하여 간편하게 사용할 수 있습니다.!!</p><p>테이블 측면 사이드 포켓이 탑재되어 간단한 소지품을 넣을 수 있습니다.</p><p><br></p><p>코어 이지스 테이블로 누구나 편리하게 이용해 보세요!</p>',
--'코어 이지스 테이블', 'PRODUCT_FOR_SALE',0,'홈테이블','http://localhost:8080/images/curating4-1-0.jpg');
--
--INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
--VALUES (NOW(), NOW(), 24000, 'CHAIR',
--'<p>내셔널 경량 체어는 가벼운 무게와 손쉬운 휴대성으로 캠핑, 등산, 낚시, 비치 등</p><p>다양한 야외 활동에서 이용할 수 있는 캠핑 의자입니다.</p><img src="http://localhost:8080/images/curating4-2-1.jpg"><p><br></p><p>내구성이 뛰어난 철제 프레임과 편안한 패브릭으로 제작되어 있으며,&nbsp;</p><p>편안한 디자인과 강한 내구성으로 캠핑 중에도 안정적으로 사용할 수 있습니다.</p><p>또한, 가방 같은 형태로 접히기 때문에 수납과 휴대가 간편합니다.</p><img src="http://localhost:8080/images/curating4-2-2.jpg"><p><br></p><p>내셔널 경량 체어는 다양한 컬러와 디자인으로 제공되며, 사용자의 취향에 맞게 선택할 수 있습니다.</p><p>간편한 조립 방법과 휴대용 가방이 함께 제공되어, 사용자가 쉽게 조립하고 휴대할 수 있습니다.</p><p><br></p><p>이 제품은 캠핑, 등산, 낚시, 비치 등 다양한 야외 활동에 필요한 휴식 공간을 제공하여, 여행과 취미 생활을 더욱 즐겁게 만들어 줄 것입니다.</p>',
--'내셔널 경량 체어', 'PRODUCT_FOR_SALE',0,'어셈블라이어','http://localhost:8080/images/curating4-2-0.jpg');
--

-- SeverURL: legendpano.codns.com
INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
VALUES (NOW(), NOW(), 30400, 'CHAIR',
 '<p>&quot;폴더 스탠바이&quot;는 캠핑, 야외 활동, 해변 등 다양한 장소에서 사용할 수 있는 이동식 의자입니다.</p><p>이 의자는 접이식으로 디자인되어 있어 휴대성이 뛰어나며, 간편하게 휴식을 취할 수 있습니다.</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating1-1-1.jpg"><p><br></p><p>가벼우면서도 내구성이 높아 휴대와 보관이 간편합니다.</p><p><br></p><p>또한, 적당한 크기와 무게로 인해 캠핑용품으로 적합합니다.</p><p><br></p><p>폴더 스탠바이는 사용자의 몸무게를 지탱할 수 있는 최대 하중을 갖추고 있어 안전한 사용이 가능합니다.</p><p><br></p><p>또한, 접이식으로 설계되어 있어 휴대하기 쉽고 보관하기 용이합니다.</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating1-1-2.jpg"><p><br></p><p>캠핑, 야외 활동, 해변 등에서 편안하게 쉬기 위한 이동식 의자로 폴더 스탠바이를 추천합니다.</p>',
 '폴더 스탠바이 캠핑의자', 'PRODUCT_FOR_SALE',0,'캠핑밸류','http://legendpano.codns.com:8085/images/curating1-1-0.png');

INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
VALUES (NOW(), NOW(), 34000, 'TABLE',
 '<p>무게가 가볍워 쉽게 운반하고 보관할 수 있는 테이블을 소개합니다!</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating1-2-1.jpg"><p><br></p><p>접이식으로 설치 및 보관이 가능합니다.</p><p>따라서 운반 시 차량의 공간을 크게 차지하지 않아 캠핑용품들과 함께 쉽게 운반이 가능합니다!</p><p><br></p><p>쉽게 조립이 가능하며, 설치 후 안정적으로 사용할 수 있도록 다리 부분은 논슬립 처리가 되어 있습니다!</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating1-2-2.jpg"><p><br></p><p>내구성이 좋으며, 녹이나 부식으로 인한 오염에도 강합니다.</p><p>습기나 물에 강한 소재로 제작되어 있어 캠핑 시 비가 와도 걱정 없습니다!</p>',
 '폴딩 우드 테이블', 'PRODUCT_FOR_SALE',0,'캠스니어','http://legendpano.codns.com:8085/images/curating1-2-0.png');

INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
VALUES (NOW(), NOW(), 21500, 'CHAIR',
 '<p>높은 등받이의 와이드 체어</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating2-1-1.jpg"><p><br></p><p>안정감 있는 포지션으로 편안한 사용 가능합니다</p><p><br></p><p>실내/실외 어디서나 어울리는 감성 있는 색의 체어를 느껴보세요!</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating2-1-2.jpg"><p><br></p><p>사용자의 몸무게를 지탱할 수 있는 최대 하중을 갖추고 있어 안전한 사용이 가능합니다.</p><p><br></p><p>또한, 접이식으로 설계되어 있어 휴대하기 쉽고 보관하기 용이합니다.</p>',
 '경량 와이드 캠핑의자', 'PRODUCT_FOR_SALE',0,'캠스니어','http://legendpano.codns.com:8085/images/curating2-1-0.jpg');

INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
VALUES (NOW(), NOW(), 23500, 'LIGHT',
 '<p>가볍지만 내구성이 좋은, 간편하게 사용 가능한 조명을 소개합니다!</p><p>언제, 어디서나 따뜻한 분위기로 캠핑장을 변화시킬 레트로 캠핑 라이트</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating2-2-1.jpg"><p><br></p><p>조명 하나로 캠핑장 분위기를 바꿔보세요!</p><p>안전하게 24시간 사용이 가능한 캠핑 라이트입니다</p><p><br></p><p>견고한 내구성을 기반으로 가볍지만 깨질 위험없이 사용 가능합니다!</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating2-2-2.jpg"><p><br></p><p>간편한 사용방법으로 캠핑, 차박 등 야외활동뿐만 아닌 실내에서도 다양하게 활용이 가능해 인테리어 포인트도 좋아요!</p><p>조명 하나로 모든 공간이 감성 가득한 포토존으로 바뀌는 경험을 해보세요!</p>',
 '레트로 캠핑 라이트', 'PRODUCT_FOR_SALE',0,'캠핑이어','http://legendpano.codns.com:8085/images/curating2-2-0.jpg');

INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
VALUES (NOW(), NOW(), 115000, 'TENT',
 '<p>차박캠핑도 하고싶고 일반캠핑도 하고싶어요</p><p>캠핑 초보자 혼자서 쉽게 설치할 수 있을까? 고민하시던 분들</p><p><br></p><p>몬베이지 그린 텐트는 차박텐트/일반텐트 모두 가능한</p><p>실속있는 캠핑텐트입니다.</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating3-1-1.jpg"><p><br></p><p>완벽한 멀티형 몬베이지 그린 텐트</p><p>어떤 용도로도 어색함 없는 디자인!</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating3-1-2.jpg"><p><br></p><p>차박캠핑의 필수품인 커넥터는 물론 업라이트 폴대, TPU월 까지!</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating3-1-3.jpg"><p><br></p><p>텐트 하나 세우는데 5분이면 충분합니다!</p><p>스킨에 달려있는 폴대를 펴주기만 하면 끝!!</p>',
 '몬베이지 그린 텐트', 'PRODUCT_FOR_SALE',0,'고우캠핑','http://legendpano.codns.com:8085/images/curating3-1-0.jpg');

INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
VALUES (NOW(), NOW(), 29500, 'TABLE',
'<p>코어 이지스 테이블은 800g의 초경량 테이블로 가볍게 휴대하며</p><p>야외 활동시 유용하게 사용할 수 있는 캠핑 테이블입니다</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating4-1-1.jpg"><p><br></p><p>간편한 설치방법으로 빠르게 설치하세요!</p><p>프레임을 펼쳐 연결하고 테이블 커버를 씌워주면</p><p>설치가 끝나는 방식으로 누구나 빠르게 설치가 가능합니다!!!</p><p><br></p><img src="http://legendpano.codns.com:8085/images/curating4-1-2.jpg"><p><br></p><p>생활방수와 얼룩에 강하고 마모방지에 뛰어나며</p><p>야외활동시 휴대하여 간편하게 사용할 수 있습니다.!!</p><p>테이블 측면 사이드 포켓이 탑재되어 간단한 소지품을 넣을 수 있습니다.</p><p><br></p><p>코어 이지스 테이블로 누구나 편리하게 이용해 보세요!</p>',
'코어 이지스 테이블', 'PRODUCT_FOR_SALE',0,'홈테이블','http://legendpano.codns.com:8085/images/curating4-1-0.jpg');

INSERT INTO product(created_at, modified_at, price, product_category, product_detail, product_name, product_status, product_view, subtitle, thumbnail_imageurl)
VALUES (NOW(), NOW(), 24000, 'CHAIR',
'<p>내셔널 경량 체어는 가벼운 무게와 손쉬운 휴대성으로 캠핑, 등산, 낚시, 비치 등</p><p>다양한 야외 활동에서 이용할 수 있는 캠핑 의자입니다.</p><img src="http://legendpano.codns.com:8085/images/curating4-2-1.jpg"><p><br></p><p>내구성이 뛰어난 철제 프레임과 편안한 패브릭으로 제작되어 있으며,&nbsp;</p><p>편안한 디자인과 강한 내구성으로 캠핑 중에도 안정적으로 사용할 수 있습니다.</p><p>또한, 가방 같은 형태로 접히기 때문에 수납과 휴대가 간편합니다.</p><img src="http://legendpano.codns.com:8085/images/curating4-2-2.jpg"><p><br></p><p>내셔널 경량 체어는 다양한 컬러와 디자인으로 제공되며, 사용자의 취향에 맞게 선택할 수 있습니다.</p><p>간편한 조립 방법과 휴대용 가방이 함께 제공되어, 사용자가 쉽게 조립하고 휴대할 수 있습니다.</p><p><br></p><p>이 제품은 캠핑, 등산, 낚시, 비치 등 다양한 야외 활동에 필요한 휴식 공간을 제공하여, 여행과 취미 생활을 더욱 즐겁게 만들어 줄 것입니다.</p>',
'내셔널 경량 체어', 'PRODUCT_FOR_SALE',0,'어셈블라이어','http://legendpano.codns.com:8085/images/curating4-2-0.jpg');
