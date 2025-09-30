import { type User, type InsertUser, type Notice, type InsertNotice, type Event, type InsertEvent, type News, type InsertNews, type Department, type InsertDepartment, type Course, type InsertCourse, type Faculty, type InsertFaculty, type Facility, type InsertFacility, type GalleryImage, type InsertGalleryImage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
    // Initialize empty collections - no mock data
    // Real data would be populated through API endpoints or database migrations
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
