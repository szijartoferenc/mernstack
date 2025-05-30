import { Box, Typography, styled } from '@mui/material';

const Image = styled(Box)`
    background: url(https://www.shutterstock.com/image-photo/workplace-winter-background-keayboard-notebook-260nw-713073412.jpg) center/cover no-repeat #000;
    background-position: 55%;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`

const Banner = () =>{
    return(
       <Image>
            <Heading>Blog</Heading>
            <SubHeading>Frankie Webdesign</SubHeading>
       </Image>
    )
}

export default Banner;
