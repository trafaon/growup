const NotificationBanner = ({ notifications, onDismiss }) => {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-lg border-l-4 border-yellow-500 p-4 w-96 flex items-start"
        >
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">
              Prazo se Aproximando
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {notification.message}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Prazo: {new Date(notification.deadline).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <button
            onClick={() => onDismiss(notification.id)}
            className="ml-4 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Fechar</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner; 