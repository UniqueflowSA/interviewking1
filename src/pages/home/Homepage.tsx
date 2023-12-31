import React from 'react';
import styled from 'styled-components';
import StudyListItem from '../../components/study/StudyListItem';
import BestBoardListItemContainer from '../../components/community/BestBoardListItemContainer';
import { colors } from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import PencilIconSrc from '../../img/pencil_mint.svg';
import CarouselImgSrc from '../../img/carousel_hand_img.svg';
import Slider from 'react-slick';
import './slick/slick-theme.css';
import './slick/slick.css';
import { getInfoAllStudyData } from '../../api/api-study';
import { dateSplice } from '../../utils/dateFomatting';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import InfoMessage from '../../components/UI/InfoMessage';
import { FetchingSpinner, LoadingSpinner } from '../../components/common/Spinners';

const HomePage = (): JSX.Element => {
    type StudyData = {
        _id: string;
        title: string;
        acceptcount: number;
        headcount: number;
        start: string;
        end: string;
        deadline: string;
        leader_name: string;
    };

    const {
        data: studyData,
        isLoading,
        isFetching,
        isError,
    } = useQuery<StudyData[], unknown>('studyData', getInfoAllStudyData);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isFetching) {
        return <FetchingSpinner />;
    }

    if (isError || !studyData) {
        return <InfoMessage message="Error occurred while fetching data" />;
    }

    return (
        <>
            <StyledCarouselArea>
                <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    fade={true}
                    cssEase={'linear'}
                    autoplay={true}
                    autoplaySpeed={3000}
                >
                    <StyledCarouselOne>
                        <StyledCarouselContainer>
                            <StyledCarouselTextArea>
                                <StyledCarouselTitleTextNavy>
                                    면접을 <br />
                                    면접답게
                                </StyledCarouselTitleTextNavy>
                                <StyledCarouselSubText>
                                    면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을 준비하세요
                                </StyledCarouselSubText>
                            </StyledCarouselTextArea>

                            <StyledCarouselImg src={CarouselImgSrc} />
                        </StyledCarouselContainer>
                    </StyledCarouselOne>
                    <StyledCarouselTwo>
                        <StyledCarouselContainer>
                            <StyledCarouselTextArea>
                                <StyledCarouselTitleTextMint>
                                    면접을 <br />
                                    면접답게
                                </StyledCarouselTitleTextMint>
                                <StyledCarouselSubText>
                                    면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을 준비하세요
                                </StyledCarouselSubText>
                            </StyledCarouselTextArea>

                            <StyledCarouselImg src={CarouselImgSrc} />
                        </StyledCarouselContainer>
                    </StyledCarouselTwo>
                </Slider>
            </StyledCarouselArea>

            <StyledCommonContainer>
                <StyledItemNameArea>
                    <StyledTitleText>새로 올라온 스터디</StyledTitleText>
                </StyledItemNameArea>

                <StudyListItemArea>
                    {Array.isArray(studyData) ? (
                        studyData
                            .slice()
                            .reverse()
                            .slice(0, 4)
                            .map((study: StudyData) => (
                                <StyledLink to={`/study/${study._id}`} key={study._id}>
                                    <StudyListItem
                                        id={study._id}
                                        title={study.title}
                                        currentParticipants={study.acceptcount}
                                        maxParticipants={study.headcount}
                                        startDate={dateSplice(study.start)}
                                        endDate={dateSplice(study.end)}
                                        recruitDeadline={dateSplice(study.deadline)}
                                        master={study.leader_name}
                                    />
                                </StyledLink>
                            ))
                    ) : (
                        <InfoMessage message="Error occurred while fetching data" />
                    )}
                </StudyListItemArea>

                <StyledMainStudyBtnArea>
                    <StyledLink to={`/study`}>
                        <StyledMainStudyBtn>
                            <StyeldBtnTextArea>
                                <StyeldBtnTitleArea>
                                    <StyledIcon src={PencilIconSrc} />
                                    <StyledMainBtnTitle>스터디 참여하기</StyledMainBtnTitle>
                                </StyeldBtnTitleArea>

                                <StyledMainBtnSub>
                                    참여하고 싶은 스터디를 찾고, 자신있는 면접을 준비해보세요!
                                </StyledMainBtnSub>
                            </StyeldBtnTextArea>
                        </StyledMainStudyBtn>
                    </StyledLink>

                    <StyledLink to={`/study/create`}>
                        <StyledMainStudyBtn>
                            <StyeldBtnTextArea>
                                <StyeldBtnTitleArea>
                                    <StyledIcon src={PencilIconSrc} />
                                    <StyledMainBtnTitle>스터디 만들기</StyledMainBtnTitle>
                                </StyeldBtnTitleArea>

                                <StyledMainBtnSub>알맞는 스터디가 없다면 직접 스터디를 개설해보세요!</StyledMainBtnSub>
                            </StyeldBtnTextArea>
                        </StyledMainStudyBtn>
                    </StyledLink>
                </StyledMainStudyBtnArea>

                <StyledItemNameArea>
                    <StyledTitleText hideOnSmallScreen>커뮤니티 소식</StyledTitleText>
                </StyledItemNameArea>

                <StyledMainCommunityArea>
                    {/* <BestBoardListItemContainer tap={1} /> */}
                    <BestBoardListItemContainer tap={1} />
                </StyledMainCommunityArea>
            </StyledCommonContainer>
        </>
    );
};

export default HomePage;

const StyledCommonContainer = styled.div`
    width: 1270px;
    margin: 0 auto;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledCarouselArea = styled.div`
    overflow: hidden;
    height: 346px;
    margin-top: 25px;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        margin-top: 10px;
    }
`;
const StyledCarouselContainer = styled.div`
    width: 1270px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
    }
`;
const StyledCarouselTextArea = styled.div`
    margin-top: 87px;

    @media (max-width: 768px) {
        text-align: center;
        margin: 0 auto;
        margin-top: 40px;
        padding: 0 20px;
    }
`;
const StyledCarouselImg = styled.img`
    margin-top: 44px;
    
    @media (max-width: 768px) {
        width: 80%;
        margin: 20px 0 40px;
        padding-left: calc(100% - 85%);
    }
`;
const StyledCarouselOne = styled.div`
    width: 1920px;
    height: 346px;
    margin: 0 auto;
    background-color: ${colors.back_navy};
    cursor: pointer;

    @media (max-width: 768px) {
        height: 100%;
    }
`;
const StyledCarouselTwo = styled.div`
    width: 1920px;
    height: 346px;
    margin: 0 auto;
    cursor: pointer;
    background-color: #f2fffa;

    @media (max-width: 768px) {
        height: 100%;
    }
`;
const StyledItemNameArea = styled.div`
    margin: 45px 0 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: 768px) {
        margin: 20px 0;
    }
`;
const StyledTitleText = styled.p<{ hideOnSmallScreen?: boolean }>`
    line-height: 0;
    color: ${colors.main_navy};
    ${fonts.TitleText}

    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
        font-size: 24px;
        margin: ${({ hideOnSmallScreen }) => (hideOnSmallScreen ? '0' : '20px 0')};
        ${({ hideOnSmallScreen }) => hideOnSmallScreen && 'display: none;'}
        /* ${({ hideOnSmallScreen }) => hideOnSmallScreen && 'display: none;'} */
    }
`;
const StyledCarouselTitleTextNavy = styled.p`
    width: 322px;
    height: fit-content;
    color: ${colors.main_navy};
    margin: 0 30px 0 0;
    ${fonts.TitleText}
    font-size: 56px;

    @media (max-width: 768px) {
        width: 100%;
        font-size: 32px;
        margin: 0;
    }
`;
const StyledCarouselTitleTextMint = styled.p`
    width: 322px;
    height: fit-content;
    color: ${colors.main_mint};
    margin: 0 30px 0 0;
    ${fonts.TitleText}
    font-size: 56px;

    @media (max-width: 768px) {
        width: 100%;
        font-size: 32px;
        margin: 0;
    }
`;
const StyledCarouselSubText = styled.p`
    ${fonts.SubTextThinSmall}
    /* margin: 34px 0 0 0; */

    @media (max-width: 768px) {
        font-size: 14px;
        margin-top: 20px;
    }
`;

const StudyListItemArea = styled.div`
    width: 1270px;
    height: 295px;
    margin: 0 0 40px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 25px;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        justify-content: center;
        gap: 25px;
    }
`;

const StyledMainStudyBtnArea = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
const StyledMainStudyBtn = styled.div`
    width: 620px;
    height: 134px;
    border: solid 1px ${colors.main_mint};
    border-radius: 15px;

    @media (max-width: 768px) {
        width: 550px;
        height: 100%;
        padding: 0 35px 0 35px;
        margin-bottom: 20px;
    }
    @media (max-width: 635px) {
        width: 275px;
        padding: 0 10px 0 10px;
    }
`;
const StyeldBtnTextArea = styled.div`
    width: fit-content;
    height: fit-content;
    margin: 35px 0 0 40px;

    @media (max-width: 768px) {
        margin: 20px 0;
        text-align: center;
    }
`;
const StyeldBtnTitleArea = styled.div`
    height: fit-content;
    display: flex;
    margin: 0;

    @media (max-width: 635px) {
        justify-content: center;
        /* align-items: flex-start; */
    }
`;
const StyledIcon = styled.img`
    width: 27px;
    height: 27px;

    @media (max-width: 768px) {
        width: 19px;
        height: 19px;
    }
`;
const StyledMainBtnTitle = styled.p`
    margin: 2px 0 20px 20px;
    ${fonts.SubText}
    font-size: 20px;
    color: ${colors.main_black};

    @media (max-width: 768px) {
        margin: 0 0 15px 10px;
    }
`;
const StyledMainBtnSub = styled.p`
    ${fonts.SubTextThinSmall}
    margin: 0;
    color: ${colors.main_black};
`;

const StyledMainCommunityArea = styled.div`
    width: 100%;
    max-width: 1270px;
    height: 300px;

    @media (max-width: 768px) {
        display: none;
        width: calc(100% - 20px);
    }
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    transition: 0.3s;

    :hover {
        transform: scale(1.007);
        transition: 0.3s;
    }
`;
