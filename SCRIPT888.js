// Global variables to store CSV data
let csvData = [];
let csvHeaders = [];

// File upload handler
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('csvFile');
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            processData(contents);
        };
        reader.readAsText(file);
    });
    
    // Add enter key support for search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchICSCode();
        }
    });
});
// ตัวเลือก 1: ใช้ console.log เท่านั้น (ไม่มี popup)
function processData(csvDataText) {
    console.log('=== Processing CSV ===');
        
    const lines = csvDataText.split('\n');
    const data = [];
    const headers = lines[0].split(',');
        
    console.log('Headers found:', headers);
        
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j].trim()] = values[j].trim();
            }
            data.push(entry);
        }
    }
        
    csvData = data;
    csvHeaders = headers;
    window.csvData = data;
    window.csvHeaders = headers;
        
    console.log('CSV loaded successfully:', data.length, 'rows');
    console.log('Sample data:', data[0]);
        
    // แสดงข้อความใน console เท่านั้น
    console.log(`อัพโหลดไฟล์สำเร็จ! โหลดข้อมูล ${data.length} แถว`);
}
function fetchCSV() {
  var csvUrl = 'https://raw.githubusercontent.com/asianstanley/TEST12345/main/TABLE.csv';
  fetch(csvUrl)
    .then(response => response.text())
    .then(data => processData(data))
    .catch(error => console.error('Error fetching the CSV file:', error));
}
// ตัวเลือก 2: แสดงข้อความใน element บนหน้าเว็บ
function processDataWithStatus(csvDataText) {
    console.log('=== Processing CSV ===');
        
    const lines = csvDataText.split('\n');
    const data = [];
    const headers = lines[0].split(',');
        
    console.log('Headers found:', headers);
        
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j].trim()] = values[j].trim();
            }
            data.push(entry);
        }
    }
        
    csvData = data;
    csvHeaders = headers;
    window.csvData = data;
    window.csvHeaders = headers;
        
    console.log('CSV loaded successfully:', data.length, 'rows');
    console.log('Sample data:', data[0]);
    
    // แสดงใน status element (ต้องมี element ที่มี id="status" ในหน้าเว็บ)
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = `อัพโหลดไฟล์สำเร็จ! โหลดข้อมูล ${data.length} แถว`;
        statusElement.style.color = 'green';
        
        // ซ่อนข้อความหลังจาก 3 วินาที
        setTimeout(() => {
            statusElement.textContent = '';
        }, 3000);
    }
}

// ตัวเลือก 3: สร้าง Toast Notification (แจ้งเตือนชั่วคราว)
function processDataWithToast(csvDataText) {
    console.log('=== Processing CSV ===');
        
    const lines = csvDataText.split('\n');
    const data = [];
    const headers = lines[0].split(',');
        
    console.log('Headers found:', headers);
        
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j].trim()] = values[j].trim();
            }
            data.push(entry);
        }
    }
        
    csvData = data;
    csvHeaders = headers;
    window.csvData = data;
    window.csvHeaders = headers;
        
    console.log('CSV loaded successfully:', data.length, 'rows');
    console.log('Sample data:', data[0]);
    
    // สร้าง Toast notification
    showToast(`อัพโหลดไฟล์สำเร็จ! โหลดข้อมูล ${data.length} แถว`);
}
// ฟังก์ชันหลักสำหรับ process CSV data
function processData(csvDataText) {
    console.log('=== Processing CSV ===');
        
    const lines = csvDataText.split('\n');
    const data = [];
    const headers = lines[0].split(',');
        
    console.log('Headers found:', headers);
        
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j].trim()] = values[j].trim();
            }
            data.push(entry);
        }
    }
        
    csvData = data;
    csvHeaders = headers;
    window.csvData = data;
    window.csvHeaders = headers;
        
    console.log('CSV loaded successfully:', data.length, 'rows');
    console.log('Sample data:', data[0]);
    
    // แสดง Toast แทน alert
    showToast(`อัพโหลดไฟล์สำเร็จ! โหลดข้อมูล ${data.length} แถว`, 'success');
}

// ฟังก์ชันสำหรับแสดง Toast notification
function showToast(message, type = 'success') {
    // สร้าง toast container ถ้ายังไม่มี
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // กำหนดสีตามประเภท
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    // สร้าง toast element
    const toast = document.createElement('div');
    toast.innerHTML = `
        <div style="
            background: ${colors[type] || colors.success};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
            transform: translateX(100%);
            transition: all 0.3s ease;
            pointer-events: auto;
            cursor: pointer;
            border-left: 4px solid rgba(255,255,255,0.3);
        ">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    const toastElement = toast.firstElementChild;
    
    // Animation เข้า
    setTimeout(() => {
        toastElement.style.transform = 'translateX(0)';
    }, 10);
    
    // Click เพื่อปิด
    toastElement.addEventListener('click', () => {
        hideToast(toast);
    });
    
    // Auto hide หลัง 4 วินาที
    setTimeout(() => {
        hideToast(toast);
    }, 4000);
    
    function hideToast(toastWrapper) {
        const element = toastWrapper.firstElementChild;
        element.style.transform = 'translateX(100%)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            if (toastWrapper.parentNode) {
                toastWrapper.parentNode.removeChild(toastWrapper);
            }
        }, 300);
    }
}

// ตัวอย่างการใช้งานประเภทต่างๆ
function showSuccessToast(message) {
    showToast(message, 'success');
}

function showErrorToast(message) {
    showToast(message, 'error');
}

function showWarningToast(message) {
    showToast(message, 'warning');
}

function showInfoToast(message) {
    showToast(message, 'info');
}

window.onload = fetchCSV;
function exportCSV() {
  var table = document.getElementById('resultsTable');

  if (!table) {
      console.error('ไม่พบตารางที่มี id="resulttable"');
      return;
  }

  var csv = [];
  var rows = table.rows;

  for (var i = 0; i < rows.length; i++) { //rows.length คือจำนวนแถวในตาราง resultsTable.
      var row = []; //row เป็นอาร์เรย์ที่ใช้เพื่อเก็บข้อมูลแต่ละเซลล์ในแถวปัจจุบันของตาราง.
      var cells = rows[i].cells; //cells เป็นคอลเล็กชันของเซลล์ในแถวปัจจุบัน (rows[i]). 

      for (var j = 0; j < cells.length; j++) { //วนลูปผ่านเซลล์ในแต่ละแถว (cells):
          var cellText = cells[j].innerText.replace(/"/g, '""'); // cells[j].innerText คือข้อความที่อยู่ในเซลล์ที่ j ในแถวปัจจุบัน. replace(/"/g, '""') ใช้เพื่อแทนที่เครื่องหมาย " ด้วย "" เพื่อป้องกันการขัดแย้งกับตัวครอบข้อมูลใน CSV.
          row.push('"' + cellText + '"');//เพิ่มข้อความที่ผ่านการป้องกันแล้วเข้าไปในอาร์เรย์ row โดยใส่เครื่องหมายคำพูดครอบข้อมูล.
      }

      csv.push(row.join(','));//row.join(',') จะเชื่อมข้อมูลในอาร์เรย์ row เข้าด้วยกันโดยใช้เครื่องหมาย , เป็นตัวคั่น และเพิ่มแถว CSV ที่เกิดจากการเชื่อมข้อมูลนั้นลงในอาร์เรย์ csv.
  }

  var csvContent = csv.join('\n');
  var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // สร้าง URL สำหรับ Blob object
  var url = URL.createObjectURL(blob);

  // สร้าง element <a> เพื่อลิงก์ไปยัง URL และทำการดาวน์โหลดไฟล์
  var a = document.createElement('a');
  a.href = url;
  a.download = 'resultsearch.csv';

  // เพิ่ม element <a> เข้าไปใน DOM แต่ยังไม่ทำการ append ไปยัง document.body
  // สามารถใช้ setTimeout เพื่อให้ browser มีเวลาในการเตรียมตัวสำหรับการดาวน์โหลด
  setTimeout(function() {
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }, 100);
}

// Search function (exact copy of working code with Part Comment correction)
function searchICSCode() {
    console.log('=== Starting Search ===');
    
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsList = document.getElementById('resultsList');
    const resultsList2 = document.getElementById('resultsList2');
    const resultsTableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    
    console.log('Search term:', searchInput);
    
    // Clear previous results
    resultsList.innerHTML = '';
    resultsList2.innerHTML = '';
    resultsTableBody.innerHTML = '';
    
    if (!window.csvData) {
        alert('No CSV data available.');
        return;
    }
    
    if (!searchInput) {
        alert('กรุณาใส่คำค้นหา');
        return;
    }
    
    console.log('Searching in', window.csvData.length, 'rows');
    
    // Search for matches - exact logic from working code
    const foundIndexes = [];
    for (let i = 0; i < window.csvData.length; i++) {
        let matchFound = false;
        
        // Check ICS Code, Part Comment, and other details for match
        const icsCode = window.csvData[i]['ICS Code'] || '';
        const partComment = window.csvData[i]['Part Comment'] || '';
        const programName = window.csvData[i]['Program Name'] || '';
        
        if (icsCode.toLowerCase().includes(searchInput) ||
            partComment.toLowerCase().includes(searchInput) ||
            programName.toLowerCase().includes(searchInput)) {
            foundIndexes.push(i);
            matchFound = true;
            console.log('Primary match found at row', i + 1, ':', {
                ICS: icsCode,
                Part: partComment,
                Program: programName
            });
        } else {
            // Check each property for match
            for (const prop in window.csvData[i]) {
                if (window.csvData[i].hasOwnProperty(prop)) {
                    const value = window.csvData[i][prop].toString().toLowerCase();
                    if (value.includes(searchInput)) {
                        foundIndexes.push(i);
                        matchFound = true;
                        console.log('Secondary match found at row', i + 1, 'in', prop, ':', window.csvData[i][prop]);
                        break;
                    }
                }
            }
        }
    }
    
    console.log('Total matches found:', foundIndexes.length);
    
    if (foundIndexes.length > 0) {
        // Display unique ICS Code and Part Comment
        const uniqueResults = {};
        
        foundIndexes.forEach(function(index) {
            const icsCode = window.csvData[index]['ICS Code'] || '';
            const partComment = window.csvData[index]['Part Comment'] || '';
            
            // Add unique ICS Codes
            if (icsCode && !uniqueResults[icsCode]) {
                const option = document.createElement('option');
                option.text = icsCode;
                option.value = icsCode;
                resultsList.add(option);
                uniqueResults[icsCode] = true;
                console.log('Added ICS Code:', icsCode);
            }
            
            // Add unique Part Comments
            if (partComment && !uniqueResults[partComment]) {
                const option2 = document.createElement('option');
                option2.text = partComment;
                option2.value = partComment;
                resultsList2.add(option2);
                uniqueResults[partComment] = true;
                console.log('Added Part Comment:', partComment);
            }
        });
        
        // Display all matching data in table
        foundIndexes.forEach(function(index) {
            const row = resultsTableBody.insertRow();
            
            // Create cells for all 24 columns as per your HTML table structure
            const cells = [];
            for (let i = 0; i < 24; i++) {
                cells.push(row.insertCell(i));
            }
            
            // Fill cells with data (mapping to correct columns)
            cells[0].textContent = window.csvData[index]['Feeder No.'] || '';
            cells[1].textContent = window.csvData[index]['ICS Code'] || '';
            cells[2].textContent = window.csvData[index]['Part Comment'] || '';
            cells[3].textContent = window.csvData[index]['Fdr Type'] || '';
            cells[4].textContent = window.csvData[index]['Pitch'] || '';
            cells[5].textContent = window.csvData[index]['Program Name'] || '';
            cells[6].textContent = window.csvData[index]['Mount Height'] || '';
            cells[7].textContent = window.csvData[index]['Mount Timer'] || '';
            cells[8].textContent = window.csvData[index]['Pick Height'] || '';
            cells[9].textContent = window.csvData[index]['Pick Timer'] || '';
            cells[10].textContent = window.csvData[index]['Pick Start'] || '';
            cells[11].textContent = window.csvData[index]['Pick Speed'] || '';
            cells[12].textContent = window.csvData[index]['XY Speed'] || '';
            cells[13].textContent = window.csvData[index]['Pick Action'] || '';
            cells[14].textContent = window.csvData[index]['Mount Action'] || '';
            cells[15].textContent = window.csvData[index]['Mount Speed'] || '';
            cells[16].textContent = window.csvData[index]['Body X'] || '';
            cells[17].textContent = window.csvData[index]['Body Y'] || '';
            cells[18].textContent = window.csvData[index]['Body Z'] || '';
            cells[19].textContent = window.csvData[index]['Alignment Type'] || '';
            cells[20].textContent = window.csvData[index]['Algorithm'] || '';
            cells[21].textContent = window.csvData[index]['DatumAngle'] || '';
            cells[22].textContent = window.csvData[index]['Nozzle'] || '';
            cells[23].textContent = window.csvData[index]['TrayHeight'] || '';
            
            // Highlight matching cells
            cells.forEach(cell => {
                if (cell.textContent && cell.textContent.toLowerCase().includes(searchInput)) {
                    cell.style.backgroundColor = '#fffacd';
                    cell.style.fontWeight = 'bold';
                }
            });
        });
        
        console.log('Search completed successfully');
        showSuccessMessage(`พบข้อมูล ${foundIndexes.length} รายการ`);
        
    } else {
        console.log('No matching data found');
        
        // Debug: Show sample data
        console.log('Sample data from first 3 rows:');
        for (let i = 0; i < Math.min(3, window.csvData.length); i++) {
            console.log('Row', i + 1, ':', {
                'ICS Code': window.csvData[i]['ICS Code'],
                'Part Comment': window.csvData[i]['Part Comment'],
                'Program Name': window.csvData[i]['Program Name']
            });
        }
        
        alert('No matching data found.');
    }
}

// Insert table function
function inserttable() {
    if (!window.csvData || window.csvData.length === 0) {
        alert('กรุณาอัพโหลดไฟล์ CSV ก่อน');
        return;
    }
    
    const resultsTableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    const resultsList = document.getElementById('resultsList');
    const resultsList2 = document.getElementById('resultsList2');
    
    // Clear previous results
    resultsTableBody.innerHTML = '';
    resultsList.innerHTML = '';
    resultsList2.innerHTML = '';
    
    const uniqueICS = new Set();
    const uniquePart = new Set();
    
    // Display all data
    window.csvData.forEach(function(rowData, index) {
        const row = resultsTableBody.insertRow();
        
        // Create cells for all 24 columns
        const cells = [];
        for (let i = 0; i < 24; i++) {
            cells.push(row.insertCell(i));
        }
        
        // Fill cells with data
        cells[0].textContent = rowData['Feeder No.'] || '';
        cells[1].textContent = rowData['ICS Code'] || '';
        cells[2].textContent = rowData['Part Comment'] || '';
        cells[3].textContent = rowData['Fdr Type'] || '';
        cells[4].textContent = rowData['Pitch'] || '';
        cells[5].textContent = rowData['Program Name'] || '';
        cells[6].textContent = rowData['Mount Height'] || '';
        cells[7].textContent = rowData['Mount Timer'] || '';
        cells[8].textContent = rowData['Pick Height'] || '';
        cells[9].textContent = rowData['Pick Timer'] || '';
        cells[10].textContent = rowData['Pick Start'] || '';
        cells[11].textContent = rowData['Pick Speed'] || '';
        cells[12].textContent = rowData['XY Speed'] || '';
        cells[13].textContent = rowData['Pick Action'] || '';
        cells[14].textContent = rowData['Mount Action'] || '';
        cells[15].textContent = rowData['Mount Speed'] || '';
        cells[16].textContent = rowData['Body X'] || '';
        cells[17].textContent = rowData['Body Y'] || '';
        cells[18].textContent = rowData['Body Z'] || '';
        cells[19].textContent = rowData['Alignment Type'] || '';
        cells[20].textContent = rowData['Algorithm'] || '';
        cells[21].textContent = rowData['DatumAngle'] || '';
        cells[22].textContent = rowData['Nozzle'] || '';
        cells[23].textContent = rowData['TrayHeight'] || '';
        
        // Collect unique values
        const icsCode = rowData['ICS Code'];
        const partComment = rowData['Part Comment'];
        
        if (icsCode && !uniqueICS.has(icsCode)) {
            uniqueICS.add(icsCode);
            const option = document.createElement('option');
            option.value = icsCode;
            option.textContent = icsCode;
            resultsList.appendChild(option);
        }
        
        if (partComment && !uniquePart.has(partComment)) {
            uniquePart.add(partComment);
            const option2 = document.createElement('option');
            option2.value = partComment;
            option2.textContent = partComment;
            resultsList2.appendChild(option2);
        }
    });
    
    showSuccessMessage(`แสดงข้อมูลทั้งหมด ${window.csvData.length} รายการ`);
}

// Export CSV function
function exportCSV() {
    const table = document.getElementById('resultsTable');
    
    if (!table) {
        console.error('ไม่พบตารางที่มี id="resultsTable"');
        return;
    }
    
    const csv = [];
    const rows = table.rows;
    
    for (let i = 0; i < rows.length; i++) {
        const row = [];
        const cells = rows[i].cells;
        
        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].innerText.replace(/"/g, '""');
            row.push('"' + cellText + '"');
        }
        
        csv.push(row.join(','));
    }
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultsearch.csv';
    
    setTimeout(function() {
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, 100);
}

// Copy function
function copySelectedOptions(selectId) {
    const select = document.getElementById(selectId);
    let selectedOptions;
    
    if (select.selectedOptions.length === 0) {
        // Copy all options if none selected
        selectedOptions = Array.from(select.options).map(option => option.text).join('\n');
    } else {
        // Copy selected options
        selectedOptions = Array.from(select.selectedOptions).map(option => option.text).join('\n');
    }
    
    if (selectedOptions) {
        const textarea = document.createElement('textarea');
        textarea.value = selectedOptions;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Copied to clipboard: \n' + selectedOptions);
    }
}

// Clear functions
function clearFileInput() {
    document.getElementById('csvFile').value = '';
    csvData = [];
    csvHeaders = [];
    window.csvData = null;
    window.csvHeaders = null;
    showSuccessMessage('ล้างไฟล์แล้ว');
}

function clearSearchInput() {
    document.getElementById('searchInput').value = '';
}

function clearResultsList() {
    document.getElementById('resultsList').innerHTML = '';
}

function clearResultsList2() {
    document.getElementById('resultsList2').innerHTML = '';
}

function clearResultsTable() {
    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
}

function clearAll() {
    clearSearchInput();
    clearResultsList();
    clearResultsList2();
    clearResultsTable();
    showSuccessMessage('ล้างข้อมูลทั้งหมดแล้ว');
}

// Show success message
function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Menu toggle function
function toggleMenu() {
    const menu = document.getElementById('menuPopup');
    const overlay = document.getElementById('menuOverlay');
    
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}