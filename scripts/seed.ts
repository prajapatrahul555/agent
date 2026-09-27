import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "../lib/db";
import User from "../models/User";
import Teacher from "../models/Teacher";
import Student from "../models/Student";
import Class from "../models/Class";

const TEACHER_NAMES = [
  { name: "Dr. Sarah Jenkins", subject: "Mathematics", qualification: "Ph.D. Mathematics", exp: "10 years" },
  { name: "Prof. Robert Miller", subject: "Physics", qualification: "M.Sc. Physics", exp: "8 years" },
  { name: "Elena Rostova", subject: "Chemistry", qualification: "M.Sc. Chemistry", exp: "6 years" },
  { name: "Marcus Vance", subject: "Biology", qualification: "Ph.D. Biology", exp: "12 years" },
  { name: "Amanda Chen", subject: "English Literature", qualification: "M.A. English", exp: "5 years" },
  { name: "David O'Connor", subject: "World History", qualification: "M.A. History", exp: "9 years" },
  { name: "Sophia Patel", subject: "Computer Science", qualification: "B.Tech CSE", exp: "7 years" },
  { name: "James Wilson", subject: "Physical Education", qualification: "B.P.Ed", exp: "11 years" },
  { name: "Maria Garcia", subject: "Spanish", qualification: "M.A. Languages", exp: "4 years" },
  { name: "Thomas Wright", subject: "Geography", qualification: "M.Sc. Geography", exp: "6 years" },
  { name: "Rachel Adams", subject: "Art & Design", qualification: "B.F.A", exp: "8 years" },
  { name: "Kevin Zhang", subject: "Economics", qualification: "M.A. Economics", exp: "9 years" },
  { name: "Laura Taylor", subject: "Music", qualification: "M.Mus", exp: "5 years" },
  { name: "Daniel Brown", subject: "Social Studies", qualification: "M.A. Sociology", exp: "7 years" },
  { name: "Hannah Scott", subject: "French", qualification: "M.A. French", exp: "6 years" },
];

const FIRST_NAMES = [
  "Liam", "Noah", "Oliver", "James", "Elijah", "William", "Henry", "Lucas", "Benjamin", "Theodore",
  "Mateo", "Levi", "Sebastian", "Daniel", "Jack", "Alexander", "Owen", "Asher", "Samuel", "Ethan",
  "Leo", "Jackson", "Mason", "Ezra", "John", "Hudson", "Luca", "David", "Joseph", "Julian",
  "Luke", "Waylon", "Wyatt", "Carter", "Julian", "Grayson", "Isaac", "Jayden", "Gabriel", "Julian",
  "Olivia", "Emma", "Charlotte", "Amelia", "Sophia", "Mia", "Isabella", "Ava", "Evelyn", "Elena",
  "Luna", "Harper", "Sofia", "Camila", "Eleanor", "Elizabeth", "Violet", "Scarlett", "Emily", "Hazel",
  "Lily", "Gianna", "Aurora", "Penelope", "Aria", "Nora", "Chloe", "Ellie", "Mila", "Avery",
  "Lucy", "Abigail", "Ella", "Isla", "Eliana", "Nova", "Madelyn", "Stella", "Maya", "Victoria"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores"
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await dbConnect();

    console.log("Clearing existing collections...");
    await User.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await Class.deleteMany({});

    console.log("Hashing default password 'password123'...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    // 1. Create Admin (1 Account)
    console.log("Creating Admin user...");
    const adminUser = await User.create({
      name: "System Administrator",
      email: "admin@sms.com",
      password: hashedPassword,
      role: "Admin",
      isActive: true,
    });

    // 2. Create 15 Teachers (15 Accounts)
    console.log("Creating 15 Teacher users and teacher profiles...");
    const teacherDocIds: mongoose.Types.ObjectId[] = [];
    for (let i = 0; i < 15; i++) {
      const teacherMeta = TEACHER_NAMES[i];
      const email = `teacher${i + 1}@sms.com`;
      
      const teacherUser = await User.create({
        name: teacherMeta.name,
        email: email,
        password: hashedPassword,
        role: "Teacher",
        isActive: true,
      });

      const teacherDoc = await Teacher.create({
        userId: teacherUser._id,
        employeeId: `EMP${String(i + 1).padStart(3, "0")}`,
        subjects: [teacherMeta.subject],
        qualification: teacherMeta.qualification,
        experience: teacherMeta.exp,
        salary: 50000 + i * 2000,
        joiningDate: new Date("2022-08-01"),
      });

      teacherDocIds.push(teacherDoc._id as mongoose.Types.ObjectId);
    }

    // 3. Create Classes (4 Classes)
    console.log("Creating Classes...");
    const classConfigs = [
      { name: "Grade 9", sections: ["A", "B"], teacherIndex: 0 },
      { name: "Grade 10", sections: ["A", "B"], teacherIndex: 1 },
      { name: "Grade 11", sections: ["A", "B"], teacherIndex: 2 },
      { name: "Grade 12", sections: ["A", "B"], teacherIndex: 3 },
    ];

    const createdClasses = [];
    for (const conf of classConfigs) {
      const classDoc = await Class.create({
        name: conf.name,
        sections: conf.sections,
        classTeacherId: teacherDocIds[conf.teacherIndex],
        subjects: ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"],
      });
      createdClasses.push(classDoc);
    }

    // 4. Create 84 Students (84 Accounts)
    console.log("Creating 84 Student users and student profiles...");
    for (let i = 0; i < 84; i++) {
      const fn = FIRST_NAMES[i % FIRST_NAMES.length];
      const ln = LAST_NAMES[i % LAST_NAMES.length];
      const name = `${fn} ${ln}`;
      const email = `student${i + 1}@sms.com`;

      const studentUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: "Student",
        isActive: true,
      });

      const targetClass = createdClasses[i % createdClasses.length];
      const section = i % 2 === 0 ? "A" : "B";
      const gender = i % 2 === 0 ? "Male" : "Female";

      await Student.create({
        userId: studentUser._id,
        rollNumber: `STU${String(i + 1).padStart(3, "0")}`,
        classId: targetClass._id,
        sectionId: section,
        dob: new Date(2008, i % 12, (i % 28) + 1),
        gender: gender,
        address: `${100 + i} Academic Way, Cityville`,
        guardianName: `Parent of ${fn}`,
        guardianContact: `+1-555-01${String(i + 10).padStart(2, "0")}`,
        admissionDate: new Date("2023-09-01"),
        bloodGroup: ["A+", "B+", "O+", "AB+"][i % 4],
        age: "16",
        fatherName: `Father of ${fn}`,
        motherName: `Mother of ${fn}`,
      });
    }

    console.log("\n==================================================");
    console.log("DATABASE SEEDED SUCCESSFULLY!");
    console.log("Total accounts created: 100");
    console.log(" - Admin: 1 account (admin@sms.com)");
    console.log(" - Teachers: 15 accounts (teacher1@sms.com to teacher15@sms.com)");
    console.log(" - Students: 84 accounts (student1@sms.com to student84@sms.com)");
    console.log("Default password for ALL accounts: password123");
    console.log("==================================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
