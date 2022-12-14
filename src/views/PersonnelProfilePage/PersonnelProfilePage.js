import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const PersonnelProfilePage = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <div>
        <Grid container justify="center">
            <Grid container md="8">
                <Grid item>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ margin: "20px" }}>
                        <IconButton aria-label="add" sx={{ alignSelf: "center", backgroundColor: "#DD8501" }}>
                            <Add sx={{ color: "white" }}></Add>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: "100%" }}>
                        <Typography variant="body1">Tr????ng Qu???c Vinh</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="scrollable"
                    scrollButtons="auto" value={value} onChange={handleChange} aria-label="">
                    <Tab label="S?? y???u l?? l???ch" {...a11yProps(0)} />
                    <Box sx={{ flex: 1 }}></Box>
                    <Box>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton aria-label="edit report" component={Link} to={('/editPersonnelProfile')} sx={{ height: "100%"}}>
                                    <Box sx={{height: "30px" }}>

                                        <EditOutlinedIcon fontSize="large" />

                                    </Box>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>

                                <Typography variant="button">
                                    Ch???nh s???a
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }} fontWeight="bold">
                            S?? y???u l?? l???ch
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container>
                            <Grid item xs={4}>
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <Avatar sx={{ height: "150px", width: "150px" }} variant="square" src="src/assets/images/non-avatar.png">
                                    </Avatar>
                                </Box>
                            </Grid>
                            <Grid container item xs={8} spacing={3}>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">H??? v?? t??n</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">Tr????ng Qu???c Vinh</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">M?? NV</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">1</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Ng??y sinh</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">31/12/1990</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Gi???i t??nh</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">Nam</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">T??nh tr???ng h??n nh??n</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">?????c th??n</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Qu???c t???ch</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">Vi???t Nam</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">??i???n tho???i</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">0909090909</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Email</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">vinh@gmail.com</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                <Box sx={{ height: "30px" }}></Box>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }} fontWeight="bold">
                            Th??ng tin kh??c
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container spacing={3}>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">D??n t???c</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Kinh</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">T??n gi??o</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Kh??ng</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">CMT/C??n c?????c/H??? chi???u</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">123456789</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Ng??y c???p, N??i c???p</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">01/11/2003, t???i c??ng an Th??nh ph??? H??? Ch?? Minh</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">N??i sinh</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Th??nh ph??? H??? Ch?? Minh, Vi???t Nam</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Nguy??n qu??n</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Th??nh ph??? H??? Ch?? Minh, Vi???t Nam</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Th?????ng tr??</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">222 Ho??ng Hoa Th??m, ph?????ng 12, qu???n T??n B??nh, Tp HCM</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Ch??? ??? hi???n t???i</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">222 Ho??ng Hoa Th??m, ph?????ng 12, qu???n T??n B??nh, Tp HCM</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                <Box sx={{ height: "30px" }}></Box>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }} fontWeight="bold">
                            H??? s?? nh??n vi??n
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container spacing={3}>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Ph??ng ban</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Ki???m th??? ph???n m???m</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">V??? tr??</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">IT</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Ch???c v???</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Tr?????ng ph??ng k??? thu???t</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Vai tr??</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Nh??n vi??n</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Ng??y v??o</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">01/01/2022</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </TabPanel>
        </Box>
    </div>;
};

export default PersonnelProfilePage;