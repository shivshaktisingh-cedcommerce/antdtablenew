import * as React from 'react';
import { Dropdown, Modal } from 'antd';
import {
  Avatar,
  Table,
  Typography,
  Flex,
  Tag,
  Button,
  Input,
  Space
} from "antd";
import { SearchOutlined, EditOutlined, CaretDownOutlined } from "@ant-design/icons";
import CreateUser from './CreateUser';
import { DeleteOutline } from '@mui/icons-material';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import EditUser from './EditUser';
import { useDispatch, useSelector } from 'react-redux';
import {  Snackbar, SnackbarContent, TextField } from '@mui/material';
import { addGroup, bulkDelete, deleteUser } from '../redux/slices/userData';



const { Text } = Typography;



export default function UserDataTable() {
  const[open , setOpen] = React.useState(false);
  const[openEditModal , setOpenEditModal] = React.useState(false);
  const[editModalData , setEditModalData] = React.useState(null);
  const[openModalGroup , setOpenModalGroup] = React.useState(false);
  const[newGroup , setNewGroup] = React.useState('');
  const[selectedBulkKey , setSelectedBulkKey] = React.useState([])
  const[groupError , setNewGroupError] = React.useState({flag:false , text:''})
  const[deleteModal , setDeleteModal] = React.useState(false);
  const[itemToDelete , setItemToDelete] = React.useState(null);
  const[bulkDeleteModal , setBulkDeleteModal] = React.useState(false);
  // const [current , setCurrent]= React.useState(1);
  // const [pageSize , setPageSize]= React.useState(5);
  const state = useSelector((store)=> store.userSlice);

  const [snackBarObj , setSnackBarObj] = useState({
    flag:false ,
    text:''
  })

 
  const dispatch = useDispatch();



  // const [tableParams, setTableParams] = React.useState({
  //   pagination: {
  //     current: 1,
  //     pageSize: 5,
  //   },
  // });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const columns = [
    {
      title: "Name",
      dataIndex:'name',
      
      ...getColumnSearchProps('name'),
    },
    {
      title: "User",
      dataIndex: "user",
      render: (item) => <Text strong>{item}</Text>,
    },
    {
      title: "Image",
      dataIndex: "pick_url",
      render: (item) =>  <Avatar size={64} src={item} alt={"pick_url"} />,
    },
    {
      title: "Employee Id",
      dataIndex: "empId",
      render: (item) => <Text strong>{item}</Text>,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.empId - b.empId,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (item) => <Text>{item}</Text>,
      filters: [
        {
          text: 'Admin',
          value: 'admin',
        },
        {
          text: 'User',
          value: 'user',
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps('email'),

    },
    {
      title: "Group",
      render: (item) => (
      
        <Flex gap={"small"}>
            {item.group.map((subItem) =>{
              return <Tag key={subItem} color="green" size="large">
              {subItem}
            </Tag> 
            })}
        </Flex>
      ),
    },
    {
      title: "Action",
      render: (item) => <Flex gap={"small"}>
      <Button icon={<EditOutlined />} onClick={()=>handleEditChange(item)}></Button>
      <Button icon={<DeleteOutline />}  onClick={()=>handleDeleteChange(item)}></Button>
    </Flex>,
    },
  ];

  const handleOpenModal = () =>{
    setOpen(!open);
  }

  const handleCloseModal = () =>{
    setOpen(false);
  }

  const handleCloseEditModal = () =>{
   
    setOpenEditModal(false);
    setEditModalData(null);
  }

  const handleEditChange = (item) =>{
    setEditModalData(item);
    setOpenEditModal(true);
  
  }

  const handleDeleteChange = (item) =>{
    setDeleteModal(true);
  setItemToDelete(item);
   
  }

  const handleOpenModalGroup = () =>{
    setOpenModalGroup(true);

  }

  const handleCloseModalGroup = () =>{
    setOpenModalGroup(false);
  }

  const handleSubmitGroup = () =>{
    if(state.groups.includes(newGroup)){
      setNewGroupError({flag:true , text:'Same Group Name already Exist.'})
      return;
      
    }else{
      setNewGroupError({flag:false , text:''})

    }
    
    dispatch(addGroup(newGroup))
    setSnackBarObj({
      flag:true , 
      text:'Group Created Successfully.'
    })
    setTimeout(()=>{
      setOpenModalGroup(false);
      setNewGroup('')
      setSnackBarObj({
        flag:false , 
        text:''
      })
    },1500)

  }

  const handleClose = (event , reason) => {
    if (reason === 'clickaway') {
      return;
    }
        setSnackBarObj({
            flag:false , 
            text:''
        })
  };

  const handleNewGroup = (e) =>{
    if(state.groups.includes(e.target.value)){
      setNewGroupError({flag:true , text:'Same Group Name already Exist.'})
    }else{
      setNewGroupError({flag:false , text:''})
    }
    setNewGroup(e.target.value)
  }

  const handleConfirmDeleteUser = () =>{
    dispatch(deleteUser(itemToDelete.empId));
    setDeleteModal(false);
    setItemToDelete(null);

  }

  const handleCancelDelete = () =>{
    setDeleteModal(false);
    setItemToDelete(null);
  }

  const handleBulkDelete = () =>{
    
    // if(e=== 'delete'){
      setBulkDeleteModal(true);

    // }

  }

  const handleCancelBulkDelete = () =>{
setSelectedBulkKey([]);
setBulkDeleteModal(false);
  }

  const handleConfirmBulkDeleteUser = () =>{
    let data = [...state.userDataDetails];
    let newData = data.filter((item)=> !(selectedBulkKey.includes(item.key))
     
    )
    dispatch(bulkDelete(newData));
    setBulkDeleteModal(false);
    setSnackBarObj({
      flag:true ,
      text:'Users deleted Successfully'
    })

  }

  // const onShowSizeChange = (current, pageSize) => {
  //   console.log(current, pageSize);
  //   const datas=[...state.userDataDetails]
  // };

  const items = [
    {
      key: '1',
      label: (
        <Button style={{width:'100%'}} key={'edit'} disabled>Edit</Button>

      ),
    },
    {
      key: '2',
      label: (
    <Button style={{width:'100%'}} key={'delete'} disabled={selectedBulkKey.length === 0} onClick={handleBulkDelete}>Delete</Button>
      ),
    },
    
  ];

  
  return (
    <Flex gap={"middle"} vertical >
    <Flex justify="space-between" align="center" wrap="wrap" gap={"middle"}> 
        <Flex gap={"small"} align="center" wrap="wrap">
            <Button type="primary" onClick={handleOpenModal}>Create User</Button>
            <Button type="default" onClick={handleOpenModalGroup}>Create Group</Button>
        </Flex>
        <Flex gap={"small"} wrap="wrap">
          

      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
      >
        <Button icon={<CaretDownOutlined />}>Bulk Actions</Button>
      </Dropdown>
          
        </Flex>
    </Flex>
    <Table
        scroll={{
            x: 'calc(700px + 50%)',
          }}
        columns={columns}
        dataSource={state.userDataDetails}
        rowSelection={{
            onChange: (e) => {
              setSelectedBulkKey(e);
            },
        }}
        pagination={{
          showTotal:(total) => `Total ${total} items`,
          defaultPageSize:5,
          showQuickJumper:true,
          showSizeChanger:true,
          pageSizeOptions:[5 , 10 , 15, 20],
          defaultCurrent:1

        }}
    
    />

    <Modal open={open}  onCancel={handleCloseModal}  footer={null}  centered>
      <CreateUser handleCloseModal={handleCloseModal}/>
    </Modal>
    <Modal open={openEditModal}  onCancel={handleCloseEditModal} footer={null}  centered>
      <EditUser item={editModalData}/>
    </Modal>
    <Modal  open={openModalGroup}  onCancel={handleCloseModalGroup} footer={(_) => (
          <>
            <Button type='primary' disabled={newGroup.length === 0} onClick={handleSubmitGroup}>Save</Button>
          </>
        )}>
             <TextField style={{width:'80%'}} label='Group Name' value={newGroup} onChange={handleNewGroup} error={groupError.flag} helperText={groupError.text}/>

    </Modal>
             <Snackbar
                anchorOrigin={{vertical:'bottom' , horizontal:'center'}}
                open={snackBarObj.flag}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <SnackbarContent sx={{background: '#00b200'}} message={snackBarObj.text} />
                </Snackbar>
        <Modal
        title='Are you sure you want to delete this user?'
        centered
        open={deleteModal}
        footer={ (_) => (
          <Flex justify='end' gap={'small'}>
        <Button onClick={handleCancelDelete}>Cancel</Button>
        <Button type='primary' onClick={handleConfirmDeleteUser}>Proceed</Button>
  
      </Flex>
        )}
        onCancel={() => setDeleteModal(false)}
      >
        <Table
      showHeader={false}
      bordered={true}
      size='small'
      pagination={false}
      columns={[
        {
          align: 'left',
          dataIndex: 'form_details',
          key: 'form_details',
          title: 'Form Details',
          width: 80,
        },
        {
          align: 'left',
          dataIndex: 'form_details_desc',
          key: 'form_details_desc',
          title: 'Form Details description',
          width: 120,
        },
      ]}
      dataSource={[
        {
          form_details: 'User Email',
          key: '1',
          form_details_desc: itemToDelete?.email,
        },
        {
          form_details: 'User Name',
          key: '2',
          form_details_desc: itemToDelete?.user,
        },
      ]} 

    />
      </Modal>

      <Modal
        title='Are you sure you want to perform bulk delete?'
        centered
        open={bulkDeleteModal}
        footer={ (_) => (
          <Flex justify='end' gap={'small'}>
        <Button onClick={handleCancelBulkDelete}>Cancel</Button>
        <Button type='primary' onClick={handleConfirmBulkDeleteUser}>Proceed</Button>
  
      </Flex>
        )}
        onCancel={() => setBulkDeleteModal(false)}
      >
        
      </Modal>
    
</Flex>

  );
}