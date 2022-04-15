import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/database/prisma.service";

interface CreateEnrollmentParams {
    courseId: string;
    studentId: string;
}

interface getByCourseAndStudentIdParams {
    courseId: string;
    studentId: string;
}

@Injectable()
export class EnrollmentsService {
    constructor(private prisma: PrismaService) { }

    listAll() {
        return this.prisma.enrollment.findMany({
            where: {
                canceledAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    listByStudentId(studentId: string) {
        return this.prisma.enrollment.findMany({
            where: {
                studentId,
                canceledAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    getByCourseAndStudentId({ courseId, studentId }: getByCourseAndStudentIdParams) {
        return this.prisma.enrollment.findFirst({
            where: {
                courseId,
                studentId,
                canceledAt: null
            }
        })
    }

    create({ courseId, studentId }: CreateEnrollmentParams) {
        return this.prisma.enrollment.create({
            data: {
                courseId,
                studentId,
            }
        })
    }
}