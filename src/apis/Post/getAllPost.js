import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllPostApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_ALL_POST}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`,
    userInfor.token
  );
};
