import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/database/prisma.service";

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    listAll() {
        return this.prisma.student.findMany();
    }

    GetById(id: string) {
        return this.prisma.student.findUnique({
            where: {
                id
            }
        });
    }

    getStudentByAuthUserId(authUserId: string) {
        return this.prisma.student.findUnique({
            where: {
                authUserId
            }
        })
    }
}