import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

export const useInputController = () => {
  const socketRef = useRef<any>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log("✅ Conectado al WebSocket");
    });

    socketRef.current.on("msgToClient", (msg: string) => {
      console.log("📩 Mensaje recibido:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { message: "" },
  });

  const onSubmit = (data: any) => {
    if (!data.message.trim()) return; // evita vacío
    socketRef.current.emit("msgToServer", data.message);
    reset({ message: "" });
  };

  return {
    handleSubmit,
    onSubmit,
    control,
    messages,
  };
};
