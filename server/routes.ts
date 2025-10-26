import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerUserSchema, loginUserSchema, insertNoticeSchema, insertEventSchema, insertNewsSchema, insertDepartmentSchema, insertCourseSchema, insertFacultySchema, insertFacilitySchema, insertGalleryImageSchema, insertStudentSchema, insertTeacherRatingSchema, insertRatingLinkSchema, insertStudentDueSchema, insertPaymentSchema, insertContactFormSchema, insertTimetableSchema, insertAcademicCalendarSchema, insertAdmissionSchema, type User } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import session from "express-session";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);

// Extend Express Request to include session user
declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

// Authentication middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

function requireRole(...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    
    next();
  };
}

async function requireApproved(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  const user = await storage.getUser(req.session.userId);
  if (!user || user.approvalStatus !== "approved") {
    return res.status(403).json({ message: "Account not yet approved" });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "ramanujan-college-secret-key-2024",
      resave: false,
      saveUninitialized: false,
      store: new MemoryStoreSession({
        checkPeriod: 86400000, // 24 hours
      }),
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // Better compatibility while maintaining security
      },
    })
  );

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerUserSchema.parse(req.body);
      
      // Validate that phone number is required
      if (!validatedData.phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
      }
      
      // Check if phone already exists
      const existingPhone = await storage.getUserByPhone(validatedData.phoneNumber);
      if (existingPhone) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
      
      // Check if email already exists (if provided)
      if (validatedData.email) {
        const existingEmail = await storage.getUserByEmail(validatedData.email);
        if (existingEmail) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }

      let studentIdToUse: string | null = null;
      
      // Handle student-specific logic
      if (validatedData.role === "student") {
        if (validatedData.studentType === "passed") {
          // Validate that existing student ID is provided
          if (!validatedData.existingStudentId) {
            return res.status(400).json({ message: "Student ID is required for passed-out students" });
          }
          // Validate that the student ID exists in the database
          const existingStudent = await storage.getStudentByStudentId(validatedData.existingStudentId);
          if (!existingStudent) {
            return res.status(400).json({ message: "Student ID not found in database" });
          }
          // Check if this student ID is already linked to a user
          const existingUser = await storage.getUserByStudentId(validatedData.existingStudentId);
          if (existingUser) {
            return res.status(400).json({ message: "This student ID is already registered" });
          }
          studentIdToUse = validatedData.existingStudentId;
        } else if (validatedData.studentType === "present") {
          // Validate that year, section, and roll number are all provided
          if (!validatedData.year || !validatedData.section || !validatedData.rollNumber) {
            return res.status(400).json({ message: "Year, section, and roll number are required for present students" });
          }
          // Generate student ID based on year, section, and roll number
          const currentYear = new Date().getFullYear();
          studentIdToUse = `RJC${currentYear}${validatedData.year}${validatedData.section}${validatedData.rollNumber.padStart(3, '0')}`;
        } else {
          return res.status(400).json({ message: "Student type must be 'present' or 'passed'" });
        }
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user with student ID if applicable
      const userData: any = {
        fullName: validatedData.fullName,
        phoneNumber: validatedData.phoneNumber,
        email: validatedData.email || null,
        role: validatedData.role,
        password: hashedPassword,
      };

      if (studentIdToUse) {
        userData.studentId = studentIdToUse;
      }
      
      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      let message = "Registration successful. Please wait for management approval.";
      if (validatedData.role === "management") {
        message = "Registration successful.";
      } else if (user.studentId) {
        message = `Registration successful. Your Student ID is ${user.studentId}. Please wait for management approval.`;
      }
      
      res.status(201).json({ 
        message,
        user: userWithoutPassword 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      
      // Try to find user by phone or student ID based on role
      let user;
      if (validatedData.role === "student") {
        // Try student ID first, then phone
        user = await storage.getUserByStudentId(validatedData.identifier);
        if (!user) {
          user = await storage.getUserByPhone(validatedData.identifier);
        }
      } else {
        // For teacher and management, only use phone
        user = await storage.getUserByPhone(validatedData.identifier);
      }
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify role matches
      if (user.role !== validatedData.role) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      if (user.approvalStatus !== "approved") {
        return res.status(403).json({ message: "Account not yet approved. Please wait for management approval." });
      }
      
      // Set session and save explicitly
      req.session.userId = user.id;
      
      // Save session before responding
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.json({ message: "Login successful", user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post("/api/auth/logout", requireAuth, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User management routes (admin only)
  app.get("/api/users/pending", requireRole("admin", "management"), async (req, res) => {
    try {
      const users = await storage.getPendingUsers();
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pending users" });
    }
  });

  app.patch("/api/users/:id/approval", requireRole("admin", "management"), async (req, res) => {
    try {
      const { status } = req.body;
      
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const user = await storage.updateUserApprovalStatus(req.params.id, status);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user approval status" });
    }
  });

  app.get("/api/students/approved", async (req, res) => {
    try {
      const students = await storage.getApprovedStudents();
      const studentsWithoutPasswords = students.map(({ password, ...user }) => user);
      res.json(studentsWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch approved students" });
    }
  });

  // Notice routes
  app.get("/api/notices", async (req, res) => {
    try {
      const notices = await storage.getNotices();
      res.json(notices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notices" });
    }
  });

  app.get("/api/notices/:id", async (req, res) => {
    try {
      const notice = await storage.getNotice(req.params.id);
      if (!notice) {
        return res.status(404).json({ message: "Notice not found" });
      }
      res.json(notice);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notice" });
    }
  });

  app.post("/api/notices", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertNoticeSchema.parse(req.body);
      const notice = await storage.createNotice(validatedData);
      res.status(201).json(notice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create notice" });
    }
  });

  app.patch("/api/notices/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertNoticeSchema.partial().parse(req.body);
      const notice = await storage.updateNotice(req.params.id, validatedData);
      if (!notice) {
        return res.status(404).json({ message: "Notice not found" });
      }
      res.json(notice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update notice" });
    }
  });

  app.delete("/api/notices/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const success = await storage.deleteNotice(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Notice not found" });
      }
      res.json({ message: "Notice deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete notice" });
    }
  });

  // Event routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/events", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  app.patch("/api/events/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(req.params.id, validatedData);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update event" });
    }
  });

  app.delete("/api/events/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const success = await storage.deleteEvent(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/news/featured", async (req, res) => {
    try {
      const news = await storage.getFeaturedNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const newsItem = await storage.getNewsItem(req.params.id);
      if (!newsItem) {
        return res.status(404).json({ message: "News item not found" });
      }
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news item" });
    }
  });

  app.post("/api/news", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(validatedData);
      res.status(201).json(newsItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create news item" });
    }
  });

  // Department routes
  app.get("/api/departments", async (req, res) => {
    try {
      const departments = await storage.getDepartments();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch departments" });
    }
  });

  app.get("/api/departments/:id", async (req, res) => {
    try {
      const department = await storage.getDepartment(req.params.id);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
      res.json(department);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch department" });
    }
  });

  app.post("/api/departments", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertDepartmentSchema.parse(req.body);
      const department = await storage.createDepartment(validatedData);
      res.status(201).json(department);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create department" });
    }
  });

  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const { departmentId } = req.query;
      let courses;
      if (departmentId && typeof departmentId === 'string') {
        courses = await storage.getCoursesByDepartment(departmentId);
      } else {
        courses = await storage.getCourses();
      }
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post("/api/courses", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validatedData);
      res.status(201).json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  // Faculty routes
  app.get("/api/faculty", async (req, res) => {
    try {
      const { departmentId } = req.query;
      let faculty;
      if (departmentId && typeof departmentId === 'string') {
        faculty = await storage.getFacultyByDepartment(departmentId);
      } else {
        faculty = await storage.getFaculty();
      }
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch faculty" });
    }
  });

  app.get("/api/faculty/:id", async (req, res) => {
    try {
      const facultyMember = await storage.getFacultyMember(req.params.id);
      if (!facultyMember) {
        return res.status(404).json({ message: "Faculty member not found" });
      }
      res.json(facultyMember);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch faculty member" });
    }
  });

  app.post("/api/faculty", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertFacultySchema.parse(req.body);
      const facultyMember = await storage.createFaculty(validatedData);
      res.status(201).json(facultyMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create faculty member" });
    }
  });

  app.patch("/api/faculty/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertFacultySchema.partial().parse(req.body);
      const facultyMember = await storage.updateFaculty(req.params.id, validatedData);
      if (!facultyMember) {
        return res.status(404).json({ message: "Faculty member not found" });
      }
      res.json(facultyMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update faculty member" });
    }
  });

  app.delete("/api/faculty/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const success = await storage.deleteFaculty(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Faculty member not found" });
      }
      res.json({ message: "Faculty member deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete faculty member" });
    }
  });

  // Facility routes
  app.get("/api/facilities", async (req, res) => {
    try {
      const { category } = req.query;
      let facilities;
      if (category && typeof category === 'string') {
        facilities = await storage.getFacilitiesByCategory(category);
      } else {
        facilities = await storage.getFacilities();
      }
      res.json(facilities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });

  app.get("/api/facilities/:id", async (req, res) => {
    try {
      const facility = await storage.getFacility(req.params.id);
      if (!facility) {
        return res.status(404).json({ message: "Facility not found" });
      }
      res.json(facility);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch facility" });
    }
  });

  app.post("/api/facilities", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertFacilitySchema.parse(req.body);
      const facility = await storage.createFacility(validatedData);
      res.status(201).json(facility);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create facility" });
    }
  });

  // Gallery Image routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const image = await storage.getGalleryImage(req.params.id);
      if (!image) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      res.json(image);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery image" });
    }
  });

  app.post("/api/gallery", requireRole("admin", "management"), async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create gallery image" });
    }
  });

  app.delete("/api/gallery/:id", requireRole("admin", "management"), async (req, res) => {
    try {
      const success = await storage.deleteGalleryImage(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      res.json({ message: "Gallery image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery image" });
    }
  });

  // Student routes
  app.get("/api/students", async (req, res) => {
    try {
      const { stream, section, year, graduationYear, status } = req.query;
      const filters: any = {};
      
      if (stream && typeof stream === 'string') filters.stream = stream;
      if (section && typeof section === 'string') filters.section = section;
      if (year && typeof year === 'string') filters.year = parseInt(year);
      if (graduationYear && typeof graduationYear === 'string') filters.graduationYear = parseInt(graduationYear);
      if (status && typeof status === 'string') filters.status = status;
      
      const students = await storage.getStudents(filters);
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  app.get("/api/students/:id", async (req, res) => {
    try {
      const student = await storage.getStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student" });
    }
  });

  app.post("/api/students", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(validatedData);
      res.status(201).json(student);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create student" });
    }
  });

  app.patch("/api/students/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertStudentSchema.partial().parse(req.body);
      const student = await storage.updateStudent(req.params.id, validatedData);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update student" });
    }
  });

  app.delete("/api/students/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const success = await storage.deleteStudent(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete student" });
    }
  });

  // Initialize Principal Account
  app.post("/api/auth/init-principal", async (req, res) => {
    try {
      const existingPrincipal = await storage.getUserByEmail("DilipKumarBorah@gmail.com");
      
      if (existingPrincipal) {
        return res.status(400).json({ message: "Principal account already exists" });
      }
      
      const hashedPassword = await bcrypt.hash("Education@13", 10);
      
      const principal = await storage.createUser({
        email: "DilipKumarBorah@gmail.com",
        phoneNumber: "9864750236",
        password: hashedPassword,
        fullName: "Mr. Dilip Kumar Borah",
        role: "principal"
      });
      
      await storage.updateUserApprovalStatus(principal.id, "approved");
      
      const { password, ...principalWithoutPassword } = principal;
      res.status(201).json({ 
        message: "Principal account created successfully",
        user: principalWithoutPassword 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create principal account" });
    }
  });

  // Teacher Rating routes
  app.post("/api/ratings", async (req, res) => {
    try {
      const validatedData = insertTeacherRatingSchema.parse(req.body);
      const rating = await storage.createRating(validatedData);
      res.status(201).json(rating);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit rating" });
    }
  });

  app.get("/api/ratings/faculty/:facultyId", async (req, res) => {
    try {
      const ratings = await storage.getRatingsByFaculty(req.params.facultyId);
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ratings" });
    }
  });

  // Rating Link routes
  app.post("/api/rating-links", requireRole("management", "admin", "principal"), async (req, res) => {
    try {
      const validatedData = insertRatingLinkSchema.parse(req.body);
      
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      const link = await storage.createRatingLink({
        ...validatedData,
        linkToken: token,
        createdBy: req.session.userId
      });
      
      res.status(201).json(link);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create rating link" });
    }
  });

  app.get("/api/rating-links/:token", async (req, res) => {
    try {
      const link = await storage.getRatingLink(req.params.token);
      
      if (!link) {
        return res.status(404).json({ message: "Rating link not found" });
      }
      
      if (!link.isActive) {
        return res.status(400).json({ message: "Rating link is no longer active" });
      }
      
      if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        return res.status(400).json({ message: "Rating link has expired" });
      }
      
      res.json(link);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rating link" });
    }
  });

  app.get("/api/rating-links/faculty/:facultyId", requireRole("management", "admin", "principal"), async (req, res) => {
    try {
      const links = await storage.getRatingLinksByFaculty(req.params.facultyId);
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rating links" });
    }
  });

  // Student Dues routes
  app.get("/api/dues/student/:studentId", requireAuth, async (req, res) => {
    try {
      const dues = await storage.getStudentDues(req.params.studentId);
      res.json(dues);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student dues" });
    }
  });

  app.post("/api/dues", requireRole("management", "admin", "principal"), async (req, res) => {
    try {
      const validatedData = insertStudentDueSchema.parse(req.body);
      const due = await storage.createStudentDue(validatedData);
      res.status(201).json(due);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create due" });
    }
  });

  // Payment routes
  app.post("/api/payments", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create payment" });
    }
  });

  app.get("/api/payments/student/:studentId", requireAuth, async (req, res) => {
    try {
      const payments = await storage.getPaymentsByStudent(req.params.studentId);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  app.get("/api/payments/pending", requireRole("management", "admin", "principal"), async (req, res) => {
    try {
      const payments = await storage.getPendingPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pending payments" });
    }
  });

  app.post("/api/payments/:id/verify", requireRole("management", "admin", "principal"), async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const payment = await storage.verifyPayment(req.params.id, req.session.userId);
      
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  // Get faculty with rankings (sorted by rank)
  app.get("/api/faculty/ranked", async (req, res) => {
    try {
      const faculty = await storage.getFaculty();
      const rankedFaculty = faculty
        .filter(f => f.rankPosition !== null)
        .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0));
      res.json(rankedFaculty);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ranked faculty" });
    }
  });

  // Contact Form routes
  app.get("/api/contact-forms", requireRole("management", "admin"), async (req, res) => {
    try {
      const forms = await storage.getContactForms();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact forms" });
    }
  });

  app.get("/api/contact-forms/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const form = await storage.getContactForm(req.params.id);
      if (!form) {
        return res.status(404).json({ message: "Contact form not found" });
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact form" });
    }
  });

  app.post("/api/contact-forms", async (req, res) => {
    try {
      const validatedData = insertContactFormSchema.parse(req.body);
      const form = await storage.createContactForm(validatedData);
      res.status(201).json(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.patch("/api/contact-forms/:id/status", requireRole("management", "admin"), async (req, res) => {
    try {
      const { status } = req.body;
      const form = await storage.updateContactFormStatus(req.params.id, status);
      if (!form) {
        return res.status(404).json({ message: "Contact form not found" });
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contact form status" });
    }
  });

  app.delete("/api/contact-forms/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const success = await storage.deleteContactForm(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Contact form not found" });
      }
      res.json({ message: "Contact form deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contact form" });
    }
  });

  // Timetable routes
  app.get("/api/timetables", async (req, res) => {
    try {
      const { stream, section, year } = req.query;
      const filters: any = {};
      if (stream && typeof stream === 'string') filters.stream = stream;
      if (section && typeof section === 'string') filters.section = section;
      if (year && typeof year === 'string') filters.year = parseInt(year);
      
      const timetables = await storage.getTimetables(filters);
      res.json(timetables);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timetables" });
    }
  });

  app.get("/api/timetables/:id", async (req, res) => {
    try {
      const timetable = await storage.getTimetable(req.params.id);
      if (!timetable) {
        return res.status(404).json({ message: "Timetable not found" });
      }
      res.json(timetable);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timetable" });
    }
  });

  app.post("/api/timetables", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertTimetableSchema.parse(req.body);
      const timetable = await storage.createTimetable(validatedData);
      res.status(201).json(timetable);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create timetable" });
    }
  });

  app.patch("/api/timetables/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertTimetableSchema.partial().parse(req.body);
      const timetable = await storage.updateTimetable(req.params.id, validatedData);
      if (!timetable) {
        return res.status(404).json({ message: "Timetable not found" });
      }
      res.json(timetable);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update timetable" });
    }
  });

  app.delete("/api/timetables/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const success = await storage.deleteTimetable(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Timetable not found" });
      }
      res.json({ message: "Timetable deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete timetable" });
    }
  });

  // Academic Calendar routes
  app.get("/api/academic-calendar", async (req, res) => {
    try {
      const { academicYear } = req.query;
      const filters: any = {};
      if (academicYear && typeof academicYear === 'string') filters.academicYear = academicYear;
      
      const calendars = await storage.getAcademicCalendars(filters);
      res.json(calendars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch academic calendar" });
    }
  });

  app.get("/api/academic-calendar/:id", async (req, res) => {
    try {
      const calendar = await storage.getAcademicCalendar(req.params.id);
      if (!calendar) {
        return res.status(404).json({ message: "Academic calendar entry not found" });
      }
      res.json(calendar);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch academic calendar entry" });
    }
  });

  app.post("/api/academic-calendar", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertAcademicCalendarSchema.parse(req.body);
      const calendar = await storage.createAcademicCalendar(validatedData);
      res.status(201).json(calendar);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create academic calendar entry" });
    }
  });

  app.patch("/api/academic-calendar/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const validatedData = insertAcademicCalendarSchema.partial().parse(req.body);
      const calendar = await storage.updateAcademicCalendar(req.params.id, validatedData);
      if (!calendar) {
        return res.status(404).json({ message: "Academic calendar entry not found" });
      }
      res.json(calendar);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update academic calendar entry" });
    }
  });

  app.delete("/api/academic-calendar/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const success = await storage.deleteAcademicCalendar(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Academic calendar entry not found" });
      }
      res.json({ message: "Academic calendar entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete academic calendar entry" });
    }
  });

  // Admission routes
  app.get("/api/admissions", requireRole("management", "admin"), async (req, res) => {
    try {
      const admissions = await storage.getAdmissions();
      res.json(admissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admissions" });
    }
  });

  app.get("/api/admissions/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const admission = await storage.getAdmission(req.params.id);
      if (!admission) {
        return res.status(404).json({ message: "Admission not found" });
      }
      res.json(admission);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admission" });
    }
  });

  app.post("/api/admissions", async (req, res) => {
    try {
      const validatedData = insertAdmissionSchema.parse(req.body);
      const admission = await storage.createAdmission(validatedData);
      res.status(201).json(admission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit admission" });
    }
  });

  app.patch("/api/admissions/:id/status", requireRole("management", "admin"), async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const { status } = req.body;
      const admission = await storage.updateAdmissionStatus(req.params.id, status, req.session.userId);
      if (!admission) {
        return res.status(404).json({ message: "Admission not found" });
      }
      res.json(admission);
    } catch (error) {
      res.status(500).json({ message: "Failed to update admission status" });
    }
  });

  app.delete("/api/admissions/:id", requireRole("management", "admin"), async (req, res) => {
    try {
      const success = await storage.deleteAdmission(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Admission not found" });
      }
      res.json({ message: "Admission deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete admission" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
