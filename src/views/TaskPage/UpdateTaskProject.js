import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { updateTaskApi } from '../../apis/Task/updateTask';
import { updateTaskApi1 } from '../../apis/Task/updateTask';
import { getProjectByManagerApi } from '../../apis/ProjectManager/getAllManager';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { getTaskByIdApi } from '../../apis/Task/getTaskByProjectId';

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
const UpdateTaskProject = (props) => {
  const { id } = useParams();
  console.log(id);
  var idN = parseInt(id);
  //   const [allProjectDetails, setAllProjectDetails] = React.useState([]);
  const [valueActualStartDate, setValueActualStartDate] = React.useState();
  const [valueActualEndDate, setValueActualEndDate] = React.useState();
  const [valuePlanStartDate, setValuePlanStartDate] = React.useState(
    new Date()
  );
  const [valuePlanEndDate, setValuePlanEndDate] = React.useState(new Date());
  const [projectId, setProjectId] = React.useState();
  const [loading, setLoading] = useState('');
  const [projectByManager, setProjcetByManager] = React.useState();
  const [managerTypeSelected, setManagerTypeSelected] = React.useState();
  const [allTaskDetails, setAllTaskDetails] = React.useState();
  const [selectedImages, setSelectedImage] = useState([]);
  const [filesImage, setFilesImage] = useState([]);

  const submitForm = (data) => {
    const actualStartDate =
      moment(valueActualStartDate).format('YYYY-MM-DD HH:mm');
    const actualEndDate = moment(valueActualEndDate).format('YYYY-MM-DD HH:mm');
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    Swal.fire({
      title: 'C???p nh???t c??ng vi???c ?',
      target: document.getElementById('form-modal12'),
      text: 'L??u ?? c???p nh???t s??? thay ?????i d??? li???u c???a d??? ??n!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25723F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'C???P NH???T',
      cancelButtonText: 'KH??NG C???P NH???T',
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateTask(
          // actualEndDate,
          // actualStartDate,
          planEndDate,
          planStartDate,
          projectId,
          // managerTypeSelected,
          data.taskDesc,
          idN,
          data.taskName,
          filesImage
        );
      }
    });
  };
  const handleUpdateTask = async (
    // actualEndDate,
    // actualStartDate,
    planEndDate,
    planStartDate,
    projectId,
    // assigneeId,
    taskDesc,
    taskId,
    taskName,
    fileList
  ) => {
    try {
      setLoading(true);
      await updateTaskApi1({
        // actualEndDate,
        // actualStartDate,
        planEndDate,
        planStartDate,
        projectId,
        // assigneeId,
        taskDesc,
        taskId,
        taskName,
        fileList,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'C???p nh???t c??ng vi???c th??nh c??ng',
        timer: 3000,
        showConfirmButton: false,
      });
      // window.location.replace(`/projectDetails/${id}`);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: 'C???p nh???t th???t b???i',
        target: document.getElementById('form-modal'),
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllTaskDetail = await getTaskByIdApi(id, 'BY_ID');
        setAllTaskDetails(listAllTaskDetail.data);
        setProjectId(listAllTaskDetail.data.projectId);
        setValuePlanStartDate(listAllTaskDetail.data.planStartDate);
        setValuePlanEndDate(listAllTaskDetail.data.planEndDate);
      } catch (error) {
        console.log('Kh??ng th??? l???y d??? li???u c???a b??o c??ng vi???c');
      }
      try {
        const listProjectByManager = await getProjectByManagerApi(
          0,
          15,
          projectId,
          'BY_PROJECT_ID',
          'createdAt',
          true
        );
        setProjcetByManager(listProjectByManager.data);
      } catch (error) {
        console.log('Kh??ng th??? l???y danh s??ch d??? ??n');
      }
    })();
  }, []);
  console.log(allTaskDetails);
  console.log(projectByManager);
  console.log(projectId);
  const valideSchema = yup
    .object({
      taskName: yup.string().required('Kh??ng ???????c ????? tr???ng t??n c??ng vi???c !!'),
      taskDesc: yup
        .string()
        .required('Kh??ng ???????c ????? tr???ng th??ng tin c??ng vi???c!!'),
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
    setManagerTypeSelected(event.target.value);
  };
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
  const renderPhotos = (src) => {
    return src.map((photo, index) => {
      return (
        <Badge
          badgeContent={<CancelIcon />}
          onClick={() => handleDeleteImage(photo, index)}
        >
          <img
            style={{
              width: '150px',
              height: '150px',
              // borderRadius: "50%",
              marginRight: '5px',
              marginBottom: '5px',
            }}
            src={photo}
            key={index}
          />
        </Badge>
      );
    });
  };
  return (
    <Paper className="bodynonetab" elevation="none">
      <Typography variant="h6" color="#DD8501">
        C???P NH???T C??NG VI???C
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
            Th??ng tin c??ng vi???c
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          {allTaskDetails ? (
            <form onSubmit={handleSubmit(submitForm)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2">T??n c??ng vi???c</Typography>
                  <TextField
                    {...register('taskName')}
                    name="taskName"
                    variant="outlined"
                    autoComplete="taskName"
                    autoFocus
                    defaultValue={allTaskDetails.taskName}
                    error={errors.taskName != null}
                    helperText={errors.taskName?.message}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Th??ng tin c??ng vi???c</Typography>
                  <TextField
                    {...register('taskDesc')}
                    name="taskDesc"
                    variant="outlined"
                    autoComplete="taskDesc"
                    autoFocus
                    defaultValue={allTaskDetails.taskDesc}
                    error={errors.taskDesc != null}
                    helperText={errors.taskDesc?.message}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2">Th???i gian</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">B???t ?????u d??? ki???n</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={valuePlanStartDate}
                        onChange={(newValue) => {
                          setValuePlanStartDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">K???t th??c d??? ki???n</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={valuePlanEndDate}
                        onChange={(newValue) => {
                          setValuePlanEndDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                {/* <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Th???i gian ch??nh th???c
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">B???t ?????u ch??nh th???c</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={valueActualStartDate}
                        onChange={(newValue) => {
                          setValueActualStartDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">K???t th??c ch??nh th???c</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={valueActualEndDate}
                        onChange={(newValue) => {
                          setValueActualEndDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid> */}
                <Grid item xs={12}>
                  <Typography variant="body2">Ky?? s?? qua??n ly??</Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Select
                      onChange={handleChange}
                      MenuProps={MenuProps}
                      value={managerTypeSelected}
                    >
                      {projectByManager ? (
                        projectByManager.map((managerType, index) => (
                          <MenuItem
                            value={managerType.manager.userId}
                            key={index}
                          >
                            {managerType.manager.username}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>Kh??ng c?? d??? li???u! Vui l??ng xem l???i!</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <input
                    {...register('files')}
                    type="file"
                    id="files"
                    multiple
                    onChange={handleChangeFile}
                  />
                  <div className="label-holder">
                    <label htmlFor="file" className="img-upload">
                      Ch???n h??nh
                    </label>
                  </div>

                  <div className="result">{renderPhotos(selectedImages)}</div>
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
                      L??u
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          ) : (
            <div>Kh??ng c?? d??? li???u!!</div>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default UpdateTaskProject;
