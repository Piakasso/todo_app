import ContentLoader from "react-content-loader";
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
`;

const Skeleton = (props) => {
  return (
    <SkeletonWrapper>
      <ContentLoader
        speed={2}
        width={500}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#d9d9d9"
        foregroundColor="#ededed"
        {...props}
      >
        <rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
        <rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
        <rect x="50" y="55" rx="4" ry="4" width="343" height="38" />
        <rect x="8" y="55" rx="4" ry="4" width="35" height="38" />
        <rect x="50" y="104" rx="4" ry="4" width="343" height="38" />
        <rect x="8" y="104" rx="4" ry="4" width="35" height="38" />
      </ContentLoader>
    </SkeletonWrapper>
  );
};
export default Skeleton;
