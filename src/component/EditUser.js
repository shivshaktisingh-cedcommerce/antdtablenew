// 'use client';
import {  Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';


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

const names = [
    'Group 1',
    'Group 2',
    'Group 3',
    'Group 4',
    'Group 5',
    'Group 6',
    'Group 7',
    'Group 8',
    'Group 9',
    'Group 10',
];



export default function EditUser({item}) {
    const [userObject, setUserObject] = useState({
        name: item?.name || '',
        userName: item?.user ||'',
        email: item?.email || '',
        role: item?.role || '',
        employeeId: item?.empId || '',
        password: item?.password || '',
        reEnterPassword: item?.reEnterPassword || '' ,
        image: item?.pick_url || null
    })

    const [emailErrorObj, setEmailErrorObj] = useState({
        emailError: false,
        emailErrorText: '',
    })

    const [passwordErrorObj, setPasswordErrorObj] = useState({
        passwordError: false,
        passwordErrorText: ''
    });

    const [personName, setPersonName] = useState(item?.group || []);

    const handleChange = (event) => {
        const { target: { value } } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleFileSelect = (file, url) => {
        // console.log('Selected file:', file), url;
    };

    const handleChangeFields = (name, value) => {
        setUserObject({ ...userObject, [name]: value })
        if (name === 'reEnterPassword') {
            if (userObject.password === value && userObject.password.length > 0) {
                setPasswordErrorObj({ passwordError: false, passwordErrorText: '' })
            }
        }
    }

    const onChangeRole = (e) => {
        setUserObject({ ...userObject, role: e.target.value })
    }

    const handleSubmit = () => {
        if (userObject.password !== userObject.reEnterPassword) {
            setPasswordErrorObj({ passwordError: true, passwordErrorText: 'Retype Password does not match with password.' });
        } else {
            setPasswordErrorObj({ passwordError: false, passwordErrorText: '' });
        }
    }
    const ifAnyFieldIsEmpty = () => {
        if (userObject.name.length === 0 || userObject.email.length === 0 || userObject.userName.length === 0 || userObject.employeeId.length === 0 || userObject.password.length === 0 || userObject.reEnterPassword.length === 0 || personName.length === 0) {
            return true
        }
        return false;
    }

    const handleChangeEmailBlur = () => {
        const email = userObject.email;
        if (email.length === 0) {
            return;
        }
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            setEmailErrorObj({
                emailError: true,
                emailErrorText: 'Please Enter the valid Email'
            })
        } else {
            setEmailErrorObj({
                emailError: false,
                emailErrorText: ''
            })
        }
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };



    return (
        <div>
                    <div style={{background:'#4e91fd' , width:'96%' , borderBottomLeftRadius:'10px' ,  borderTopRightRadius:'10px'}}>

            <Typography fontWeight="bold" variant="h3" component="" paddingLeft={1} style={{ fontSize: '2.5rem' }} color={'white'}>Edit User</Typography>
            </div>
            <Grid container spacing={2} margin={'auto'} width='90%' maxWidth={600}>
                <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                    <ImageUpload onFileSelect={handleFileSelect} image={userObject.image}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'} >
                    <TextField id="outlined-basic" label="Enter Name" variant="outlined" fullWidth value={userObject.name} onChange={(e) => handleChangeFields('name', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'}>
                    <TextField id="outlined-basic" label="Enter User Name" variant="outlined" fullWidth value={userObject.userName} onChange={(e) => handleChangeFields('userName', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'} >
                    <TextField id="outlined-basic" label="Enter Email" variant="outlined" fullWidth value={userObject.email} onBlur={handleChangeEmailBlur}
                        onChange={(e) => handleChangeFields('email', e.target.value)} error={emailErrorObj.emailError} helperText={emailErrorObj.emailErrorText} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'}>
                    <FormControl fullWidth>
                        <InputLabel id="test-select-label">Select Role</InputLabel>
                        <Select
                            value={userObject.role}
                            placeholder="Please Select Role"
                            onChange={onChangeRole}
                            labelId="test-select-label"
                            label="Select Role"
                            fullWidth
                        >
                            <MenuItem key={1} value="admin">
                                Admin
                            </MenuItem>
                            <MenuItem key={2} value="user">
                                User
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'} >
                    <TextField id="outlined-basic" label="Enter Employee Id" variant="outlined" fullWidth value={userObject.employeeId} onChange={(e) => handleChangeFields('employeeId', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label">Groups</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Groups" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'} >
                    <TextField id="outlined-basic" label="Enter Password" variant="outlined" fullWidth value={userObject.password} onChange={(e) => handleChangeFields('password', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'}>
                    <TextField id="outlined-basic" label="Re Enter Password" variant="outlined" fullWidth value={userObject.reEnterPassword} onChange={(e) => handleChangeFields('reEnterPassword', e.target.value)} error={passwordErrorObj.passwordError} helperText={passwordErrorObj.passwordErrorText} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                    <Button variant="contained" onClick={handleSubmit} disabled={ifAnyFieldIsEmpty()} >Update</Button>
                </Grid>
            </Grid>
        </div>

    );
}
