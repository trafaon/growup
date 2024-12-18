import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import DeleteModal from '../components/DeleteModal';
import ProgressHistory from '../components/ProgressHistory';

const Dashboard = () => {
  const { planId } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    goal: {
      objective: '',
      indicators: ''
    },
    reality: {
      currentSituation: '',
      challenges: ''
    },
    options: {
      solutions: ''
    },
    wayForward: {
      actionPlan: '',
      deadline: ''
    },
    progress: 0,
    createdAt: null,
    userId: null,
    progressHistory: []
  });
  const [saving, setSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [checklist, setChecklist] = useState({
    goal: false,
    reality: false,
    options: false,
    wayForward: false
  });

  // Load data when component mounts
  useEffect(() => {
    const loadGrowData = async () => {
      if (user && planId !== 'new') {
        try {
          const docRef = doc(db, 'grows', planId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setFormData(docSnap.data());
          }
        } catch (error) {
          console.error('Error loading GROW data:', error);
        }
      } else if (planId === 'new') {
        // Initialize new plan
        setFormData(prev => ({
          ...prev,
          createdAt: new Date().toISOString(),
          userId: user.uid
        }));
      }
    };

    loadGrowData();
  }, [user, planId]);

  // Handle progress changes
  const handleProgressChange = (newProgress) => {
    const now = new Date().toISOString();
    const newHistory = [
      {
        progress: newProgress,
        timestamp: now,
      },
      ...(formData.progressHistory || [])
    ].slice(0, 50); // Keep last 50 entries
    
    setFormData(prev => ({
      ...prev,
      progress: newProgress,
      progressHistory: newHistory
    }));
    
    debouncedSave();
  };

  // Handle input changes
  const handleChange = (section, field, value) => {
    if (section === 'progress') {
      handleProgressChange(value);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [section]: typeof field === 'string'
        ? value
        : {
            ...prev[section],
            [field]: value
          }
    }));
    
    debouncedSave();
  };

  // Save data to Firestore
  const saveToFirestore = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const docRef = doc(db, 'grows', planId === 'new' ? crypto.randomUUID() : planId);
      await setDoc(docRef, formData, { merge: true });
      
      if (planId === 'new') {
        navigate(`/dashboard/${docRef.id}`, { replace: true });
      }
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  // Debounce save function
  const debouncedSave = debounce(saveToFirestore, 1000);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    const lineHeight = 10;
    let yPosition = 20;

    // Add title
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Plano de Desenvolvimento Individual (GROW)', 20, yPosition);
    yPosition += lineHeight * 2;

    // Helper function to add sections
    const addSection = (title, content, color) => {
      pdf.setFontSize(16);
      pdf.setTextColor(...color);
      pdf.text(title, 20, yPosition);
      yPosition += lineHeight;

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      
      // Split text into lines that fit the page width
      const lines = pdf.splitTextToSize(content, 170);
      lines.forEach(line => {
        if (yPosition > 270) { // Check if we need a new page
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(line, 20, yPosition);
        yPosition += lineHeight;
      });
      
      yPosition += lineHeight; // Add space between sections
    };

    // Add each section with its corresponding color
    addSection('Goal (Meta)', 
      `Objetivo: ${formData.goal.objective}\nIndicadores: ${formData.goal.indicators}`,
      [46, 125, 50]); // Green

    addSection('Reality (Realidade)',
      `Situação Atual: ${formData.reality.currentSituation}\nDesafios: ${formData.reality.challenges}`,
      [59, 130, 246]); // Blue

    addSection('Options (Opções)',
      `Soluções Possíveis: ${formData.options.solutions}`,
      [234, 179, 8]); // Yellow

    addSection('Way Forward (Caminho)',
      `Plano de Ação: ${formData.wayForward.actionPlan}\nData Limite: ${formData.wayForward.deadline}`,
      [249, 115, 22]); // Orange

    // Add footer with date
    const date = new Date().toLocaleDateString('pt-BR');
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Exportado em ${date}`, 20, 280);

    // Save the PDF
    pdf.save('PDI-GROW.pdf');
  };

  // Handle checklist changes
  const handleChecklistChange = (section) => {
    const newChecklist = { ...checklist, [section]: !checklist[section] };
    setChecklist(newChecklist);
    
    const completedSections = Object.values(newChecklist).filter(Boolean).length;
    const progress = Math.round((completedSections / 4) * 100);
    
    handleProgressChange(progress);
  };

  // Handle plan deletion
  const handleDeletePlan = async () => {
    try {
      await deleteDoc(doc(db, 'grows', planId));
      navigate('/plans');
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/plans')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Voltar
              </button>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', null, e.target.value)}
                placeholder="Nome do PDI"
                className="text-2xl font-bold text-gray-900 border-none focus:ring-0 bg-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Progresso:</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress || 0}
                  onChange={(e) => handleChange('progress', null, Number(e.target.value))}
                  className="w-20 rounded-md border-gray-300"
                />
                <span className="text-sm text-gray-600">%</span>
                <button
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="ml-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Ver histórico
                </button>
              </div>
              <span className="text-gray-600">{user?.email}</span>
              {saving && <span className="text-sm text-gray-500">Salvando...</span>}
              <button
                onClick={exportToPDF}
                className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Exportar PDF
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Excluir PDI
              </button>
              <button
                onClick={() => navigate('/plans')}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Goal Section */}
          <section className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Goal (Meta)</h2>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checklist.goal}
                  onChange={() => handleChecklistChange('goal')}
                  className="rounded text-green-500 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">Concluído</span>
              </label>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Objetivo</label>
                <textarea
                  value={formData.goal.objective}
                  onChange={(e) => handleChange('goal', 'objective', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows="3"
                  placeholder="Qual é o seu objetivo?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Indicadores de Sucesso</label>
                <input
                  type="text"
                  value={formData.goal.indicators}
                  onChange={(e) => handleChange('goal', 'indicators', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Como você saberá que alcançou?"
                />
              </div>
            </div>
          </section>

          {/* Reality Section */}
          <section className="bg-white p-6 rounded-lg shadow border-t-4 border-blue-500">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reality (Realidade)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Situação Atual</label>
                <textarea
                  value={formData.reality.currentSituation}
                  onChange={(e) => handleChange('reality', 'currentSituation', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  placeholder="Onde você está agora em relação ao seu objetivo?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Desafios</label>
                <textarea
                  value={formData.reality.challenges}
                  onChange={(e) => handleChange('reality', 'challenges', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="2"
                  placeholder="Quais são os principais desafios?"
                />
              </div>
            </div>
          </section>

          {/* Options Section */}
          <section className="bg-white p-6 rounded-lg shadow border-t-4 border-yellow-500">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Options (Opções)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Possíveis Soluções</label>
                <textarea
                  value={formData.options.solutions}
                  onChange={(e) => handleChange('options', 'solutions', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  rows="3"
                  placeholder="Quais são as possíveis soluções?"
                />
              </div>
            </div>
          </section>

          {/* Way Forward Section */}
          <section className="bg-white p-6 rounded-lg shadow border-t-4 border-orange-500">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Way Forward (Caminho)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plano de Ação</label>
                <textarea
                  value={formData.wayForward.actionPlan}
                  onChange={(e) => handleChange('wayForward', 'actionPlan', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  rows="3"
                  placeholder="Quais serão seus próximos passos?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Limite</label>
                <input
                  type="date"
                  value={formData.wayForward.deadline}
                  onChange={(e) => handleChange('wayForward', 'deadline', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePlan}
      />
      <ProgressHistory
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={formData.progressHistory || []}
      />
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Dashboard; 