import { Controller } from "react-hook-form";
import InputSharedComponent from "../../../shared/inputs/components/input-shared-component";
import { useInputController } from "../controller/chat-controller";

function MainChatComponent() {
    const { handleSubmit, onSubmit, control, messages } = useInputController()

    return (
        <div className="h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="border border-gray-300 gap-2 bg-white rounded-lg shadow p-4 w-1/2">
                <h2 className="text-lg font-semibold mb-3">Chat</h2>

                <div className="max-h-72 min-h-60 border border-gray-300 rounded-md px-1 flex flex-col gap-1 py-2 overflow-y-auto">
                    {messages.map((mess, index) => (
                        <div key={index} className="border border-gray-100 rounded-md px-1.5 py-2 shadow-2xs flex justify-between" >
                            <p>{mess}</p>

                            <button className="bg-blue-200 rounded-sm px-2 py-0.5">Editar</button>
                        </div>
                    ))}
                </div>


                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center gap-2 mt-3">
                    <Controller
                        name="message"
                        control={control}
                        rules={{
                            required: "El mensaje no puede estar vacio",
                            validate: value => value.trim() !== "" || "No puedes enviar un mensaje vacío",
                        }}
                        render={({ field, fieldState }) => (
                            <InputSharedComponent
                                {...field}
                                placeholder="Escribe aquí..."
                                className="flex-1"
                                error={fieldState.error?.message}
                            />
                        )}
                    />

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
                    >
                        Enviar
                    </button>
                </form>

            </div>
        </div>
    );
}

export default MainChatComponent;
