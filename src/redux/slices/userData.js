import { createSlice } from '@reduxjs/toolkit';


// initial state
const initialState = {
  userDataDetails: [
    {
        key: 1,
        name: "John Doe",
        user: "johndoe123",
        empId: 2067,
        role: "admin",
        email: "john.doe@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 2,
        name: "Alice Smith",
        user: "alicesmith456",
        empId: 2068,
        role: "admin",
        email: "alice.smith@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 3,
        name: "Bob Johnson",
        user: "bobjohnson789",
        empId: 2069,
        role: "admin",
        email: "bob.johnson@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 4,
        name: "Jane Williams",
        user: "janewilliams10",
        empId: 2070,
        role: "user",
        email: "jane.williams@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 5,
        name: "Michael Brown",
        user: "michaelbrown789",
        empId: 2071,
        role: "user",
        email: "michael.brown@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 6,
        name: "Emily Johnson",
        user: "emilyjohnson456",
        empId: 2072,
        role: "admin",
        email: "emily.johnson@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 7,
        name: "Chris Brown",
        user: "chrisbrown123",
        empId: 2073,
        role: "user",
        email: "chris.brown@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 8,
        name: "Sarah Miller",
        user: "sarahmiller789",
        empId: 2074,
        role: "user",
        email: "sarah.miller@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 9,
        name: "David Smith",
        user: "davidsmith456",
        empId: 2075,
        role: "admin",
        email: "david.smith@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        key: 10,
        name: "Emma Wilson",
        user: "emmawilson789",
        empId: 2076,
        role: "user",
        email: "emma.wilson@example.com",
        group:['Group 1' , 'Group 2'],
        password:'password',
        reEnterPassword:'password',
        pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
      key: 11,
      name: "Ryan Davis",
      user: "ryandavis789",
      empId: 2077,
      role: "user",
      email: "ryan.davis@example.com",
      group:['Group 1' , 'Group 2'],
      password:'password',
      reEnterPassword:'password',
      pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
      key: 12,
      name: "Sophia Garcia",
      user: "sophiagarcia123",
      empId: 2078,
      role: "user",
      email: "sophia.garcia@example.com",
      group:['Group 1' , 'Group 2'],
      password:'password',
      reEnterPassword:'password',
      pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
      key: 13,
      name: "Daniel Martinez",
      user: "danielmartinez456",
      empId: 2079,
      role: "user",
      email: "daniel.martinez@example.com",
      group:['Group 1' , 'Group 2'],
      password:'password',
      reEnterPassword:'password',
      pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
      key: 14,
      name: "Olivia Taylor",
      user: "oliviataylor789",
      empId: 2080,
      role: "user",
      email: "olivia.taylor@example.com",
      group:['Group 1' , 'Group 2'],
      password:'password',
      reEnterPassword:'password',
      pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
      key: 15,
      name: "Noah Rodriguez",
      user: "noahrodriguez123",
      empId: 2081,
      role: "user",
      email: "noah.rodriguez@example.com",
      group:['Group 1' , 'Group 2'],
      password:'password',
      reEnterPassword:'password',
      pick_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
    
  ],
  groups : [
    'Group 1',
    'Group 2',
    'Group 3',
]
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    // to add new product
    addUser(state, action)
     {
        let data = [...state.userDataDetails];
        action.payload.key = data.length + 1;
        data.push(action.payload);
        state.userDataDetails = data;
    },
    addGroup(state , action){
        let data = [...state.groups];
        data.push(action.payload);
        state.groups = data;
    } ,
    deleteUser(state , action){
      let data = [...state.userDataDetails];
      let newData = data.filter((item) => item.empId !== action.payload);
      state.userDataDetails = newData;
    } ,
    bulkDelete(state , action){
      state.userDataDetails = action.payload;
    } ,
  },
});

export const {
  addUser,
  addGroup,
  deleteUser,
  bulkDelete,
} = userSlice.actions;
export default userSlice.reducer;
