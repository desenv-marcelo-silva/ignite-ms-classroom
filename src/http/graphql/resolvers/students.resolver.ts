import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver, ResolveReference } from "@nestjs/graphql";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentResolver {
    constructor(
        private studentsService: StudentsService,
        private enrollmentsService: EnrollmentsService
    ) { }

    @UseGuards(AuthorizationGuard)
    @Query(() => [Student])
    students() {
        return this.studentsService.listAll();
    }

    @ResolveField()
    enrollments(@Parent() students: Student) {
        return this.enrollmentsService.listByStudentId(students.id);
    }

    @ResolveReference()
    resolveReference(reference: { authUserId: string }) {
        return this.studentsService.getStudentByAuthUserId(reference.authUserId);
    }
}