export const getMedicalAlert = async () => {
    const res = await fetch ('api/medicalAlert');
    if (!res.ok) throw new Error('Failed to fetch medicalAlert');
    return res.json();
};