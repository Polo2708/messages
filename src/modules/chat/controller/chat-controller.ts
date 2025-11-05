import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { io, Socket } from "socket.io-client";

interface Message {
  text: string;
  sender: "user" | "client";
  timestamp: number;
}

export const useChatController = () => {
  const socketRef = useRef<Socket | null>(null);
  const [room, setRoom] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { message: "" },
  });

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    socket.on("connect", () => console.log("✅ Conectado"));
    socket.on("joinedRoom", (roomName: string) =>
      console.log(`🟢 Unido a sala: ${roomName}`)
    );
    socket.on("msgToClient", (msg: string) => {
      setMessages((prev) => [
        ...prev,
        { text: msg, sender: "client", timestamp: Date.now() },
      ]);
    });

    // ✅ retornar una función de limpieza
    return () => {
      socket.disconnect();
    };
  }, []);
  const joinRoom = (roomName: string) => {
    if (!socketRef.current) return;
    setRoom(roomName);
    socketRef.current.emit("joinRoom", roomName);
    setMessages([]); // limpia mensajes anteriores
  };

  const onSubmit = (data: any) => {
    if (!data.message.trim() || !room) return;

    const msg = { room, message: data.message };
    socketRef.current?.emit("msgToServer", msg);

    setMessages((prev) => [
      ...prev,
      { text: data.message, sender: "user", timestamp: Date.now() },
    ]);

    reset({ message: "" });
  };

  return {
    handleSubmit,
    onSubmit,
    control,
    messages,
    joinRoom,
    room,
  };
};
