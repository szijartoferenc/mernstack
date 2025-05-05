import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

// Banner stílus: a háttérszínt modernizáljuk
const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 60vh; 
    background-position: center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    box-shadow: inset 0 0 20px #000000;
`;

// Wrapper a szöveg és a linkek köré
const Wrapper = styled(Box)`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
`;

// Text stílus a szövegekhez
const Text = styled(Typography)`
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    margin-top: 15px;
    line-height: 1.8;
`;

// Linkekhez és ikonokhoz használt stílus
const IconLink = styled(Link)`
    margin-left: 10px;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color:#090b7c;
    &:hover {
        color: #2196F3;
        transition: color 0.3s ease;
    }
    svg {
        margin-right: 5px;
    }
`;

const About = () => {
    return (
        <Box>
            <Banner>
                <Typography variant="h3" style={{ fontWeight: 700 }}>
                  Frankie Webdesign
                </Typography>
            </Banner>
            <Wrapper>
                <Typography variant="h4" style={{ fontWeight: 600, marginBottom: '20px' }}>
                    Hello, I'm a Software Developer in Hungary
                </Typography>
                
                <Text>
                    I've built websites, desktop applications, and corporate software.<br />
                    If you are interested, you can view some of my favorite projects on GitHub:
                    <IconLink href="https://github.com/" target="_blank">
                        <GitHub fontSize="large" />
                        GitHub
                    </IconLink>
                </Text>

                <Text>
                    Need something built or simply want to have a chat? Reach out to me on
                    <IconLink href="https://www.instagram.com/" target="_blank">
                        <Instagram fontSize="large" />
                        Instagram
                    </IconLink>  
                    or send me an email at  
                    <IconLink href="mailto:?Subject=This is a subject" target="_blank">
                        <Email fontSize="large" />
                        Email
                    </IconLink>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default About;
