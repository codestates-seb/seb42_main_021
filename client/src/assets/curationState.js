// id 매겨서 하는 방법은 페이지 기준으로 하나씩 잡고 img,title, location 묶어서 해야됨

export const curationList = {
  SubCarouselImg: [
    {
      img1: `${process.env.PUBLIC_URL}/images/themeRiver1.jpeg`,
      img2: `${process.env.PUBLIC_URL}/images/themeRiver2.jpeg`,
      img3: `${process.env.PUBLIC_URL}/images/themeRiver3.jpeg`,
      img4: `${process.env.PUBLIC_URL}/images/themeRiver4.jpeg`,
    },
    {
      img1: `${process.env.PUBLIC_URL}/images/themeIsland1.jpg`,
      img2: `${process.env.PUBLIC_URL}/images/themeIsland2.jpg`,
      img3: `${process.env.PUBLIC_URL}/images/themeIsland3.jpg`,
      img4: `${process.env.PUBLIC_URL}/images/themeIsland4.jpg`,
    },
    {
      img1: `${process.env.PUBLIC_URL}/images/themeMountain1.jpeg`,
      img2: `${process.env.PUBLIC_URL}/images/themeMountain2.jpg`,
      img3: `${process.env.PUBLIC_URL}/images/themeMountain3.jpg`,
      img4: `${process.env.PUBLIC_URL}/images/themeMountain4.jpg `,
    },
    {
      img1: `${process.env.PUBLIC_URL}/images/themeSea2.jpg`,
      img2: `${process.env.PUBLIC_URL}/images/themeSea3.png`,
      img3: `${process.env.PUBLIC_URL}/images/themeSea4.jpg`,
      img4: `${process.env.PUBLIC_URL}/images/themeSea5.jpg`,
    },
  ],
  mapLocation: [
    {
      title: '지리산호수오토캠핌장',
      location: '전라남도 구례군 산동면 이평리',
      lat: '35.2807971',
      lng: '127.4184841',
    },
    {
      title: '자라섬캠핌장',
      location: '경기도 가평군 가평읍 자라섬로 60',
      lat: '37.8198192',
      lng: '127.5206593',
    },
    {
      title: '숲이조아오토캠핌장',
      location: '경상북도 문경시 농암면 율수리',
      lat: '36.5655802',
      lng: '127.9895864',
    },
    {
      title: '추암오토캠핌장',
      location: '강원도 동해시 추암동',
      lat: '37.4780266',
      lng: '129.1589881',
    },
  ],
  curatingContent: [
    {
      img: `${process.env.PUBLIC_URL}/images/curating1.jpg`,
      titleText1: '호수',
      titleText2: '15:00 ~ 익일 11:00',
      contentText:
        '지리산 호수공원 오토캠핑장은 주변 관광지와 어우러져 부모, 가족, 연인과 함께 하여 많은 추억을 만들 수 있는 곳입니다. 지리산 호수공원오토캠핑장에서 일상을 잠시 내려두고 자연을 즐겨보세요!. 푸르른 힐링의 기운이 여러분들께 더욱 활기를 드릴 것입니다.',
      contentText2: '자연을 벗삼아 즐기는 새로운 힐링 장소',
      contentText3: '야영 및 취사, 피크닉을 함께 즐길 수 있는 힐링공간',
      contentImg1: `${process.env.PUBLIC_URL}/images/themeRiver3.jpeg`,
      contentImg2: `${process.env.PUBLIC_URL}/images/themeRiver4.jpeg`,
      subText: '지리산 호수공원 오토캠핌장',
    },
    {
      img: `${process.env.PUBLIC_URL}/images/curating2.jpg`,
      titleText1: '섬',
      titleText2: '14:00 ~ 익일 12:00',
      contentText:
        '경기도 가평의 아름다운 북한강변에 위치한 자라섬 캠핑장은 2008년 가평세계캠핑캐라바닝대회 개최지로서 수도권 최대, 최고의 시설을 자랑하는 친환경 레저시설이다. 자라섬은 1943년 우리나라 최초의 발전전용댐인 청평댐이 완공되면서 생긴 섬으로 중도,서도,남도 등 3개의 섬과 2개의 부속섬으로 이루어져 있으며, 해방이후 중국인들이 농사를 지었다는데서 중국섬으로 불리다가 1986년 자라목이라 부르는 늪산이 바라보고 있는 섬이니 자라섬으로 부르자는 안이 가평군 지명위원회에서 채택되어 자라섬으로 불리게 되었다.',
      contentText2: '촘촘히들 있는 캐러밴 사이트',
      contentText3: '캠핑장 바로 옆에는 생태공원 이화원 등이 있다.',
      contentImg1: `${process.env.PUBLIC_URL}/images/themeIsland6.jpg`,
      contentImg2: `${process.env.PUBLIC_URL}/images/themeIsland5.jpg`,
      subText: '자라섬 캠핌장',
    },
    {
      img: `${process.env.PUBLIC_URL}/images/curating3.jpg`,
      titleText1: '산·숲',
      titleText2: '10:00 ~ 익일 08:00',
      contentText:
        '맑은 공기 가득한 문경 숲이조아캠핑장입니다. 사방이 산으로 둘러싸여 자연과함께 편안한 휴식을 취하고 밤에는 하늘의 별들이 쏟아집니다.',
      contentText2: '캠핌장의 전반적인 풍경',
      contentText3: '캐 앞에 계곡이 있고 산으로 둘러싸인곳',
      contentImg1: `${process.env.PUBLIC_URL}/images/themeMountain3.jpg`,
      contentImg2: `${process.env.PUBLIC_URL}/images/themeMountain4.jpg`,
      subText: '숲이조아캠핑장',
    },
    {
      img: `${process.env.PUBLIC_URL}/images/curating4.jpg`,
      titleText1: '바다',
      titleText2: '오후 241:00 ~ 오전 7:00',
      contentText:
        '추암오토캠핑장은 해돋이 명소로 유명한 동해의 추암해변에 위치해있어 아름다운 아침 해돋이를 보며 캠핑을 즐길 수 있습니다. 사랑하는 가족과 연인, 친구들과 함께 추암해변에서 시원한 바닷바람을 맞으며 힐링을 만끽해보세요!',
      contentText2: '추암오토캠핑장 전경',
      contentText3: '추암오토캠핑장 주변관광지 촛대바위',
      contentImg1: `${process.env.PUBLIC_URL}/images/themeSea4.jpg`,
      contentImg2: `${process.env.PUBLIC_URL}/images/themeSea5.jpg`,
      subText: '추암오토캠핑장',
    },
  ],
};
