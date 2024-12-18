import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ProgressHistory = ({ history, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Histórico de Progresso
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Fechar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Nenhum histórico de progresso disponível
            </p>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div
                  key={entry.timestamp}
                  className="relative pl-8 pb-4"
                >
                  {index < history.length - 1 && (
                    <div className="absolute left-3 top-3 -bottom-1 w-0.5 bg-gray-200" />
                  )}
                  <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500 mb-1">
                      {format(new Date(entry.timestamp), "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="h-2 bg-gray-100 rounded">
                          <div
                            className="h-2 bg-indigo-600 rounded"
                            style={{ width: `${entry.progress}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {entry.progress}%
                      </span>
                    </div>
                    {entry.note && (
                      <p className="mt-2 text-sm text-gray-600">{entry.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressHistory; 