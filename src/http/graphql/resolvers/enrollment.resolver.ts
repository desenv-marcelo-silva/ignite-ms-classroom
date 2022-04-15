import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CoursesService } from "../../../services/courses.service";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Enrollment } from "../models/enrollment";

@Resolver(() => Enrollment)
export class EnrollmentResolver {
    constructor(
        private enrollmentsService: EnrollmentsService,
        private coursesService: CoursesService,
        private studentsService: StudentsService
    ) { }

    @UseGuards(AuthorizationGuard)
    @Query(() => [Enrollment])
    enrollments() {
        return this.enrollmentsService.listAll();
    }

    @ResolveField()
    student(@Parent() enrollment: Enrollment) {
        return this.studentsService.GetById(enrollment.studentId);
    }

    @ResolveField()
    course(@Parent() enrollment: Enrollment) {
        return this.coursesService.GetById(enrollment.courseId);
    }
}