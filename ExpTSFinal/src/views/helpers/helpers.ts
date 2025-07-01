import { Prof, Technologies } from './helpersTypes';

export function listProfs(profs: Prof[] = []) {
    const list = (profs ?? []).map((p)=>`<li>${p.nome}-${p.sala}</li>`);
    return `<ul>${list.join('')}</ul>`;
}

export function listTechnologies(technologies: Technologies[] = []) {
    const list = (technologies ?? [])
        .filter(t => t.poweredByNodejs)
        .map(t => `<li>${t.name} - ${t.type}</li>`);
    return `<ul>${list.join('')}</ul>`;
}