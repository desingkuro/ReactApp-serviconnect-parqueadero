import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";
import { useEffect, useState } from "react";

interface WindowWithRNWebView extends Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}
declare global {
  interface window extends WindowWithRNWebView {}
}

function Home() {
  const [data,setData] = useState('prueba');

  useEffect(()=>{
    const message = {
      type: "GET_TOKEN",
      content: "",
    };
    const win = window as WindowWithRNWebView;
    if (win.ReactNativeWebView) {
      win.ReactNativeWebView.postMessage(JSON.stringify(message));
      window.addEventListener('message',getData)
    } else {
      alert('No se encontró ReactNativeWebView');
    }
  },[])

  const getData = ( event: any)=>{
    setData(JSON.stringify(event));
    alert(JSON.stringify(event));
  }
  
  const sendMessage = () => {

    const message = {
      type: "REACT_WEBVIEW_MESSAGE",
      content: "BIENVENIDO",
    };

    // Verificar si estamos en un WebView de React Native
    const win = window as WindowWithRNWebView;
    if (win.ReactNativeWebView) {
      win.ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      alert('No se encontró ReactNativeWebView');
    }
  };

  const logout = () => {
    const message = {
      type: "LOGOUT",
      content: "Logout",
    };

    // Verificar si estamos en un WebView de React Native
    const win = window as WindowWithRNWebView;
    if (win.ReactNativeWebView) {
      win.ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      alert('No se encontró ReactNativeWebView');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 text-center gap-1.5 justify-center items-center p-4">
        <h1>Home</h1>
        <p>data: {data}</p>
        <button className="bg-blue-500 mr-2 text-white p-2 rounded cursor-pointer hover:bg-blue-600" onClick={sendMessage}>Send Message</button>
        <button className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600" onClick={logout}>Logout</button>
      </div>
      <Footer />  
    </div>
  );
}

export default Home;
