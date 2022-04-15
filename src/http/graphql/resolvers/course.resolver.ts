import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CoursesService } from "../../../services/courses.service";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { CreateCourseInput } from "../inputs/create-course-input";
import { Course } from "../models/course";

@Resolver(() => Course)
export class CourseResolver {
    constructor(
        private coursesServices: CoursesService,
        private studentsServices: StudentsService,
        private enrollmentsServices: EnrollmentsService
    ) { }

    @UseGuards(AuthorizationGuard)
    @Query(() => [Course])
    courses() {
        return this.coursesServices.listAll();
    }

    @Query(() => Course)
    @UseGuards(AuthorizationGuard)
    async course(@Args('id') id: string,
        @CurrentUser() user: AuthUser
    ) {
        const student = await this.studentsServices.getStudentByAuthUserId(user.sub);

        if (!student) {
            throw new Error('Student not found!')
        }

        const enrollment = await this.enrollmentsServices.getByCourseAndStudentId({
            courseId: id,
            studentId: student.id,
        });

        if (!enrollment) {
            throw new UnauthorizedException();
        }

        return this.coursesServices.GetById(id);
    }

    @Mutation(() => Course)
    @UseGuards(AuthorizationGuard)
    createCourse(
        @Args('data') data: CreateCourseInput
    ) {
        return this.coursesServices.createCourse(data);
    }
}