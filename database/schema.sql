-- ====================================================
--  Portfolio Igor Martins — Schema do Banco de Dados
--  Versão: 1.0.0
--  Data:   2026-05-31
-- ====================================================

-- 1. Criar e selecionar o banco
CREATE DATABASE IF NOT EXISTS portfolio_igor
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_igor;

-- ====================================================
--  TABELAS
-- ====================================================

CREATE TABLE IF NOT EXISTS projetos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titulo      VARCHAR(255) NOT NULL,
  descricao   TEXT,
  tecnologias VARCHAR(500),
  imagem      TEXT,
  link        VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS skills (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  nome  VARCHAR(255) NOT NULL,
  tipo  ENUM('hard', 'soft') NOT NULL,
  icone TEXT
);

CREATE TABLE IF NOT EXISTS certificados (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(255) NOT NULL,
  instituicao VARCHAR(255),
  dataEmissao VARCHAR(20),
  imagem      TEXT
);

CREATE TABLE IF NOT EXISTS cursos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  isCompleted BOOLEAN      DEFAULT FALSE,
  nomeCurso   VARCHAR(255) NOT NULL,
  localCurso  VARCHAR(255),
  inicioCurso VARCHAR(20),
  fimCurso    VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS experiencias (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nomeEmpresa VARCHAR(255) NOT NULL,
  cargo       VARCHAR(255),
  periodo     VARCHAR(100)
);

-- ====================================================
--  DADOS INICIAIS (seed)
-- ====================================================

INSERT INTO projetos (titulo, descricao, tecnologias, imagem, link) VALUES
(
  'E-commerce SanjaFeet',
  'Plataforma de comércio desenvolvida para venda de calçados esportivos e casuais. O sistema gerencia catálogo de produtos e navegação do usuário.',
  'PHP',
  '',
  'https://github.com/IgorMartins0729/ProjectSanjaFeet_TCCTechnical'
),
(
  'Portal de Dados SJC',
  'Aplicação web interativa que exibe análises demográficas, de trânsito e serviços públicos de São José dos Campos.',
  'Python',
  '',
  'https://github.com/FATCK06/ProjectAPI_FirstSemester'
);

INSERT INTO skills (nome, tipo, icone) VALUES
('React',                'hard', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png'),
('Python',               'hard', 'https://images.icon-icons.com/2699/PNG/512/python_logo_icon_168886.png'),
('Typescript',           'hard', 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png'),
('C#',                   'hard', 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png'),
('Trabalho em Equipe',   'soft', 'Network'),
('Gestão de Tempo',      'soft', 'Clock'),
('Proatividade',         'soft', 'Rocket'),
('Autonomia',            'soft', 'Compass'),
('Aprendizado Contínuo', 'soft', 'BookOpen');

INSERT INTO certificados (nome, instituicao, dataEmissao, imagem) VALUES
('Certificado FATEC 2025-2', 'FATEC São José dos Campos', '12/2025', '');

INSERT INTO cursos (isCompleted, nomeCurso, localCurso, inicioCurso, fimCurso) VALUES
(FALSE, 'Desenvolvimento de Software Multiplataforma', 'FATEC São José dos Campos', '08/2025', '07/2028'),
(TRUE,  'Técnico de Informática',                      'Colégio Joseense',           '01/2020', '12/2022');

INSERT INTO experiencias (nomeEmpresa, cargo, periodo) VALUES
('Kaffa Tech',    'Estagiário de Desenvolvimento de Software', 'Dez 2025 - Atual'),
('Sonaca Brasil', 'Auxiliar de TI',                           'Mar 2024 - Jun 2025');
