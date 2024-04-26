import React, { useEffect, useState } from 'react';
import { Button, Popover, Select } from "antd";
import { GroupOutlined,    TeamOutlined,    UserOutlined} from '@ant-design/icons';
import { Avatar,  Breadcrumb,  Card, Flex, Layout, Menu, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SettingsOutlined } from '@mui/icons-material';
import {   Route, Routes } from 'react-router-dom'

// const { Text, Link } = Typography;

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('', '0'),
      getItem('User Management', '1', <UserOutlined />),
      getItem('Group Management', '2', <GroupOutlined />),
]

const AppLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [placement, SetPlacement] = useState("topLeft");
 
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [render, updateRender] = useState(1);
    const selectedKey = useLocation().pathname;

      const handleLogout = () =>{
        sessionStorage.removeItem('loggedIn');
        navigate('/');
      }

      const handleClick = (menu) =>{
        updateRender(menu.key);

      }

      const highlight = () => {
        if (selectedKey === '/dashboard'){
          return ['2']
        } else if (selectedKey === '/group'){
          return ['3']
        }
      }



    useEffect(() => {
        let loggedIn = sessionStorage.getItem('loggedIn');
        if (!loggedIn) {
            navigate('/');
        }

    }, [location , navigate])



    
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
            hasSider
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu  theme="dark"  selectedKeys={highlight()} mode="inline"  items={[
                    {
                        key: '1',
                        label: "",
                      
                    },
                    {
                        key: '2',
                        icon: <UserOutlined />,
                        label: "User Management",
                        onClick: () => { navigate('/dashboard')}
                    },
                    {
                        key: '3',
                        icon: <TeamOutlined />,
                        label: "Group Management",
                        onClick: () => { navigate('/group')}
                    } ,
                    {
                        key: '4',
                        icon: <TeamOutlined />,
                        label: "Others",
                        children: [ 
                        {
                            key: '5',
                            label: "Submenu 1",
                            onClick: () => { navigate('/other')}
                        },
                        {
                            key: '6',
                            label: "Submenu 2",
                            onClick: () => { navigate('/other')}
                        },
                        ]
                    }
            ]} />
               
               
            </Sider>
              
            <Layout>
                <Header
                    style={{
                        padding: "20px",
                        background: colorBgContainer,
                        display:"flex",
                        gap:"20px",
                        justifyContent:"end",
                        width:"100%"
                    }}
                >
                   

                    <Flex wrap='nowrap' align='center'>
                        <Avatar size={'large'} src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg" />
                        <div className="icon-select">
              <Button
                icon={<SettingsOutlined />}
                type="dashed"
                shape="circle"
              />
 
              <Select
                popupMatchSelectWidth={false}
                placement={placement}
                onChange={handleLogout}
                options={[
                  {
                    value: "profile",
                    label: "Profile",
                    disabled:true
                  },
                  {
                    value: "setting",
                    label: "Settiing",
                    disabled:true

                  },
                  {
                    value: "logOut",
                    label: "Log Out",
                  },
                ]}
              />
            </div>
                    </Flex>
                    
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                   
                    <Card>
                    {children}
                    </Card>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AppLayout;