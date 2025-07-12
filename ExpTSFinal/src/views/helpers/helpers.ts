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

export function optionTag(major: { id: number; code: string; name: string }, selectedMajorId: number) {
    const selected = major.id === selectedMajorId ? 'selected' : '';
    return `<option value="${major.id}" ${selected}>${major.code} - ${major.name}</option>`;
}

export function ifMajorIDEquals(majorId: number, selectedMajorId: number, options: any) {
    return majorId === selectedMajorId ? options.fn(options.data.root) : options.inverse(options.data.root);
}