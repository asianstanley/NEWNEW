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
            
            // Create cells for all 28 columns as per your HTML table structure
            const cells = [];
            for (let i = 0; i < 28; i++) {
                cells.push(row.insertCell(i));
            }
            
            // Fill cells with data (mapping to correct columns)
            cells[0].textContent = window.csvData[index]['Feeder No.'] || '';
            cells[1].textContent = window.csvData[index]['ICS Code'] || '';
            cells[2].textContent = window.csvData[index]['Part Comment'] || '';
            cells[3].textContent = window.csvData[index]['Fdr Type'] || '';
            cells[4].textContent = window.csvData[index]['Pitch'] || '';
            cells[5].textContent = window.csvData[index]['Program Name'] || '';
            cells[6].textContent = window.csvData[index]['Machine No.'] || '';
            cells[7].textContent = window.csvData[index]['Mount Height'] || '';
            cells[8].textContent = window.csvData[index]['Mount Timer'] || '';
            cells[9].textContent = window.csvData[index]['Pick Height'] || '';
            cells[10].textContent = window.csvData[index]['Pick Timer'] || '';
            cells[11].textContent = window.csvData[index]['Pick Start'] || '';
            cells[12].textContent = window.csvData[index]['Pick Speed'] || '';
            cells[13].textContent = window.csvData[index]['XY Speed'] || '';
            cells[14].textContent = window.csvData[index]['Pick Action'] || '';
            cells[15].textContent = window.csvData[index]['Mount Action'] || '';
            cells[16].textContent = window.csvData[index]['Mount Speed'] || '';
            cells[17].textContent = window.csvData[index]['Body X'] || '';
            cells[18].textContent = window.csvData[index]['Body Y'] || '';
            cells[19].textContent = window.csvData[index]['Body Z'] || '';
            cells[20].textContent = window.csvData[index]['Alignment Type'] || '';
            cells[21].textContent = window.csvData[index]['Algorithm'] || '';
            cells[22].textContent = window.csvData[index]['DatumAngle'] || '';
            cells[23].textContent = window.csvData[index]['Nozzle'] || '';
            cells[24].textContent = window.csvData[index]['TrayHeight'] || '';
            cells[25].textContent = window.csvData[index]['Offset_Num'] || '';
            cells[26].textContent = window.csvData[index]['Offset XY'] || '';
            cells[27].textContent = window.csvData[index]['Point'] || '';
            cells[28].textContent = window.csvData[index]['Board'] || '';
            
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

function inserttable() {
    // Get search input value
    var searchInput = document.getElementById('searchInput').value.trim().toLowerCase(); // Convert to lowercase
    
    // ตรวจสอบว่ามีข้อมูล CSV หรือไม่
    if (!window.csvData || window.csvData.length === 0) {
        alert('No CSV data available. Please upload a file first.');
        return;
    }
    
    // ตรวจสอบว่ามี search input หรือไม่
    if (!searchInput) {
        alert('Please enter search criteria.');
        return;
    }
    
    // Search for matching data
    var foundIndexes = [];
    for (var i = 0; i < window.csvData.length; i++) {
        var matchFound = false;
        // Check ICS Code, Part Comment, and other details for approximate match
        if (window.csvData[i]['ICS Code'] && window.csvData[i]['ICS Code'].toLowerCase().includes(searchInput) ||
            window.csvData[i]['Part Comment'] && window.csvData[i]['Part Comment'].toLowerCase().includes(searchInput)) {
            foundIndexes.push(i);
            matchFound = true;
        } else {
            // Check each property for approximate match
            for (var prop in window.csvData[i]) {
                if (window.csvData[i].hasOwnProperty(prop)) {
                    var value = window.csvData[i][prop].toString().toLowerCase();
                    // Perform approximate match check
                    if (value.includes(searchInput)) {
                        foundIndexes.push(i);
                        matchFound = true;
                        break; // Once a match is found, no need to check further
                    }
                }
            }
        }
    }

    // If no matching data found, alert and return
    if (foundIndexes.length === 0) {
        alert('No matching data found.');
        return;
    }
    
    // Get elements
    var resultsList = document.getElementById('resultsList');
    var resultsList2 = document.getElementById('resultsList2');
    var tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    
    // Display all matching data in the table without clearing existing rows
    foundIndexes.forEach(function(index) {
        var newRow = tableBody.insertRow();
        
        // สร้าง cells ตามโครงสร้างตารางเดิม (24 คอลัมน์)
        var cell1 = newRow.insertCell(0);   // Feeder No.
        var cell2 = newRow.insertCell(1);   // ICS Code
        var cell3 = newRow.insertCell(2);   // Part Comment
        var cell4 = newRow.insertCell(3);   // Fdr Type
        var cell5 = newRow.insertCell(4);   // Pitch
        var cell6 = newRow.insertCell(5);   // Program Name
        var cell7 = newRow.insertCell(6);   // Machine No.
        var cell8 = newRow.insertCell(7);   // Mount Height
        var cell9 = newRow.insertCell(8);   // Mount Timer
        var cell10 = newRow.insertCell(9);   // Pick Height
        var cell11 = newRow.insertCell(10);  // Pick Timer
        var cell12 = newRow.insertCell(11); // Pick Start
        var cell13 = newRow.insertCell(12); // Pick Speed
        var cell14 = newRow.insertCell(13); // XY Speed
        var cell15 = newRow.insertCell(14); // Pick Action
        var cell16 = newRow.insertCell(15); // Mount Action
        var cell17 = newRow.insertCell(16); // Mount Speed
        var cell18 = newRow.insertCell(17); // Body X
        var cell19 = newRow.insertCell(18); // Body Y
        var cell20 = newRow.insertCell(19); // Body Z
        var cell21 = newRow.insertCell(20); // Alignment Type
        var cell22 = newRow.insertCell(21); // Algorithm
        var cell23 = newRow.insertCell(22); // DatumAngle
        var cell24 = newRow.insertCell(23); // Nozzle
        var cell25 = newRow.insertCell(24); // TrayHeight
        var cell26 = newRow.insertCell(25); // Offset_Num
        var cell27 = newRow.insertCell(26); // Offset XY
        var cell28 = newRow.insertCell(27); // Point
        var cell29 = newRow.insertCell(28); // Board
        // เติมข้อมูลในแต่ละ cell
        cell1.textContent = window.csvData[index]['Feeder No.'] || '';
        cell2.textContent = window.csvData[index]['ICS Code'] || '';
        cell3.textContent = window.csvData[index]['Part Comment'] || '';
        cell4.textContent = window.csvData[index]['Fdr Type'] || '';
        cell5.textContent = window.csvData[index]['Pitch'] || '';
        cell6.textContent = window.csvData[index]['Program Name'] || '';
        cell7.textContent = window.csvData[index]['Machine No.'] || '';
        cell8.textContent = window.csvData[index]['Mount Height'] || '';
        cell9.textContent = window.csvData[index]['Mount Timer'] || '';
        cell10.textContent = window.csvData[index]['Pick Height'] || '';
        cell11.textContent = window.csvData[index]['Pick Timer'] || '';
        cell12.textContent = window.csvData[index]['Pick Start'] || '';
        cell13.textContent = window.csvData[index]['Pick Speed'] || '';
        cell14.textContent = window.csvData[index]['XY Speed'] || '';
        cell15.textContent = window.csvData[index]['Pick Action'] || '';
        cell16.textContent = window.csvData[index]['Mount Action'] || '';
        cell17.textContent = window.csvData[index]['Mount Speed'] || '';
        cell18.textContent = window.csvData[index]['Body X'] || '';
        cell19.textContent = window.csvData[index]['Body Y'] || '';
        cell20.textContent = window.csvData[index]['Body Z'] || '';
        cell21.textContent = window.csvData[index]['Alignment Type'] || '';
        cell22.textContent = window.csvData[index]['Algorithm'] || '';
        cell23.textContent = window.csvData[index]['DatumAngle'] || '';
        cell24.textContent = window.csvData[index]['Nozzle'] || '';
        cell25.textContent = window.csvData[index]['TrayHeight'] || '';
        cell26.textContent = window.csvData[index]['Offset_Num'] || '';
        cell27.textContent = window.csvData[index]['Offset XY'] || '';
        cell28.textContent = window.csvData[index]['Point'] || '';
        cell29.textContent = window.csvData[index]['Board'] || '';
        
        // Highlight matching cells
        [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13, cell14, cell15, cell16, cell17, cell18, cell19, cell20, cell21, cell22, cell23, cell24,cell25,cell26,cell27,cell28,cell29].forEach(function(cell) {
            if (cell.textContent && cell.textContent.toLowerCase().includes(searchInput)) {
                cell.style.backgroundColor = '#fffacd';
                cell.style.fontWeight = 'bold';
            }
        });
        
        // Insert into resultsList (ICS Code) - ตรวจสอบไม่ให้ซ้ำ
        var icsCode = window.csvData[index]['ICS Code'] || '';
        if (icsCode && !resultsList.querySelector('option[value="' + icsCode + '"]')) {
            var option = document.createElement('option');
            option.value = icsCode;
            option.textContent = icsCode;
            resultsList.appendChild(option);
        }
        
        // Insert into resultsList2 (Part Comment) - ตรวจสอบไม่ให้ซ้ำ
        var partComment = window.csvData[index]['Part Comment'] || '';
        if (partComment && !resultsList2.querySelector('option[value="' + partComment + '"]')) {
            var option2 = document.createElement('option');
            option2.value = partComment;
            option2.textContent = partComment;
            resultsList2.appendChild(option2);
        }
    });

    // Optional: Scroll to the newly added row (if needed)
    if (tableBody.rows.length > 0) {
        tableBody.rows[tableBody.rows.length - 1].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end', 
            inline: 'nearest' 
        });
    }

    // Optional: Display success message (if needed)
    alert('Data inserted successfully. Added ' + foundIndexes.length + ' matching rows.');
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
