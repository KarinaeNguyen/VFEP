// assets/js/main.js

// --- TAB FUNCTIONALITY ---
function initTabs(tabContainerId, tabButtonClass, tabContentClass) {
    const tabContainer = document.getElementById(tabContainerId);
    if (!tabContainer) {
        // console.warn("Tab container not found:", tabContainerId);
        return; 
    }
    const tabButtons = tabContainer.querySelectorAll(tabButtonClass);
    
    // --- SỬA LỖI ---
    // Chúng ta tìm nội dung trong "phần cha" (parentNode) của khu vực chứa tab,
    // chứ không phải tìm bên trong nó.
    const tabContents = tabContainer.parentNode.querySelectorAll(tabContentClass);
    // --- KẾT THÚC SỬA LỖI ---

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => {
                content.classList.toggle('active', content.id === targetId);
            });
        });
    });
}

// --- SMOOTH SCROLL ---
function initSmoothScroll() {
    // Chỉ tìm nav-link bên trong header
    const header = document.getElementById('header');
    if (!header) return;
    
    header.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            // The -80 offset accounts for the sticky header
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: "smooth" });
        });
    });
}

// --- CSV PARSER CHUẨN ---
function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"' && insideQuotes && nextChar === '"') {
            currentCell += '"';
            i++;
        } else if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            currentRow.push(currentCell);
            currentCell = '';
        } else if ((char === '\n' || char === '\r') && !insideQuotes) {
            if (currentCell || currentRow.length > 0) {
                currentRow.push(currentCell);
                rows.push(currentRow);
                currentRow = [];
                currentCell = '';
            }
        } else {
            currentCell += char;
        }
    }
    if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell);
        rows.push(currentRow);
    }
    return rows;
}

// --- LOGIC TÀI CHÍNH ---
const googleSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv';
let myCashFlowChart;

function parseFinancialNumber(str) {
    if (!str || str.trim() === "") return 0;
    return parseFloat(str.replace(/"/g, '').replace(/,/g, '')) || 0;
}

function formatCurrency(num) {
    const isNegative = num < 0;
    const formattedNum = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(Math.abs(num));
    if (num === 0) return "0";
    return (isNegative ? '(' : '') + formattedNum + (isNegative ? ')' : '');
}

async function loadFinancialData() {
    const loadingEl = document.getElementById('financials-loading');
    const chartWrapperEl = document.getElementById('chart-wrapper');
    const tableWrapperEl = document.getElementById('table-wrapper');
    const tableHeadEl = document.getElementById('financial-table-head');
    const tableBodyEl = document.getElementById('financial-table-body');
    const cashFlowChartCanvas = document.getElementById('cashFlowChart')?.getContext('2d');

    if (!loadingEl || !cashFlowChartCanvas) {
        // console.warn("Financials elements not found. Chart will not load.");
        return;
    }

    try {
        const cacheBustedURL = googleSheetURL + '&cacheBust=' + new Date().getTime();
        const response = await fetch(cacheBustedURL);
        if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
        const csvText = await response.text();
        const dataGrid = parseCSV(csvText);

        const yearRow = dataGrid[1] || [];
        const quarterRow = dataGrid[2] || [];
        const labels = [];
        let currentYear = "";
        const validColumnIndices = [0];

        for (let i = 1; i < quarterRow.length; i++) {
            if (yearRow[i] && yearRow[i].trim() !== "") {
                currentYear = yearRow[i].replace(/"/g, '').trim();
            }
            if (quarterRow[i] && quarterRow[i].trim() !== "") {
                labels.push(quarterRow[i].replace(/"/g, '').trim() + " " + currentYear);
                validColumnIndices.push(i);
            }
        }

        let beginCashRow, receiptsRow, paidOutRow;
        dataGrid.forEach(row => {
            const title = (row[0] || '').replace(/"/g, '').trim();
            if (title.startsWith("CASH IN HAND AT BEGINNING OF PERIOD")) beginCashRow = row;
            if (title.startsWith("TOTAL CASH RECEIPTS")) receiptsRow = row;
            if (title.startsWith("TOTAL CASH PAID OUT")) paidOutRow = row;
        });

        if (!beginCashRow || !receiptsRow || !paidOutRow)
            throw new Error('Missing key rows in CSV.');

        const dataIndices = validColumnIndices.slice(1);
        const beginCashData = dataIndices.map(i => parseFinancialNumber(beginCashRow[i]));
        const receiptsData = dataIndices.map(i => parseFinancialNumber(receiptsRow[i]));
        const paidOutData = dataIndices.map(i => parseFinancialNumber(paidOutRow[i]));

        const netCashFlowData = [];
        const endCashData = [];
        for (let i = 0; i < labels.length; i++) {
            let net = receiptsData[i] - paidOutData[i];
            let end = beginCashData[i] + net;
            netCashFlowData.push(net);
            endCashData.push(end);
        }

        if (myCashFlowChart) myCashFlowChart.destroy();
        myCashFlowChart = new Chart(cashFlowChartCanvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Dòng Tiền Ròng (Net Cash Flow)',
                        data: netCashFlowData,
                        type: 'bar',
                        backgroundColor: netCashFlowData.map(v => v >= 0 ? '#16a34a' : '#dc2626'),
                        yAxisID: 'y'
                    },
                    {
                        label: 'Tiền Mặt Cuối Kỳ (End of Period Cash)',
                        data: endCashData,
                        type: 'line',
                        borderColor: '#4338ca',
                        backgroundColor: '#4338ca',
                        tension: 0.1,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + (value / 1000) + 'k'
                        },
                        title: { display: true, text: 'Số tiền (USD)' }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Dự Báo Dòng Tiền (8 Quý)',
                        font: { size: 18 }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: ctx => {
                                let label = ctx.dataset.label + ': ';
                                label += '$' + new Intl.NumberFormat('en-US').format(ctx.parsed.y);
                                return label;
                            }
                        }
                    }
                }
            }
        });

        let tableHeaderHTML = '<tr>';
        validColumnIndices.forEach((index, i) => {
            let title = quarterRow[index]?.replace(/"/g, '').trim() || '';
            let year = "";
            for (let j = index; j >= 1; j--) {
                if (yearRow[j] && yearRow[j].trim() !== "") {
                    year = yearRow[j].replace(/"/g, '').trim();
                    break;
                }
            }
            tableHeaderHTML += `<th class="px-4 py-3 text-left text-sm font-semibold ${i===0?'text-indigo-700 w-2/5':'text-neutral-700'}">${i===0?title:`${title} ${year}`}</th>`;
        });
        tableHeaderHTML += '</tr>';
        tableHeadEl.innerHTML = tableHeaderHTML;

        let tableBodyHTML = '';
        dataGrid.slice(3).forEach(row => {
            if (row.length < 2 || row.every(c => c.trim() === '')) return;
            const title = (row[0] || '').replace(/"/g, '').trim();
            if (!title) return;

            const isHeaderRow = ['CASH IN', 'CASH PAID OUT', 'I. IP & Legal Registration', 'II. R&D Technical & MVP Product Development', 'III. G&A (Operations)'].includes(title);
            const isTotalRow = title.startsWith('TOTAL') || title.startsWith('CASH IN HAND') || title.startsWith('NET CASHFLOW');

            tableBodyHTML += `<tr class="${isHeaderRow?'bg-neutral-100':''} ${isTotalRow?'font-bold':''}">`;
            validColumnIndices.forEach((colIndex, i) => {
                const cellVal = (row[colIndex] || '').replace(/"/g, '').trim();
                if (i === 0)
                    tableBodyHTML += `<td class="px-4 py-3 text-sm ${isHeaderRow||isTotalRow?'text-indigo-800':'text-neutral-800'}">${title}</td>`;
                else
                    tableBodyHTML += `<td class="px-4 py-3 text-sm text-right text-neutral-700">${formatCurrency(parseFinancialNumber(cellVal))}</td>`;
            });
            tableBodyHTML += '</tr>';
        });
        tableBodyEl.innerHTML = tableBodyHTML;

        loadingEl.classList.add('hidden');
        chartWrapperEl.classList.remove('hidden');
        tableWrapperEl.classList.remove('hidden');

    } catch (error) {
        console.error('Lỗi tải CSV:', error);
        loadingEl.innerHTML = `<p class="text-red-600 font-bold">Không thể tải dữ liệu tài chính.</p><p class="text-neutral-600">Hãy đảm bảo Google Sheet được "Xuất bản lên web".</p><p class="text-sm text-neutral-500">Chi tiết: ${error.message}</p>`;
    }
}

// --- GLOBAL INITIALIZER ---
function initializeApp() {
    console.log("Initializing app components...");
    
    // 1. Set up all tabs
    initTabs('technology-tabs', '.tech-tab-btn', '.tech-tab-content');
    initTabs('market-tabs', '.market-tab-btn', '.market-tab-content');
    initTabs('advantage-tabs', '.advantage-tab-btn', '.advantage-tab-content');
    
    // 2. Set up header navigation
    initSmoothScroll();
    
    // 3. Load financial data
    loadFinancialData();
}

// --- EXPORT THE INITIALIZER ---
window.initializeApp = initializeApp;
