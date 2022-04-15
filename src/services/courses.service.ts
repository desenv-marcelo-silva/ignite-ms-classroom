import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/database/prisma.service";

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) { }

    listAll() {
        return this.prisma.course.findMany();
    }

    GetById(id: string) {
        return this.prisma.course.findUnique({
            where: {
                id
            }
        });
    }
}