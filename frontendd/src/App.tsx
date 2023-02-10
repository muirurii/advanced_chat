import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { Provider } from "./context";
import Layout from "./components/Layout";

const App = ()=>{
    return(
      <Provider>
        <BrowserRouter>
      <Header/>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/chats" element={<Chats/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </Layout>
      </BrowserRouter>
      </Provider>
    )
}

export default App;