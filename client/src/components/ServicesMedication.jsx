


export const getMedication = async () => {
    const res = await fetch ('api/medication');
    if (!res.ok) throw new Error('Failed to fetch medication');
    return res.json();
};

