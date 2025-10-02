import { type User, type InsertUser, type Notice, type InsertNotice, type Event, type InsertEvent, type News, type InsertNews, type Department, type InsertDepartment, type Course, type InsertCourse, type Faculty, type InsertFaculty, type Facility, type InsertFacility, type GalleryImage, type InsertGalleryImage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserApprovalStatus(id: string, status: string): Promise<User | undefined>;
  getPendingUsers(): Promise<User[]>;
  getUsersByRole(role: string): Promise<User[]>;
  
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
        isActive: true
      };
      this.faculty.set(id, faculty);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "student",
      approvalStatus: "pending",
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
}

export const storage = new MemStorage();
