// Components
import { Grid, Box } from '@mui/material';
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';  

const Home = () => {
    return (
        <>
            <Banner />
            <Grid container spacing={2} columns={12}>
                {/* Oldalsáv - Kategóriák */}
                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 2' } }}>
                    <Categories />
                </Grid>

                {/* Bejegyzések listája */}
                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 10' } }}>
                    <Box>
                        <Posts />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
