import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Stack,
  Paper,
  Select,
  Dialog,
  FormControl,
  MenuItem,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import { createReportApi1 } from '../../apis/Report/createReport';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import DialogReportDetail from './Components/DialogReportDetail';
import DialogTaskReport from './Components/DialogTaskReport';
import RenderImage from '../../Components/Render/RenderImage';
import UploadImage from '../../Components/Upload/UploadImage';
import { getAllReportTypeApi } from '../../apis/ReportTypes/getAllReportTypes';
import { DateTimePicker } from '@mui/x-date-pickers';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const CreateReportProject = (props) => {
  const { id } = useParams();
  const idN = parseFloat(id);
  console.log(id);
  // var idUser = parseFloat(userInfor.authorID);
  const [valueReportDate, setValueReportDate] = React.useState(new Date());
  const [loading, setLoading] = useState('');
  const [openReportDetailDialog, setOpenReportDetailDialog] = useState(false);
  const [reportDetail, setReportDetail] = React.useState([]);
  const [allReportType, setAllReportType] = React.useState([]);
  const [reportTypeSelected, setReportTypeSelected] = React.useState();
  const [taskReportDetail, setTaskReportDetail] = React.useState([]);
  const [openTaskReportDetailDialog, setOpenTaskReportDetailDialog] =
    useState(false);
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const submitForm = (data) => {
    const reportDate = moment(valueReportDate).format('YYYY-MM-DD HH:mm');
    // if (reportDetail.length === 0 || taskReportDetail.length === 0) {
    //   handleCreateReport(
    //     idN,
    //     reportDate,
    //     data.reportDesc,
    //     null,
    //     reportTypeSelected,
    //     // idUser,
    //     data.reportName,
    //     null,
    //     filesImage
    //   );
    // } else {
    //   handleCreateReport(
    //     idN,
    //     reportDate,
    //     data.reportDesc,
    //     reportDetail,
    //     reportTypeSelected,
    //     // idUser,
    //     data.reportName,
    //     taskReportDetail,
    //     filesImage
    //   );
    // }
    if (reportDetail === 0 || taskReportDetail.length === 0) {
      handleCreateReport(
        idN,
        reportDate,
        data.reportDesc,
        reportDetail,
        reportTypeSelected,
        // idUser,
        data.reportName,
        null,
        filesImage
      );
    } else {
      handleCreateReport(
        idN,
        reportDate,
        data.reportDesc,
        reportDetail,
        reportTypeSelected,
        // idUser,
        data.reportName,
        taskReportDetail,
        filesImage
      );
    }
  };
  const handleCreateReport = async (
    projectId,
    reportDate,
    reportDesc,
    reportDetailList,
    reportTypeId,
    // reporterId,
    reportName,
    taskReportList,
    fileList
  ) => {
    try {
      setLoading(true);
      console.log(
        typeof projectId,
        typeof reportDate,
        typeof reportDesc,
        typeof reportDetailList,
        typeof reportTypeId,
        typeof reporterId,
        typeof reportName,
        typeof taskReportList,
        typeof fileList
      );
      await createReportApi1({
        projectId,
        reportDate,
        reportDesc,
        reportDetailList,
        reportTypeId,
        // reporterId,
        reportName,
        taskReportList,
        fileList,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'T???o b??o c??o th??nh c??ng',
        timer: 3000,
        showConfirmButton: false,
      });
      // await window.location.replace(`/projectDetailsManager/${id}`);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: 'T???o b??o c??o kh??ng th??nh c??ng',
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };

  const valideSchema = yup
    .object({
      reportDesc: yup
        .string()
        .min(5, 'Th??ng tin b??o c??o ph???i c?? th??ng tin nhi???u h??n 5 k?? t???!')
        .required(),
      reportName: yup
        .string()
        .min(5, 'T??n b??o c??o ph???i c?? ??t nh???t 5 k?? t???')
        .required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });
  const handleChange = (event) => {
    setReportTypeSelected(event.target.value);
  };
  const handleOpenReportDetailDialog = () => {
    setOpenReportDetailDialog(true);
  };
  const handleCloseReportDetailDialog = () => {
    setOpenReportDetailDialog(false);
  };
  const handleOpenTaskReportDetailDialog = () => {
    setOpenTaskReportDetailDialog(true);
  };
  const handleCloseTaskReportDetailDialog = () => {
    setOpenTaskReportDetailDialog(false);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllReportType = await getAllReportTypeApi(
          0,
          15,
          'createdAt',
          true
        );
        setAllReportType(listAllReportType.data);
      } catch (error) {
        console.log('Kh??ng th??? l???y danh s??ch ba??o ca??o');
      }
    })();
  }, []);
  const handleChangeFile = (e) => {
    setFilesImage(e.target.files);

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleDeleteImage = (photo, indexImage) => {
    const index = selectedImages.indexOf(photo);
    if (index > -1) {
      selectedImages.splice(index, 1);
      // dispatch({ type: "LOADING", newLoading: !loading });
    }
    const dt = new DataTransfer();
    const input = document.getElementById('files');
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }
    input.files = dt.files;
    setFilesImage(input.files);

    // dispatch({ type: 'LOADING', newLoading: !loading });
  };
  return (
    <Paper sx={{ padding: '32px' }}>
      <Typography variant="h6" color="#DD8501">
        T???O B??O C??O
      </Typography>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            paddingLeft: '10px',
            paddingTop: '10px',
            width: '40%',
            marginBottom: '30px',
          }}
        >
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Th??ng tin b??o c??o
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                  H??nh ???nh
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {UploadImage(setSelectedImage, setFilesImage)}
                  <div className="result">{RenderImage(selectedImages)}</div>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">T??n b??o c??o</Typography>
                <TextFieldComponent
                  register={register}
                  name="reportName"
                  errors={errors.reportName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Th??ng tin b??o c??o</Typography>
                <TextFieldComponent
                  register={register}
                  name="reportDesc"
                  errors={errors.reportDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item container xs={12}>
                <Typography variant="body2">Ng??y b??o c??o</Typography>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField {...props} fullWidth />
                      )}
                      value={valueReportDate}
                      onChange={(newValue) => {
                        setValueReportDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid item container sx={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'left',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleOpenReportDetailDialog()}
                  >
                    Chi ti???t b??o c??o
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {reportDetail.length ? (
                  reportDetail.map((report, index) => (
                    <Grid item xs={4}>
                      <Paper className="tag">
                        <Stack direction="row" spacing={1}>
                          <Typography>{report.itemDesc}</Typography>
                          <Typography>{report.itemAmount}</Typography>
                          <Typography>{report.itemUnit}</Typography>
                          <Typography>{report.itemPrice}&nbsp;VN??</Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Grid item sx={12}>
                    <div>Kh??ng c?? d??? li???u c???a b??o c??o chi ti???t!</div>
                  </Grid>
                )}
              </Grid>
              <Grid item container sx={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'left',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleOpenTaskReportDetailDialog()}
                  >
                    Chi ti???t c??ng vi???c
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {taskReportDetail.length ? (
                  taskReportDetail.map((task, index) => (
                    <Grid item xs={4}>
                      <Paper className="tag">
                        <Stack direction="row" spacing={1}>
                          <Typography>{task.taskId}</Typography>
                          <Typography>{task.taskNote}</Typography>
                          <Typography>&nbsp;{task.taskProgress}</Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Grid item sx={12}>
                    <div>Kh??ng c?? d??? li???u chi ti???t!</div>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Lo???i b??o c??o</Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={reportTypeSelected}
                  >
                    {allReportType.length > 0 ? (
                      allReportType.map((reportType, index) => (
                        <MenuItem value={reportType.reportTypeId} key={index}>
                          {reportType.reportTypeName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        Kh??ng c?? d??? li???u ki???u b??o c??o! Vui l??ng xem l???i!
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">T???p ????nh k??m</Typography>
                <input
                  {...register('files')}
                  type="file"
                  id="files"
                  multiple
                  onChange={handleChangeFile}
                />
                <div className="label-holder">
                  <label htmlFor="file" className="img-upload"></label>
                </div>

                {/* <div className="result">{RenderImage(selectedImages)}</div> */}
                {/* <input type="file" multiple {...register("file")} /> */}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="submitButton"
                  >
                    T???o b??o c??o
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Dialog
        open={openReportDetailDialog}
        onClose={handleCloseReportDetailDialog}
      >
        <DialogReportDetail
          handleCloseReportDetailDialog={handleCloseReportDetailDialog}
          setReportDetail={setReportDetail}
          reportDetail={reportDetail}
        ></DialogReportDetail>
      </Dialog>
      <Dialog
        open={openTaskReportDetailDialog}
        onClose={handleCloseTaskReportDetailDialog}
      >
        <DialogTaskReport
          handleCloseTaskReportDetailDialog={handleCloseTaskReportDetailDialog}
          setTaskReportDetail={setTaskReportDetail}
          taskReportDetail={taskReportDetail}
        ></DialogTaskReport>
      </Dialog>
    </Paper>
  );
};

export default CreateReportProject;
