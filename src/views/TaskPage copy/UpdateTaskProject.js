import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
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
import { updateTaskApi } from '../../apis/Task/updateTask';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { getTaskByIdApi } from '../../apis/Task/getTaskByProjectId';

const UpdateTaskProject = (props) => {
  const { id } = useParams();
  console.log(id);
  var idN = parseInt(id);
  //   const [allProjectDetails, setAllProjectDetails] = React.useState([]);
  const [valueActualStartDate, setValueActualStartDate] = React.useState(
    new Date()
  );
  const [valueActualEndDate, setValueActualEndDate] = React.useState(
    new Date()
  );
  const [valuePlanStartDate, setValuePlanStartDate] = React.useState(
    new Date()
  );
  const [valuePlanEndDate, setValuePlanEndDate] = React.useState(new Date());
  const [projectId, setProjectId] = React.useState();
  const handleGetDate = (date) => {
    const getDate = date.substring(0, 10);
    const getDateCom = getDate.split('-');
    const getDateReformat = ''.concat(
      getDateCom[2],
      '-',
      getDateCom[1],
      '-',
      getDateCom[0]
    );
    return getDateReformat;
  };
  const [loading, setLoading] = useState('');
  const [allTaskDetails, setAllTaskDetails] = React.useState();

  React.useEffect(() => {
    (async () => {
      try {
        const listAllTaskDetail = await getTaskByIdApi(id, 'BY_ID');
        setAllTaskDetails(listAllTaskDetail.data);
        setProjectId(listAllTaskDetail.data.projectId);
      } catch (error) {
        console.log('Kh??ng th??? l???y d??? li???u c???a b??o c??ng vi???c');
      }
    })();
  }, []);
  console.log(allTaskDetails);
  const submitForm = (data) => {
    const actualStartDate =
      moment(valueActualStartDate).format('YYYY-MM-DD HH:mm');
    const actualEndDate = moment(valueActualEndDate).format('YYYY-MM-DD HH:mm');
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    console.log(
      actualEndDate,
      actualStartDate,
      planEndDate,
      planStartDate,
      projectId,
      data.taskDesc,
      idN,
      data.taskName,
      data.taskAssignment
    );
    Swal.fire({
      title: 'C???p nh???t c??ng vi???c ?',
      target: document.getElementById('form-modal12'),
      text: 'L??u ?? c???p nh???t s??? thay ?????i d??? li???u c???a d??? ??n!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25723F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'C???P NH???T',
      cancelButtonText: 'H???Y',
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateTask(
          actualEndDate,
          actualStartDate,
          planEndDate,
          planStartDate,
          projectId,
          data.taskDesc,
          idN,
          data.taskName,
          data.taskAssignment
        );
        console.log(data);
      }
    });
  };
  const handleUpdateTask = async (
    actualEndDate,
    actualStartDate,
    planEndDate,
    planStartDate,
    projectId,
    taskDesc,
    taskId,
    taskName,
    taskAssignment
  ) => {
    try {
      setLoading(true);
      console.log(
        typeof taskId,
        typeof taskDesc,
        typeof projectId,
        typeof taskName
      );
      await updateTaskApi({
        actualEndDate,
        actualStartDate,
        planEndDate,
        planStartDate,
        projectId,
        taskDesc,
        taskId,
        taskName,
        taskAssignment,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'C???p nh???t c??ng vi???c th??nh c??ng',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace(`/projectDetails/${id}`);
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
    console.log(planStartDate);
  };
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
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
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
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          {allTaskDetails ? (
            <form onSubmit={handleSubmit(submitForm)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    T??n c??ng vi???c
                  </Typography>
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
                  <Typography variant="body2">
                    Th??ng tin c??ng vi???c
                  </Typography>
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
                    <Typography variant="body2">
                      Th???i gian
                    </Typography>
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
                <Grid container item xs={12} spacing={1}>
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
                      style={{
                        backgroundColor: '#DD8501',
                        borderRadius: 50,
                        width: '200px',
                        alignSelf: 'center',
                      }}
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
    </div>
  );
};

export default UpdateTaskProject;
