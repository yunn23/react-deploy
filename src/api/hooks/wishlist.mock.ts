import { rest } from 'msw';

import { BASE_URL } from '../instance/index';

const wishlistData = [
  {
    id: 1,
    product: {
      id: 3245119,
      name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
      price: 145000,
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    },
  },
  {
    id: 2,
    product: {
      id: 2263833,
      name: '외식 통합권 10만원권',
      price: 100000,
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
    },
  },
];

type WishlistRequestBody = {
  productId: number;
};

export const wishlistMockHandler = [
  rest.get(`${BASE_URL}/api/wishes`, (_req, res, ctx) => {

    return res(
      ctx.status(200), // 응답 상태 코드 설정
      ctx.json({
        content: wishlistData,
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageNumber: 0,
          pageSize: 10,
          offset: 0,
          unpaged: false,
          paged: true,
        },
        totalPages: 1,
        totalElements: wishlistData.length,
        last: true,
        number: 0,
        size: 10,
        numberOfElements: wishlistData.length,
        first: true,
        empty: false,
      })
    );
  }),

  rest.post(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
    console.log('POST /api/wishes 요청:', req.url.toString()); // 디버깅 로그 추가
    console.log('요청 바디:', req.body); // 디버깅 로그 추가

    const { productId } = req.body as WishlistRequestBody;
    const newWish = {
      id: wishlistData.length + 1,
      product: {
        id: productId,
        name: `Product ${productId}`,
        price: 10000 * productId,
        imageUrl: `http://example.com/product-${productId}.jpg`,
      },
    };
    wishlistData.push(newWish);
    return res(
      ctx.status(201), // 응답 상태 코드 설정
      ctx.json(newWish)
    );
  }),

  rest.delete(`${BASE_URL}/api/wishes/:wishId`, (req, res, ctx) => {
    console.log('DELETE /api/wishes/:wishId 요청:', req.url.toString()); // 디버깅 로그 추가
    console.log('요청 파라미터:', req.params); // 디버깅 로그 추가

    const { wishId } = req.params as { wishId: string };
    const wishIndex = wishlistData.findIndex((wish) => wish.id === parseInt(wishId, 10));
    if (wishIndex !== -1) {
      wishlistData.splice(wishIndex, 1);

      return res(ctx.status(204)); // 응답 상태 코드 설정
    } else {
      return res(ctx.status(404)); // 응답 상태 코드 설정

    }
  }),
];
