import { db } from "../server/db";
import { users } from "../shared/schema";
import * as fs from 'fs';
import * as path from 'path';
import bcrypt from 'bcryptjs';

async function importStaff() {
  try {
    const csvPath = path.join(process.cwd(), 'attached_assets', 'RJC_staff_directory_1760025214523.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    
    // Skip header
    const dataLines = lines.slice(1);
    
    const staffToImport = [];
    
    for (const line of dataLines) {
      // Parse CSV line (handle commas in quotes)
      const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
      const cleanValues = values.map(v => v.replace(/^"(.*)"$/, '$1').trim());
      
      const [department, name, qualifications, experienceYears, role, phone] = cleanValues;
      
      // Skip if no name
      if (!name) continue;
      
      // Determine actual role
      let userRole = 'teacher';
      if (role?.toLowerCase().includes('principal')) {
        userRole = 'principal';
      } else if (department === 'NON-TEACHING STAFF') {
        userRole = 'management';
      }
      
      // Generate username from name (lowercase, remove spaces and special chars)
      const username = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 30);
      
      // For Principal Dilip Kumar Borah, use specified email
      let email = null;
      let password = 'teacher@123'; // default password
      
      if (name.includes('Dilip Kumar Borah')) {
        email = 'DilipKumarBorah@gmail.com';
        password = 'Education@13';
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      staffToImport.push({
        username,
        password: hashedPassword,
        fullName: name,
        email,
        phoneNumber: phone || null,
        role: userRole,
        approvalStatus: 'approved', // Auto-approve all staff
        facultyId: null, // Will be linked later through faculty table
        studentId: null,
      });
    }
    
    // Insert all staff
    console.log(`Importing ${staffToImport.length} staff members...`);
    
    for (const staff of staffToImport) {
      try {
        await db.insert(users).values(staff);
        console.log(`✓ Imported: ${staff.fullName} (${staff.role})`);
      } catch (error: any) {
        if (error.code === '23505') { // Duplicate key error
          console.log(`⚠ Skipped (already exists): ${staff.fullName}`);
        } else {
          console.error(`✗ Error importing ${staff.fullName}:`, error.message);
        }
      }
    }
    
    console.log('\n✓ Staff import completed!');
    console.log('\nPrincipal login credentials:');
    console.log('Email: DilipKumarBorah@gmail.com');
    console.log('Password: Education@13');
    
  } catch (error) {
    console.error('Error importing staff:', error);
  } finally {
    process.exit(0);
  }
}

importStaff();
