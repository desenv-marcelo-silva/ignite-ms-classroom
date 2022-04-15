import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";


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

    @EventPattern('purchases.purchase-created')
    async purchaseCreated(
        @Payload('value') payload: PurchaseCreatedPayload
    ) {
        console.table(payload);
    }
}