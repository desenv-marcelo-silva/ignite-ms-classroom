import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/database/prisma.service";

@Injectable()
export class CoursesService {
    constructor(
        private prisma: PrismaService) { }
}