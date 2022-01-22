import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Badge, Box, Button, Container, Grid, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { profileUser, rankingUser, rankingGroup } from "../../../_actions/user_actions";
import Tier from './Section/Tier';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const GrayBox = styled(Box)({
    backgroundColor: '#E8E8E8',
    borderRadius: '2.5rem',
    padding: '1rem',
})

const userId = localStorage.getItem('userId')

function MainPage() {
    const dispatch = useDispatch();

    const getUser = (userArray, userId) => {
        const me =
        userArray.find( (user) => {
            return user._id === userId;
        })
        return me
    }
     
    useEffect( () => {
        dispatch(profileUser({userId : userId}))
        .then(response => {
            if (response.payload.success) {
                //console.log(response.payload);
            }
        });

        dispatch(rankingUser())
        .then(response => {
            if (response.payload.success) {
                console.log(response.payload);
            }
        });

        dispatch(rankingGroup())
        .then(response => {
            if (response.payload.success) {
                console.log(response.payload);
            }
        });
    }, []);

    const user = useSelector((state) => state.user);

    if (user.userProfile === undefined || user.userRank === undefined || user.groupRank === undefined) {
        return (
            <div>유저정보 불러오는 중</div>
        );
    }   else {
        const userProfile = user.userProfile.user;
        const userRank = user.userRank.result;
        const groupRank = user.groupRank.result;
        
        const me = getUser(userRank, userId);
        //console.log(userProfile);
        //console.log(userRank, groupRank);
        //getUserRanking(userRank, userId);
        console.log(me);
        return (
            <Container 
                component="main"
                maxWidth="lg"
            >
                <Box sx={{display: 'flex', my: 4}}>
                    <Avatar
                        size="large"
                        src={localStorage.getItem("image")}
                        sx={{
                            fontSize: "32px",
                            mr: 2,
                        }}
                    />
                    <Typography variant="h5"
                    >
                        안녕하세요, {userProfile.name}님!
                        공부를 시작한지 벌써 000이 지났어요
                    </Typography>
                </Box>
                
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <GrayBox sx={{display: 'flex'}}>
                            <Typography sx={{mr: 1}}>전역률</Typography>
                            <HomeIcon sx={{color: '#5E5E5E'}}/>
                        </GrayBox>
                    </Grid>

                    <Grid item xs={9}>
                        <GrayBox>
                            <Box sx={{display: 'flex'}}>
                                <Typography sx={{mr: 1}}>내 랭킹</Typography>
                                <EqualizerIcon sx={{color: '#5E5E5E'}}/>
                            </Box>
                            <Box sx={{p:2}}>

                                <Tier point={me.totalTime} tier="Gold" />

                                <Stack direction="row" spacing={2}>
                                    <Typography>{me.rank}위</Typography>
                                    <Typography>
                                        상위 {me.rank/userRank.length * 100}%
                                    </Typography>
                                    <Typography>{me.totalTime}초</Typography>

                                </Stack>
                            </Box>
                            
                            
                            
                        </GrayBox>
                    </Grid>

                    <Grid item xs={3}>
                        <GrayBox>10월 활동량</GrayBox>
                    </Grid>

                    <Grid item xs={9}>
                        <GrayBox>일주일간 활동 그래프</GrayBox>
                    </Grid>

                    <Grid item xs={3}>
                        <GrayBox>일주일간 활동 비율</GrayBox>
                    </Grid>

                    <Grid item xs={3}>
                        <GrayBox>W.M.과 함께한 시간</GrayBox>
                    </Grid>

                    <Grid item xs={3}>
                        <GrayBox>인기 태그</GrayBox>
                    </Grid>


                </Grid>
            </Container>
        );
    }
}

export default MainPage