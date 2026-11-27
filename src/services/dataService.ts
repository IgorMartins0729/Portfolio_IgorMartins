import { ProfessionalExperience } from "../types/professional-experience";
import { Certificate } from "../types/certificate";
import experiencias from "../data/experiencias.json";
import certificados from "../data/certificados.json";
import { Education } from "../types/education";
import formacao from "../data/formacao.json";
import { Skills } from "../types/skills";
import habilidades from "../data/habilidades.json";
import { Categoria, Project } from "../types/project";
import projetos from "../data/projetos.json";
import { Network } from "../types/network";
import social from "../data/social.json";

export function getExperiencias(): ProfessionalExperience[] {
    const lista = experiencias as ProfessionalExperience[];
    return [...lista].reverse();
}    

export function getCertificados(): Certificate[] {
    const lista = certificados as Certificate[];
    return [...lista].reverse()
}

export function getFormacao(): Education[] {
    const lista = formacao as Education[];
    return [...lista].reverse()
}

export function getHabilidades(): Skills {
    return habilidades as Skills;
}

export function getProjetos(): Project[] {
    const lista = projetos as Project[];
    return [...lista].reverse()
}

export function getProjetosPorCategoria(categoria: Categoria): Project[] {
    const projetosFiltrados = getProjetos().filter(
        (projeto) => projeto.categoria === categoria
    );
    return projetosFiltrados;
}

export function getRedesSociais(): Network[] {
    const lista = social as Network[];
    return [...lista]
}