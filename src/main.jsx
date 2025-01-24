import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/Store.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router'
import { Login, Protected } from './components/index.js'
import Home from './pages/HOMEPAGE/home.jsx'
import Sign from './pages/signup.jsx'
import Addpost from './pages/addpost/addpost.jsx'
import Allpost from './pages/allpost/allpost.jsx'
import Editpost from './pages/editpost/editpost.jsx'
import Post from './pages/post/post.jsx'


const router = createBrowserRouter([
  {
    path : '/',
    element:<App/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path : "/login",
        element:(
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path : "/signup",
        element:(
          <Protected authentication={false}>
            <Sign/>
          </Protected>
        )
      },
      {
        path : "/all-posts",
        element:(
          <Protected authentication={true}>
            <Allpost/>
          </Protected>
        )
      },
      {
        path : "/add-posts",
        element:(
          <Protected authentication={true}>
            <Addpost/>
          </Protected>
        )
      },{
        path : "/edit-post/:slug",
        element:(
          <Protected authentication={true}>
            <Editpost/>
          </Protected>
        ) 
      },
      {
        path : "/post/:slug",
        element: <Post/>
      }

    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
