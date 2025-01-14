async function includeHeader() {
    try {
    const response = await fetch('/admin/headerGTM.html'); // Caminho para o headerGTM.html
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const headHTML = await response.text();
        document.head.innerHTML = headHTML + document.head.innerHTML;

    } catch (error) {
        console.error('Error fetching headerGTM.html:', error);
    }
}
includeHeader();