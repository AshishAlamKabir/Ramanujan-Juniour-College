import { type User, type InsertUser, type Notice, type InsertNotice, type Event, type InsertEvent, type News, type InsertNews, type Department, type InsertDepartment, type Course, type InsertCourse, type Faculty, type InsertFaculty, type Facility, type InsertFacility, type GalleryImage, type InsertGalleryImage, type Student, type InsertStudent, type TeacherRating, type InsertTeacherRating, type RatingLink, type InsertRatingLink, type StudentDue, type InsertStudentDue, type Payment, type InsertPayment } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import * as schema from "@shared/schema";
import bcrypt from "bcryptjs";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string | null | undefined): Promise<User | undefined>;
  getUserByEmail(email: string | null | undefined): Promise<User | undefined>;
  getUserByPhone(phone: string | null | undefined): Promise<User | undefined>;
  getUserByStudentId(studentId: string): Promise<User | undefined>;
  createUser(user: Partial<InsertUser>): Promise<User>;
  updateUserApprovalStatus(id: string, status: string): Promise<User | undefined>;
  getPendingUsers(): Promise<User[]>;
  getUsersByRole(role: string): Promise<User[]>;
  getApprovedStudents(): Promise<User[]>;
  getStudentByStudentId(studentId: string): Promise<Student | undefined>;
  
  // Notice methods
  getNotices(): Promise<Notice[]>;
  getNotice(id: string): Promise<Notice | undefined>;
  createNotice(notice: InsertNotice): Promise<Notice>;
  
  // Event methods
  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // News methods
  getNews(): Promise<News[]>;
  getNewsItem(id: string): Promise<News | undefined>;
  getFeaturedNews(): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  
  // Department methods
  getDepartments(): Promise<Department[]>;
  getDepartment(id: string): Promise<Department | undefined>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  getCoursesByDepartment(departmentId: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Faculty methods
  getFaculty(): Promise<Faculty[]>;
  getFacultyMember(id: string): Promise<Faculty | undefined>;
  getFacultyByDepartment(departmentId: string): Promise<Faculty[]>;
  createFaculty(faculty: InsertFaculty): Promise<Faculty>;
  
  // Facility methods
  getFacilities(): Promise<Facility[]>;
  getFacility(id: string): Promise<Facility | undefined>;
  getFacilitiesByCategory(category: string): Promise<Facility[]>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  
  // Gallery Image methods
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: string): Promise<boolean>;
  
  // Student methods
  getStudents(filters?: { stream?: string; section?: string; year?: number; graduationYear?: number; status?: string }): Promise<Student[]>;
  getStudent(id: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  
  // Teacher Rating methods
  createRating(rating: InsertTeacherRating): Promise<TeacherRating>;
  getRatingsByFaculty(facultyId: string): Promise<TeacherRating[]>;
  updateFacultyRanking(): Promise<void>;
  
  // Rating Link methods
  createRatingLink(link: InsertRatingLink): Promise<RatingLink>;
  getRatingLink(token: string): Promise<RatingLink | undefined>;
  getRatingLinksByFaculty(facultyId: string): Promise<RatingLink[]>;
  
  // Student Due methods
  getStudentDues(studentId: string): Promise<StudentDue[]>;
  createStudentDue(due: InsertStudentDue): Promise<StudentDue>;
  updateDueStatus(id: string, status: string): Promise<StudentDue | undefined>;
  
  // Payment methods
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentsByStudent(studentId: string): Promise<Payment[]>;
  getPendingPayments(): Promise<Payment[]>;
  verifyPayment(id: string, verifiedBy: string): Promise<Payment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private notices: Map<string, Notice>;
  private events: Map<string, Event>;
  private news: Map<string, News>;
  private departments: Map<string, Department>;
  private courses: Map<string, Course>;
  private faculty: Map<string, Faculty>;
  private facilities: Map<string, Facility>;
  private galleryImages: Map<string, GalleryImage>;
  private students: Map<string, Student>;
  private teacherRatings: Map<string, TeacherRating>;
  private ratingLinks: Map<string, RatingLink>;
  private studentDues: Map<string, StudentDue>;
  private payments: Map<string, Payment>;

  constructor() {
    this.users = new Map();
    this.notices = new Map();
    this.events = new Map();
    this.news = new Map();
    this.departments = new Map();
    this.courses = new Map();
    this.faculty = new Map();
    this.facilities = new Map();
    this.galleryImages = new Map();
    this.students = new Map();
    this.teacherRatings = new Map();
    this.ratingLinks = new Map();
    this.studentDues = new Map();
    this.payments = new Map();
    
    // Initialize with some basic data structure
    this.initializeData();
  }

  private initializeData() {
    // Initialize faculty data
    const facultyData = [
      // Finance
      { name: "Mr. Lakhyajit Baruah", designation: "Teacher", qualification: "MBA", phone: "7002081338", specialization: "Finance", experience: null },
      
      // Accountancy / Business Studies
      { name: "Mr. Satyabrata Chowdhury", designation: "Teacher", qualification: "M.Com", phone: "9864309793", specialization: "Accountancy / Business Studies", experience: null },
      
      // Psychology
      { name: "Miss Gayatri Bora", designation: "Teacher", qualification: "M.A", phone: "9707203268", specialization: "Psychology", experience: null },
      
      // Anthropology
      { name: "Mrs. Barnali Baishya", designation: "Teacher", qualification: "M.A", phone: "9678058469", specialization: "Anthropology", experience: 8 },
      
      // English
      { name: "Mrs. Dolly Das", designation: "Teacher", qualification: "M.A, B.Ed", phone: "8486521418", specialization: "English", experience: 11 },
      { name: "Dr. Karabi Bharali", designation: "Teacher", qualification: "M.A, B.Ed, Ph.D", phone: "9864458844", specialization: "English", experience: 22 },
      { name: "Mrs. Sumi Khound", designation: "Teacher", qualification: "M.A", phone: "9435367751", specialization: "English", experience: 22 },
      { name: "Mr. Nilutpal Sarma", designation: "Teacher", qualification: "M.A, B.Ed", phone: "9707911870", specialization: "English", experience: 9 },
      { name: "Miss Suman Phukan", designation: "Teacher", qualification: "M.A", phone: "7002618978", specialization: "English", experience: 4 },
      { name: "Mr. Kangkan Krishna Hazarika", designation: "Teacher", qualification: "M.A", phone: "7002238996", specialization: "English", experience: 7 },
      { name: "Mrs. Kankana Sarmah", designation: "Teacher", qualification: "M.A (NET/SLET Qualified)", phone: "7002338271", specialization: "English", experience: 5 },
      { name: "Miss Basabi Bora", designation: "Teacher", qualification: "M.A (NET)", phone: "8638957547", specialization: "English", experience: null },
      
      // Assamese
      { name: "Mrs. Sangeeta Boruah Bora", designation: "Vice-Principal", qualification: "M.A", phone: "9864240898", specialization: "Assamese", experience: 17 },
      { name: "Mr. Dipankar Sarma", designation: "Teacher", qualification: "M.A (NET Qualified)", phone: "7002735240", specialization: "Assamese", experience: 17 },
      { name: "Mrs. Momee Devi Sarmah", designation: "Teacher", qualification: "M.A", phone: "9707298662", specialization: "Assamese", experience: 21 },
      { name: "Mrs. Dipali Bora", designation: "Teacher", qualification: "M.A", phone: "8761839069", specialization: "Assamese", experience: 20 },
      { name: "Mr. Saurav Deka", designation: "Teacher", qualification: "M.A (NET Qualified)", phone: "9706333739", specialization: "Assamese", experience: 10 },
      
      // Bengali
      { name: "Miss Swapnali Guha", designation: "Teacher", qualification: "M.A", phone: "9957012537", specialization: "Bengali", experience: 14 },
      
      // Sanskrit
      { name: "Mr. Netra Jyoti Mahanta", designation: "Teacher", qualification: "M.A", phone: "7399229981", specialization: "Sanskrit", experience: 18 },
      
      // Hindi
      { name: "Miss Bharati Singh", designation: "Teacher", qualification: "M.A, D.El.Ed (NET Qualified)", phone: "7002896651", specialization: "Hindi", experience: 6 },
      { name: "Miss Maina Kumari Ram", designation: "Teacher", qualification: "M.A", phone: "6003792515", specialization: "Hindi", experience: 4 },
      { name: "Mrs. Mira Rai", designation: "Teacher", qualification: "M.A, D.El.Ed, DCA", phone: "8486345193", specialization: "Hindi", experience: 6 },
      
      // Physics
      { name: "Mr. Prasanta Sarma", designation: "Teacher", qualification: "B.E", phone: "9435361063", specialization: "Physics", experience: 20 },
      { name: "Mr. Chintu Moni Nath", designation: "Teacher", qualification: "B.Tech", phone: "8486920862", specialization: "Physics", experience: 10 },
      { name: "Mr. Bipul Duarah", designation: "Teacher", qualification: "M.Sc", phone: "8638284220", specialization: "Physics", experience: 8 },
      { name: "Mr. Ankit Saha", designation: "Teacher", qualification: "M.Sc", phone: "8638227166", specialization: "Physics", experience: null },
      { name: "Mr. Ujjal Kumar Borah", designation: "Teacher", qualification: "M.Sc", phone: "8638823431", specialization: "Physics", experience: null },
      { name: "Mr. Ishan Baruah", designation: "Lab Instructor", qualification: "B.Sc", phone: "8638550232", specialization: "Physics", experience: null },
      
      // Chemistry
      { name: "Mr. Dilip Kumar Borah", designation: "Principal", qualification: "M.Sc, B.Ed (NET Qualified)", phone: "9864750236", specialization: "Chemistry", experience: 27 },
      { name: "Mr. Parag Paran Saikia", designation: "Teacher", qualification: "M.Sc", phone: "8486753110", specialization: "Chemistry", experience: 9 },
      { name: "Mr. Tony Das", designation: "Teacher", qualification: "M.Sc (NET qualified)", phone: "7002875434", specialization: "Chemistry", experience: 6 },
      { name: "Mr. Jitendra Sarma", designation: "Teacher", qualification: "M.Sc", phone: "8472040046", specialization: "Chemistry", experience: 4 },
      { name: "Mr. Jhulan Bordoloi", designation: "Teacher", qualification: "M.Sc", phone: "8724895188", specialization: "Chemistry", experience: 9 },
      { name: "Mr. Deepjyoti Bora", designation: "Lab Instructor", qualification: "M.Sc", phone: "7578917673", specialization: "Chemistry", experience: null },
      { name: "Mr. Shashank Agarwal", designation: "Teacher", qualification: "M.Sc", phone: "8638079180", specialization: "Chemistry", experience: 2 },
      
      // Botany
      { name: "Mrs. Urmimala Borah", designation: "Teacher", qualification: "M.Sc (Microbiology), PGDCA", phone: "7638065580", specialization: "Botany", experience: 5 },
      { name: "Mrs. Rashmi Rekha Saikia", designation: "Teacher", qualification: "M.Sc, B.Ed", phone: "8638437094", specialization: "Botany", experience: 9 },
      { name: "Mr. Sheikh Mehe Abjan", designation: "Teacher", qualification: "M.Sc", phone: "8638158267", specialization: "Botany", experience: 5 },
      { name: "Mr. Tonmoy Jyoti Borah", designation: "Lab Instructor", qualification: "B.Sc, B.Ed", phone: "9101923237", specialization: "Botany", experience: null },
      
      // Zoology
      { name: "Miss Nargis Sultana", designation: "Teacher", qualification: "M.Sc", phone: "9864632157", specialization: "Zoology", experience: 2 },
      { name: "Miss Rajashree Devi", designation: "Teacher", qualification: "M.Sc", phone: "9101643045", specialization: "Zoology", experience: 2 },
      { name: "Mr. Neeraj Bora", designation: "Teacher", qualification: "M.Sc", phone: "8486932588", specialization: "Zoology", experience: 4 },
      { name: "Mr. Jagneswar Sarma", designation: "Teacher", qualification: "M.Sc, B.Ed", phone: "8638513395", specialization: "Zoology", experience: 4 },
      
      // Mathematics
      { name: "Mr. Ranjit Kr. Borah", designation: "Teacher", qualification: "M.Sc, B.Ed", phone: "9864243466", specialization: "Mathematics", experience: 14 },
      { name: "Mr. Debajit Das", designation: "Teacher", qualification: "M.Sc (Statistics), M.A (Economics)", phone: "9101500371", specialization: "Mathematics", experience: 20 },
      { name: "Mr. Parag Borah", designation: "Teacher", qualification: "M.Sc, B.Ed", phone: "8822140960", specialization: "Mathematics", experience: 7 },
      { name: "Mr. Koushtuve Moni Sarma", designation: "Teacher", qualification: "M.Sc, B.Ed", phone: "9101625639", specialization: "Mathematics", experience: 5 },
      { name: "Mr. Hiranya Hazarika", designation: "Teacher", qualification: "M.Sc, M.Ed, M.Phil", phone: "8638680082", specialization: "Mathematics", experience: 16 },
      { name: "Mr. Keshabananda Goswami", designation: "Teacher", qualification: "M.Sc", phone: "9101439918", specialization: "Mathematics", experience: null },
      
      // Statistics
      { name: "Mr. Debajit Das", designation: "Teacher", qualification: "M.Sc (Statistics), M.A (Economics)", phone: "9101500371", specialization: "Statistics", experience: 20 },
      
      // Computer Science
      { name: "Mr. Himan Jyoti Bairagi", designation: "Teacher", qualification: "MCA, D.El.Ed", phone: "9706608750", specialization: "Computer Science", experience: 6 },
      { name: "Mrs. Gitashri Bordoloi", designation: "Teacher", qualification: "B.Tech", phone: "8638591016", specialization: "Computer Science", experience: 2 },
      { name: "Mr. Jayanta Das", designation: "Teacher", qualification: "B.Tech", phone: "7002845523", specialization: "Computer Science", experience: null },
      
      // Economics
      { name: "Mrs. Tribedi Sarma", designation: "Teacher", qualification: "M.A, B.Ed", phone: "9435970590", specialization: "Economics", experience: 20 },
      { name: "Miss Bandana Das", designation: "Teacher", qualification: "M.A (NET qualified), PGDCA", phone: "9706505915", specialization: "Economics", experience: 4 },
      
      // Political Science
      { name: "Mrs. Gongotri Saikia", designation: "Teacher", qualification: "M.A", phone: "9706867655", specialization: "Political Science", experience: 9 },
      { name: "Mrs. Minakshi Bora", designation: "Teacher", qualification: "M.A, B.Ed", phone: "9000907079", specialization: "Political Science", experience: 8 },
      
      // Education
      { name: "Mr. Mukul Hazarika", designation: "Teacher", qualification: "M.A", phone: "9854100672", specialization: "Education", experience: 15 },
      { name: "Mr. Debashis Bora", designation: "Teacher", qualification: "M.A", phone: "9101687430", specialization: "Education", experience: 1 },
      
      // Logic & Philosophy
      { name: "Mrs. Rajashree Neog Gayan", designation: "Teacher", qualification: "M.A, B.Ed, PGDCA", phone: "7577014523", specialization: "Logic & Philosophy", experience: 14 },
      { name: "Mrs. Pronita Mahanta Sharma", designation: "Teacher", qualification: "M.A, B.Ed", phone: "7002299042", specialization: "Logic & Philosophy", experience: 15 },
      
      // Geography
      { name: "Mrs. Madhumita Sarmah", designation: "Teacher", qualification: "M.A", phone: "9101456121", specialization: "Geography", experience: 10 },
      { name: "Mr. Nabajyoti Nath", designation: "Teacher", qualification: "M.A (NET/SLET Qualified)", phone: "9706153818", specialization: "Geography", experience: 6 },
      
      // Sociology
      { name: "Mrs. Swapna Devi", designation: "Teacher", qualification: "M.A", phone: "8876902318", specialization: "Sociology", experience: 14 },
      { name: "Mrs. Tribeni Sarma", designation: "Teacher", qualification: "M.A", phone: "9435319860", specialization: "Sociology", experience: 16 },
      
      // History
      { name: "Mr. Adiptya Nayak", designation: "Teacher", qualification: "M.A", phone: "8638598398", specialization: "History", experience: null }
    ];

    // Add faculty to storage
    facultyData.forEach(data => {
      const id = randomUUID();
      const faculty: Faculty = {
        id,
        name: data.name,
        designation: data.designation,
        departmentId: null,
        qualification: data.qualification,
        experience: data.experience,
        specialization: data.specialization,
        email: null,
        phone: data.phone,
        subject: data.specialization,
        averageRating: "0",
        rankPosition: null,
        isActive: true
      };
      this.faculty.set(id, faculty);
    });

    // Initialize student data with current and passed out students
    const studentNames = [
      "Ashish Alam Kabir", "Priya Sharma", "Rahul Deka", "Sneha Bora",
      "Amit Singh", "Kavya Nath", "Rohan Das", "Anjali Saikia",
      "Vikram Joshi", "Neha Baruah", "Arjun Patel", "Riya Mahanta",
      "Sahil Kumar", "Pooja Bora", "Varun Sarma", "Divya Gogoi",
      "Karan Dutta", "Megha Hazarika", "Nikhil Roy", "Sanjana Das",
      "Aditya Sharma", "Priyanka Borah", "Harsh Gupta", "Tanvi Devi",
      "Roshan Nath", "Ishita Sarmah", "Vishal Kumar", "Kritika Bora",
      "Deepak Singh", "Shreya Baishya", "Akash Deka", "Nidhi Sarma",
      "Manish Bora", "Ritika Das", "Siddharth Nath", "Ananya Saikia",
      "Ayush Sharma", "Navya Gogoi", "Yash Dutta", "Sakshi Borah"
    ];

    const streams = ["SCIENCE", "COMMERCE", "ARTS"];
    const sections = ["A", "B", "C"];
    const years = [1, 2];
    const statuses = ["current", "passed"];

    let studentIndex = 0;
    
    // Create 50 current students
    for (let i = 0; i < 50; i++) {
      const year = years[Math.floor(Math.random() * years.length)];
      const stream = streams[Math.floor(Math.random() * streams.length)];
      const section = sections[Math.floor(Math.random() * sections.length)];
      const name = studentNames[studentIndex % studentNames.length];
      studentIndex++;
      
      const id = randomUUID();
      const student: Student = {
        id,
        name: name,
        rollNumber: `RJC${2024 + year}${String(i + 1).padStart(3, '0')}`,
        studentId: `STD${String(10000 + i + 1)}`,
        photoUrl: "https://via.placeholder.com/150",
        gender: Math.random() > 0.5 ? "Male" : "Female",
        dateOfBirth: new Date(2005 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        admissionYear: 2024,
        stream: stream,
        section: section,
        year: year,
        rank: (i % 10) + 1,
        contactNumber: `${7000000000 + Math.floor(Math.random() * 999999999)}`,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@student.rjc.edu`,
        address: `House No. ${Math.floor(Math.random() * 500)}, Jorhat, Assam`,
        marks: null,
        percentage: null,
        graduationYear: null,
        status: "current",
        isActive: true,
        createdAt: new Date()
      };
      this.students.set(id, student);
    }

    // Create 30 passed out students
    for (let i = 0; i < 30; i++) {
      const graduationYear = 2023 - Math.floor(Math.random() * 3);
      const stream = streams[Math.floor(Math.random() * streams.length)];
      const section = sections[Math.floor(Math.random() * sections.length)];
      const name = studentNames[studentIndex % studentNames.length];
      studentIndex++;
      
      const id = randomUUID();
      const student: Student = {
        id,
        name: name,
        rollNumber: `RJC${graduationYear}${String(i + 1).padStart(3, '0')}`,
        studentId: `STD${String(20000 + i + 1)}`,
        photoUrl: "https://via.placeholder.com/150",
        gender: Math.random() > 0.5 ? "Male" : "Female",
        dateOfBirth: new Date(2002 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        admissionYear: graduationYear - 2,
        stream: stream,
        section: section,
        year: 2,
        rank: (i % 10) + 1,
        contactNumber: `${7000000000 + Math.floor(Math.random() * 999999999)}`,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@alumni.rjc.edu`,
        address: `House No. ${Math.floor(Math.random() * 500)}, Jorhat, Assam`,
        marks: "85%",
        percentage: "85%",
        graduationYear: graduationYear,
        status: "passed",
        isActive: true,
        createdAt: new Date()
      };
      this.students.set(id, student);
    }

    // Initialize demo user accounts
    const demoPassword = bcrypt.hashSync("demo123", 10);
    
    // Demo Student
    const demoStudentId = randomUUID();
    const demoStudent: User = {
      id: demoStudentId,
      username: null,
      password: demoPassword,
      fullName: "Demo Student",
      email: "demo.student@rjc.edu",
      phoneNumber: "1111111111",
      role: "student",
      approvalStatus: "approved",
      facultyId: null,
      studentId: "RJC20251000",
      createdAt: new Date()
    };
    this.users.set(demoStudentId, demoStudent);

    // Demo Teacher
    const demoTeacherId = randomUUID();
    const demoTeacher: User = {
      id: demoTeacherId,
      username: null,
      password: demoPassword,
      fullName: "Demo Teacher",
      email: "demo.teacher@rjc.edu",
      phoneNumber: "2222222222",
      role: "teacher",
      approvalStatus: "approved",
      facultyId: null,
      studentId: null,
      createdAt: new Date()
    };
    this.users.set(demoTeacherId, demoTeacher);

    // Demo Management
    const demoManagementId = randomUUID();
    const demoManagement: User = {
      id: demoManagementId,
      username: null,
      password: demoPassword,
      fullName: "Demo Management",
      email: "demo.management@rjc.edu",
      phoneNumber: "3333333333",
      role: "management",
      approvalStatus: "approved",
      facultyId: null,
      studentId: null,
      createdAt: new Date()
    };
    this.users.set(demoManagementId, demoManagement);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string | null | undefined): Promise<User | undefined> {
    if (!username) return undefined;
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string | null | undefined): Promise<User | undefined> {
    if (!email) return undefined;
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByPhone(phone: string | null | undefined): Promise<User | undefined> {
    if (!phone) return undefined;
    return Array.from(this.users.values()).find(
      (user) => user.phoneNumber === phone,
    );
  }

  private studentIdCounter: number = 1000;

  private generateStudentId(year?: number, section?: string, rollNumber?: string): string {
    if (year && section && rollNumber) {
      const currentYear = new Date().getFullYear();
      return `RJC${currentYear}${year}${section}${rollNumber.padStart(3, '0')}`;
    }
    const currentYear = new Date().getFullYear();
    const id = `RJC${currentYear}${String(this.studentIdCounter).padStart(4, '0')}`;
    this.studentIdCounter++;
    return id;
  }

  async getStudentByStudentId(studentId: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(
      (student) => student.studentId === studentId
    );
  }

  async getUserByStudentId(studentId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.studentId === studentId,
    );
  }

  async createUser(insertUser: Partial<InsertUser>): Promise<User> {
    const id = randomUUID();
    let studentId: string | null = null;
    
    if (insertUser.role === "student") {
      studentId = this.generateStudentId();
    }
    
    const user: User = { 
      id,
      username: insertUser.username ?? null,
      password: insertUser.password || "",
      fullName: insertUser.fullName || "",
      email: insertUser.email ?? null,
      phoneNumber: insertUser.phoneNumber ?? null,
      role: insertUser.role || "student",
      approvalStatus: insertUser.role === "management" ? "approved" : "pending",
      facultyId: null,
      studentId,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserApprovalStatus(id: string, status: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = { ...user, approvalStatus: status };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getPendingUsers(): Promise<User[]> {
    return Array.from(this.users.values())
      .filter(user => user.approvalStatus === "pending")
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values())
      .filter(user => user.role === role);
  }

  async getApprovedStudents(): Promise<User[]> {
    return Array.from(this.users.values())
      .filter(user => user.role === "student" && user.approvalStatus === "approved")
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  // Notice methods
  async getNotices(): Promise<Notice[]> {
    return Array.from(this.notices.values())
      .filter(notice => notice.isActive)
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getNotice(id: string): Promise<Notice | undefined> {
    return this.notices.get(id);
  }

  async createNotice(insertNotice: InsertNotice): Promise<Notice> {
    const id = randomUUID();
    const notice: Notice = {
      ...insertNotice,
      id,
      publishedAt: new Date(),
      priority: insertNotice.priority || "normal",
      isActive: insertNotice.isActive !== undefined ? insertNotice.isActive : true
    };
    this.notices.set(id, notice);
    return notice;
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(event => event.isActive)
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = {
      ...insertEvent,
      id,
      isActive: insertEvent.isActive !== undefined ? insertEvent.isActive : true
    };
    this.events.set(id, event);
    return event;
  }

  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values())
      .filter(newsItem => newsItem.isActive)
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getNewsItem(id: string): Promise<News | undefined> {
    return this.news.get(id);
  }

  async getFeaturedNews(): Promise<News[]> {
    return Array.from(this.news.values())
      .filter(newsItem => newsItem.isActive && newsItem.featured)
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = randomUUID();
    const newsItem: News = {
      ...insertNews,
      id,
      publishedAt: new Date(),
      featured: insertNews.featured || false,
      imageUrl: insertNews.imageUrl || null,
      isActive: insertNews.isActive !== undefined ? insertNews.isActive : true
    };
    this.news.set(id, newsItem);
    return newsItem;
  }

  // Department methods
  async getDepartments(): Promise<Department[]> {
    return Array.from(this.departments.values())
      .filter(dept => dept.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getDepartment(id: string): Promise<Department | undefined> {
    return this.departments.get(id);
  }

  async createDepartment(insertDepartment: InsertDepartment): Promise<Department> {
    const id = randomUUID();
    const department: Department = {
      ...insertDepartment,
      id,
      established: insertDepartment.established || null,
      headOfDepartment: insertDepartment.headOfDepartment || null,
      facultyCount: insertDepartment.facultyCount || 0,
      programs: insertDepartment.programs || [],
      facilities: insertDepartment.facilities || [],
      isActive: insertDepartment.isActive !== undefined ? insertDepartment.isActive : true
    };
    this.departments.set(id, department);
    return department;
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCoursesByDepartment(departmentId: string): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.departmentId === departmentId && course.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = {
      ...insertCourse,
      id,
      departmentId: insertCourse.departmentId || null,
      seats: insertCourse.seats || null,
      fees: insertCourse.fees || null,
      syllabus: insertCourse.syllabus || null,
      isActive: insertCourse.isActive !== undefined ? insertCourse.isActive : true
    };
    this.courses.set(id, course);
    return course;
  }

  // Faculty methods
  async getFaculty(): Promise<Faculty[]> {
    return Array.from(this.faculty.values())
      .filter(member => member.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getFacultyMember(id: string): Promise<Faculty | undefined> {
    return this.faculty.get(id);
  }

  async getFacultyByDepartment(departmentId: string): Promise<Faculty[]> {
    return Array.from(this.faculty.values())
      .filter(member => member.departmentId === departmentId && member.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async createFaculty(insertFaculty: InsertFaculty): Promise<Faculty> {
    const id = randomUUID();
    const facultyMember: Faculty = {
      ...insertFaculty,
      id,
      departmentId: insertFaculty.departmentId || null,
      experience: insertFaculty.experience || null,
      specialization: insertFaculty.specialization || null,
      email: insertFaculty.email || null,
      phone: insertFaculty.phone || null,
      subject: insertFaculty.subject || null,
      averageRating: insertFaculty.averageRating || "0",
      rankPosition: insertFaculty.rankPosition || null,
      isActive: insertFaculty.isActive !== undefined ? insertFaculty.isActive : true
    };
    this.faculty.set(id, facultyMember);
    return facultyMember;
  }

  // Facility methods
  async getFacilities(): Promise<Facility[]> {
    return Array.from(this.facilities.values())
      .filter(facility => facility.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getFacility(id: string): Promise<Facility | undefined> {
    return this.facilities.get(id);
  }

  async getFacilitiesByCategory(category: string): Promise<Facility[]> {
    return Array.from(this.facilities.values())
      .filter(facility => facility.category === category && facility.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async createFacility(insertFacility: InsertFacility): Promise<Facility> {
    const id = randomUUID();
    const facility: Facility = {
      ...insertFacility,
      id,
      capacity: insertFacility.capacity || null,
      features: insertFacility.features || [],
      imageUrl: insertFacility.imageUrl || null,
      isActive: insertFacility.isActive !== undefined ? insertFacility.isActive : true
    };
    this.facilities.set(id, facility);
    return facility;
  }

  // Gallery Image methods
  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values())
      .filter(image => image.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const image: GalleryImage = {
      ...insertImage,
      id,
      caption: insertImage.caption || null,
      order: insertImage.order || 0,
      isActive: insertImage.isActive !== undefined ? insertImage.isActive : true,
      createdAt: new Date()
    };
    this.galleryImages.set(id, image);
    return image;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  // Student methods
  async getStudents(filters?: { stream?: string; section?: string; year?: number; graduationYear?: number; status?: string }): Promise<Student[]> {
    let students = Array.from(this.students.values()).filter(student => student.isActive);
    
    if (filters?.stream) {
      students = students.filter(s => s.stream === filters.stream);
    }
    if (filters?.section) {
      students = students.filter(s => s.section === filters.section);
    }
    if (filters?.year !== undefined) {
      students = students.filter(s => s.year === filters.year);
    }
    if (filters?.graduationYear !== undefined) {
      students = students.filter(s => s.graduationYear === filters.graduationYear);
    }
    if (filters?.status) {
      students = students.filter(s => s.status === filters.status);
    }
    
    return students.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  }

  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = {
      ...insertStudent,
      id,
      photoUrl: insertStudent.photoUrl || null,
      rank: insertStudent.rank || null,
      marks: insertStudent.marks || null,
      percentage: insertStudent.percentage || null,
      graduationYear: insertStudent.graduationYear || null,
      status: insertStudent.status || "current",
      isActive: insertStudent.isActive !== undefined ? insertStudent.isActive : true,
      createdAt: new Date()
    };
    this.students.set(id, student);
    return student;
  }

  // Teacher Rating methods
  async createRating(insertRating: InsertTeacherRating): Promise<TeacherRating> {
    const id = randomUUID();
    const rating: TeacherRating = {
      ...insertRating,
      id,
      studentId: insertRating.studentId || null,
      comment: insertRating.comment || null,
      ratingLinkId: insertRating.ratingLinkId || null,
      submittedAt: new Date()
    };
    this.teacherRatings.set(id, rating);
    
    await this.updateFacultyRanking();
    return rating;
  }

  async getRatingsByFaculty(facultyId: string): Promise<TeacherRating[]> {
    return Array.from(this.teacherRatings.values())
      .filter(rating => rating.facultyId === facultyId)
      .sort((a, b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0));
  }

  async updateFacultyRanking(): Promise<void> {
    const facultyMembers = Array.from(this.faculty.values());
    
    for (const member of facultyMembers) {
      const ratings = await this.getRatingsByFaculty(member.id);
      if (ratings.length > 0) {
        const sum = ratings.reduce((acc, r) => acc + r.ratingValue, 0);
        const avg = (sum / ratings.length).toFixed(2);
        member.averageRating = avg;
      }
    }
    
    const sortedFaculty = facultyMembers
      .filter(f => f.averageRating && parseFloat(f.averageRating) > 0)
      .sort((a, b) => parseFloat(b.averageRating || "0") - parseFloat(a.averageRating || "0"));
    
    sortedFaculty.forEach((member, index) => {
      member.rankPosition = index + 1;
      this.faculty.set(member.id, member);
    });
  }

  // Rating Link methods
  async createRatingLink(insertLink: InsertRatingLink): Promise<RatingLink> {
    const id = randomUUID();
    const link: RatingLink = {
      ...insertLink,
      id,
      isActive: insertLink.isActive !== undefined ? insertLink.isActive : true,
      expiresAt: insertLink.expiresAt || null,
      createdAt: new Date()
    };
    this.ratingLinks.set(id, link);
    return link;
  }

  async getRatingLink(token: string): Promise<RatingLink | undefined> {
    return Array.from(this.ratingLinks.values()).find(link => link.linkToken === token);
  }

  async getRatingLinksByFaculty(facultyId: string): Promise<RatingLink[]> {
    return Array.from(this.ratingLinks.values())
      .filter(link => link.facultyId === facultyId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  // Student Due methods
  async getStudentDues(studentId: string): Promise<StudentDue[]> {
    return Array.from(this.studentDues.values())
      .filter(due => due.studentId === studentId)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  async createStudentDue(insertDue: InsertStudentDue): Promise<StudentDue> {
    const id = randomUUID();
    const due: StudentDue = {
      ...insertDue,
      id,
      status: insertDue.status || "pending",
      description: insertDue.description || null,
      createdAt: new Date()
    };
    this.studentDues.set(id, due);
    return due;
  }

  async updateDueStatus(id: string, status: string): Promise<StudentDue | undefined> {
    const due = this.studentDues.get(id);
    if (!due) return undefined;
    
    const updatedDue: StudentDue = { ...due, status };
    this.studentDues.set(id, updatedDue);
    return updatedDue;
  }

  // Payment methods
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = {
      ...insertPayment,
      id,
      status: insertPayment.status || "pending",
      screenshotUrl: insertPayment.screenshotUrl || null,
      paymentMethod: insertPayment.paymentMethod || "UPI",
      verifiedBy: insertPayment.verifiedBy || null,
      verifiedAt: insertPayment.verifiedAt || null,
      paidAt: new Date(),
      createdAt: new Date()
    };
    this.payments.set(id, payment);
    return payment;
  }

  async getPaymentsByStudent(studentId: string): Promise<Payment[]> {
    return Array.from(this.payments.values())
      .filter(payment => payment.studentId === studentId)
      .sort((a, b) => (b.paidAt?.getTime() || 0) - (a.paidAt?.getTime() || 0));
  }

  async getPendingPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values())
      .filter(payment => payment.status === "pending")
      .sort((a, b) => (b.paidAt?.getTime() || 0) - (a.paidAt?.getTime() || 0));
  }

  async verifyPayment(id: string, verifiedBy: string): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (!payment) return undefined;
    
    const updatedPayment: Payment = {
      ...payment,
      status: "verified",
      verifiedBy,
      verifiedAt: new Date()
    };
    this.payments.set(id, updatedPayment);
    
    await this.updateDueStatus(payment.dueId, "paid");
    
    return updatedPayment;
  }
}

export class PostgresStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string | null | undefined): Promise<User | undefined> {
    if (!username) return undefined;
    const result = await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string | null | undefined): Promise<User | undefined> {
    if (!email) return undefined;
    const result = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
    return result[0];
  }

  async getUserByPhone(phone: string | null | undefined): Promise<User | undefined> {
    if (!phone) return undefined;
    const result = await db.select().from(schema.users).where(eq(schema.users.phoneNumber, phone)).limit(1);
    return result[0];
  }

  async getUserByStudentId(studentId: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.studentId, studentId)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(schema.users).values(user).returning();
    return result[0];
  }

  async updateUserApprovalStatus(id: string, status: string): Promise<User | undefined> {
    const result = await db.update(schema.users).set({ approvalStatus: status }).where(eq(schema.users.id, id)).returning();
    return result[0];
  }

  async getPendingUsers(): Promise<User[]> {
    return await db.select().from(schema.users).where(eq(schema.users.approvalStatus, "pending"));
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return await db.select().from(schema.users).where(eq(schema.users.role, role));
  }

  async getApprovedStudents(): Promise<User[]> {
    return await db.select().from(schema.users)
      .where(and(eq(schema.users.role, "student"), eq(schema.users.approvalStatus, "approved")));
  }

  async getStudentByStudentId(studentId: string): Promise<Student | undefined> {
    const result = await db.select().from(schema.students).where(eq(schema.students.studentId, studentId)).limit(1);
    return result[0];
  }

  // Notice methods
  async getNotices(): Promise<Notice[]> {
    return await db.select().from(schema.notices).where(eq(schema.notices.isActive, true));
  }

  async getNotice(id: string): Promise<Notice | undefined> {
    const result = await db.select().from(schema.notices).where(eq(schema.notices.id, id)).limit(1);
    return result[0];
  }

  async createNotice(notice: InsertNotice): Promise<Notice> {
    const result = await db.insert(schema.notices).values(notice).returning();
    return result[0];
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return await db.select().from(schema.events).where(eq(schema.events.isActive, true));
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const result = await db.select().from(schema.events).where(eq(schema.events.id, id)).limit(1);
    return result[0];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const result = await db.insert(schema.events).values(event).returning();
    return result[0];
  }

  // News methods
  async getNews(): Promise<News[]> {
    return await db.select().from(schema.news).where(eq(schema.news.isActive, true));
  }

  async getNewsItem(id: string): Promise<News | undefined> {
    const result = await db.select().from(schema.news).where(eq(schema.news.id, id)).limit(1);
    return result[0];
  }

  async getFeaturedNews(): Promise<News[]> {
    return await db.select().from(schema.news).where(and(eq(schema.news.isActive, true), eq(schema.news.featured, true)));
  }

  async createNews(news: InsertNews): Promise<News> {
    const result = await db.insert(schema.news).values(news).returning();
    return result[0];
  }

  // Department methods
  async getDepartments(): Promise<Department[]> {
    return await db.select().from(schema.departments).where(eq(schema.departments.isActive, true));
  }

  async getDepartment(id: string): Promise<Department | undefined> {
    const result = await db.select().from(schema.departments).where(eq(schema.departments.id, id)).limit(1);
    return result[0];
  }

  async createDepartment(department: InsertDepartment): Promise<Department> {
    const result = await db.insert(schema.departments).values(department).returning();
    return result[0];
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return await db.select().from(schema.courses).where(eq(schema.courses.isActive, true));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const result = await db.select().from(schema.courses).where(eq(schema.courses.id, id)).limit(1);
    return result[0];
  }

  async getCoursesByDepartment(departmentId: string): Promise<Course[]> {
    return await db.select().from(schema.courses).where(and(eq(schema.courses.departmentId, departmentId), eq(schema.courses.isActive, true)));
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const result = await db.insert(schema.courses).values(course).returning();
    return result[0];
  }

  // Faculty methods
  async getFaculty(): Promise<Faculty[]> {
    return await db.select().from(schema.faculty).where(eq(schema.faculty.isActive, true));
  }

  async getFacultyMember(id: string): Promise<Faculty | undefined> {
    const result = await db.select().from(schema.faculty).where(eq(schema.faculty.id, id)).limit(1);
    return result[0];
  }

  async getFacultyByDepartment(departmentId: string): Promise<Faculty[]> {
    return await db.select().from(schema.faculty).where(and(eq(schema.faculty.departmentId, departmentId), eq(schema.faculty.isActive, true)));
  }

  async createFaculty(faculty: InsertFaculty): Promise<Faculty> {
    const result = await db.insert(schema.faculty).values(faculty).returning();
    return result[0];
  }

  // Facility methods
  async getFacilities(): Promise<Facility[]> {
    return await db.select().from(schema.facilities).where(eq(schema.facilities.isActive, true));
  }

  async getFacility(id: string): Promise<Facility | undefined> {
    const result = await db.select().from(schema.facilities).where(eq(schema.facilities.id, id)).limit(1);
    return result[0];
  }

  async getFacilitiesByCategory(category: string): Promise<Facility[]> {
    return await db.select().from(schema.facilities).where(and(eq(schema.facilities.category, category), eq(schema.facilities.isActive, true)));
  }

  async createFacility(facility: InsertFacility): Promise<Facility> {
    const result = await db.insert(schema.facilities).values(facility).returning();
    return result[0];
  }

  // Gallery Image methods
  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(schema.galleryImages).where(eq(schema.galleryImages.isActive, true));
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    const result = await db.select().from(schema.galleryImages).where(eq(schema.galleryImages.id, id)).limit(1);
    return result[0];
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const result = await db.insert(schema.galleryImages).values(image).returning();
    return result[0];
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    await db.delete(schema.galleryImages).where(eq(schema.galleryImages.id, id));
    return true;
  }

  // Student methods
  async getStudents(filters?: { stream?: string; section?: string; year?: number; graduationYear?: number }): Promise<Student[]> {
    const conditions = [eq(schema.students.isActive, true)];
    
    if (filters?.stream) {
      conditions.push(eq(schema.students.stream, filters.stream));
    }
    if (filters?.section) {
      conditions.push(eq(schema.students.section, filters.section));
    }
    if (filters?.year !== undefined) {
      conditions.push(eq(schema.students.year, filters.year));
    }
    if (filters?.graduationYear !== undefined) {
      conditions.push(eq(schema.students.graduationYear, filters.graduationYear));
    }
    
    return await db.select().from(schema.students).where(and(...conditions));
  }

  async getStudent(id: string): Promise<Student | undefined> {
    const result = await db.select().from(schema.students).where(eq(schema.students.id, id)).limit(1);
    return result[0];
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const result = await db.insert(schema.students).values(student).returning();
    return result[0];
  }

  // Teacher Rating methods
  async createRating(rating: InsertTeacherRating): Promise<TeacherRating> {
    const result = await db.insert(schema.teacherRatings).values(rating).returning();
    await this.updateFacultyRanking();
    return result[0];
  }

  async getRatingsByFaculty(facultyId: string): Promise<TeacherRating[]> {
    return await db.select().from(schema.teacherRatings)
      .where(eq(schema.teacherRatings.facultyId, facultyId))
      .orderBy(schema.teacherRatings.submittedAt);
  }

  async updateFacultyRanking(): Promise<void> {
    const facultyMembers = await db.select().from(schema.faculty);
    
    for (const member of facultyMembers) {
      const ratings = await this.getRatingsByFaculty(member.id);
      if (ratings.length > 0) {
        const sum = ratings.reduce((acc, r) => acc + r.ratingValue, 0);
        const avg = (sum / ratings.length).toFixed(2);
        await db.update(schema.faculty)
          .set({ averageRating: avg })
          .where(eq(schema.faculty.id, member.id));
      }
    }
    
    const updatedFaculty = await db.select().from(schema.faculty);
    const sortedFaculty = updatedFaculty
      .filter(f => f.averageRating && parseFloat(f.averageRating) > 0)
      .sort((a, b) => parseFloat(b.averageRating || "0") - parseFloat(a.averageRating || "0"));
    
    for (let i = 0; i < sortedFaculty.length; i++) {
      await db.update(schema.faculty)
        .set({ rankPosition: i + 1 })
        .where(eq(schema.faculty.id, sortedFaculty[i].id));
    }
  }

  // Rating Link methods
  async createRatingLink(link: InsertRatingLink): Promise<RatingLink> {
    const result = await db.insert(schema.ratingLinks).values(link).returning();
    return result[0];
  }

  async getRatingLink(token: string): Promise<RatingLink | undefined> {
    const result = await db.select().from(schema.ratingLinks)
      .where(eq(schema.ratingLinks.linkToken, token))
      .limit(1);
    return result[0];
  }

  async getRatingLinksByFaculty(facultyId: string): Promise<RatingLink[]> {
    return await db.select().from(schema.ratingLinks)
      .where(eq(schema.ratingLinks.facultyId, facultyId))
      .orderBy(schema.ratingLinks.createdAt);
  }

  // Student Due methods
  async getStudentDues(studentId: string): Promise<StudentDue[]> {
    return await db.select().from(schema.studentDues)
      .where(eq(schema.studentDues.studentId, studentId))
      .orderBy(schema.studentDues.dueDate);
  }

  async createStudentDue(due: InsertStudentDue): Promise<StudentDue> {
    const result = await db.insert(schema.studentDues).values(due).returning();
    return result[0];
  }

  async updateDueStatus(id: string, status: string): Promise<StudentDue | undefined> {
    const result = await db.update(schema.studentDues)
      .set({ status })
      .where(eq(schema.studentDues.id, id))
      .returning();
    return result[0];
  }

  // Payment methods
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(schema.payments).values(payment).returning();
    return result[0];
  }

  async getPaymentsByStudent(studentId: string): Promise<Payment[]> {
    return await db.select().from(schema.payments)
      .where(eq(schema.payments.studentId, studentId))
      .orderBy(schema.payments.paidAt);
  }

  async getPendingPayments(): Promise<Payment[]> {
    return await db.select().from(schema.payments)
      .where(eq(schema.payments.status, "pending"))
      .orderBy(schema.payments.paidAt);
  }

  async verifyPayment(id: string, verifiedBy: string): Promise<Payment | undefined> {
    const result = await db.update(schema.payments)
      .set({ 
        status: "verified",
        verifiedBy,
        verifiedAt: new Date()
      })
      .where(eq(schema.payments.id, id))
      .returning();
    
    if (result[0]) {
      await this.updateDueStatus(result[0].dueId, "paid");
    }
    
    return result[0];
  }
}

export const storage = new MemStorage();
