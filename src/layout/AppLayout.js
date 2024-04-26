import React, { useEffect, useState } from 'react';
import {
    CaretDownOutlined,
    GroupOutlined,
    NotificationFilled,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Breadcrumb, Button, Card, Dropdown, Flex, Layout, Menu, theme, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Text, Link } = Typography;

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
      getItem('User Management', '1', <UserOutlined />),
      getItem('Group Management', '2', <GroupOutlined />),
]

const AppLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [current, setCurrent] = useState('1');
    const onClick = (e) => {
        navigate('/')
        console.log('click ', e);
        setCurrent(e.key);
      };

      const handleLogout = () =>{
        sessionStorage.removeItem('loggedIn');
        navigate('/');
      }


  const logoutItems = [
    {
      key: '1',
      label: (
        <Button style={{width:'100%'}} key={'edit'} disabled>Shiv Shakti</Button>
      ),
    },
    {
      key: '2',
      label: (
    <Button style={{width:'100%'}} key={'delete'} icon={<SettingOutlined />}>Settings</Button>
      ),
    },
    {
        key: '3',
        label: (
      <Button style={{width:'100%'}} key={'delete'} onClick={handleLogout}>Logout</Button>
        ),
      },
    
  ];

    useEffect(() => {
        let loggedIn = sessionStorage.getItem('loggedIn');
        if (!loggedIn) {
            navigate('/');

        }

    }, [location])
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
            hasSider
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu  theme="dark" onClick={onClick} defaultSelectedKeys={['sub1']} selectedKeys={[current]} mode="inline" items={items} />
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
                       
                    </Flex>
                    {/* <Dropdown
                      menu={{
                        logoutItems,
                          }}
                     placement="bottomRight"
                     >
                        <Button icon={<CaretDownOutlined />}>Delete</Button>
                     </Dropdown>  */}
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
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