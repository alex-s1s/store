"use client";

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirmar Exclusão
        </h2>
        <p className="text-gray-600 mb-6">
          Tem certeza de que deseja excluir este produto? Essa ação não pode ser desfeita.
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}