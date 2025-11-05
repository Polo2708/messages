import { Controller } from "react-hook-form";
import InputSharedComponent from "../../../shared/inputs/components/input-shared-component";
import { useChatController } from "../controller/chat-controller";

function MainChatComponent() {
    const { handleSubmit, onSubmit, control, messages, joinRoom, room } = useChatController();

    const allMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col h-[600px]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Chat en grupo</h2>

                    <select
                        onChange={(e) => joinRoom(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    >
                        <option value="">Selecciona un grupo</option>
                        <option value="sala1">Sala 1</option>
                        <option value="sala2">Sala 2</option>
                        <option value="devs">Devs 💻</option>
                    </select>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                    {room === "" ? (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            <p>Selecciona un grupo para comenzar</p>
                        </div>
                    ) : allMessages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            <p>No hay mensajes aún. ¡Comienza la conversación!</p>
                        </div>
                    ) : (
                        allMessages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${msg.sender === "user"
                                            ? "bg-blue-500 text-white rounded-br-sm"
                                            : "bg-gray-200 text-gray-800 rounded-bl-sm"
                                        }`}
                                >
                                    <p className="text-sm break-words">{msg.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Input */}
                {room && (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 p-4 border-t border-gray-200">
                        <Controller
                            name="message"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Escribe un mensaje" }}
                            render={({ field }) => (
                                <InputSharedComponent
                                    {...field}
                                    label=""
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1"
                                />
                            )}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 rounded-lg disabled:bg-gray-300"
                        >
                            Enviar
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default MainChatComponent;
