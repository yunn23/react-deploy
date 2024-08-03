import { Box, Button as ChakraButton, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { usePoint } from '@/api/hooks/usePoint';
import { useRemoveFromWishlist, useWishlist } from '@/api/hooks/useWishlist';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';

// interface WishlistItem {
//   id: number;
//   product: {
//     name: string;
//   };
// }

export const MyAccountPage = () => {
  const { authInfo, logout } = useAuth();
  const { wishlist, loading, fetchError, fetchWishlist } = useWishlist();
  const { removeFromWishlist, loading: removeLoading } = useRemoveFromWishlist(fetchWishlist);
  const { point, loading: pointLoading, error: pointError } = usePoint();

  const handleRemove = async (productId: number) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('관심 상품 삭제 실패', error);
      alert('관심 상품 삭제에 실패하였습니다.');
    }
  };

  const handleLogout = () => {
    logout();
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  if (!authInfo) {
    window.location.replace(`${window.location.origin}${RouterPath.login}`);
    return null;
  }

  return (
    <Wrapper>
      {authInfo.name}님 안녕하세요! <Spacing height={64} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{ maxWidth: '200px' }}
      >
        로그아웃
      </Button>
      <Box mt={20} textAlign={'center'}>
        <Text fontSize="2xl" mb={4}>포인트</Text>
        {pointLoading ? (
          <Text fontSize="xl">로딩 중...</Text>
        ) : pointError ? (
          <Text fontSize="xl">{pointError}</Text>
        ) : (
          <Text fontSize="2xl" mb={4}>{point}</Text>
        )}
      </Box>
      <Box mt={20} textAlign={'center'}>
        <Text fontSize="2xl" mb={4}>관심 목록</Text>
        {loading ? ( // 로딩 상태 표시
          <Text fontSize="xl">로딩 중...</Text>
        ) : fetchError ? ( // 에러 상태 표시
          <Text fontSize="xl">{fetchError}</Text>
        ) : (
          wishlist.map(item => (
            <Box
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mb={4}
            >
              <Text>{item.product.name}</Text>
              <ChakraButton colorScheme="red" onClick={() => handleRemove(item.id)} isLoading={removeLoading}>
                삭제
              </ChakraButton>
            </Box>
          ))
        )}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
