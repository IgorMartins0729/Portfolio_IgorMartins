import styles from './Projects.module.css'
import projetoImagem1 from '../../assets/sanja.png'
import projetoImagem2 from '../../assets/sjc.png'
import projetoImagem3 from '../../assets/Group2.svg'

const arrayProjetos = [
    { id: 1, 
        titulo: "E-commerce SanjaFeet", 
        descricao: "Plataforma de comércio desenvolvida para venda de calçados esportivos e casuais. O sistema gerencia catálogo de produtos e navegação do usuário.", 
        tecnologias: "PHP", 
        imagem: projetoImagem1 },

    { id: 2, 
        titulo: "Portal de Dados SJC", 
        descricao: "Aplicação web interativa que exibe análises demográficas, de trânsito e serviços públicos de São José dos Campos.", 
        tecnologias: "Python", 
        imagem: projetoImagem2 },
]

function Projects() {
    return (
        <section className={styles.main}>
            <h1 className={styles.pageTitle}>Meus Projetos</h1>

            <div className={styles.containerCard}>
            {arrayProjetos.map(projeto => (
                <div key={projeto.id} className={styles.card}>
                    <img className={styles.imgCard} src={projeto.imagem}/>
                    <h2>{projeto.titulo}</h2>
                    <p>{projeto.descricao}</p>
                    <div className={styles.tagsTech}>
                        <span className={styles.tags}>{projeto.tecnologias}</span>
                    </div>

                    <div className={styles.btnCard}>
                    <button >Ver respositório</button>
                    </div>
                </div>
            ))}
            </div>

        </section>
    )
}

export default Projects