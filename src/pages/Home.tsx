import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

function Home() {
  const [data,setData] = useState('prueba');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        // Verificar el origen del mensaje por seguridad
        // if (event.origin !== "https://tudominio.com") return;
        
        const data = JSON.parse(event.data);
        alert(data);
        
        if (data.type === "GET_TOKEN_RESPONSE") {
          alert(`Token recibido: ${data.token}`);
          setData(data.token);
        }
      } catch (error) {
        console.error("Error procesando mensaje:", error);
      }
    };
  
    window.addEventListener('message', handleMessage);
  
    // Solicitar el token
    const message = {
      type: "GET_TOKEN",
      content: "",
    };
  
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      console.log("No está en WebView de React Native");
    }
  
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  const sendMessage = () => {

    const message = {
      type: "REACT_WEBVIEW_MESSAGE",
      content: "BIENVENIDO",
    };

    // Verificar si estamos en un WebView de React Native
    const win = window as Window;
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
    const win = window as Window;
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
        <p>data modificado: {data}</p>
        <button className="bg-blue-500 mr-2 text-white p-2 rounded cursor-pointer hover:bg-blue-600" onClick={sendMessage}>Send Message</button>
        <button className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600" onClick={logout}>Logout</button>
      </div>
      <Footer />  
    </div>
  );
}

export default Home;
