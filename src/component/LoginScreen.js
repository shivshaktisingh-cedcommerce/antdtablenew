
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import { Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, SnackbarContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';



export default function LoginScreen() {
  const navigate = useNavigate();
  const [userLoginData , setUserLoginData] = React.useState({
    email:'',
    password:''
  })
  const [emailErrorObj , setEmailErrorObj] = React.useState({
    emailError:false,
    emailErrorText:'',
  })

  const [passwordErrorObj , setPasswordErrorObj] = React.useState({
    passwordError:false,
    passwordErrorText:'',
  })

  const [snackBarObj , setSnackBarObj] = React.useState({
    flag:false ,
    text:''
  })

  const [loggedIn , setLoggedIn] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = () => {
    if(userLoginData.email === 'admin@gmail.com' && userLoginData.password === 'Password'){
       setLoggedIn(true);
        setSnackBarObj({
            flag:true ,
            text:'Successfully Logged In.'
        })
        sessionStorage.setItem('loggedIn' , 'true');
        navigate('/dashboard')
        
    }else{
        setLoggedIn(false);
        setSnackBarObj({
            flag:true ,
            text:'Please Enter Valid Credentials.'
        })
    }

    setTimeout(()=>{
        setSnackBarObj({
            flag:false ,
            text:''
        })
    },4000)
  };

  const handleChangeEmail = (event) =>{
    let email = event.target.value;
    const isValidEmail = validateEmail(email);
    if(isValidEmail){
        setEmailErrorObj({
            emailError:false ,
            emailErrorText:''
        })
    }
    setUserLoginData({ ...userLoginData, email: email });
}

  const handleChangePassword = (event) =>{
    let password = event.target.value;
    if(password.length > 0){
        setPasswordErrorObj({
            passwordError:false ,
            passwordErrorText:''
        })
    }
    setUserLoginData({ ...userLoginData, password: password });
  }

  const handleChangeEmailBlur = () =>{
    const email = userLoginData.email;
    if(email.length === 0){
        return;
    }
    const isValidEmail = validateEmail(email);
    if(!isValidEmail){
      setEmailErrorObj({
        emailError:true , 
        emailErrorText:'Please Enter the valid Email'
      })
    }else{
      setEmailErrorObj({
        emailError:false , 
        emailErrorText:''
      })
    }
  }

  const handleChangePasswordBlur = () =>{
    const password = userLoginData.password;
    if(password.length === 0){
        setPasswordErrorObj({
            passwordError:true , 
            passwordErrorText:'Please Enter Password.'
          })
    }else{
        setPasswordErrorObj({
            passwordError:false , 
            passwordErrorText:''
          })       
    }
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleClose = (event , reason) => {
    if (reason === 'clickaway') {
      return;
    }
        setSnackBarObj({
            flag:false , 
            text:''
        })
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }} >
        <CssBaseline />
        <Grid 
        item
        xs={false}
        sm={6}
        md={6}
        >
            <Card 
            
            className='side-section'
            sx={{display:'flex' , alignItems:'center' , justifyContent:'center'}}
            >
            <img className='img-class' src="bg3.png"/>
          </Card>
       </Grid>
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
         <Box
            sx={{
              my: 30,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box  sx={{ mt: 1,maxWidth:450,mt:8 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChangeEmail}
                onBlur={handleChangeEmailBlur}
                value={userLoginData.email}
                error={emailErrorObj.emailError}
                helperText={emailErrorObj.emailErrorText}
              />
          
         <FormControl fullWidth variant="outlined"  required >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChangePassword}
            onBlur={handleChangePasswordBlur}
            value={userLoginData.password}
            error={passwordErrorObj.passwordError}
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
            </FormControl>



              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                disabled={userLoginData.email.length === 0 || userLoginData.password.length === 0 || emailErrorObj.emailError || passwordErrorObj.passwordError}
              >
                Sign In
              </Button>

              <Snackbar
                anchorOrigin={{vertical:'bottom' , horizontal:'center'}}
                open={snackBarObj.flag}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <SnackbarContent sx={{background: loggedIn ? '#00b200':'#cc0000'}} message={snackBarObj.text} />
                </Snackbar>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}