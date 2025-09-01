import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { writeFile, readFile, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);

interface ContactData {
  name: string;
  company: string;
  message: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.company || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add timestamp
    const contactData: ContactData = {
      ...body,
      timestamp: new Date().toISOString()
    };

    // Define the Excel file path
    const dataDir = join(process.cwd(), 'data');
    const excelFilePath = join(dataDir, 'contacts.xlsx');

    // Create data directory if it doesn't exist
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    let existingData: ContactData[] = [];
    let workbook: XLSX.WorkBook;

    // Check if Excel file exists and read existing data
    if (existsSync(excelFilePath)) {
      try {
        const fileBuffer = await readFileAsync(excelFilePath);
        workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert existing data to JSON
        existingData = XLSX.utils.sheet_to_json(worksheet) as ContactData[];
      } catch (error) {
        console.error('Error reading existing Excel file:', error);
        // Create new workbook if there's an error reading existing file
        workbook = XLSX.utils.book_new();
      }
    } else {
      // Create new workbook if file doesn't exist
      workbook = XLSX.utils.book_new();
    }

    // Add new contact data
    const updatedData = [...existingData, contactData];

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(updatedData);

    // Set column widths for better readability
    const columnWidths = [
      { wch: 20 }, // Name
      { wch: 25 }, // Company
      { wch: 50 }, // Message
      { wch: 25 }  // Timestamp
    ];
    worksheet['!cols'] = columnWidths;

    // Add or replace the first sheet
    if (workbook.SheetNames.includes('Contacts')) {
      workbook.SheetNames[0] = 'Contacts';
      workbook.Sheets['Contacts'] = worksheet;
    } else {
      workbook.SheetNames[0] = 'Contacts';
      workbook.Sheets['Contacts'] = worksheet;
    }

    // Write the workbook to file
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    await writeFileAsync(excelFilePath, excelBuffer);

    console.log(`Contact form submitted: ${contactData.name} from ${contactData.company}`);
    console.log(`Data saved to: ${excelFilePath}`);

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        data: contactData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
