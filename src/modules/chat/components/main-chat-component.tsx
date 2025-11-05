import { Controller } from "react-hook-form";
import InputSharedComponent from "../../../shared/inputs/components/input-shared-component";
import { useInputController } from "../controller/chat-controller";

function MainChatComponent() {
    const { handleSubmit, onSubmit, control } = useInputController()

    return (
        <div className="h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="border border-gray-300 bg-white rounded-lg shadow p-4 w-[350px]">

                <h2 className="text-lg font-semibold mb-3">Chat</h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                    <Controller name="message" control={control} defaultValue="" render={({ field }) => (
                        <InputSharedComponent
                            {...field}
                            name="mensaje"
                            label="Mensaje"
                            placeholder="Escribe aquí..."
                            className="flex-1"
                        />
                    )}>
                    </Controller>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 rounded-lg disabled:bg-gray-300"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MainChatComponent;
