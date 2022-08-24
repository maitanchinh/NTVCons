import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


export default function UploadImage(setSelectedImage, setFilesImage) {

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
    const valideSchema = yup.object({}).required();
    const {
        register,
    } = useForm({
        resolver: yupResolver(valideSchema),
    });
    return (
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input
                {...register('files')}
                type="file"
                id="files"
                multiple
                hidden
                onChange={handleChangeFile}
            />
            <PhotoCamera style={{color: "#DD8501"}} fontSize='large'/>
        </IconButton>
    );
}