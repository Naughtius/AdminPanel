import { useMemo } from 'react'
import { Layout, Menu } from 'antd'
import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

import { StyledLogout, StyledMenuContainer } from './styled'

const { Content, Sider } = Layout

const LayoutSidebar = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const list = useMemo(
    () => [
      {
        label: 'Пользователи',
        key: '/admin/users',
        icon: <UsergroupAddOutlined />,
        onClick: () => navigate('/admin/users'),
      },
      {
        label: 'Жалобы',
        key: '/admin/complaints',
        icon: <ExclamationCircleOutlined />,
        onClick: () => navigate('/admin/complaints'),
      },
    ],
    [navigate]
  )

  const listBottom = useMemo(
    () => [
      {
        label: 'Выйти',
        key: '/admin/logout',
        icon: <LogoutOutlined />,
        onClick: () => navigate('/admin/logout'),
        style: {
          backgroundColor: '#f5f5f5',
        },
      },
    ],
    [navigate]
  )

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0" theme="light">
        <StyledMenuContainer>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[pathname]}
            items={list}
          />
        </StyledMenuContainer>
      </Sider>
      <Layout>
        <Content style={{ minHeight: '100vh' }}>
          <div
            style={{
              margin: '20px',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
      <StyledLogout>
        <Menu
          theme="light"
          mode="inline"
          items={listBottom}
          style={{ backgroundColor: '#f5f5f5' }}
        />
      </StyledLogout>
    </Layout>
  )
}

export default LayoutSidebar
