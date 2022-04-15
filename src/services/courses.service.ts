import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { PrismaService } from "../database/prisma/database/prisma.service";

interface CreateCourseParams {
    title: string;
    slug?: string;
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

    GetBySlug(slug: string) {
        return this.prisma.course.findUnique({
            where: {
                slug
            }
        });
    }

    async createCourse({ title, slug = slugify(title, { lower: true }) }: CreateCourseParams) {
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