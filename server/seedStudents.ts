import { db } from "./db";
import { students } from "@shared/schema";
import type { InsertStudent } from "@shared/schema";

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya",
  "Atharv", "Advaith", "Pranav", "Dhruv", "Kabir", "Yash", "Samar", "Lakshya", "Kian", "Ved",
  "Ananya", "Diya", "Aanya", "Sara", "Pari", "Anvi", "Aadhya", "Myra", "Navya", "Kiara",
  "Saanvi", "Aaradhya", "Siya", "Riya", "Avni", "Ira", "Prisha", "Ishita", "Aditi", "Anushka",
  "Rohit", "Amit", "Nikhil", "Varun", "Karthik", "Rahul", "Priya", "Sneha", "Kavya", "Pooja",
  "Rajesh", "Suresh", "Ramesh", "Prakash", "Dinesh", "Meera", "Divya", "Swati", "Neha", "Shreya",
  "Akash", "Vishal", "Manish", "Deepak", "Gaurav", "Priyanka", "Anjali", "Rekha", "Sunita", "Geeta",
  "Mohit", "Rohan", "Ankur", "Sumit", "Abhishek", "Nikita", "Megha", "Shweta", "Ritu", "Seema",
  "Dev", "Om", "Jai", "Arnav", "Viraj", "Tanvi", "Sia", "Mishka", "Aarohi", "Shanaya",
  "Harsh", "Kunal", "Siddharth", "Ajay", "Vijay", "Roshni", "Simran", "Payal", "Nisha", "Preeti"
];

const lastNames = [
  "Sharma", "Verma", "Patel", "Kumar", "Singh", "Gupta", "Reddy", "Joshi", "Mehta", "Shah",
  "Agarwal", "Desai", "Kapoor", "Malhotra", "Nair", "Iyer", "Chopra", "Pandey", "Rao", "Das",
  "Bose", "Ghosh", "Chatterjee", "Sen", "Roy", "Mukherjee", "Banerjee", "Dutta", "Saha", "Ganguly",
  "Khan", "Ali", "Ahmed", "Hussain", "Rahman", "Ansari", "Siddiqui", "Qureshi", "Malik", "Shaikh",
  "Kulkarni", "Shinde", "Jadhav", "Pawar", "More", "Patil", "Kadam", "Gaikwad", "Sawant", "Bhosale",
  "Mishra", "Tiwari", "Dubey", "Srivastava", "Saxena", "Yadav", "Jain", "Soni", "Goyal", "Arora",
  "Bhatia", "Khanna", "Sethi", "Tandon", "Goel", "Bajaj", "Singhal", "Mittal", "Bansal", "Agarwal",
  "Krishnan", "Menon", "Pillai", "Varma", "Shetty", "Hegde", "Kamath", "Pai", "Rao", "Murthy",
  "Borah", "Saikia", "Choudhury", "Deka", "Hazarika", "Kalita", "Baruah", "Sarma", "Das", "Gogoi"
];

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad",
  "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
  "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut",
  "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Allahabad",
  "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur",
  "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli", "Mysore",
  "Tiruchirappalli", "Bareilly", "Aligarh", "Moradabad", "Jalandhar", "Bhubaneswar"
];

const states = [
  "Maharashtra", "Delhi", "Karnataka", "West Bengal", "Tamil Nadu", "Telangana", "Gujarat",
  "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Bihar", "Punjab", "Haryana",
  "Jammu and Kashmir", "Jharkhand", "Andhra Pradesh", "Kerala", "Odisha", "Assam"
];

const streams = ["Science", "Commerce", "Arts", "Computer Science"];
const sections = ["A", "B", "C"];
const currentYear = 2025;
const academicYears = 12; // Last 12 academic years
const studentsPerSection = 50;

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePhoneNumber(): string {
  const prefix = ["98", "99", "97", "96", "95", "94", "93", "92", "91", "90"];
  return `${getRandomItem(prefix)}${Math.floor(10000000 + Math.random() * 90000000)}`;
}

function generateEmail(name: string, id: string): string {
  const cleanName = name.toLowerCase().replace(/\s+/g, '');
  return `${cleanName}.${id}@ramanujan.edu.in`;
}

function generateStudentId(year: number, stream: string, section: string, rollNum: number): string {
  const streamCode = {
    "Science": "SCI",
    "Commerce": "COM",
    "Arts": "ART",
    "Computer Science": "CS"
  }[stream] || "GEN";
  
  return `${year}${streamCode}${section}${rollNum.toString().padStart(3, '0')}`;
}

function generateDateOfBirth(admissionYear: number): Date {
  const age = 15 + Math.floor(Math.random() * 3); // 15-17 years old at admission
  const birthYear = admissionYear - age;
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(birthYear, month, day);
}

function generateMarks(): string {
  const marks = 60 + Math.floor(Math.random() * 40); // 60-99
  return marks.toString();
}

function generatePercentage(): string {
  const percentage = 60 + Math.floor(Math.random() * 40); // 60-99
  return `${percentage}%`;
}

function getPhotoUrl(gender: string, seed: number): string {
  return `https://i.pravatar.cc/150?img=${seed}`;
}

async function seedStudents() {
  console.log("Starting student data seeding...");
  
  const allStudents: InsertStudent[] = [];
  let photoSeed = 1;
  
  for (let yearOffset = 0; yearOffset < academicYears; yearOffset++) {
    const admissionYear = currentYear - yearOffset;
    const isCurrentStudent = yearOffset < 2;
    const yearInCollege = isCurrentStudent ? (yearOffset === 0 ? 2 : 1) : 2;
    const hasGraduated = !isCurrentStudent;
    const graduationYear = hasGraduated ? admissionYear + 2 : null;
    
    console.log(`Generating students for admission year ${admissionYear}...`);
    
    for (const stream of streams) {
      for (const section of sections) {
        for (let rollNum = 1; rollNum <= studentsPerSection; rollNum++) {
          const gender = Math.random() > 0.5 ? "Male" : "Female";
          const firstName = getRandomItem(firstNames);
          const lastName = getRandomItem(lastNames);
          const fullName = `${firstName} ${lastName}`;
          const studentId = generateStudentId(admissionYear, stream, section, rollNum);
          const rollNumber = `${admissionYear}-${stream.substring(0, 3).toUpperCase()}-${section}-${rollNum.toString().padStart(3, '0')}`;
          
          const student: InsertStudent = {
            name: fullName,
            rollNumber: rollNumber,
            studentId: studentId,
            photoUrl: getPhotoUrl(gender, photoSeed),
            gender: gender,
            dateOfBirth: generateDateOfBirth(admissionYear),
            admissionYear: admissionYear,
            stream: stream,
            section: section,
            year: yearInCollege || 2,
            contactNumber: generatePhoneNumber(),
            email: generateEmail(fullName, studentId),
            address: `${getRandomItem(cities)}, ${getRandomItem(states)}`,
            marks: generateMarks(),
            percentage: hasGraduated ? generatePercentage() : null,
            graduationYear: graduationYear,
            isActive: true
          };
          
          allStudents.push(student);
          photoSeed = (photoSeed % 70) + 1; // Pravatar has 70 default images
        }
      }
    }
  }
  
  console.log(`Generated ${allStudents.length} students. Inserting into database in batches...`);
  
  const batchSize = 500;
  for (let i = 0; i < allStudents.length; i += batchSize) {
    const batch = allStudents.slice(i, i + batchSize);
    await db.insert(students).values(batch).onConflictDoNothing();
    console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allStudents.length / batchSize)}`);
  }
  
  console.log(`Successfully seeded ${allStudents.length} students!`);
  
  const stats = await db.select().from(students);
  console.log(`Total students in database: ${stats.length}`);
}

seedStudents()
  .then(() => {
    console.log("Seeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
