import React, { useState } from 'react';
import styled from 'styled-components';
import BoardListItemContainer from '../../components/community/BoardListItemContainer';
import BestBoardListItemContainer from '../../components/community/BestBoardListItemContainer';

import * as fonts from '../../constants/fonts';
import { colors } from '../../constants/colors';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';

/** 커뮤니티 전체글 / 내가쓴글을 나누기 위해 props설정 */
type BoardListItemContainerProps = {
    tap: number;
};

const CommunityPage: React.FC<BoardListItemContainerProps> = ({ tap }) => {
    const [taps, setTap] = useState(1);

    /** 클릭시 전체글을 보여줌 */
    const onClickTotalTap = (e: any) => {
        setTap(1);
    };

    /** 클릭시 내가쓴글을 보여줌 */
    const onClickMyTap = (e: any) => {
        setTap(0);
    };
    return (
        <StyledCommonContainer>
            <StyledHeadContainer>
                <StyledTitle>커뮤니티</StyledTitle>
                <StyledText>회원들과 정보를 공유해보세요.</StyledText>
                <CommunityListInputArea>
                    <StyledInputBtn></StyledInputBtn>
                    <StyledLink to={`/community/communityCreatePage`}>
                        <CommonButton>
                            <ButtonText>글 쓰기</ButtonText>
                        </CommonButton>
                    </StyledLink>
                </CommunityListInputArea>
            </StyledHeadContainer>
            <StydyTapContainer>
                <StydyTap onClick={onClickTotalTap}>
                    <PenIcon />
                    &nbsp;전체
                </StydyTap>
                <StydyTap onClick={onClickMyTap}>
                    <CreateIcon />
                    &nbsp;내가쓴 글
                </StydyTap>
            </StydyTapContainer>
            {/* 게시판 목록 컨테이너, 아이템 컴포넌트 불러오기 */}
            <BestBoardListItemContainer tap={taps} />
            <BoardListItemContainer tap={taps} />
        </StyledCommonContainer>
    );
};

const PenIcon = styled(CreateIcon)``;
/** 커뮤니티페이지 전체 컨테이너*/
const StyledCommonContainer = styled.div`
    width: 1270px;
    margin: 0px auto;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 10px;
    }
`;

/** 커뮤니티페이지 상단바*/
const StyledHeadContainer = styled.div`
    margin: 50px 0 0 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media screen and (max-width: 768px) {
        justify-content: space-around;
    }
`;

/** 커뮤니티페이지 타이틀*/
const StyledTitle = styled.div`
    ${fonts.TitleText}
    color: ${colors.main_navy};
    margin: 0 30px 0 0;
    @media screen and (max-width: 768px) {
        font-size: 30px;
        white-space: nowrap;
    }
`;

/** 커뮤니티페이지 타이틀 텍스트*/
const StyledText = styled.div`
    width: 595px;
    height: fit-content;
    font-weight: light;
    color: ${colors.darkgray_navy};
    margin: 0;
    ${fonts.SubTextThin}
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

/** 커뮤니티텝 컨테이너*/
const StydyTapContainer = styled.div`
    margin: 20px 0px;
    display: flex;
`;

/** 커뮤니티페이지 타이틀*/
const StydyTap = styled.div`
    cursor: pointer;
    display: flex;

    font-size: 20px;
    &:not(:first-child) {
        margin-left: 30px;
    }
    color: ${colors.main_mint};
    &:hover {
        color: skyblue; /* 호버 시 변경할 색상 */
    }
    @media screen and (max-width: 768px) {
        font-size: 16px;
    }
`;

/** 커뮤니티페이지 버튼*/

const StyledInputBtn = styled.button`
    background: none;
    border: none;
    margin-left: -70px;
    margin-top: 3px;
    cursor: pointer;
`;

/** 커뮤니티페이지 버튼링크*/
const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${colors.main_black};
`;

/** 커뮤니티페이지 목록전체컨테이너*/
const CommunityListInputArea = styled.div`
    width: 472px;
    display: flex;
    justify-content: space-between;
`;

/** 글쓰기 버튼*/
const CommonButton = styled.div`
    width: 132px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${colors.main_mint};
    ${fonts.SubText}
    @media screen and (max-width: 768px) {
        width: 100px;
        height: 40px;

        margin-right: 50px;
    }
`;

/** 버튼텍스트*/
const ButtonText = styled.p`
    font-size: 18px;
    margin-top: 11px;
    border-radius: 10px;
    @media screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

export default CommunityPage;
