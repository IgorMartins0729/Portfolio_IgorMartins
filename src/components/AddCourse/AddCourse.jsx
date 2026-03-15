import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCourse.css';

function AddCourse() {
  
  const [titulo, setTitulo] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [ano, setAno] = useState('');
  
  const navigate = useNavigate(); 

  const salvarCurso = (e) => {
    e.preventDefault(); 

    
    const novoCurso = {
      id: Date.now(), // Gera um ID único baseado na data
      titulo: titulo,
      instituicao: instituicao,
      ano: ano,
      linkCredencial: "#"
    };

    
    const cursosSalvos = JSON.parse(localStorage.getItem('meusCursos')) || [];

    
    const novaLista = [...cursosSalvos, novoCurso];

   
    localStorage.setItem('meusCursos', JSON.stringify(novaLista));

    
    navigate('/');
  };

  return (
    <div className="add-course-page">
      <div className="form-container">
        <h2>Adicionar Novo Curso</h2>
        
        <form onSubmit={salvarCurso}>
          <div className="input-group">
            <label>Nome do Curso</label>
            <input 
              type="text" 
              required 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              placeholder="Ex: Bootcamp React JS"
            />
          </div>

          <div className="input-group">
            <label>Instituição</label>
            <input 
              type="text" 
              required 
              value={instituicao} 
              onChange={(e) => setInstituicao(e.target.value)} 
              placeholder="Ex: Alura, Udemy, FATEC"
            />
          </div>

          <div className="input-group">
            <label>Ano de Conclusão</label>
            <input 
              type="number" 
              required 
              value={ano} 
              onChange={(e) => setAno(e.target.value)} 
              placeholder="Ex: 2026"
            />
          </div>

          <div className="form-buttons">
            
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Salvar Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;