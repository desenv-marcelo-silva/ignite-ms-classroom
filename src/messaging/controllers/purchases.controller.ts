import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CoursesService } from "../../services/courses.service";
import { EnrollmentsService } from "../../services/enrollments.service";
import { StudentsService } from "../../services/students.service";


export interface PurchaseCreatedPayload {
    customer: Customer
    product: Product
}

export interface Customer {
    authUserId: string
}

export interface Product {
    id: string
    title: string
    slug: string
}


@Controller()
export class PurchasesController {
    constructor(
        private coursesServices: CoursesService,
        private studentsServices: StudentsService,
        private enrollmentsServices: EnrollmentsService
    ) { }

    @EventPattern('purchases.purchase-created')
    async purchaseCreated(
        @Payload('value') payload: PurchaseCreatedPayload
    ) {
        let student = await this.studentsServices.getStudentByAuthUserId(
            payload.customer.authUserId
        );

        if (!student) {
            student = await this.studentsServices.create(
                { authUserId: payload.customer.authUserId }
            );
        }

        let course = await this.coursesServices.GetBySlug(payload.product.slug);
        if (!course) {
            course = await this.coursesServices.createCourse({
                title: payload.product.title,
                slug: payload.product.slug
            });
        }

        await this.enrollmentsServices.create({
            courseId: course.id,
            studentId: student.id
        });
    }
}