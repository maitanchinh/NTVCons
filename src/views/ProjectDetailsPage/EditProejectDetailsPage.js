import { Divider, Typography, Box, TextField, Grid, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';

const status = [
    { label: 'Hoàn thành' },
    { label: 'Đang thực hiện' },
    { label: 'Tạm dừng' },
    { label: 'Đã hủy' },
]
const EditProjectDetailsPage = (props) => {
    const [actualStart, setActualStart] = React.useState('09/06/2021');
    const [actualEnd, setActualEnd] = React.useState('09/24/2022');
    const [expectedStart, setExpectedStart] = React.useState('09/06/2022');
    const [expectedEnd, setExpectedEnd] = React.useState('09/24/2022');
    return <div>

        <Typography variant="h6" color="#DD8501" sx={{ marginTop: "20px", marginBottom: "20px" }}>
            CHỈNH SỬA DỰ ÁN
        </Typography>
        <Divider></Divider>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>

        <Box sx={{ paddingLeft: "10px", paddingTop: "10px", width: "40%", marginBottom: "30px" }}>
            <Typography variant="body1" color="#DD8501" fontWeight="bold">Thông tin dự án</Typography>
            <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
            <Box sx={{ width: "100%", height: "20px" }}></Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Mã dự án</Typography>
                    <TextField id="project-name" value="1" variant="outlined" sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Tên dự án</Typography>
                    <TextField id="project-name" value="Xây dựng tòa nhà văn phòng ABC" variant="outlined" sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Người quản trị</Typography>
                    <TextField id="project-name" value="Đỗ Nam Trung" variant="outlined" sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Tiến độ</Typography>
                    <TextField id="project-name" value="10%" variant="outlined" sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Trạng thái</Typography>
                    <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={status}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} value="Đang thực hiện" />}
                        />
                </Grid>
                <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Thời gian dự kiến</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" >Bắt đầu</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={expectedStart}

                                onChange={(newValue) => {
                                    setExpectedStart(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" >Kết thúc</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={expectedEnd}
                                onChange={(newValue) => {
                                    setExpectedEnd(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Thời gian thực tế</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" >Bắt đầu</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={actualStart}

                                onChange={(newValue) => {
                                    setActualStart(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" >Kết thúc</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={actualEnd}
                                onChange={(newValue) => {
                                    setActualEnd(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Người tham gia</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        value="Nguyễn Văn A, Trần Thị B, Vũ Văn C, Huỳnh Thị N, Đỗ Văn T"
                        multiline
                        rows={4}
                        sx={{ width: "100%" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex"
                    }}>
                        <Button variant="contained"
                            style={{
                                backgroundColor: "#DD8501", borderRadius: 50, width: "200px",
                                alignSelf: "center"
                            }}>Lưu</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </Box>
    </div>;
};

export default EditProjectDetailsPage;