
module.exports = {
    listProfs(profs = []) {
        const list = (profs ?? []).map((p: any) => `<li>${p.nome}-${p.sala}</li>`);
        return `<ul>${list.join('')}</ul>`;
    },
    listTechnologies(technologies = []) {
        const list = (technologies ?? [])
            .filter((t: any) => t.poweredByNodejs)
            .map((t: any) => `<li>${t.name} - ${t.type}</li>`);
        return `<ul>${list.join('')}</ul>`;
    },
    optionTag(major: { id: number; code: string; name: string }, selectedMajorId: number) {
        const selected = major.id === selectedMajorId ? 'selected' : '';
        return `<option value="${major.id}" ${selected}>${major.code} - ${major.name}</option>`;
    },
    ifMajorIDEquals(majorId: number, selectedMajorId: number, options: any) {
        return majorId === selectedMajorId ? options.fn(options.data.root) : options.inverse(options.data.root);
    },
    estaLogado(req: any) {
        return req.session && req.session.user ? true : false;
    },
    inc(value: any) {
        return parseInt(value, 10) + 1;
    }
};