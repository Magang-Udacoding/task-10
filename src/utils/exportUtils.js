import Papa from 'papaparse'

export const exportToCSV = (data, filename = 'export') => {
    if (!data || data.length === 0) {
        console.warn('exportToCSV: no data to export')
        return
    }

    // convert array of objects
    const csv = Papa.unparse(data, {
        header: true,
        skipEmptyLines: true,
    })

    // create new blob
    const blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8;'
    })

    // create temporary url for download 
    const url = URL.createObjectURL(blob)

    // temporary element <a> 
    const link = document.createElement('a')
    link.href       = url
    link.download   = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename = 'export') => {
    if (!data || data.length === 0) {
        console.warn('exportToExcel: no data to export')
        return
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");

    XLSX.writeFile(workbook, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
}

export const transformProjectsForExport = (projects) =>
    projects.map((p) => ({
    'Project Name': p.name,
    'Client':       p.client,
    'Revenue (IDR)':p.revenue,
    'Hours':        p.hours,
    'Status':       p.status,
    'Priority':     p.priority,
    'Start Date':   p.startDate,
    'End Date':     p.endDate,
    }))