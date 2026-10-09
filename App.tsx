
import React, { useState, useEffect } from 'react';
import { AppStep, Macroarea, UserData, QuestionBlock, SupportOption } from './types';
import { 
  COLORS, 
  MACROAREAS, 
  DEPARTMENTS_MAP, 
  TIME_OPTIONS, 
  AGE_OPTIONS,
  LIKERT_OPTIONS,
  SURVEY_BLOCKS_P1,
  SURVEY_BLOCKS_P2 
} from './constants';

const Header: React.FC = () => (
  <header 
    className="w-full h-24 flex items-center px-6 md:px-10 fixed top-0 left-0 z-50 shadow-md"
    style={{ backgroundColor: COLORS.primary }}
  >
    <div className="flex items-center space-x-4">
      <span className="text-3xl md:text-5xl" style={{ color: COLORS.accent }}>⚛</span>
      <h1 className="text-white text-lg md:text-4xl font-medium tracking-tight font-playfair">
        Sophira Hub | Radar de Bienestar y Entorno de Trabajo 2026
      </h1>
    </div>
  </header>
);

const LikertRow: React.FC<{ 
  questionId: number; 
  onSelect: (val: number) => void; 
  selectedValue?: number 
}> = ({ questionId, onSelect, selectedValue }) => {
  return (
    <div className="grid grid-cols-5 gap-1 md:gap-4 mt-4">
      {LIKERT_OPTIONS.map((opt) => {
        const isSelected = selectedValue === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`flex flex-col items-center justify-center p-2 md:p-4 rounded-xl border-2 transition-all text-[10px] md:text-xs font-bold uppercase ${
              isSelected 
                ? 'border-transparent shadow-lg transform scale-105 z-10' 
                : 'border-gray-100 hover:border-gray-200 bg-white'
            }`}
            style={{ 
              backgroundColor: isSelected ? COLORS.accent : undefined,
              color: isSelected ? COLORS.primary : COLORS.textGray
            }}
          >
            <span className="text-base md:text-xl mb-1">{opt.value}</span>
            <span className="text-center leading-tight">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [userData, setUserData] = useState<UserData>({
    macroarea: null,
    department: null,
    ageRange: null,
    timeInCompany: null,
    supportOption: 'NONE',
    phone: '',
    email: ''
  });
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleResponse = (qId: number, val: number) => {
    setResponses(prev => ({ ...prev, [qId]: val }));
  };

  const isPageComplete = (blocks: QuestionBlock[]) => {
    return blocks.every(block => 
      block.questions.every(q => responses[q.id] !== undefined)
    );
  };

  const isSupportValid = () => {
    if (userData.supportOption === 'NONE') return true;
    return userData.phone.trim().length > 0 || userData.email.trim().length > 0;
  };

  const isRegistrationComplete = () => {
    return userData.macroarea && userData.department && userData.ageRange && userData.timeInCompany;
  };

  const sendData = async () => {
    setIsSending(true);
    try {
      // Construct payload with explicit ordering to help backend mapping
      const payload: any = {
        macroarea: userData.macroarea,
        departamento: userData.department,
        rango_edad: userData.ageRange,
        antiguedad: userData.timeInCompany,
      };

      // Explicitly map all 20 questions sequentially as P1 to P20
      // We iterate 1 to 20 to ensure no question is skipped
      for (let i = 1; i <= 20; i++) {
        payload[`p${i}`] = responses[i] || 0;
      }

      payload.estado_apoyo = userData.supportOption;
      payload.metodo_contacto = userData.phone ? 'Telefono' : (userData.email ? 'Email' : 'N/A');
      payload.dato_contacto = [userData.phone, userData.email].filter(Boolean).join(' / ');

      const url = 'https://script.google.com/macros/s/AKfycbwZPWj3RCiqfhodgKcCbDPTnxb9QLM7zfVw_T_UzHY8TxL5lqovqAjHINO_GKZGACy0ZA/exec';
      
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setStep(AppStep.FINISH);
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Hubo un error al enviar tus respuestas. Por favor, intenta de nuevo.');
    } finally {
      setIsSending(false);
    }
  };

  const renderWelcome = () => (
    <div className="w-full px-4 md:w-[75%] md:px-0 mx-auto py-12 animate-fadeIn">
      <h1 
        className="font-playfair text-xl md:text-3xl font-bold mb-10 text-center w-[95%] mx-auto leading-tight"
        style={{ color: COLORS.primary }}
      >
        <span className="block">RADAR DE BIENESTAR Y ENTORNO DE TRABAJO</span>
        <span className="text-xl md:text-3xl block mt-2">Adobe Rent a Car</span>
      </h1>
      
      <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700 mb-12">
        <p>
          Gracias por tomarte unos minutos para esto. Queremos ser muy claros contigo: 
          <strong> Este no es un examen.</strong> No hay respuestas correctas ni incorrectas, 
          y no estamos evaluando tu rendimiento.
        </p>
        
        <div className="p-6 md:p-8 bg-gray-50 border-l-8 rounded-r-xl shadow-sm" style={{ borderColor: COLORS.accent }}>
          <h2 className="font-playfair text-xl md:text-2xl font-semibold mb-4" style={{ color: COLORS.primary }}>
            ¿Para qué sirve esto?
          </h2>
          <p className="text-base md:text-lg">
            Queremos que Adobe sea un lugar donde trabajar no te cueste la salud. 
            Queremos saber qué herramientas te faltan, qué procesos te cansan y cómo podemos 
            hacer que tu día a día sea más fluido y seguro. Para lograrlo, necesitamos tu verdad absoluta.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="font-playfair text-xl md:text-2xl font-semibold mb-6" style={{ color: COLORS.primary }}>
            El compromiso de Sophira Hub: Tu Seguridad está Blindada
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-lime-500 mr-3 text-xl md:text-2xl">✓</span>
              <span className="text-base md:text-lg"><strong>Tus respuestas son confidenciales:</strong> Los resultados se analizan en grupos, por lo que nadie señalará tus respuestas individuales.</span>
            </li>
            <li className="flex items-start">
              <span className="text-lime-500 mr-3 text-xl md:text-2xl">✓</span>
              <span className="text-base md:text-lg"><strong>Estamos aquí para escucharte:</strong> Quien lee estos datos es el equipo de consultores externos (Sophira Hub), no tu jefe directo.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setStep(AppStep.REGISTRATION)}
          className="px-12 md:px-16 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold transition-all hover:scale-105 shadow-xl"
          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  );

  const renderRegistration = () => (
    <div className="w-full px-4 md:w-[75%] md:px-0 mx-auto py-12 animate-fadeIn space-y-12">
      <div className="text-center">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8" style={{ color: COLORS.primary }}>
          Registro de Colaborador
        </h2>
      </div>

      <div className="space-y-8 md:space-y-12 bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-gray-50">
        <section>
          <h3 className="font-playfair text-xl md:text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>
            ¿En qué Macroárea te desempeñas?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MACROAREAS.map(m => (
              <button
                key={m}
                onClick={() => setUserData(prev => ({ ...prev, macroarea: m, department: null }))}
                className={`p-4 md:p-5 border-2 rounded-2xl text-sm md:text-base font-bold transition-all shadow-sm ${
                  userData.macroarea === m ? 'border-transparent' : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
                style={{ 
                  backgroundColor: userData.macroarea === m ? COLORS.accent : undefined,
                  color: userData.macroarea === m ? COLORS.primary : undefined
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        {userData.macroarea && (
          <section className="animate-fadeIn">
            <h3 className="font-playfair text-xl md:text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>
              ¿En qué Departamento trabajas?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPARTMENTS_MAP[userData.macroarea].map(d => (
                <button
                  key={d}
                  onClick={() => setUserData(prev => ({ ...prev, department: d }))}
                  className={`p-4 md:p-5 border-2 rounded-2xl text-sm md:text-base font-bold transition-all shadow-sm ${
                    userData.department === d ? 'border-transparent' : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
                  style={{ 
                    backgroundColor: userData.department === d ? COLORS.accent : undefined,
                    color: userData.department === d ? COLORS.primary : undefined
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="font-playfair text-xl md:text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>
            ¿Cuál es tu Rango de Edad?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {AGE_OPTIONS.map(a => (
              <button
                key={a}
                onClick={() => setUserData(prev => ({ ...prev, ageRange: a }))}
                className={`p-4 md:p-5 border-2 rounded-2xl text-sm md:text-base font-bold transition-all shadow-sm ${
                  userData.ageRange === a ? 'border-transparent' : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
                style={{ 
                  backgroundColor: userData.ageRange === a ? COLORS.accent : undefined,
                  color: userData.ageRange === a ? COLORS.primary : undefined
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-playfair text-xl md:text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>
            ¿Cuánto tiempo llevas en la empresa?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIME_OPTIONS.map(t => (
              <button
                key={t}
                onClick={() => setUserData(prev => ({ ...prev, timeInCompany: t as any }))}
                className={`p-4 md:p-5 border-2 rounded-2xl text-sm md:text-base font-bold transition-all shadow-sm ${
                  userData.timeInCompany === t ? 'border-transparent' : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
                style={{ 
                  backgroundColor: userData.timeInCompany === t ? COLORS.accent : undefined,
                  color: userData.timeInCompany === t ? COLORS.primary : undefined
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setStep(AppStep.SURVEY_PAGE_1)}
          disabled={!isRegistrationComplete()}
          className={`px-16 md:px-24 py-4 md:py-5 rounded-full text-xl md:text-2xl font-bold transition-all shadow-xl ${
            isRegistrationComplete() ? 'opacity-100 hover:scale-105' : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ 
            backgroundColor: isRegistrationComplete() ? COLORS.accent : '#e5e7eb',
            color: isRegistrationComplete() ? COLORS.primary : '#9ca3af'
          }}
        >
          INICIAR
        </button>
      </div>
    </div>
  );

  const renderSurveyPage = (blocks: QuestionBlock[], nextStep: AppStep) => (
    <div className="w-full px-4 md:w-[75%] md:px-0 mx-auto py-12 animate-fadeIn">
      <h1 
        className="font-playfair text-xl md:text-3xl font-bold mb-10 text-center w-[95%] mx-auto leading-tight" 
        style={{ color: COLORS.primary }}
      >
        <span className="block">RADAR DE BIENESTAR Y ENTORNO DE TRABAJO</span>
        <span className="text-xl md:text-3xl block mt-2">Adobe Rent a Car</span>
      </h1>
      <p className="text-base md:text-lg text-gray-500 mb-12 italic text-center max-w-4xl mx-auto leading-relaxed">
        Por favor, lee cada frase y marca qué tan cierto es eso para ti en tu trabajo. 
        Piensa en tu experiencia en el último año (o el tiempo que lleves trabajando en la empresa).
      </p>

      {blocks.map((block, bIndex) => (
        <section key={bIndex} className="mb-20 animate-slideUp">
          <h2 className="font-playfair text-xl md:text-[30px] font-bold mb-10 pb-2 border-b-2 inline-block tracking-tight" style={{ color: COLORS.primary, borderColor: COLORS.accent }}>
            {block.title}
          </h2>
          <div className="space-y-16">
            {block.questions.map((q) => (
              <div key={q.id}>
                <p className="text-lg md:text-xl font-semibold text-gray-800 leading-tight mb-4">
                  {q.id}. {q.text}
                </p>
                <LikertRow 
                  questionId={q.id} 
                  onSelect={(val) => handleResponse(q.id, val)} 
                  selectedValue={responses[q.id]}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            if (isPageComplete(blocks)) {
              setStep(nextStep);
            } else {
              alert("Por favor, responde todas las preguntas para continuar.");
            }
          }}
          disabled={!isPageComplete(blocks)}
          className={`px-16 md:px-20 py-5 md:py-6 rounded-full text-xl md:text-2xl font-bold transition-all shadow-xl ${
            isPageComplete(blocks) ? 'opacity-100 transform hover:scale-105' : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ 
            backgroundColor: isPageComplete(blocks) ? COLORS.accent : '#e5e7eb',
            color: isPageComplete(blocks) ? COLORS.primary : '#9ca3af'
          }}
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );

  const renderSupportPage = () => (
    <div className="w-full px-4 md:w-[90%] mx-auto py-6 animate-fadeIn text-center">
      <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-6" style={{ color: COLORS.primary }}>
        Espacio de Apoyo Directo
      </h1>
      
      <div className="text-base md:text-lg text-gray-700 space-y-4 mb-8 text-left bg-white p-6 md:p-12 rounded-[2rem] shadow-xl border border-gray-50">
        <p>Has completado la encuesta, ¡gracias por tu tiempo y honestidad!</p>
        <p>
          Antes de enviar tus respuestas, queremos ofrecerte un espacio seguro. 
          A veces hay situaciones personales o delicadas que un test no puede capturar.
        </p>
        
        <div className="pt-4 space-y-4">
          <p className="font-bold text-lg md:text-xl tracking-tight" style={{ color: COLORS.primary }}>
            Selecciona una opción:
          </p>
          
          <div className="space-y-3">
            <label className="flex items-center p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-all">
              <input 
                type="radio" 
                name="support" 
                className="w-5 h-5 mr-4 accent-lime-400"
                checked={userData.supportOption === 'NONE'}
                onChange={() => setUserData(p => ({...p, supportOption: 'NONE'}))}
              />
              <span className="font-medium text-sm md:text-lg">Todo en orden: No necesito contacto adicional.</span>
            </label>

            <label className="flex items-center p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-all">
              <input 
                type="radio" 
                name="support" 
                className="w-5 h-5 mr-4 accent-lime-400"
                checked={userData.supportOption === 'ASSISTANCE'}
                onChange={() => setUserData(p => ({...p, supportOption: 'ASSISTANCE'}))}
              />
              <span className="font-medium text-sm md:text-lg">Solicito Asistencia Confidencial: Me gustaría conversar brevemente con los consultores externos (Sophira Hub) sobre temas de manejo de estrés, o salud mental.</span>
            </label>

            <label className="flex items-center p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-all">
              <input 
                type="radio" 
                name="support" 
                className="w-5 h-5 mr-4 accent-lime-400"
                checked={userData.supportOption === 'SENSITIVE'}
                onChange={() => setUserData(p => ({...p, supportOption: 'SENSITIVE'}))}
              />
              <span className="font-medium text-sm md:text-lg">Reporte de Situación Delicada: Estoy pasando por una situación difícil (acoso, agotamiento extremo, conflicto grave) y necesito orientación privada y segura. Autorizo a Sophira Hub a contactarme.</span>
            </label>
          </div>

          {(userData.supportOption === 'ASSISTANCE' || userData.supportOption === 'SENSITIVE') && (
            <div className="mt-4 p-6 bg-lime-50 rounded-2xl space-y-4 animate-fadeIn">
              <p className="font-bold text-base md:text-lg" style={{ color: COLORS.primary }}>Selecciona el método de contacto preferido (Al menos uno es obligatorio):</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Teléfono</label>
                  <input 
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData(p => ({...p, phone: e.target.value}))}
                    placeholder="Ingresa tu teléfono"
                    className="w-full p-3 md:p-4 rounded-xl border-2 border-white focus:border-lime-400 focus:ring-0 text-base md:text-lg shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Correo electrónico</label>
                  <input 
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData(p => ({...p, email: e.target.value}))}
                    placeholder="Ingresa tu correo"
                    className="w-full p-3 md:p-4 rounded-xl border-2 border-white focus:border-lime-400 focus:ring-0 text-base md:text-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <p className="text-sm md:text-base leading-relaxed text-gray-500 italic">
              <strong>IMPORTANTE:</strong> Al marcar las opciones de asistencia, tu solicitud llega directamente a los consultores. Tu jefe directo NO será notificado de esta solicitud.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <button
          onClick={sendData}
          disabled={!isSupportValid() || isSending}
          className={`px-16 md:px-20 py-6 md:py-7 rounded-full text-xl md:text-2xl font-extrabold transition-all shadow-xl flex items-center ${
            isSupportValid() && !isSending ? 'opacity-100 hover:scale-105' : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ 
            backgroundColor: isSupportValid() && !isSending ? COLORS.accent : '#e5e7eb',
            color: isSupportValid() && !isSending ? COLORS.primary : '#9ca3af'
          }}
        >
          {isSending ? 'ENVIANDO...' : 'ENVIAR RESULTADOS'}
        </button>
      </div>
    </div>
  );

  const renderFinish = () => (
    <div className="w-full px-4 md:w-[75%] md:px-0 mx-auto py-20 text-center flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
      <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6" style={{ color: COLORS.primary }}>
        ¡Muchas Gracias!
      </h1>
      <p className="text-base md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
        Tus respuestas han sido enviadas de forma segura. Tu contribución es vital para que Adobe sea un mejor lugar para todos.
      </p>
      <div className="w-32 h-1 bg-lime-400 rounded-full mb-8 shadow-sm"></div>
      <p className="text-gray-400 text-base md:text-lg italic font-medium">Sophira Hub - Radar de Bienestar y Entorno de Trabajo 2026</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <Header />

      {/* ProgressBar */}
      {step !== AppStep.WELCOME && step !== AppStep.FINISH && (
        <div className="fixed top-24 left-0 w-full h-1.5 bg-gray-100 z-50">
          <div 
            className="h-full bg-lime-400 shadow-[0_0_10px_rgba(213,255,51,0.5)] transition-all duration-1000"
            style={{ 
              width: step === AppStep.REGISTRATION ? '25%' :
                     step === AppStep.SURVEY_PAGE_1 ? '50%' :
                     step === AppStep.SURVEY_PAGE_2 ? '75%' :
                     step === AppStep.SUPPORT_PAGE ? '95%' : '100%'
            }}
          />
        </div>
      )}

      <main className="flex-grow pt-32 pb-20">
        {step === AppStep.WELCOME && renderWelcome()}
        {step === AppStep.REGISTRATION && renderRegistration()}
        {step === AppStep.SURVEY_PAGE_1 && renderSurveyPage(SURVEY_BLOCKS_P1, AppStep.SURVEY_PAGE_2)}
        {step === AppStep.SURVEY_PAGE_2 && renderSurveyPage(SURVEY_BLOCKS_P2, AppStep.SUPPORT_PAGE)}
        {step === AppStep.SUPPORT_PAGE && renderSupportPage()}
        {step === AppStep.FINISH && renderFinish()}
      </main>

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-gray-300 text-base md:text-lg">
        Sophira Hub - Radar de Bienestar y Entorno de Trabajo 2026
      </footer>
    </div>
  );
};

export default App;
