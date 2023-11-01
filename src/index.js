import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { BrowserRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import { ConfigProvider } from 'antd'
import ru_RU from 'antd/es/locale/ru_RU'
import 'antd/dist/reset.css'
import 'dayjs/locale/ru'

import App from '@components/App'
import { apiSlice } from '@services/apiSlice'

import { store } from './store'

const container = document.getElementById('root')
const root = createRoot(container)

dayjs.locale('ru')

root.render(
  <ConfigProvider locale={ru_RU}>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApiProvider>
  </ConfigProvider>
)
