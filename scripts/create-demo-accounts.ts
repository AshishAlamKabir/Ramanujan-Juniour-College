import bcrypt from 'bcryptjs';
import { storage } from '../server/storage';

async function createDemoAccounts() {
  console.log('Creating demo accounts...');

  const demoPassword = "demo123";
  const hashedPassword = await bcrypt.hash(demoPassword, 10);

  // Demo Student Account
  const demoStudent = await storage.createUser({
    fullName: "Demo Student",
    phoneNumber: "1111111111",
    email: "demo.student@rjc.edu",
    password: hashedPassword,
    role: "student",
  });

  // Approve the student immediately
  await storage.updateUserApprovalStatus(demoStudent.id, "approved");
  console.log(`✓ Created Demo Student: Phone: 1111111111, Student ID: ${demoStudent.studentId}`);

  // Demo Teacher Account
  const demoTeacher = await storage.createUser({
    fullName: "Demo Teacher",
    phoneNumber: "2222222222",
    email: "demo.teacher@rjc.edu",
    password: hashedPassword,
    role: "teacher",
  });

  // Approve the teacher immediately
  await storage.updateUserApprovalStatus(demoTeacher.id, "approved");
  console.log(`✓ Created Demo Teacher: Phone: 2222222222`);

  // Demo Management Account (auto-approved)
  const demoManagement = await storage.createUser({
    fullName: "Demo Management",
    phoneNumber: "3333333333",
    email: "demo.management@rjc.edu",
    password: hashedPassword,
    role: "management",
  });
  console.log(`✓ Created Demo Management: Phone: 3333333333`);

  console.log('\n=== Demo Accounts Created Successfully ===');
  console.log('\nAll accounts use password: demo123\n');
  console.log('Student Login:');
  console.log(`  Phone/ID: 1111111111 or ${demoStudent.studentId}`);
  console.log('  Role: Student');
  console.log('  Password: demo123');
  console.log('\nTeacher Login:');
  console.log('  Phone: 2222222222');
  console.log('  Role: Teacher');
  console.log('  Password: demo123');
  console.log('\nManagement Login:');
  console.log('  Phone: 3333333333');
  console.log('  Role: Management');
  console.log('  Password: demo123');
  console.log('\n=========================================');
}

createDemoAccounts().catch(console.error);
