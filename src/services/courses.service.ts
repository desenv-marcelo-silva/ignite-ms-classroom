import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { PrismaService } from "../database/prisma/database/prisma.service";

interface CreateCourseParams {
    title: string;
}

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

    async createCourse({ title }: CreateCourseParams) {
        const slug = slugify(title, { lower: true });

        const courseExists = await this.prisma.course.findUnique({
            where: {
                slug
            }
        });

        if (courseExists) {
            throw new Error(`Course do not created. Course ${title} already exists.`);
        }

        return this.prisma.course.create({
            data: {
                title,
                slug
            }
        })
    }
}