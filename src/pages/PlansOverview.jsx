import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const PlansOverview = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      if (user) {
        try {
          const plansRef = collection(db, 'grows');
          const q = query(plansRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          
          const plansData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setPlans(plansData);
        } catch (error) {
          console.error('Error loading plans:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPlans();
  }, [user]);

  const handleCreateNewPlan = () => {
    navigate('/dashboard/new');
  };

  const handleOpenPlan = (planId) => {
    navigate(`/dashboard/${planId}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Meus PDIs</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={handleCreateNewPlan}
              className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Novo PDI
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {plans.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Você ainda não tem nenhum PDI
            </h3>
            <p className="text-gray-500 mb-4">
              Crie seu primeiro Plano de Desenvolvimento Individual agora
            </p>
            <button
              onClick={handleCreateNewPlan}
              className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Criar Primeiro PDI
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleOpenPlan(plan.id)}
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {plan.goal?.objective || 'Sem objetivo definido'}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Criado em: {new Date(plan.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                  <div className="space-y-2">
                    <div className="h-2 bg-green-100 rounded">
                      <div
                        className="h-2 bg-green-500 rounded"
                        style={{ width: `${plan.progress || 0}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Progresso: {plan.progress || 0}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PlansOverview; 