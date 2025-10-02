import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("student"),
  approvalStatus: text("approval_status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notices = pgTable("notices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  priority: text("priority").default("normal"),
  isActive: boolean("is_active").default(true),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  isActive: boolean("is_active").default(true),
});

export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  category: text("category").notNull(),
  featured: boolean("featured").default(false),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
});

export const departments = pgTable("departments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  established: integer("established"),
  headOfDepartment: text("head_of_department"),
  facultyCount: integer("faculty_count").default(0),
  programs: text("programs").array(),
  facilities: text("facilities").array(),
  isActive: boolean("is_active").default(true),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  departmentId: varchar("department_id").references(() => departments.id),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  eligibility: text("eligibility").notNull(),
  seats: integer("seats"),
  fees: text("fees"),
  syllabus: text("syllabus"),
  isActive: boolean("is_active").default(true),
});

export const faculty = pgTable("faculty", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  designation: text("designation").notNull(),
  departmentId: varchar("department_id").references(() => departments.id),
  qualification: text("qualification").notNull(),
  experience: integer("experience"),
  specialization: text("specialization"),
  email: text("email"),
  phone: text("phone"),
  isActive: boolean("is_active").default(true),
});

export const facilities = pgTable("facilities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  capacity: integer("capacity"),
  features: text("features").array(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
});

export const galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  order: integer("order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rollNumber: text("roll_number").notNull().unique(),
  studentId: text("student_id").notNull().unique(),
  stream: text("stream").notNull(),
  section: text("section").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  approvalStatus: true,
});

export const registerUserSchema = insertUserSchema.extend({
  role: z.enum(["student", "teacher", "admin", "management"]),
});

export const loginUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertNoticeSchema = createInsertSchema(notices).omit({
  id: true,
  publishedAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  publishedAt: true,
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertFacultySchema = createInsertSchema(faculty).omit({
  id: true,
});

export const insertFacilitySchema = createInsertSchema(facilities).omit({
  id: true,
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertNotice = z.infer<typeof insertNoticeSchema>;
export type Notice = typeof notices.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Department = typeof departments.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type Faculty = typeof faculty.$inferSelect;
export type InsertFacility = z.infer<typeof insertFacilitySchema>;
export type Facility = typeof facilities.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;
