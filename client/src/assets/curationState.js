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
      location: '대한민국 ASDSAD기장읍',
      lat: '37.8198192',
      lng: '127.5206593',
    },
    {
      title: '숲이조아오토캠핌장',
      location: '대군 기장읍',
      lat: '37.8198192',
      lng: '127.5206593',
    },
    {
      title: '추암오토캠핌장',
      location: '삼면리 기장군 기장읍',
      lat: '37.8198192',
      lng: '127.5206593',
    },
  ],
  curatingContent: [
    {
      img: `${process.env.PUBLIC_URL}/images/themeSea5.jpg`,
      titleText1: '호수',
      titleText2: '오후 15:00 ~ 오전 11:00',
      contentText:
        '지리산 호수공원 오토캠핑장은 주변 관광지와 어우러져 부모, 가족, 연인과 함께 하여 많은 추억을 만들 수 있는 곳입니다. 지리산 호수공원오토캠핑장에서 일상을 잠시 내려두고 자연을 즐겨보세요!. 푸르른 힐링의 기운이 여러분들께 더욱 활기를 드릴 것입니다.',
      contentText2: '서해안 북쪽에서는 스텔스 차박지로 유명 한 곳이었다..',
      contentText3: '물때를 잘 만나면 바닷가 쪽으로 후면 주차한 후 뒤',
      contentImg1: `${process.env.PUBLIC_URL}/images/themeRiver3.jpeg`,
      contentImg2: `${process.env.PUBLIC_URL}/images/themeRiver4.jpeg`,
    },
    {
      img: '/images/chair.jpg',
      titleText1: '계곡',
      titleText2: '오후 5411:00 ~ 오전 7:00',
      contentText: ' 강화도를 하루 종일 돌아다니는 1박 2일',
      contentText2: '서해안 북쪽에서는ㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
      contentText3:
        '물때를 잘 만나면 ㅁㄴㅇㅁㄴㅇㄴㅁㅇ바닷가 쪽으로 후면 주차한 후 뒤',
      contentImg1: '/images/chair.jpg',
      contentImg2: '/images/chair.jpg',
    },
    {
      img: '/images/chacha.png',
      titleText1: '바닷가',
      titleText2: '오후 341:00 ~ 오전 7:00',
      contentText: '또는 2박 3일의 서해안 차박',
      contentText2:
        '서해안 북쪽에서는 @@@@@@@@@@@@@@스텔스 차박지로 유명 한 곳이었다..',
      contentText3:
        '물때를 잘 만나면 @@@@@@@@@@@@@@@@@바닷가 쪽으로 후면 주차한 후 뒤',
      contentImg1: '/images/chacha.png',
      contentImg2: '/images/chacha.png',
    },
    {
      img: '/images/light.jpg',
      titleText1: '바람',
      titleText2: '오후 241:00 ~ 오전 7:00',
      contentText: '여행 시작 지점으로 아주 좋은 곳..',
      contentText2:
        '서해안 북쪽에서는 @#@#@#@#@#@#@#@#스텔스 차박지로 유명 한 곳이었다..',
      contentText3:
        '물때를 잘 만나면 @#@#@#@#@#@#@#바닷가 쪽으로 후면 주차한 후 뒤',
      contentImg1: '/images/light.jpg',
      contentImg2: '/images/light.jpg',
    },
  ],
};
