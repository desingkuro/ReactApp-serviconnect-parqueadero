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
      alert('enviado');
      window.addEventListener('message', handleWebViewMessage);

      // Limpiar el listener cuando el componente se desmonte
      return () => {
        window.removeEventListener('message', handleWebViewMessage);
      };
    } else {
      alert('No se encontró ReactNativeWebView');
    }
  },[])
  
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

  const handleWebViewMessage = (event:any) => {
    alert(event.data);
    try {
      const message = JSON.parse(event.data);
      
      if (message.type === 'message') {
        // Aquí manejas el token
        const token = message.content;
        console.log('Token recibido:', token);
        setData(token);
        // Aquí puedes hacer lo que necesites con el token
      }
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 text-center gap-1.5 justify-center items-center p-4">
        <h1>Home</h1>
        <p>data modificado: {data}</p>
        <button className="bg-blue-500 mr-2 text-white p-2 rounded cursor-pointer hover:bg-blue-600" onClick={sendMessage}>Send Message</button>
        <button className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600" onClick={logout}>Logout</button>
      </div>
      <Footer />  
    </div>
  );
}

export default Home;
