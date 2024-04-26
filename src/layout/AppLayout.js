import React, { useEffect, useState } from 'react';
import {
    GroupOutlined,   
    UserOutlined,
} from '@ant-design/icons';
import { Avatar,  Breadcrumb,  Card, Flex, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

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
      getItem('User Management', '1', <UserOutlined />),
      getItem('Group Management', '2', <GroupOutlined />),
]

const AppLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [current, setCurrent] = useState('1');
    const onClick = (e) => {
        navigate('/')
        setCurrent(e.key);
      };

    //   const handleLogout = () =>{
    //     sessionStorage.removeItem('loggedIn');
    //     navigate('/');
    //   }



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
                    
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                   <Breadcrumb items={[{ title: 'sample' }]} />
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