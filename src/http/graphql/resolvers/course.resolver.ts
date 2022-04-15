import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { CoursesService } from "../../../services/courses.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Course } from "../models/course";

@Resolver(() => Course)
export class CourseResolver {
    constructor(
        private coursesServices: CoursesService
    ) { }

    @UseGuards(AuthorizationGuard)
    @Query(() => [Course])
    courses() {
        return this.coursesServices.listAll();
    }
}